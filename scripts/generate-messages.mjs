import { watch } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Collects every colocated `_messages/<locale>.json` under src/app into one
// generated file per locale (src/generated/messages/<locale>.json), which
// src/i18n/request.ts loads. Each file holds one or more top-level namespaces,
// e.g. { "home": { ... } }. Fails on a namespace defined twice, a missing
// locale file, or keys that differ between locales.
// Usage: node scripts/generate-messages.mjs [--watch]

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const appDir = resolve(root, "src", "app");
const outDir = resolve(root, "src", "generated", "messages");

// Keep in sync with src/i18n/routing.ts; the first one is the reference
const LOCALES = ["en", "id"];
const MESSAGES_DIR = "_messages";

async function findMessageDirs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.name === MESSAGES_DIR) found.push(full);
    else found.push(...(await findMessageDirs(full)));
  }
  return found.sort();
}

// Dotted leaf paths, e.g. "hero.title"
function collectKeys(value, prefix = "") {
  if (typeof value === "string") return [prefix];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`"${prefix}" must be a string or an object`);
  }
  return Object.entries(value).flatMap(([key, child]) =>
    collectKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

async function readLocaleFile(dir, locale) {
  const file = join(dir, `${locale}.json`);
  const label = relative(root, file);
  let raw;
  try {
    raw = await readFile(file, "utf8");
  } catch {
    throw new Error(`Missing ${label}`);
  }
  try {
    return { label, data: JSON.parse(raw) };
  } catch (error) {
    throw new Error(`Invalid JSON in ${label}: ${error.message}`);
  }
}

async function generate() {
  const dirs = await findMessageDirs(appDir);
  const errors = [];
  const merged = Object.fromEntries(LOCALES.map((locale) => [locale, {}]));
  // namespace -> file that defined it
  const owners = new Map();

  for (const dir of dirs) {
    const files = {};
    try {
      for (const locale of LOCALES) files[locale] = await readLocaleFile(dir, locale);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    const [reference, ...others] = LOCALES;
    const refFile = files[reference];
    let refKeys;
    try {
      refKeys = new Set(collectKeys(refFile.data));
    } catch (error) {
      errors.push(`${refFile.label}: ${error.message}`);
      continue;
    }

    for (const locale of others) {
      const file = files[locale];
      let keys;
      try {
        keys = new Set(collectKeys(file.data));
      } catch (error) {
        errors.push(`${file.label}: ${error.message}`);
        continue;
      }
      const missing = [...refKeys].filter((key) => !keys.has(key));
      const extra = [...keys].filter((key) => !refKeys.has(key));
      if (missing.length) errors.push(`${file.label} is missing: ${missing.join(", ")}`);
      if (extra.length) errors.push(`${file.label} has keys not in ${reference}.json: ${extra.join(", ")}`);
    }

    for (const namespace of Object.keys(refFile.data)) {
      const owner = owners.get(namespace);
      if (owner) {
        errors.push(`Namespace "${namespace}" is defined in both ${owner} and ${relative(root, dir)}`);
        continue;
      }
      owners.set(namespace, relative(root, dir));
      for (const locale of LOCALES) merged[locale][namespace] = files[locale].data[namespace];
    }
  }

  if (errors.length) {
    throw new Error(`Message check failed:\n  - ${errors.join("\n  - ")}`);
  }

  await mkdir(outDir, { recursive: true });
  for (const locale of LOCALES) {
    await writeFile(join(outDir, `${locale}.json`), `${JSON.stringify(merged[locale], null, 2)}\n`);
  }
  console.log(
    `Generated ${relative(root, outDir)}/{${LOCALES.join(",")}}.json with ${owners.size} namespaces from ${dirs.length} _messages folders.`,
  );
}

async function main() {
  await generate();
  if (!process.argv.includes("--watch")) return;

  let timer = null;
  watch(appDir, { recursive: true }, (_event, filename) => {
    if (!filename || !filename.split(/[\\/]/).includes(MESSAGES_DIR)) return;
    clearTimeout(timer);
    timer = setTimeout(() => generate().catch((error) => console.error(error.message)), 100);
  });
  console.log("Watching _messages folders for changes…");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
