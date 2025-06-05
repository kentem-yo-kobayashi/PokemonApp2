import { useEffect, useState } from "react";
import type { NameAndUrl, Pokemon, Species } from "../utils/types";
import { getPokemons } from "../api/pokeApi";
import PokemonCard from "./PokemonCard";
import "./Pokemons.css";

const Pokemons = ({
  region,
  type,
  language,
}: {
  region: NameAndUrl;
  type: NameAndUrl;
  language: NameAndUrl | undefined;
}) => {
  const [isPending, setIsPending] = useState(false);

  const [pokemons, setPokemon] = useState<(Pokemon & Species)[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (region === undefined || type === undefined) return;
      setIsPending(true);
      const res = await getPokemons(region.url, type.name);
      setPokemon(res);
      setIsPending(false);
    };

    fetchPokemons();
  }, [region, type]);

  return (
    <>
      {isPending ? (
        <h2 className="pausing">Loading</h2>
      ) : (
        <div className="encyclopedia">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              language={language}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Pokemons;
