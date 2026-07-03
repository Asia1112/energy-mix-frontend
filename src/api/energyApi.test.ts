import axios from "axios";
import { getChargingWindow, getEnergyMix } from "./energyApi";

vi.mock("axios", () => ({
  default: {
    get: vi.fn()
  }
}));

const mockedAxios = vi.mocked(axios);
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

describe("energyApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches the energy mix from the backend API", async () => {
    const data = [
      {
        date: "2026-07-03",
        mix: { wind: 50, gas: 50 },
        cleanEnergyPercentage: 50
      }
    ];

    mockedAxios.get.mockResolvedValueOnce({ data });

    await expect(getEnergyMix()).resolves.toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${apiUrl}/api/energy-mix`, {
      timeout: 10000
    });
  });

  it("passes charging hours as a query parameter", async () => {
    const data = {
      start: "2026-07-04T00:00:00Z",
      end: "2026-07-04T03:00:00Z",
      averageCleanEnergyPercentage: 82.5
    };

    mockedAxios.get.mockResolvedValueOnce({ data });

    await expect(getChargingWindow(3)).resolves.toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${apiUrl}/api/charging-window?hours=3`,
      {
        timeout: 10000
      }
    );
  });
});
