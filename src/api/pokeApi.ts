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

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (response.status === 404) {
    throw new Error("Error 404");
  }
  if (!response.ok) {
    throw new Error("Error something");
  }
  return await response.json();
};

const getSelectorData = async <T extends { count: number }>(url: string) => {
  const res = await fetchData<T>(url);
  if (res.count <= maxCount) return res;
  const resp = await fetchData<T>(`${url}?offset=0&limit=${res.count}`);
  return resp;
};

// get pokemon region data
export const getRegions = async (url: string) =>
  await getSelectorData<Region>(url);

// get pokemon types data
export const getTypes = async (url: string) =>
  await getSelectorData<Types>(url);

// get language data
export const getLanguages = async (url: string) =>
  await getSelectorData<Language>(url);

// get pokemon data
export const getPokemons = async (url: string, selectedType: string) => {
  // get generation data
  const { main_generation } = await fetchData<RegionFile>(url);
  // get pokemon lists
  const { pokemon_species } = await fetchData<Pokemons>(main_generation.url);
  //get pokemon data1
  const _pokemon = await Promise.all<Species>(
    pokemon_species.map((species) => fetchData<Species>(species.url))
  );
//   // get pokemon data2
//   const pokemonDetail = await Promise.all<Pokemon>(
//     _pokemon.map((item) => fetchData(item.varieties[0].pokemon.url))
//   );
//   // marge data1 and data2
//   const totalPokemonData = pokemonDetail.map((item, index) => {
//     const { types, name, sprites } = item;
//     const { names, genera, varieties } = _pokemon[index];
//     return { name, names, genera, types, sprites, varieties };
//   });
//   const results = totalPokemonData.filter((pokemon) =>
//     pokemon.types.some((type) => type.type.name === selectedType)
//   );
//   return results;
// };
