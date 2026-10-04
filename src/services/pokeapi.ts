import {
  pokemonDetailListSchema,
  pokemonListSchema,
  type ApiPokemon,
  type ApiPokemonDetail,
} from "../schemas/pokemon";

const GRAPHQL_URL = "https://beta.pokeapi.co/graphql/v1beta";

export const POKEMON_PAGE_SIZE = 30;

const POKEMON_LIST_QUERY = `
  query PokemonList($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {id: asc}) {
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

const POKEMON_DETAIL_QUERY = `
  query PokemonDetail($id: Int!) {
    pokemon_v2_pokemon(where: {id: {_eq: $id}}, limit: 1) {
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
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
          flavor_text
        }
      }
    }
  }
`;

const request = async (
  query: string,
  variables: Record<string, number>,
): Promise<unknown> => {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
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
  return data?.pokemon_v2_pokemon;
};

export interface FetchPokemonsParams {
  limit: number;
  offset: number;
}

export const fetchPokemons = async ({
  limit,
  offset,
}: FetchPokemonsParams): Promise<ApiPokemon[]> => {
  const raw = await request(POKEMON_LIST_QUERY, { limit, offset });
  const result = pokemonListSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid PokeAPI response: ${result.error.message}`);
  }
  return result.data;
};

export const fetchPokemonDetail = async (
  id: number,
): Promise<ApiPokemonDetail> => {
  const raw = await request(POKEMON_DETAIL_QUERY, { id });
  const result = pokemonDetailListSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid PokeAPI response: ${result.error.message}`);
  }
  if (result.data.length === 0) {
    throw new Error(`Pokemon ${id} not found`);
  }
  return result.data[0];
};
