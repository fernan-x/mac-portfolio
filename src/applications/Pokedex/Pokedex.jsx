import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

/* Redux import */
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList } from "../../store/pokedexSlice";

/* GraphQL import */
import GraphQLClient from "../../services/apolloClient";
import { gql } from "@apollo/client";

import pokemonLoader from "../../assets/lotties/pokeball-loading.json";
import PokemonCard from "./PokemonCard";

import "./Pokedex.scss";
import PokemonDetail from "./PokemonDetail";

const Pokedex = () => {
  const pokemons = useSelector((state) => state.pokedex.pokemonList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [displayPokemon, setDisplayPokemon] = useState(null);

  useEffect(() => {
    GraphQLClient.query({
      query: gql`
        query samplePokeAPIquery {
          pokemon_v2_pokemon(limit: 50) {
            id
            name
            height
            weight
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                name
              }
            }
          }
        }
      `,
    })
      .then((res) => {
        dispatch(setPokemonList(res.data.pokemon_v2_pokemon));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
