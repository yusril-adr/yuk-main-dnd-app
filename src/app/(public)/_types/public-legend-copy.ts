// Translated strings for shared legend UI; each page builds these from its own catalog
export type TPublicLegendCopy = {
  unclaimed: string;
  awaitingMaster: string;
  awaitingHero: string;
  expCaption?: string;
  errorTitle: string;
  errorDescription: string;
  // Pre-resolved empty text (month already interpolated by the caller)
  empty: string;
  dmExpTotal: (count: string) => string;
  playerExpTotal: (count: string) => string;
  dmExp: (count: string) => string;
  playerExp: (count: string) => string;
  gainedExp: (count: string) => string;
  place: (rank: number) => string;
};
