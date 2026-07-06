import { useEffect, useState } from "react";
import { isLanguage, translations } from "../i18n/i18n";
import type { Language } from "../i18n/i18n";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return isLanguage(savedLanguage) ? savedLanguage : "pl";
  });

  useEffect(() => {
    const validatedLanguage = isLanguage(language) ? language : "pl";

    document.documentElement.lang = validatedLanguage;
    localStorage.setItem("language", validatedLanguage);
  }, [language]);

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === "pl" ? "en" : "pl"));
  }

  return {
    language,
    t: translations[language],
    toggleLanguage
  };
}
