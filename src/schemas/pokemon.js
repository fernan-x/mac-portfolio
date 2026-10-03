import { z } from "zod";

const named = (key) => z.object({ [key]: z.object({ name: z.string() }) });

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  pokemon_v2_pokemontypes: z.array(named("pokemon_v2_type")),
  pokemon_v2_pokemonabilities: z.array(named("pokemon_v2_ability")),
});

export const pokemonListSchema = z.array(pokemonSchema);
