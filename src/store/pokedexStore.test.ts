import { describe, it, expect, beforeEach } from "vitest";
import { usePokedexStore } from "./pokedexStore";
import type { ApiPokemonDetail } from "../schemas/pokemon";

const api = (id: number) => ({
  id,
  name: `poke${id}`,
  height: 1,
  weight: 2,
  pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "fire" } }],
});

const detail = (id: number, flavor = "Hello\nworld\f!"): ApiPokemonDetail => ({
  id,
  name: `poke${id}`,
  height: 5,
  weight: 90,
  pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: "water" } }],
  pokemon_v2_pokemonabilities: [
    { pokemon_v2_ability: { name: "torrent" } },
    { pokemon_v2_ability: { name: "rain-dish" } },
  ],
  pokemon_v2_pokemonstats: [
    { base_stat: 44, pokemon_v2_stat: { name: "hp" } },
    { base_stat: 48, pokemon_v2_stat: { name: "attack" } },
  ],
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesflavortexts: [{ flavor_text: flavor }],
  },
});

const reset = () =>
  usePokedexStore.setState({
    pokemonList: [],
    pokemonIdList: [],
    offset: 0,
    hasMore: true,
    details: {},
  });

describe("pokedexStore", () => {
  beforeEach(reset);

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

  describe("pagination", () => {
    it("advances the offset and keeps hasMore on a full page", () => {
      usePokedexStore.getState().addPokemonPage([api(1), api(2)], 2);
      const state = usePokedexStore.getState();
      expect(state.offset).toBe(2);
      expect(state.hasMore).toBe(true);
    });

    it("stops when a page is smaller than the limit", () => {
      const { addPokemonPage } = usePokedexStore.getState();
      addPokemonPage([api(1), api(2)], 2);
      addPokemonPage([api(3)], 2);
      const state = usePokedexStore.getState();
      expect(state.offset).toBe(3);
      expect(state.hasMore).toBe(false);
      expect(state.pokemonList.map((p) => p.id)).toEqual([1, 2, 3]);
    });

    it("stops on an empty page", () => {
      usePokedexStore.getState().addPokemonPage([], 30);
      expect(usePokedexStore.getState().hasMore).toBe(false);
    });

    it("does not duplicate pokemons when a page overlaps", () => {
      const { addPokemonPage } = usePokedexStore.getState();
      addPokemonPage([api(1), api(2)], 2);
      addPokemonPage([api(2), api(3)], 2);
      expect(usePokedexStore.getState().pokemonIdList).toEqual([1, 2, 3]);
    });
  });

  describe("detail cache", () => {
    it("stores a formatted detail by id", () => {
      usePokedexStore.getState().setPokemonDetail(detail(7));
      expect(usePokedexStore.getState().details[7]).toEqual({
        id: 7,
        abilities: ["torrent", "rain-dish"],
        stats: [
          { name: "hp", value: 44 },
          { name: "attack", value: 48 },
        ],
        description: "Hello world !",
      });
    });

    it("keeps previously cached details", () => {
      const { setPokemonDetail } = usePokedexStore.getState();
      setPokemonDetail(detail(7));
      setPokemonDetail(detail(8));
      expect(Object.keys(usePokedexStore.getState().details)).toEqual([
        "7",
        "8",
      ]);
    });

    it("falls back to an empty description", () => {
      usePokedexStore.getState().setPokemonDetail({
        ...detail(9),
        pokemon_v2_pokemonspecy: null,
      });
      expect(usePokedexStore.getState().details[9].description).toBe("");
    });
  });
});
