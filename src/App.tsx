import { useState } from "react";
import "./App.css";
import RegionSelector from "./components/RegionSelector";
import TypeSelector from "./components/TypeSelector";
import type { NameAndUrl } from "./utils/types";
import Pokemons from "./components/Pokemons";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const [selectedRegion, setSelectedRegion] = useState<NameAndUrl>();
  const [selectedType, setSelectedType] = useState<NameAndUrl>();
  const [selectedLanguage, setSelectedLanguage] = useState<NameAndUrl>();

  return (
    <>
      <header>
        <div className="selectors">
          <RegionSelector setRegion={setSelectedRegion} />
          <TypeSelector setType={setSelectedType} />
        </div>
        <h1>ポケモン図鑑</h1>
        <LanguageSelector setLanguage={setSelectedLanguage} />
      </header>
      <main>
        {selectedRegion === undefined || selectedType === undefined ? (
          <h2 className="pausing">世代とタイプを選択してください</h2>
        ) : (
          <Pokemons
            region={selectedRegion}
            type={selectedType}
            language={selectedLanguage}
          />
        )}
      </main>
    </>
  );
}

export default App;
