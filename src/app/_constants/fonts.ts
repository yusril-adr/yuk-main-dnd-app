import { Alegreya_Sans, DM_Mono, Eczar } from "next/font/google";

// Shared by the [locale] layout and the root not-found page
export const eczarHeading = Eczar({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const alegreyaSans = Alegreya_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const dmMono = DM_Mono({
  weight: "400",
  variable: "--font-mono",
  subsets: ["latin"],
});

export const FONT_VARIABLES = [
  dmMono.variable,
  alegreyaSans.variable,
  eczarHeading.variable,
];
