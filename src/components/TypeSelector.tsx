import { useEffect, useState } from "react";
import { getTypes } from "../api/pokeApi";
import type { NameAndUrl } from "../utils/types";

const TYPE_END_POINT = "https://pokeapi.co/api/v2/type/"

const TypeSelector = () => {

  const [types, setTypes] = useState<NameAndUrl[]>([])

  useEffect(() => {
    const fetchRegions = async () => {
      const { results }= await getTypes(TYPE_END_POINT);
      setTypes(results)
    };

    fetchRegions()
  }, []);

  return (
    <select>
      <option hidden>選択してください</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name}
        </option>
      ))}
    </select>
  );
}

export default TypeSelector
