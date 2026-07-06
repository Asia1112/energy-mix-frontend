import { isTheme } from "./theme";

describe("isTheme", () => {
  it("accepts supported theme names", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
  });

  it("rejects unsupported or missing theme names", () => {
    expect(isTheme("blue")).toBe(false);
    expect(isTheme("")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});
