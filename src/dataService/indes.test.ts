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
        {
          arrival: new Date("2024-02-01"),
          departure: new Date("2024-02-03"),
          isOmitted: false,
          port: { id: "B", name: "Port B" },
        },
      ],
    },
    {
      vessel: { imo: 2, name: "Vessel 2" },
      portCalls: [
        {
          arrival: new Date("2024-01-01"),
          departure: new Date("2024-01-04"),
          isOmitted: false,
          port: { id: "B", name: "Port B" },
        },
        {
          arrival: new Date("2024-02-01"),
          departure: new Date("2024-02-05"),
          isOmitted: false,
          port: { id: "C", name: "Port C" },
        },
      ],
    },
  ];

  describe("getPorts", () => {
    it("should setup and return ports", async () => {
      const dataService = new DataService();
      await dataService.setup(testData);

      const ports = dataService.getPorts();

      expect(ports).toEqual([
        { id: "A", name: "Port A" },
        { id: "B", name: "Port B" },
        { id: "C", name: "Port C" },
      ]);
    });
  });

  describe("getPortsWithCallCount", () => {
    it("should return ports with calls", async () => {
      const dataService = new DataService();
      await dataService.setup(testData);

      const portsWithCalls = dataService.getPortsWithCallCount();

      expect(portsWithCalls).toEqual([
        { portId: "A", name: "Port A", callCount: 1 },
        { portId: "B", name: "Port B", callCount: 2 },
        { portId: "C", name: "Port C", callCount: 1 },
      ]);
    });
  });

  describe("getPortsWithCallDuration", () => {
    it("should return ports with calls", async () => {
      const dataService = new DataService();
      await dataService.setup(testData);

      const portsWithCalls = dataService.getPortsWithCallDuration();

      expect(portsWithCalls).toEqual([
        { portId: "A", name: "Port A", durations: [86400000] },
        { portId: "B", name: "Port B", durations: [172800000, 259200000] },
        { portId: "C", name: "Port C", durations: [345600000] },
      ]);
    });
  });
});
