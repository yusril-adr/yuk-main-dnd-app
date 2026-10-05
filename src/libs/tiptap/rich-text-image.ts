import Image from "@tiptap/extension-image";

import { isHttpsUrl } from "@/utils/rich-text";

// Block images from external https URLs, inserted only with the toolbar's
// Image button (pasted / dropped images are stripped by the editor)
export const RichTextImage = Image.extend({
  // Stored HTML: only <img> with an https src becomes an image node; data:
  // (base64), http and anything else are dropped
  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: (element) =>
          isHttpsUrl(element.getAttribute("src") ?? "") ? null : false,
      },
    ];
  },

  // No markdown shortcut (typing ![alt](url)); the Image button validates the URL
  addInputRules() {
    return [];
  },
}).configure({
  inline: false,
  allowBase64: false,
  HTMLAttributes: {
    // Load when scrolled into view, and don't send our page URL to the host
    loading: "lazy",
    referrerpolicy: "no-referrer",
  },
});
