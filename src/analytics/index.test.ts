import { describe, expect, it } from "vitest";
import { DataService } from "../dataService";
import { getPortsWithLeastCalls, getPortsWithMostCalls } from "./index";

describe("analytics", () => {
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
          departure: new Date("2024-02-02"),
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
          departure: new Date("2024-01-02"),
          isOmitted: false,
          port: { id: "B", name: "Port B" },
        },
        {
          arrival: new Date("2024-02-01"),
          departure: new Date("2024-02-02"),
          isOmitted: false,
          port: { id: "C", name: "Port C" },
        },
      ],
    },
  ];

  describe("getPortsWithMostCalls", () => {
    it("should return the ports with the most calls", () => {
      const dataService = new DataService();
      dataService.setup(testData);

      const ports = getPortsWithMostCalls(dataService, 2);

      expect(ports).toEqual([
        { portId: "B", name: "Port B", callCount: 2 },
        { portId: "A", name: "Port A", callCount: 1 },
      ]);
    });
  });

  describe("getPortsWithLeastCalls", () => {
    it("should return the ports with the most calls", () => {
      const dataService = new DataService();
      dataService.setup(testData);

      const ports = getPortsWithLeastCalls(dataService, 2);

      expect(ports).toEqual([
        { portId: "A", name: "Port A", callCount: 1 },
        { portId: "C", name: "Port C", callCount: 1 },
      ]);
    });
  });
});
