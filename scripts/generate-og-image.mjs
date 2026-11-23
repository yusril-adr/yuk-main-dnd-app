import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";

// Rebuilds the static share card at src/app/opengraph-image.jpg (and a
// copy at twitter-image.jpg) from the logo, guild photo, and OG fonts.
// Run from the repo root: npm run generate-og-image
//
// Keep the layout, colours, and alt text in sync with this script, the
// alt.txt files, and OG_IMAGE_ALT / OG_IMAGE_SIZE in src/utils/seo-helper.ts.

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const appDir = join(root, "src", "app");
const assetsDir = join(root, "src", "assets");

const SIZE = { width: 1200, height: 630 };

// Light theme tokens from globals.css (oklch converted to hex for Satori)
const COLORS = {
  background: "#fcf0dc", // --background oklch(0.96 0.03 81.68)
  foreground: "#5d4835", // --foreground oklch(0.42 0.042 64.9)
  primary: "#7f180a", // --primary oklch(0.39 0.14 31.21)
};

const ALT =
  "YukMainDnD crest beside a photo of the guild: Gather your party. Your legend starts here.";

async function renderPng() {
  const [crestSvg, photo, headingFont, bodyFont] = await Promise.all([
    readFile(join(assetsDir, "logo/YMDND.svg"), "utf8"),
    readFile(join(assetsDir, "og/guild-photo-og.jpg")),
    readFile(join(assetsDir, "og/eczar-semibold-latin.ttf")),
    readFile(join(assetsDir, "og/alegreya-sans-medium-latin.ttf")),
  ]);

  const crestSrc = `data:image/svg+xml;base64,${Buffer.from(
    crestSvg.replaceAll("currentColor", COLORS.primary),
  ).toString("base64")}`;
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const element = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 16,
        background: COLORS.background,
      },
    },
    h(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          border: `2px solid ${COLORS.primary}`,
          borderRadius: 8,
          padding: 12,
          gap: 12,
        },
      },
      h(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            padding: "0 16px",
          },
        },
        h("img", { src: crestSrc, alt: "", width: 300, height: 300 }),
        h(
          "div",
          {
            style: {
              display: "flex",
              fontFamily: "Alegreya Sans",
              fontSize: 22,
              letterSpacing: 6,
              color: COLORS.primary,
            },
          },
          "A TABLETOP RPG GUILD",
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              textAlign: "center",
              fontFamily: "Eczar",
              fontSize: 40,
              lineHeight: 1.15,
              color: COLORS.foreground,
            },
          },
          "Gather your party. Your legend starts here.",
        ),
      ),
      h("img", {
        src: photoSrc,
        alt: "",
        width: 600,
        height: 570,
        style: {
          objectFit: "cover",
          borderRadius: 4,
          border: `1px solid ${COLORS.primary}`,
        },
      }),
    ),
  );

  const response = new ImageResponse(element, {
    ...SIZE,
    fonts: [
      { name: "Eczar", data: headingFont, style: "normal", weight: 600 },
      { name: "Alegreya Sans", data: bodyFont, style: "normal", weight: 500 },
    ],
  });

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const png = await renderPng();
  const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();

  await Promise.all([
    writeFile(join(appDir, "opengraph-image.jpg"), jpeg),
    writeFile(join(appDir, "twitter-image.jpg"), jpeg),
    writeFile(join(appDir, "opengraph-image.alt.txt"), ALT),
    writeFile(join(appDir, "twitter-image.alt.txt"), ALT),
  ]);

  const kib = (jpeg.length / 1024).toFixed(1);
  console.log(
    `Wrote src/app/opengraph-image.jpg and twitter-image.jpg (${jpeg.length} bytes, ${kib} KiB, ${SIZE.width}x${SIZE.height}, q82 mozjpeg).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
