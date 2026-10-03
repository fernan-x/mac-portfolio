import { pokemonListSchema, type ApiPokemon } from "../schemas/pokemon";

const GRAPHQL_URL = "https://beta.pokeapi.co/graphql/v1beta";

const POKEMON_LIST_QUERY = `
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
`;

export const fetchPokemons = async (): Promise<ApiPokemon[]> => {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: POKEMON_LIST_QUERY }),
  });
  if (!response.ok) {
    throw new Error(`PokeAPI request failed with status ${response.status}`);
  }
  const { data, errors } = (await response.json()) as {
    data?: { pokemon_v2_pokemon?: unknown };
    errors?: { message: string }[];
  };
  if (errors && errors.length) {
    throw new Error(errors.map((e) => e.message).join(", "));
  }
  const result = pokemonListSchema.safeParse(data?.pokemon_v2_pokemon);
  if (!result.success) {
    throw new Error(`Invalid PokeAPI response: ${result.error.message}`);
  }
  return result.data;
};
