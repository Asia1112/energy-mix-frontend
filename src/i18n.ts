export type Language = "pl" | "en";

export interface Translations {
  themeToggleLabel: string;
  themeDark: string;
  themeLight: string;
  themeDarkButton: string;
  themeLightButton: string;
  languageToggleLabel: string;
  languageToggleText: string;
  dateLocale: string;
  dateHour12: boolean;
  legendLabel: string;
  appDescription: string;
  loading: string;
  energyMixError: string;
  emptyState: string;
  cleanEnergy: string;
  chargingTitle: string;
  chargingDescription: string;
  chargingTime: string;
  chargingHint: string;
  chargingSubmit: string;
  chargingLoading: string;
  chargingValidation: string;
  chargingError: string;
  resultStart: string;
  resultEnd: string;
  resultAverageCleanEnergy: string;
}

export const translations: Record<Language, Translations> = {
  pl: {
    themeToggleLabel: "Włącz tryb",
    themeDark: "ciemny",
    themeLight: "jasny",
    themeDarkButton: "Tryb ciemny",
    themeLightButton: "Tryb jasny",
    languageToggleLabel: "Zmień język na angielski",
    languageToggleText: "English",
    dateLocale: "pl-PL",
    dateHour12: false,
    legendLabel: "Legenda paliw",
    appDescription:
      "Aplikacja pokazuje miks energetyczny Wielkiej Brytanii oraz najlepszy czas ładowania auta elektrycznego pod względem udziału czystej energii.",
    loading: "Ładowanie danych...",
    energyMixError: "Nie udało się pobrać danych o miksie energetycznym.",
    emptyState: "Brak danych do wyświetlenia.",
    cleanEnergy: "Czysta energia",
    chargingTitle: "Najlepsze okno ładowania auta",
    chargingDescription:
      "Sprawdź, kiedy ładować auto przy najwyższym udziale czystej energii.",
    chargingTime: "Czas ładowania",
    chargingHint: "Od 1 do 6 godzin",
    chargingSubmit: "Oblicz",
    chargingLoading: "Obliczanie...",
    chargingValidation: "Wpisz czas ładowania od 1 do 6 godzin.",
    chargingError: "Nie udało się obliczyć najlepszego okna ładowania.",
    resultStart: "Start",
    resultEnd: "Koniec",
    resultAverageCleanEnergy: "Średni udział czystej energii"
  },
  en: {
    themeToggleLabel: "Turn on",
    themeDark: "dark mode",
    themeLight: "light mode",
    themeDarkButton: "Dark mode",
    themeLightButton: "Light mode",
    languageToggleLabel: "Change language to Polish",
    languageToggleText: "Polski",
    dateLocale: "en-GB",
    dateHour12: true,
    legendLabel: "Fuel legend",
    appDescription:
      "The app shows the United Kingdom energy mix and the best electric car charging time based on the share of clean energy.",
    loading: "Loading data...",
    energyMixError: "Could not load energy mix data.",
    emptyState: "No data to display.",
    cleanEnergy: "Clean energy",
    chargingTitle: "Best car charging window",
    chargingDescription:
      "Check when to charge your car with the highest share of clean energy.",
    chargingTime: "Charging time",
    chargingHint: "From 1 to 6 hours",
    chargingSubmit: "Calculate",
    chargingLoading: "Calculating...",
    chargingValidation: "Enter a charging time from 1 to 6 hours.",
    chargingError: "Could not calculate the best charging window.",
    resultStart: "Start",
    resultEnd: "End",
    resultAverageCleanEnergy: "Average clean energy share"
  }
};

export function isLanguage(value: string | null): value is Language {
  return value === "pl" || value === "en";
}
