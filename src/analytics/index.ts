import percentile from "percentile";

import type { DataService } from "../dataService";

export function getPortsWithMostCalls(dataService: DataService, limit: number) {
  return dataService
    .getPortsWithCallCount()
    .sort((a, b) => b.callCount - a.callCount)
    .slice(0, limit);
}

export function getPortsWithLeastCalls(
  dataService: DataService,
  limit: number
) {
  return dataService
    .getPortsWithCallCount()
    .sort((a, b) => a.callCount - b.callCount)
    .slice(0, limit);
}

export function getPortsWithDurationPercentiles(
  dataService: DataService,
  percentiles: number[]
) {
  const ports = dataService.getPortsWithCallDuration();

  return ports.map((port) => ({
    portId: port.portId,
    name: port.name,
    percentiles: percentile(percentiles, port.durations),
  }));
}
