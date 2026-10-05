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
  "img",
];
const RICH_TEXT_TAG_PATTERN =
  /<\/?(p|br|h2|h3|strong|em|u|s|a|ul|ol|li|blockquote|hr|img)\b[^>]*>/i;
const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

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
    // Links in stored HTML always open safely in a new tab
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

// SSR-safe (no DOM). Readable text for previews: blocks and line breaks become
// newlines, images are dropped
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

// SSR-safe. Counts like the editor's RichTextCharacterCount (Tiptap
// CharacterCount): visible text, line breaks and dividers 1, images 0,
// nothing between blocks. Used by the form schemas so both limits agree
export function countRichTextCharacters(
  value: string | null | undefined,
): number {
  return toRichTextHtml(value)
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<(br|hr)\b[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => HTML_ENTITIES[entity])
    .length;
}

export function sanitizeRichTextHtml(value: string): string {
  // DOMPurify needs a DOM. Story content is fetched client-side, so it is never
  // rendered on the server; return nothing there instead of crashing
  if (typeof window === "undefined") {
    return "";
  }

  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: RICH_TEXT_ALLOWED_TAGS,
    // src / alt are limited to <img> by the uponSanitizeAttribute hook
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt"],
  });
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
