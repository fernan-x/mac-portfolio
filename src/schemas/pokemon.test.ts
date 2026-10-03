import { describe, it, expect } from "vitest";
import {
  pokemonDetailSchema,
  pokemonListSchema,
  pokemonSchema,
} from "./pokemon";

const listItem = {
  id: 7,
  name: "squirtle",
  height: 5,
  weight: 90,
  pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "water" } }],
  pokemon_v2_pokemonabilities: [
    { pokemon_v2_ability: { name: "torrent" } },
    { pokemon_v2_ability: { name: "rain-dish" } },
  ],
};

const detailItem = {
  ...listItem,
  pokemon_v2_pokemonstats: [
    { base_stat: 44, pokemon_v2_stat: { name: "hp" } },
    { base_stat: 48, pokemon_v2_stat: { name: "attack" } },
  ],
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesflavortexts: [
      { flavor_text: "After birth, its\nback swells." },
    ],
  },
};

describe("pokemon list schema", () => {
  it("accepts a valid payload", () => {
    expect(pokemonListSchema.safeParse([listItem]).success).toBe(true);
  });

  it("accepts null height and weight", () => {
    expect(
      pokemonSchema.safeParse({ ...listItem, height: null, weight: null })
        .success,
    ).toBe(true);
  });

  it("rejects a missing name", () => {
    expect(
      pokemonSchema.safeParse({ ...listItem, name: undefined }).success,
    ).toBe(false);
  });

  it("rejects a non-array payload", () => {
    expect(pokemonListSchema.safeParse(undefined).success).toBe(false);
  });
});

describe("pokemon detail schema", () => {
  it("accepts a valid payload", () => {
    const result = pokemonDetailSchema.safeParse(detailItem);
    expect(result.success).toBe(true);
  });

  it("accepts a pokemon without species flavor texts", () => {
    expect(
      pokemonDetailSchema.safeParse({
        ...detailItem,
        pokemon_v2_pokemonspecy: {
          pokemon_v2_pokemonspeciesflavortexts: [],
        },
      }).success,
    ).toBe(true);
  });

  it("accepts a null species", () => {
    expect(
      pokemonDetailSchema.safeParse({
        ...detailItem,
        pokemon_v2_pokemonspecy: null,
      }).success,
    ).toBe(true);
  });

  it("rejects a non numeric base stat", () => {
    expect(
      pokemonDetailSchema.safeParse({
        ...detailItem,
        pokemon_v2_pokemonstats: [
          { base_stat: "44", pokemon_v2_stat: { name: "hp" } },
        ],
      }).success,
    ).toBe(false);
  });

  it("rejects a payload without stats", () => {
    expect(
      pokemonDetailSchema.safeParse({
        ...detailItem,
        pokemon_v2_pokemonstats: undefined,
      }).success,
    ).toBe(false);
  });
});
