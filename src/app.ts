import util from "node:util";
import { getPortsWithLeastCalls, getPortsWithMostCalls } from "./analytics";
import { DataService } from "./dataService";

function log(data: unknown) {
  console.log(util.inspect(data, false, null, true));
}

const process = async () => {
  const dataService = new DataService();
  await dataService.setup();

  log("5 ports with most calls");
  log(getPortsWithMostCalls(dataService, 5));

  log("5 ports with least calls");
  log(getPortsWithLeastCalls(dataService, 5));
};

process();
