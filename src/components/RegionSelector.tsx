import { useEffect, useState } from "react";
import type { NameAndUrl } from "../utils/types";
import { getRegions } from "../api/pokeApi";
import "./RegionSelector.css";

const REGION_END_POINT = "https://pokeapi.co/api/v2/region/";

const RegionSelector = ({
  setRegion,
}: {
  setRegion: (obj: NameAndUrl) => void;
}) => {
  const [regions, setRegions] = useState<NameAndUrl[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      const { results } = await getRegions(REGION_END_POINT);
      setRegions(results);
    };

    fetchRegions();
  }, []);

  const toggleRegion = (v: string) => {
    const newRegion = regions.find((region) => region.name === v);
    if (newRegion === undefined) return;
    setRegion(newRegion);
  };

  return (
    <select
      className="region-selector"
      onChange={(e) => toggleRegion(e.target.value)}
    >
      <option hidden>地方を選択してください</option>
      {regions.map((region) => (
        <option key={region.name} value={region.name}>
          {region.name}
        </option>
      ))}
    </select>
  );
};

export default RegionSelector;
