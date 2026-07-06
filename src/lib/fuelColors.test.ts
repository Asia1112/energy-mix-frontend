import { getFuelColor } from "./fuelColors";

describe("getFuelColor", () => {
  it("returns the mapped color for known fuels", () => {
    expect(getFuelColor("wind")).toBe("#546E7A");
  });

  it("returns the fallback color for unknown fuels", () => {
    expect(getFuelColor("unknown")).toBe("#8b95a7");
  });
});
