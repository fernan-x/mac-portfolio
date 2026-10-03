import { create } from "zustand";
import type { ApiPokemon } from "../schemas/pokemon";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number | null;
  weight: number | null;
  types: { name: string }[];
}

// The store only formats these fields (abilities are not used here)
type ApiPokemonInput = Omit<ApiPokemon, "pokemon_v2_pokemonabilities"> &
  Partial<Pick<ApiPokemon, "pokemon_v2_pokemonabilities">>;

interface PokedexState {
  pokemonList: Pokemon[];
  pokemonIdList: number[];
  setPokemonList: (items: ApiPokemonInput[]) => void;
}

export const usePokedexStore = create<PokedexState>((set) => ({
  pokemonList: [],
  pokemonIdList: [],
  setPokemonList: (items) =>
    set((state) => {
      const pokemonList = [...state.pokemonList];
      const pokemonIdList = [...state.pokemonIdList];

      items.forEach((item) => {
        // Avoid pushing the same pokemon twice
        if (!pokemonIdList.includes(item.id)) {
          // Format the api datas
          pokemonList.push({
            id: item.id,
            name: item.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
            height: item.height,
            weight: item.weight,
            types: item.pokemon_v2_pokemontypes.map((type) => ({
              name: type.pokemon_v2_type.name,
            })),
          });
          pokemonIdList.push(item.id);
        }
      });

      return { pokemonList, pokemonIdList };
    }),
}));
