import { useEffect, useState } from "react";
import type { NameAndUrl } from "../utils/types";
import { getLanguages } from "../api/pokeApi";
import "./LanguageSelector.css";

const LANGUAGE_END_POINT = "https://pokeapi.co/api/v2/language/";

const LanguageSelector = ({
  setLanguage,
}: {
  setLanguage: (obj: NameAndUrl) => void;
}) => {
  const [languages, setLanguages] = useState<NameAndUrl[]>([]);

  useEffect(() => {
    const fetchLanguage = async () => {
      const { results } = await getLanguages(LANGUAGE_END_POINT);
      setLanguages(results);
      setLanguage(results[0]);
    };
    fetchLanguage();
  }, []);

  const toggleLanguage = (v: string) => {
    const newLanguage = languages.find((language) => language.name === v);
    if (newLanguage === undefined) return;
    setLanguage(newLanguage);
  };

  return (
    <>
      <p>Language:</p>
      <select
        className="language-selector"
        onChange={(e) => toggleLanguage(e.target.value)}
      >
        {languages.map((language) => (
          <option key={language.name} value={language.name}>
            {language.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageSelector;
