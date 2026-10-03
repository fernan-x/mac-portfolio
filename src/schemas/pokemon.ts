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
