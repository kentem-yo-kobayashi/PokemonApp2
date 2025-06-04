export type NameAndUrl = { name: string; url: string };

export type Region = { count: number; results: NameAndUrl[] };

export type Types = Region;

export type RegionFile = { main_generation: NameAndUrl };

export type Pokemons = { pokemon_species: NameAndUrl[] };
