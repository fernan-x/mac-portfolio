import { create } from "zustand";

export const usePokedexStore = create((set) => ({
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
