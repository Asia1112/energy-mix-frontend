import { act, renderHook, waitFor } from "@testing-library/react";
import { getEnergyMix } from "../api/energyApi";
import type { DailyEnergyMix } from "../api/energyApi";
import { useEnergyMix } from "./useEnergyMix";

vi.mock("../api/energyApi", () => ({
  getEnergyMix: vi.fn()
}));

const mockedGetEnergyMix = vi.mocked(getEnergyMix);

describe("useEnergyMix", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts in a loading state", () => {
    mockedGetEnergyMix.mockReturnValueOnce(new Promise(() => undefined));

    const { result } = renderHook(() => useEnergyMix());

    expect(result.current.loading).toBe(true);
    expect(result.current.energyMix).toEqual([]);
    expect(result.current.error).toBe(false);
  });

  it("populates data after a successful request", async () => {
    const energyMix: DailyEnergyMix[] = [
      {
        date: "2026-07-03",
        mix: { wind: 40, gas: 60 },
        cleanEnergyPercentage: 40
      }
    ];

    mockedGetEnergyMix.mockResolvedValueOnce(energyMix);

    const { result } = renderHook(() => useEnergyMix());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.energyMix).toEqual(energyMix);
    expect(result.current.error).toBe(false);
  });

  it("sets error when loading fails", async () => {
    mockedGetEnergyMix.mockRejectedValueOnce(new Error("network"));

    const { result } = renderHook(() => useEnergyMix());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
  });

  it("retry refetches data and clears the error", async () => {
    const energyMix: DailyEnergyMix[] = [
      {
        date: "2026-07-04",
        mix: { solar: 20, gas: 80 },
        cleanEnergyPercentage: 20
      }
    ];

    mockedGetEnergyMix
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValueOnce(energyMix);

    const { result } = renderHook(() => useEnergyMix());

    await waitFor(() => {
      expect(result.current.error).toBe(true);
    });

    await act(async () => {
      await result.current.retry();
    });

    expect(result.current.energyMix).toEqual(energyMix);
    expect(result.current.error).toBe(false);
    expect(mockedGetEnergyMix).toHaveBeenCalledTimes(2);
  });
});
