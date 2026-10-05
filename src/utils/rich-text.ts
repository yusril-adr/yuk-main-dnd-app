import DOMPurify from "dompurify";

// The only tags the editor produces (StarterKit without code / code block, H2–H3)
const RICH_TEXT_ALLOWED_TAGS = [
  "p",
  "br",
  "h2",
  "h3",
  "strong",
  "em",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "hr",
];
const RICH_TEXT_TAG_PATTERN =
  /<\/?(p|br|h2|h3|strong|em|u|s|a|ul|ol|li|blockquote|hr)\b[^>]*>/i;
const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

if (typeof window !== "undefined") {
  // Links in stored HTML always open safely in a new tab
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer nofollow");
    }
  });
}

// Older stories were saved as plain text; rich text is stored as HTML
export function isRichTextHtml(value: string): boolean {
  return RICH_TEXT_TAG_PATTERN.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Blank line -> new paragraph, single newline -> <br> (same look as whitespace-pre-line)
export function plainTextToHtml(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .map(
      (paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`,
    )
    .join("");
}

export function toRichTextHtml(value: string | null | undefined): string {
  if (!value?.trim()) {
    return "";
  }

  if (isRichTextHtml(value)) {
    return value;
  }

  return plainTextToHtml(value);
}

// SSR-safe (no DOM). Counts like Tiptap's CharacterCount: one character between blocks
export function getRichTextPlainText(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  if (!isRichTextHtml(value)) {
    return value.trim();
  }

  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h2|h3|li|blockquote)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => HTML_ENTITIES[entity])
    .trim();
}

export function sanitizeRichTextHtml(value: string): string {
  // DOMPurify needs a DOM. Story content is fetched client-side, so it is never
  // rendered on the server; return nothing there instead of crashing
  if (typeof window === "undefined") {
    return "";
  }

  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: RICH_TEXT_ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}

const RICH_TEXT_LINK_PROTOCOLS = ["http:", "https:", "mailto:"];

// Link popover input -> safe href. Adds https:// when there is no protocol;
// returns null for anything that isn't http, https or mailto
export function normalizeRichTextLinkUrl(value: string): string | null {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return null;
  }

  const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(trimmedValue);
  const href = hasProtocol ? trimmedValue : `https://${trimmedValue}`;

  try {
    const url = new URL(href);
    if (!RICH_TEXT_LINK_PROTOCOLS.includes(url.protocol)) {
      return null;
    }
  } catch {
    return null;
  }

  return href;
}
