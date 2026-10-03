import { describe, it, expect, beforeEach } from "vitest";
import { usePokedexStore } from "./pokedexStore";

const api = (id: number) => ({
  id,
  name: `poke${id}`,
  height: 1,
  weight: 2,
  pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "fire" } }],
});

describe("pokedexStore", () => {
  beforeEach(() => {
    usePokedexStore.setState({ pokemonList: [], pokemonIdList: [] });
  });

  it("formats API data", () => {
    usePokedexStore.getState().setPokemonList([api(4)]);
    const state = usePokedexStore.getState();
    expect(state.pokemonIdList).toEqual([4]);
    expect(state.pokemonList[0]).toMatchObject({
      id: 4,
      name: "poke4",
      types: [{ name: "fire" }],
    });
    expect(state.pokemonList[0].image).toMatch(/\/4\.png$/);
  });

  it("does not add the same pokemon twice", () => {
    const { setPokemonList } = usePokedexStore.getState();
    setPokemonList([api(1), api(1)]);
    setPokemonList([api(1), api(2)]);
    const state = usePokedexStore.getState();
    expect(state.pokemonIdList).toEqual([1, 2]);
    expect(state.pokemonList).toHaveLength(2);
  });
});
