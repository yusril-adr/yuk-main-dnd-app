import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import type { TAppLocale } from "@/i18n/routing";
import { OG_IMAGE_SIZE } from "@/utils/seo-helper";

// Light theme tokens from globals.css (oklch converted to hex for Satori)
const COLORS = {
  background: "#fcf0dc", // --background oklch(0.96 0.03 81.68)
  foreground: "#77614d", // --foreground oklch(0.51 0.042 64.9)
  primary: "#7f180a", // --primary oklch(0.39 0.14 31.21)
};

const ASSETS_DIR = join(process.cwd(), "src/assets");

// Share card: crest, kicker and tagline beside a guild photo. Text comes
// from common.og so every locale gets its own card.
export async function renderOgCard(locale: TAppLocale) {
  const t = await getTranslations({ locale, namespace: "common.og" });

  const [crestSvg, photo, headingFont, bodyFont] = await Promise.all([
    readFile(join(ASSETS_DIR, "logo/YMDND2.svg"), "utf8"),
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
              {t("kicker")}
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
              {t("tagline")}
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
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: "Eczar", data: headingFont, style: "normal", weight: 600 },
        { name: "Alegreya Sans", data: bodyFont, style: "normal", weight: 500 },
      ],
    },
  );
}
