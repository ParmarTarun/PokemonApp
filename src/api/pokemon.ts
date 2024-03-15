import { PokemonData } from "../types";

type returnPokemons = (offset: number) => Promise<PokemonData>;

export const getPokemons: returnPokemons = async (offset = 0) => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}`
  );
  const data: PokemonData = await resp.json();
  return data;
};
