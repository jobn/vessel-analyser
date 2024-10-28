import util from "node:util";
import { DataService } from "./dataService";

const process = async () => {
  const dataService = new DataService();
  await dataService.setup();

  console.log("Ports");
  console.log(util.inspect(dataService.getPorts(), false, null, true));
};

process();
