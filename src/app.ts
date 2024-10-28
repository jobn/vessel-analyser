import util from "node:util";
import { formatDistanceStrict } from "date-fns";
import {
  getPortsWithDurationPercentiles,
  getPortsWithLeastCalls,
  getPortsWithMostCalls,
} from "./analytics";
import { DataService } from "./dataService";

function log(data: unknown) {
  console.log(util.inspect(data, false, null, true));
}

function formatDuration(duration: number) {
  return formatDistanceStrict(0, duration, { unit: "hour" });
}

const process = async () => {
  const dataService = new DataService();
  await dataService.setup();

  log("5 ports with most calls");
  log(getPortsWithMostCalls(dataService, 5));

  log("5 ports with least calls");
  log(getPortsWithLeastCalls(dataService, 5));

  log("ports with duration percentiles");
  const portsWithDurationPercentiles = getPortsWithDurationPercentiles(
    dataService,
    [5, 20, 50, 75, 90]
  );

  const formatted = portsWithDurationPercentiles.map((p) => ({
    ...p,
    percentiles: Array.isArray(p.percentiles)
      ? p.percentiles.map((p) => formatDuration(p))
      : formatDuration(p.percentiles),
  }));

  log(formatted);
};

process();
