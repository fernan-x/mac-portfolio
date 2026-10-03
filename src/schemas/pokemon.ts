import { z } from "zod";

const name = z.object({ name: z.string() });

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  pokemon_v2_pokemontypes: z.array(z.object({ pokemon_v2_type: name })),
  pokemon_v2_pokemonabilities: z.array(z.object({ pokemon_v2_ability: name })),
});

export const pokemonListSchema = z.array(pokemonSchema);

export type ApiPokemon = z.infer<typeof pokemonSchema>;

export const pokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  pokemon_v2_pokemontypes: z.array(z.object({ pokemon_v2_type: name })),
  pokemon_v2_pokemonabilities: z.array(z.object({ pokemon_v2_ability: name })),
  pokemon_v2_pokemonstats: z.array(
    z.object({ base_stat: z.number(), pokemon_v2_stat: name }),
  ),
  pokemon_v2_pokemonspecy: z
    .object({
      pokemon_v2_pokemonspeciesflavortexts: z.array(
        z.object({ flavor_text: z.string() }),
      ),
    })
    .nullable(),
});

export const pokemonDetailListSchema = z.array(pokemonDetailSchema);

export type ApiPokemonDetail = z.infer<typeof pokemonDetailSchema>;
