import type { Translations } from "../i18n";
import type { Theme } from "../theme";

interface Props {
  t: Translations;
  theme: Theme;
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
}

export function AppHeader({
  t,
  theme,
  onLanguageToggle,
  onThemeToggle
}: Props) {
  return (
    <div className="app-header">
      <h1>Energy Mix UK</h1>

      <div className="app-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={onThemeToggle}
          aria-label={`${t.themeToggleLabel} ${
            theme === "dark" ? t.themeLight : t.themeDark
          }`}
        >
          {theme === "dark" ? t.themeLightButton : t.themeDarkButton}
        </button>

        <button
          className="language-toggle"
          type="button"
          onClick={onLanguageToggle}
          aria-label={t.languageToggleLabel}
        >
          {t.languageToggleText}
        </button>
      </div>
    </div>
  );
}
