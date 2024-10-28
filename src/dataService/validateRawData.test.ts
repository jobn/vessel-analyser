import { describe, expect, it } from "vitest";
import { validateRawData } from "./validateRawData";

describe("validateRawData", () => {
  it("should pass through valid data", () => {
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

    const data = validateRawData(testData);

    expect(data).toEqual(testData);
  });

  it("should throw an error if the data is invalid", () => {
    const testData = [{ vessel: [], portCalls: {} }];

    expect(() => validateRawData(testData)).toThrow();
  });
});
