const VESSELS_URL =
  "https://import-coding-challenge-api.portchain.com/api/v2/vessels";
const PORT_CALLS_URL =
  "https://import-coding-challenge-api.portchain.com/api/v2/schedule";

export async function fetchData() {
  try {
    const response = await fetch(VESSELS_URL);
    const vessels = await response.json();

    const portCallData = await Promise.all(
      vessels.map(async (vessel: { imo: number }) => {
        const response = await fetch(`${PORT_CALLS_URL}/${vessel.imo}`);
        const data = await response.json();

        return data;
      })
    );

    return portCallData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    throw new Error("Failed to fetch data");
  }
}
