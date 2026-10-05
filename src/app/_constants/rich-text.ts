// Shared by the editor and the read-only view so both look the same.
// The repo has no @tailwindcss/typography, so the few rich text elements are
// styled here with theme tokens (dark-mode friendly).
export const RICH_TEXT_CONTENT_CLASS_NAME = [
  "break-words leading-relaxed",
  "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  "[&_p]:my-2",
  "[&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-primary",
  "[&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:font-heading [&_h3]:text-lg",
  "[&_strong]:font-semibold",
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
  "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:ps-6",
  "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:ps-6",
  "[&_li]:my-0.5 [&_li>p]:my-0",
  // Quotes double as D&D "read-aloud" boxed text
  "[&_blockquote]:my-3 [&_blockquote]:rounded-e-md [&_blockquote]:border-s-4 [&_blockquote]:border-primary/40 [&_blockquote]:bg-primary/5 [&_blockquote]:px-4 [&_blockquote]:py-2 [&_blockquote]:italic",
  "[&_hr]:my-4 [&_hr]:border-border",
  // External images: responsive, never wider than the text, capped height
  "[&_img]:my-3 [&_img]:block [&_img]:h-auto [&_img]:max-h-[32rem] [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-md",
].join(" ");

// Editor only: outline the selected image (ProseMirror adds this class)
export const RICH_TEXT_EDITOR_SELECTED_IMAGE_CLASS_NAME =
  "[&_img.ProseMirror-selectednode]:ring-2 [&_img.ProseMirror-selectednode]:ring-ring [&_img.ProseMirror-selectednode]:ring-offset-2 [&_img.ProseMirror-selectednode]:ring-offset-background";

// Toolbar toggle that is currently on (bold, list, link, ...)
export const RICH_TEXT_TOOLBAR_ACTIVE_CLASS_NAME =
  "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary";
