import { isLanguage } from "./i18n";

describe("isLanguage", () => {
  it("accepts supported language names", () => {
    expect(isLanguage("pl")).toBe(true);
    expect(isLanguage("en")).toBe(true);
  });

  it("rejects unsupported or missing language names", () => {
    expect(isLanguage("de")).toBe(false);
    expect(isLanguage("")).toBe(false);
    expect(isLanguage(null)).toBe(false);
  });
});
