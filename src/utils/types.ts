export type NameAndUrl = { name: string; url: string };

export type Region = { count: number; results: NameAndUrl[] };

export type Types = Region;

export type Language = Region;

export type RegionFile = { main_generation: NameAndUrl };

export type Pokemons = { pokemon_species: NameAndUrl[] };

export type Species = {
  names: { language: NameAndUrl; name: string }[];
  genera: { genus: string; language: NameAndUrl }[];
  varieties: { pokemon: NameAndUrl }[];
};

export type Pokemon = {
  sprites: { front_default: string };
  name: string;
  types: { type: NameAndUrl }[];
};
