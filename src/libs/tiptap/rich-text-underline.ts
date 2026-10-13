import Underline from "@tiptap/extension-underline";

import { UNDERLINE_MARKDOWN_PATTERN } from "@/utils/rich-text";

// Discord-style underline: __text__ (Tiptap's default is ++text++, which
// Discord doesn't show). Bold is always written as **text**, so __ is free
export const RichTextUnderline = Underline.extend({
  renderMarkdown(node, helpers) {
    return `__${helpers.renderChildren(node)}__`;
  },

  markdownTokenizer: {
    name: "underline",
    level: "inline",
    start: (src) => src.indexOf("__"),
    tokenize(src, _tokens, lexer) {
      const match = UNDERLINE_MARKDOWN_PATTERN.exec(src);
      if (!match) {
        return undefined;
      }

      return {
        type: "underline",
        raw: match[0],
        text: match[1],
        tokens: lexer.inlineTokens(match[1]),
      };
    },
  },
});
