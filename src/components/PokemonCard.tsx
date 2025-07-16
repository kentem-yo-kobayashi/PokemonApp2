import type { NameAndUrl, Pokemon, Species } from "../utils/types";
import "./PokemonCard.css";

const PokemonCard = ({
  pokemon,
  language,
}: {
  pokemon: Pokemon & Species;
  language: NameAndUrl | undefined;
}) => {
  const nameOfLanguage = (() => {
    if (!language) return "No data";
    const name = pokemon.names.find(
      (_name) => _name.language.name === language.name
    );
    if (name === undefined) return "No data" ;
    return name.name;
  })();

  const genusOfLanguage = (() => {
    if (!language) return "No data";
    const genus = pokemon.genera.find(
      (_genus) => _genus.language.name === language.name
    );
    if (genus === undefined) return "No data";
    return genus.genus;
  })();

  return (
    <div key={pokemon.name} className="pokemon-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        loading="lazy"
      />
      <h3>{nameOfLanguage}</h3>
      <p>{genusOfLanguage}</p>
    </div>
  );
};

export default PokemonCard;
