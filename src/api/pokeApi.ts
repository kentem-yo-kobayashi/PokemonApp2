import type { Pokemons, Region, RegionFile, Types } from "../utils/types";

const limit = 20;

export const getRegions = async (url: string) => {
  const res: Region = await new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  if (res.count <= limit) return res;

  const resp: Region = await new Promise((resolve) => {
    fetch(`${url}?offset=0&limit=${res.count}`)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  return resp;
};

export const getTypes = async (url: string) => {
  const res: Types = await new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  if (res.count <= limit) return res;

  const resp: Types = await new Promise((resolve) => {
    fetch(`${url}?offset=0&limit=${res.count}`)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  return resp;
};

export const getPokemons = async (url: string, type: string) => {
  const { main_generation }: RegionFile = await new Promise((resolve) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res))
  );

  const { pokemon_species }: Pokemons = await new Promise((resolve) =>
    fetch(main_generation.url)
      .then((res) => res.json())
      .then((res) => resolve(res))
  );

  const _pokemon: { id: number }[] = await Promise.all(
    pokemon_species.map(
      (species) =>
        new Promise((resolve) =>
          fetch(species.url)
            .then((res) => res.json())
            .then((res) => resolve(res))
        )
    )
  );

  const pokemonDetail = await Promise.all(
    _pokemon.map(
      (pokemon) =>
        new Promise((resolve) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`).then(
            (res) => res.json().then((res) => resolve(res))
          )
        )
    )
  );

  const results = pokemonDetail.filter((pokemon) => {
    if (pokemon.types.map((type) => type.type.name).includes(type))
      return pokemon;
  });

  return results
};
