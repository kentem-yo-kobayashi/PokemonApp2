import type {
  Pokemon,
  Pokemons,
  Region,
  RegionFile,
  Species,
  Types,
} from "../utils/types";

const limit = 20;

export const getRegions = async (url: string) => {
  const res = await new Promise<Region>((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  if (res.count <= limit) return res;

  const resp = await new Promise<Region>((resolve) => {
    fetch(`${url}?offset=0&limit=${res.count}`)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });

  return resp;
};

export const getTypes = async (url: string) => {
  const res = await new Promise<Types>((resolve) => {
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
  const { main_generation } = await new Promise<RegionFile>((resolve) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => resolve(res))
  );

  const { pokemon_species } = await new Promise<Pokemons>((resolve) =>
    fetch(main_generation.url)
      .then((res) => res.json())
      .then((res) => resolve(res))
  );

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

  const results = pokemonDetail.filter((pokemon) => {
    if (pokemon.types.map((type) => type.type.name).includes(type))
      return pokemon;
  });

  return results;
};
