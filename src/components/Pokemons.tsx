import { useEffect, useState } from "react";
import type { NameAndUrl, Pokemon } from "../utils/types";
import { getPokemons } from "../api/pokeApi";
import PokemonCard from "./PokemonCard";

const Pokemons = ({
  region,
  type,
}: {
  region: NameAndUrl;
  type: NameAndUrl;
}) => {
  const [isPending, setIsPending] = useState(false);

  const [pokemons, setPokemon] = useState<Pokemon[]>([]);

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
        <>Loading</>
      ) : (
        pokemons.map((pokemon) => <PokemonCard pokemon={pokemon}/>)
      )}
    </>
  );
};

export default Pokemons;
