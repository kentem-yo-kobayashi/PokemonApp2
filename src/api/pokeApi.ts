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

// get pokemon region data
export const getRegions = async (url: string) => {
  const res = await new Promise<Region>((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });
  if (res.count <= maxCount) return res;

  const resp = await new Promise<Region>((resolve) => {
    fetch(`${url}?offset=0&limit=${res.count}`)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  return resp;
};

// get pokemon types data
export const getTypes = async (url: string) => {
  const res = await new Promise<Types>((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  if (res.count <= maxCount) return res;

  const resp: Types = await new Promise((resolve) => {
    fetch(`${url}?offset=0&limit=${res.count}`)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });
  return resp;
};

// get language data
export const getLanguages = async (url: string) => {
  const res = await new Promise<Language>((resolve) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res))
  );

  if (res.count <= maxCount) return res;

  const resp = await new Promise<Language>((resolve) =>
    fetch(`${url}?offset=0&limit=${res.count}`)
      .then((res) => res.json())
      .then((res) => resolve(res))
  );
  return resp;
};

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
    return { ...item, ..._pokemon[index] };
  });

  const results = totalPokemonData.filter((pokemon) =>
    pokemon.types.map((type) => type.type.name).includes(type)
  );

  return results;
};
