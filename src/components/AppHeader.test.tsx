import { fireEvent, render, screen } from "@testing-library/react";
import { translations } from "../i18n/i18n";
import { AppHeader } from "./AppHeader";

describe("AppHeader", () => {
  it("renders theme and language controls with labels", () => {
    render(
      <AppHeader
        t={translations.en}
        theme="light"
        onLanguageToggle={vi.fn()}
        onThemeToggle={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: "Turn on dark mode" })
    ).toHaveTextContent("Dark mode");
    expect(
      screen.getByRole("button", { name: translations.en.languageToggleLabel })
    ).toHaveTextContent(translations.en.languageToggleText);
  });

  it("fires toggle callbacks on click", () => {
    const onLanguageToggle = vi.fn();
    const onThemeToggle = vi.fn();

    render(
      <AppHeader
        t={translations.en}
        theme="dark"
        onLanguageToggle={onLanguageToggle}
        onThemeToggle={onThemeToggle}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Turn on light mode" }));
    fireEvent.click(
      screen.getByRole("button", { name: translations.en.languageToggleLabel })
    );

    expect(onThemeToggle).toHaveBeenCalled();
    expect(onLanguageToggle).toHaveBeenCalled();
  });
});
