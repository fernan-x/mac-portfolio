export const MAX_BASE_STAT = 255;

const isEnglish = (language: string): boolean =>
  language.toLowerCase().startsWith("en");

const formatDecimal = (value: number, language: string): string => {
  const fixed = value.toFixed(1);
  return isEnglish(language) ? fixed : fixed.replace(".", ",");
};

/** PokeAPI weight is in hectograms. */
export const formatWeight = (
  hectograms: number | null,
  language: string,
): string =>
  hectograms === null ? "-" : `${formatDecimal(hectograms / 10, language)} kg`;

/** PokeAPI height is in decimetres. */
export const formatHeight = (
  decimetres: number | null,
  language: string,
): string =>
  decimetres === null ? "-" : `${formatDecimal(decimetres / 10, language)} m`;

export const padNumber = (value: number, length = 3): string =>
  value.toString().padStart(length, "0");

export const formatPokemonNumber = (id: number): string => `#${padNumber(id)}`;

/** Bar width in percent, relative to the max base stat. */
export const statPercent = (value: number): number =>
  Math.min(100, Math.max(0, (value / MAX_BASE_STAT) * 100));

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

export const STAT_ORDER = Object.keys(STAT_LABELS);

export const statLabel = (apiName: string): string =>
  STAT_LABELS[apiName] ?? apiName.toUpperCase();

/** Flavor texts contain hard line breaks and form feeds. */
export const cleanFlavorText = (text: string): string =>
  text.replace(/[\f\n\r]+/g, " ").replace(/\s+/g, " ").trim();

export const formatAbilityName = (name: string): string =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
