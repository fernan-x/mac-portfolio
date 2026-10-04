import { create } from "zustand";
import type { ApiPokemon, ApiPokemonDetail } from "../schemas/pokemon";
import { cleanFlavorText } from "../utils/pokemon";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number | null;
  weight: number | null;
  types: { name: string }[];
}

export interface PokemonDetailData {
  id: number;
  abilities: string[];
  stats: { name: string; value: number }[];
  description: string;
}

// The store only formats these fields (abilities are not used here)
type ApiPokemonInput = Omit<ApiPokemon, "pokemon_v2_pokemonabilities"> &
  Partial<Pick<ApiPokemon, "pokemon_v2_pokemonabilities">>;

interface PokedexState {
  pokemonList: Pokemon[];
  pokemonIdList: number[];
  /** Number of rows already requested from the API (next page offset). */
  offset: number;
  /** False once the API returned a page smaller than the requested limit. */
  hasMore: boolean;
  details: Record<number, PokemonDetailData>;
  setPokemonList: (items: ApiPokemonInput[]) => void;
  /** Append a fetched page and update offset / hasMore. */
  addPokemonPage: (items: ApiPokemonInput[], limit: number) => void;
  setPokemonDetail: (detail: ApiPokemonDetail) => void;
}

const formatPokemon = (item: ApiPokemonInput): Pokemon => ({
  id: item.id,
  name: item.name,
  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
  height: item.height,
  weight: item.weight,
  types: item.pokemon_v2_pokemontypes.map((type) => ({
    name: type.pokemon_v2_type.name,
  })),
});

const mergeItems = (
  state: Pick<PokedexState, "pokemonList" | "pokemonIdList">,
  items: ApiPokemonInput[],
) => {
  const pokemonList = [...state.pokemonList];
  const pokemonIdList = [...state.pokemonIdList];
  items.forEach((item) => {
    // Avoid pushing the same pokemon twice
    if (!pokemonIdList.includes(item.id)) {
      pokemonList.push(formatPokemon(item));
      pokemonIdList.push(item.id);
    }
  });
  return { pokemonList, pokemonIdList };
};

export const usePokedexStore = create<PokedexState>((set) => ({
  pokemonList: [],
  pokemonIdList: [],
  offset: 0,
  hasMore: true,
  details: {},
  setPokemonList: (items) => set((state) => mergeItems(state, items)),
  addPokemonPage: (items, limit) =>
    set((state) => ({
      ...mergeItems(state, items),
      offset: state.offset + items.length,
      hasMore: items.length >= limit,
    })),
  setPokemonDetail: (detail) =>
    set((state) => ({
      details: {
        ...state.details,
        [detail.id]: {
          id: detail.id,
          abilities: detail.pokemon_v2_pokemonabilities.map(
            (a) => a.pokemon_v2_ability.name,
          ),
          stats: detail.pokemon_v2_pokemonstats.map((s) => ({
            name: s.pokemon_v2_stat.name,
            value: s.base_stat,
          })),
          description: cleanFlavorText(
            detail.pokemon_v2_pokemonspecy
              ?.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text ?? "",
          ),
        },
      },
    })),
}));
