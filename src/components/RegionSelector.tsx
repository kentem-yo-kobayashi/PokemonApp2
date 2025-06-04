import { useEffect, useState } from "react";
import type { NameAndUrl } from "../utils/types";
import { getRegions } from "../api/pokeApi";

const REGION_END_POINT = "https://pokeapi.co/api/v2/region/";

const RegionSelector = () => {

  const [regions, setRegions] = useState<NameAndUrl[]>([])

  useEffect(() => {
    const fetchRegions = async () => {
      const { results }= await getRegions(REGION_END_POINT);
      setRegions(results)
    };

    fetchRegions()
  }, []);

  return (
    <select>
      <option hidden>選択してください</option>
      {regions.map((region) => (
        <option key={region.name} value={region.name}>
          {region.name}
        </option>
      ))}
    </select>
  );
};

export default RegionSelector;
