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

const Pokedex = () => {
  const pokemons = useSelector((state) => state.pokedex.pokemonList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GraphQLClient.query({
      query: gql`
        query samplePokeAPIquery {
          pokemon_v2_pokemon(limit: 50) {
            id
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
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
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Pokedex;
