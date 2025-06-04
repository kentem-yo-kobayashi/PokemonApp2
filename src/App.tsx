import { useState } from "react";
import "./App.css";
import RegionSelector from "./components/RegionSelector";
import TypeSelector from "./components/TypeSelector";
import type { NameAndUrl } from "./utils/types";
import Pokemons from "./components/Pokemons";

function App() {
  const [selectedRegion, setSelectedRegion] = useState<NameAndUrl>();
  const [selectedType, setSelectedType] = useState<NameAndUrl>();

  return (
    <>
      <RegionSelector setRegion={setSelectedRegion} />
      <TypeSelector setType={setSelectedType} />
      {selectedRegion === undefined || selectedType === undefined ? (
        <>世代とタイプを選択してください</>
      ) : (
        <Pokemons region={selectedRegion} type={selectedType} />
      )}
    </>
  );
}

export default App;
