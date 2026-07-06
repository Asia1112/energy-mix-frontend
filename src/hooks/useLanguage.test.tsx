import { act, renderHook } from "@testing-library/react";
import { translations } from "../i18n/i18n";
import { useLanguage } from "./useLanguage";

describe("useLanguage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "";
  });

  it("uses Polish by default and persists document language", () => {
    const { result } = renderHook(() => useLanguage());

    expect(result.current.language).toBe("pl");
    expect(result.current.t).toBe(translations.pl);
    expect(localStorage.getItem("language")).toBe("pl");
    expect(document.documentElement.lang).toBe("pl");
  });

  it("reads a saved language", () => {
    localStorage.setItem("language", "en");

    const { result } = renderHook(() => useLanguage());

    expect(result.current.language).toBe("en");
    expect(result.current.t).toBe(translations.en);
  });

  it("falls back to Polish for unsupported saved language", () => {
    localStorage.setItem("language", "de");

    const { result } = renderHook(() => useLanguage());

    expect(result.current.language).toBe("pl");
  });

  it("toggles language and updates localStorage and document lang", () => {
    const { result } = renderHook(() => useLanguage());

    act(() => {
      result.current.toggleLanguage();
    });

    expect(result.current.language).toBe("en");
    expect(localStorage.getItem("language")).toBe("en");
    expect(document.documentElement.lang).toBe("en");

    act(() => {
      result.current.toggleLanguage();
    });

    expect(result.current.language).toBe("pl");
    expect(localStorage.getItem("language")).toBe("pl");
    expect(document.documentElement.lang).toBe("pl");
  });
});
