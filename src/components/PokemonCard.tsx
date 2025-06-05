import type { Pokemon } from "../utils/types";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div key={pokemon.name} className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
};

export default PokemonCard;
