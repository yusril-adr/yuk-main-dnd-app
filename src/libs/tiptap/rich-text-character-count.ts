import { CharacterCount } from "@tiptap/extensions";

// CharacterCount where images count as 0 characters (hard breaks and dividers
// still count as 1, like the default). Keep in sync with
// countRichTextCharacters in src/utils/rich-text.ts
export const RichTextCharacterCount = CharacterCount.extend({
  onBeforeCreate(event) {
    this.parent?.(event);

    const defaultCharacters = this.storage.characters;
    this.storage.characters = (options) => {
      const mode = options?.mode ?? this.options.mode;
      if (mode !== "textSize") {
        return defaultCharacters(options);
      }

      const node = options?.node ?? this.editor.state.doc;
      const text = node.textBetween(0, node.content.size, undefined, (leaf) =>
        leaf.type.name === "image" ? "" : " ",
      );
      return this.options.textCounter(text);
    };
  },
});
