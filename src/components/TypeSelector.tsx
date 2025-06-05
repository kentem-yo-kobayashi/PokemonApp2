import { useEffect, useState } from "react";
import { getTypes } from "../api/pokeApi";
import type { NameAndUrl } from "../utils/types";
import "./TypeSelector.css"

const TYPE_END_POINT = "https://pokeapi.co/api/v2/type/"

const TypeSelector = ({setType}:{setType: (obj:NameAndUrl) => void}) => {

  const [types, setTypes] = useState<NameAndUrl[]>([])

  useEffect(() => {
    const fetchRegions = async () => {
      const { results }= await getTypes(TYPE_END_POINT);
      setTypes(results)
    };

    fetchRegions()
  }, []);

    const toggleType = (v:string) => {
    const newType = types.find(type => type.name === v)
    if (newType === undefined) return 
    console.log(newType)
    setType(newType)
  }

  return (
    <select className="type-selector" onChange={e => toggleType(e.target.value)}>
      <option hidden>タイプを選択してください</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name}
        </option>
      ))}
    </select>
  );
}

export default TypeSelector
