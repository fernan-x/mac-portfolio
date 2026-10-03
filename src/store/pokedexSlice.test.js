import { describe, it, expect } from "vitest";
import reducer, { setPokemonList } from "./pokedexSlice";

const api = (id) => ({
  id,
  name: `poke${id}`,
  height: 1,
  weight: 2,
  pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "fire" } }],
});

describe("pokedexSlice", () => {
  it("formats API data", () => {
    const state = reducer(undefined, setPokemonList([api(4)]));
    expect(state.pokemonIdList).toEqual([4]);
    expect(state.pokemonList[0]).toMatchObject({
      id: 4,
      name: "poke4",
      types: [{ name: "fire" }],
    });
    expect(state.pokemonList[0].image).toMatch(/\/4\.png$/);
  });

  it("does not add the same pokemon twice", () => {
    let state = reducer(undefined, setPokemonList([api(1), api(1)]));
    state = reducer(state, setPokemonList([api(1), api(2)]));
    expect(state.pokemonIdList).toEqual([1, 2]);
    expect(state.pokemonList).toHaveLength(2);
  });
});
