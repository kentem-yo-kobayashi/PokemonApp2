import { useEffect, useState } from "react";
import type { NameAndUrl } from "../utils/types";
import { getPokemons } from "../api/pokeApi";

const Pokemons = ({
  region,
  type,
}: {
  region: NameAndUrl;
  type: NameAndUrl;
}) => {
  const [isPending, setIsPending] = useState(false);

  const [pokemons, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (region === undefined || type === undefined) return;
      setIsPending(true);
      const res = await getPokemons(region.url, type.name);
      setPokemon(res);
      setIsPending(false);
    };

    fetchPokemons();
  }, []);

  return (
    <>
      {isPending ? (
        <>Loading</>
      ) : (
        pokemons.map((pokemon) => <>{pokemon.name}</>)
      )}
    </>
  );
};

export default Pokemons;
