import { describe, expect, it } from "vitest";
import { normaliseData } from "./normaliseData";

describe("normaliseData", () => {
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

  it("should return portIds", () => {
    const { portIds } = normaliseData(testData);

    expect(portIds).toEqual(["A", "B", "C"]);
  });

  it("should return ports", () => {
    const { ports } = normaliseData(testData);

    expect(ports).toEqual({
      A: { id: "A", name: "Port A" },
      B: { id: "B", name: "Port B" },
      C: { id: "C", name: "Port C" },
    });
  });

  it("should return vesselIds", () => {
    const { vesselsImos } = normaliseData(testData);

    expect(vesselsImos).toEqual([1, 2]);
  });

  it("should return vessels", () => {
    const { vessels } = normaliseData(testData);

    expect(vessels).toEqual({
      1: { imo: 1, name: "Vessel 1" },
      2: { imo: 2, name: "Vessel 2" },
    });
  });

  it("should return portCalls", () => {
    const { portCalls } = normaliseData(testData);

    expect(portCalls).toEqual({
      A: [
        {
          portId: "A",
          vesselImo: 1,
          arrival: new Date("2024-01-01"),
          departure: new Date("2024-01-02"),
          duration: 86400000,
        },
      ],
      B: [
        {
          portId: "B",
          vesselImo: 1,
          arrival: new Date("2024-02-01"),
          departure: new Date("2024-02-02"),
          duration: 86400000,
        },
        {
          portId: "B",
          vesselImo: 2,
          arrival: new Date("2024-01-01"),
          departure: new Date("2024-01-02"),
          duration: 86400000,
        },
      ],
      C: [
        {
          portId: "C",
          vesselImo: 2,
          arrival: new Date("2024-02-01"),
          departure: new Date("2024-02-02"),
          duration: 86400000,
        },
      ],
    });
  });

  it("should not include omitted port calls", () => {
    const testData = [
      {
        vessel: { imo: 1, name: "Vessel 1" },
        portCalls: [
          {
            arrival: new Date("2024-01-01"),
            departure: new Date("2024-01-02"),
            isOmitted: true,
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
    ];

    const { portCalls } = normaliseData(testData);

    expect(portCalls).toEqual({
      B: [
        {
          portId: "B",
          vesselImo: 1,
          arrival: new Date("2024-02-01"),
          departure: new Date("2024-02-02"),
          duration: 86400000,
        },
      ],
    });
  });
});
