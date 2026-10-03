import { describe, it, expect } from "vitest";
import {
  cleanFlavorText,
  formatAbilityName,
  formatHeight,
  formatPokemonNumber,
  formatWeight,
  padNumber,
  statLabel,
  statPercent,
} from "./pokemon";

describe("units", () => {
  it("converts hectograms to kg with a comma in French", () => {
    expect(formatWeight(90, "fr")).toBe("9,0 kg");
    expect(formatWeight(905, "fr")).toBe("90,5 kg");
  });

  it("converts decimetres to m with a comma in French", () => {
    expect(formatHeight(5, "fr")).toBe("0,5 m");
    expect(formatHeight(17, "fr")).toBe("1,7 m");
  });

  it("uses a decimal point in English", () => {
    expect(formatWeight(90, "en")).toBe("9.0 kg");
    expect(formatHeight(5, "en-US")).toBe("0.5 m");
  });

  it("handles missing values", () => {
    expect(formatWeight(null, "fr")).toBe("-");
    expect(formatHeight(null, "en")).toBe("-");
  });
});

describe("padding", () => {
  it("pads stats and numbers to 3 digits", () => {
    expect(padNumber(44)).toBe("044");
    expect(padNumber(5)).toBe("005");
    expect(padNumber(255)).toBe("255");
    expect(padNumber(1000)).toBe("1000");
  });

  it("formats the pokemon number", () => {
    expect(formatPokemonNumber(7)).toBe("#007");
  });
});

describe("stats", () => {
  it("computes the bar width against 255", () => {
    expect(statPercent(0)).toBe(0);
    expect(statPercent(255)).toBe(100);
    expect(statPercent(127.5)).toBe(50);
  });

  it("clamps out of range values", () => {
    expect(statPercent(300)).toBe(100);
    expect(statPercent(-5)).toBe(0);
  });

  it("maps api stat names to labels", () => {
    expect(statLabel("hp")).toBe("HP");
    expect(statLabel("special-attack")).toBe("SATK");
    expect(statLabel("special-defense")).toBe("SDEF");
    expect(statLabel("speed")).toBe("SPD");
    expect(statLabel("accuracy")).toBe("ACCURACY");
  });
});

describe("text", () => {
  it("removes line breaks and form feeds from flavor texts", () => {
    expect(cleanFlavorText("After birth, its\nback swells and\fhardens.")).toBe(
      "After birth, its back swells and hardens.",
    );
  });

  it("capitalizes ability names", () => {
    expect(formatAbilityName("rain-dish")).toBe("Rain-Dish");
    expect(formatAbilityName("torrent")).toBe("Torrent");
  });
});
