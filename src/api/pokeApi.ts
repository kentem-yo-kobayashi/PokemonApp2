import type {
  Language,
  Pokemon,
  Pokemons,
  Region,
  RegionFile,
  Species,
  Types,
} from "../utils/types";

// PokeAPI max count of fetching data
const maxCount = 20;

const getData = async <T>(url: string) => {
  const res = await new Promise<T & { count: number }>((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });
  if (res.count <= maxCount) return res;

  const resp = await new Promise<T>((resolve) => {
    fetch(`${url}?offset=0&limit=${res.count}`)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  return resp;
};

// get pokemon region data
export const getRegions = async (url: string) => await getData<Region>(url);

// get pokemon types data
export const getTypes = async (url: string) => await getData<Types>(url);

// get language data
export const getLanguages = async (url: string) => await getData<Language>(url);

// get pokemon data
export const getPokemons = async (url: string, type: string) => {
  // get generation data
  const { main_generation } = await new Promise<RegionFile>((resolve) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res))
  );

  // get pokemon lists
  const { pokemon_species } = await new Promise<Pokemons>((resolve) =>
    fetch(main_generation.url)
      .then((res) => res.json())
      .then((res) => resolve(res))
  );

  //get pokemon data1
  const _pokemon = await Promise.all<Species>(
    pokemon_species.map(
      (species) =>
        new Promise((resolve) =>
          fetch(species.url)
            .then((res) => res.json())
            .then((res) => resolve(res))
        )
    )
  );

  // get pokemon data2
  const pokemonDetail = await Promise.all<Pokemon>(
    _pokemon.map(
      (item) =>
        new Promise((resolve) =>
          fetch(item.varieties[0].pokemon.url)
            .then((res) => res.json())
            .then((res) => resolve(res))
        )
    )
  );

  // marge data1 and data2
  const totalPokemonData = pokemonDetail.map((item, index) => {
    const { types, name, sprites } = { ...item };
    const { names, genera, varieties } = { ..._pokemon[index] };
    return { name, names, genera, types, sprites, varieties };
  });

  const results = totalPokemonData.filter((pokemon) =>
    pokemon.types.map((type) => type.type.name).includes(type)
  );

  return results;
};
