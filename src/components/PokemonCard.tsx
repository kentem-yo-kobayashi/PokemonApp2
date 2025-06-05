import type { NameAndUrl, Pokemon, Species } from "../utils/types";
import "./PokemonCard.css"

const PokemonCard = ({
  pokemon,
  language,
}: {
  pokemon: Pokemon & Species;
  language: NameAndUrl | undefined;
}) => {
  const getNameOfLanguage = () => {
    if (!language) return {name:"No data"}
    const name = pokemon.names.find((_name) => _name.language.name === language.name);
    if (name === undefined) return {name:"No data"}
    return name
  };
  const getGenusOfLanguage = () => {
    if (!language) return {genus:"No data"}
    const genus = pokemon.genera.find((_genus) => _genus.language.name === language.name);
    if (genus === undefined) return {genus:"No data"}
    return genus
  }

  return (
    <div key={pokemon.name} className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{getNameOfLanguage().name}</h3>
      <p>{getGenusOfLanguage().genus}</p>
    </div>
  );
};

export default PokemonCard;
