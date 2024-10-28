import { describe, expect, it } from "vitest";
import { DataService } from "./index";

describe("DataService", () => {
  const testData = [
    {
      vessel: { imo: 1, name: "Vessel 1" },
      portCalls: [
        {
          arrival: new Date("2024-01-01"),
          departure: new Date("2024-01-02"),
          isOmitted: false,
          port: { id: "A", name: "Port A" },
        },
      ],
    },
    {
      vessel: { imo: 2, name: "Vessel 2" },
      portCalls: [
        {
          arrival: new Date("2024-01-01"),
          departure: new Date("2024-01-02"),
          isOmitted: false,
          port: { id: "B", name: "Port B" },
        },
      ],
    },
  ];

  it("should setup and return ports", async () => {
    const dataService = new DataService();
    await dataService.setup(testData);

    const ports = dataService.getPorts();

    expect(ports).toEqual([
      { id: "A", name: "Port A" },
      { id: "B", name: "Port B" },
    ]);
  });
});
