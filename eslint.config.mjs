import path from "node:path";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// `_*` folders are private: only files inside the folder's parent may import them
const privateFolders = {
  meta: {
    type: "problem",
    messages: {
      private:
        "'{{spec}}' is inside private folder '{{folder}}'. Only files under '{{owner}}' can import it. Move it to a non-underscore folder to share it.",
    },
  },
  create(context) {
    const file = context.filename;
    const root = path.join(context.cwd, "src");

    function check(node) {
      const spec = node.source?.value;
      if (typeof spec !== "string") return;

      let target;
      if (spec.startsWith("@/")) target = path.join(root, spec.slice(2));
      else if (spec.startsWith(".")) target = path.resolve(path.dirname(file), spec);
      else return; // packages are fine

      const parts = target.split(path.sep);
      const i = parts.findIndex((p) => p.startsWith("_"));
      if (i === -1) return;

      const owner = parts.slice(0, i).join(path.sep) + path.sep;
      if (!file.startsWith(owner)) {
        context.report({
          node: node.source,
          messageId: "private",
          data: { spec, folder: parts[i], owner: path.relative(context.cwd, owner) },
        });
      }
    }

    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
      ExportAllDeclaration: check,
    };
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { local: { rules: { "private-folders": privateFolders } } },
    rules: { "local/private-folders": "error" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Shadcn UI
    "src/app/_components/ui/**",
  ]),
]);

export default eslintConfig;
