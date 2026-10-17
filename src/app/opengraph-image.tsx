import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/utils/seo-helper";

// Site-wide default share card. Static: no request data, so it is
// prerendered at build time. Pages that pass their own image keep it.
export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

// Light theme tokens from globals.css (oklch converted to hex for Satori)
const COLORS = {
  background: "#fcf0dc", // --background oklch(0.96 0.03 81.68)
  foreground: "#77614d", // --foreground oklch(0.51 0.042 64.9)
  primary: "#7f180a", // --primary oklch(0.39 0.14 31.21)
};

const ASSETS_DIR = join(process.cwd(), "src/assets");

export default async function Image() {
  const [crestSvg, photo, headingFont, bodyFont] = await Promise.all([
    readFile(join(ASSETS_DIR, "YMDND2.svg"), "utf8"),
    readFile(join(ASSETS_DIR, "og/guild-photo-og.jpg")),
    readFile(join(ASSETS_DIR, "og/eczar-semibold-latin.ttf")),
    readFile(join(ASSETS_DIR, "og/alegreya-sans-medium-latin.ttf")),
  ]);

  // The crest uses currentColor; bake in the primary colour for the image
  const crestSrc = `data:image/svg+xml;base64,${Buffer.from(
    crestSvg.replaceAll("currentColor", COLORS.primary),
  ).toString("base64")}`;
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 16,
          background: COLORS.background,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            border: `2px solid ${COLORS.primary}`,
            borderRadius: 8,
            padding: 12,
            gap: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              padding: "0 16px",
            }}
          >
            <img src={crestSrc} alt="" width={300} height={237} />
            <div
              style={{
                display: "flex",
                fontFamily: "Alegreya Sans",
                fontSize: 22,
                letterSpacing: 6,
                color: COLORS.primary,
              }}
            >
              A TABLETOP RPG GUILD
            </div>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                fontFamily: "Eczar",
                fontSize: 40,
                lineHeight: 1.15,
                color: COLORS.foreground,
              }}
            >
              Gather your party. Your legend starts here.
            </div>
          </div>
          <img
            src={photoSrc}
            alt=""
            width={600}
            height={570}
            style={{
              objectFit: "cover",
              borderRadius: 4,
              border: `1px solid ${COLORS.primary}`,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Eczar", data: headingFont, style: "normal", weight: 600 },
        { name: "Alegreya Sans", data: bodyFont, style: "normal", weight: 500 },
      ],
    },
  );
}
