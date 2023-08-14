import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemonList: [],
  pokemonIdList: [],
};

export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {
    setPokemonList: (state, action) => {
      action.payload.forEach((item) => {
        // Avoid pushing the same pokemon twice
        if (!state.pokemonIdList.includes(item.id)) {
          // Format the api datas
          let pokemon = {};
          pokemon.id = item.id;
          pokemon.name = item.name;
          pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
          pokemon.height = item.height;
          pokemon.weight = item.weight;
          pokemon.types = item.pokemon_v2_pokemontypes.map((type) => {
            return { name: type.pokemon_v2_type.name };
          });
          state.pokemonList.push(pokemon);
          state.pokemonIdList.push(pokemon.id);
        }
      });
    },
  },
});

export const { setPokemonList } = pokedexSlice.actions;

export default pokedexSlice.reducer;
