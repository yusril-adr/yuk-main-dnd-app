import DOMPurify from "dompurify";
import { Marked } from "marked";
import type { Token, Tokens, TokenizerAndRendererExtension } from "marked";

// Tags the Markdown renderer may output (StarterKit without code / code block,
// H1–H3). hr / img stay allowed for hand-written Markdown
const RICH_TEXT_ALLOWED_TAGS = [
  "p",
  "br",
  "h1",
  "h2",
  "h3",
  "strong",
  "em",
  "u",
  "s",
  "del",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "hr",
  "img",
];
if (typeof window !== "undefined") {
  DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    if (data.attrName !== "src" && data.attrName !== "alt") {
      return;
    }

    // src / alt only on images. Images only from https URLs: DOMPurify allows
    // data: on <img> by default, so drop any other src here (an <img> without
    // src shows nothing)
    if (
      node.tagName !== "IMG" ||
      (data.attrName === "src" && !isHttpsUrl(data.attrValue))
    ) {
      data.keepAttr = false;
    }
  });

  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    // Links in rendered descriptions always open safely in a new tab
    if (node.tagName === "A") {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer nofollow");
    }
    // External images: load when scrolled into view, and don't send our page
    // URL to the image host
    if (node.tagName === "IMG") {
      node.setAttribute("loading", "lazy");
      node.setAttribute("referrerpolicy", "no-referrer");
    }
  });
}

// Discord-style underline (__text__). Shared by the editor's markdown
// tokenizer and the read-only renderer below
export const UNDERLINE_MARKDOWN_PATTERN = /^__(?=\S)([\s\S]*?\S)__(?!_)/;

const underlineExtension: TokenizerAndRendererExtension = {
  name: "underline",
  level: "inline",
  start: (src) => src.indexOf("__"),
  tokenizer(src) {
    const match = UNDERLINE_MARKDOWN_PATTERN.exec(src);
    if (!match) {
      return undefined;
    }

    return {
      type: "underline",
      raw: match[0],
      text: match[1],
      tokens: this.lexer.inlineTokens(match[1]),
    };
  },
  renderer(token) {
    return `<u>${this.parser.parseInline(token.tokens ?? [])}</u>`;
  },
};

// Own instance so the global marked defaults stay untouched. breaks: a single
// newline is a line break, like Discord
const richTextMarked = new Marked({
  gfm: true,
  breaks: true,
  extensions: [underlineExtension],
});

// Stored Markdown -> visible text pieces (no separators between blocks, a
// line break counts as one space), like Tiptap's CharacterCount
function getMarkdownTextParts(tokens: Token[], parts: string[]): string[] {
  for (const token of tokens) {
    if (token.type === "br") {
      parts.push("\n");
    } else if (token.type === "image" || token.type === "hr") {
      continue;
    } else if (token.type === "list") {
      getMarkdownTextParts((token as Tokens.List).items, parts);
    } else if ("tokens" in token && token.tokens?.length) {
      getMarkdownTextParts(token.tokens, parts);
    } else if (
      token.type === "text" ||
      token.type === "codespan" ||
      token.type === "escape"
    ) {
      parts.push(decodeEntities((token as Tokens.Text).text));
    }

    // Blocks end a line in readable previews
    if (
      ["paragraph", "heading", "list_item", "blockquote"].includes(token.type)
    ) {
      parts.push("\u0000");
    }
  }

  return parts;
}

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

function decodeEntities(value: string): string {
  return value.replace(
    /&(amp|lt|gt|quot|#39);/g,
    (entity) => HTML_ENTITIES[entity],
  );
}

// SSR-safe (no DOM). Readable text for previews: blocks and line breaks become
// newlines, Markdown syntax and images are dropped
export function getRichTextPlainText(value: string | null | undefined): string {
  if (!value?.trim()) {
    return "";
  }

  return getMarkdownTextParts(richTextMarked.lexer(value), [])
    .join("")
    .replace(/\u0000+/g, "\n")
    .trim();
}

// SSR-safe. Counts like the editor's RichTextCharacterCount (Tiptap
// CharacterCount): visible text, line breaks 1, nothing between blocks. Used
// by the form schemas so both limits agree
export function countRichTextCharacters(
  value: string | null | undefined,
): number {
  if (!value?.trim()) {
    return 0;
  }

  return getMarkdownTextParts(richTextMarked.lexer(value), [])
    .join("")
    .replace(/\u0000/g, "").length;
}

// Stored Markdown -> sanitized HTML for the read-only view
export function renderRichTextMarkdown(
  value: string | null | undefined,
): string {
  // DOMPurify needs a DOM. Story content is fetched client-side, so it is never
  // rendered on the server; return nothing there instead of crashing
  if (typeof window === "undefined" || !value?.trim()) {
    return "";
  }

  const html = richTextMarked.parse(value, { async: false });
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: RICH_TEXT_ALLOWED_TAGS,
    // src / alt are limited to <img> by the uponSanitizeAttribute hook
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "start"],
  });
}

// Tags a comment may render: the minimal editor's marks and lists
const COMMENT_ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "s",
  "del",
  "ul",
  "ol",
  "li",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Comments: only what the minimal editor can produce becomes markup. Anything
// else that was typed by hand (raw HTML, links, images, headings, quotes,
// code, tables, dividers) is shown as the text that was written, so older
// plain-text comments still read the same. DOMPurify below is the safety net
const commentMarked = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    html: ({ text }) => escapeHtml(text),
    link: ({ raw }) => escapeHtml(raw),
    image: ({ raw }) => escapeHtml(raw),
    codespan: ({ raw }) => escapeHtml(raw),
    code: ({ raw }) =>
      `<p>${escapeHtml(raw.trim()).replace(/\n/g, "<br>")}</p>`,
    table: ({ raw }) =>
      `<p>${escapeHtml(raw.trim()).replace(/\n/g, "<br>")}</p>`,
    hr: ({ raw }) => `<p>${escapeHtml(raw.trim())}</p>`,
    checkbox: ({ checked }) => (checked ? "[x] " : "[ ] "),
    // Keep the "#" / ">" that were typed, render the rest as inline text
    heading({ depth, tokens }) {
      return `<p>${"#".repeat(depth)} ${this.parser.parseInline(tokens)}</p>`;
    },
    blockquote({ tokens }) {
      return `<p>&gt; ${this.parser.parse(tokens).replace(/^<p>|<\/p>\s*$/g, "")}</p>`;
    },
  },
});

// Wraps a leading "@username" of the first paragraph (already escaped text,
// never markup) so replies can highlight who they answer
const COMMENT_LEADING_MENTION_PATTERN = /^<p>(@[^\s<&]+)/;

// Stored comment Markdown -> sanitized HTML. mentionClassName highlights a
// leading @mention when given
export function renderCommentMarkdown(
  value: string | null | undefined,
  mentionClassName?: string,
): string {
  if (typeof window === "undefined" || !value?.trim()) {
    return "";
  }

  const html = DOMPurify.sanitize(
    commentMarked.parse(value, { async: false }),
    { ALLOWED_TAGS: COMMENT_ALLOWED_TAGS, ALLOWED_ATTR: ["start"] },
  );
  if (!mentionClassName) {
    return html;
  }

  return html.replace(
    COMMENT_LEADING_MENTION_PATTERN,
    `<p><span class="${mentionClassName}">$1</span>`,
  );
}

const RICH_TEXT_LINK_PROTOCOLS = ["http:", "https:", "mailto:"];
// https only: http images would be mixed content on the https site
const RICH_TEXT_IMAGE_PROTOCOLS = ["https:"];

// Popover input -> safe URL. Adds https:// when there is no protocol;
// returns null when the protocol isn't one of `protocols`
function normalizeUrl(value: string, protocols: string[]): string | null {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return null;
  }

  const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(trimmedValue);
  const href = hasProtocol ? trimmedValue : `https://${trimmedValue}`;

  try {
    const url = new URL(href);
    if (!protocols.includes(url.protocol)) {
      return null;
    }
  } catch {
    return null;
  }

  return href;
}

// Link popover: http, https or mailto
export function normalizeRichTextLinkUrl(value: string): string | null {
  return normalizeUrl(value, RICH_TEXT_LINK_PROTOCOLS);
}

// Image popover: https only
export function normalizeRichTextImageUrl(value: string): string | null {
  return normalizeUrl(value, RICH_TEXT_IMAGE_PROTOCOLS);
}

// Exact https URL check (no protocol added). Used when the editor parses
// stored HTML and when stored HTML is sanitized for display
export function isHttpsUrl(value: string): boolean {
  try {
    return RICH_TEXT_IMAGE_PROTOCOLS.includes(new URL(value.trim()).protocol);
  } catch {
    return false;
  }
}

// Pasted / dropped HTML without images (images only come from the Image
// button). Uses the DOM, so call it from the editor only
export function removeHtmlImages(html: string): string {
  const parsedDocument = new DOMParser().parseFromString(html, "text/html");
  parsedDocument
    .querySelectorAll("img, picture")
    .forEach((node) => node.remove());
  return parsedDocument.body.innerHTML;
}
