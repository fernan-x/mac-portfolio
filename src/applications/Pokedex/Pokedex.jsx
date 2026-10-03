import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

/* Redux import */
import { usePokedexStore } from "../../store/pokedexStore";

import { fetchPokemons } from "../../services/pokeapi";

import pokemonLoader from "../../assets/lotties/pokeball-loading.json";
import PokemonCard from "./PokemonCard";

import "./Pokedex.scss";
import PokemonDetail from "./PokemonDetail";

const Pokedex = () => {
  const pokemons = usePokedexStore((state) => state.pokemonList);
  const setPokemonList = usePokedexStore((state) => state.setPokemonList);
  const [loading, setLoading] = useState(true);
  const [displayPokemon, setDisplayPokemon] = useState(null);

  useEffect(() => {
    fetchPokemons()
      .then((list) => {
        setPokemonList(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="pokedex__loader">
          <Player
            src={pokemonLoader}
            autoplay
            loop
            className="pokedex__loader-lottie"
          ></Player>
        </div>
      ) : displayPokemon ? (
        <PokemonDetail
          id={displayPokemon}
          handleBack={() => setDisplayPokemon(null)}
        />
      ) : (
        <div className="pokedex">
          {pokemons &&
            pokemons.map((elem) => (
              <PokemonCard
                key={elem.id}
                id={elem.id}
                name={elem.name}
                image={elem.image}
                types={elem.types}
                setDisplayPokemon={setDisplayPokemon}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Pokedex;
