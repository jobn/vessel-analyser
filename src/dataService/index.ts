import { fetchData } from "./fetchData";
import { normaliseData } from "./normaliseData";
import type { Port, PortCall, Vessel } from "./types";
import { type ValidatedRawData, validateRawData } from "./validateRawData";

export class DataService {
  private vesselImos: Vessel["imo"][] = [];
  private vessels: Record<Vessel["imo"], Vessel> = {};

  private portIds: Port["id"][] = [];
  private ports: Record<Port["id"], Port> = {};

  private portCalls: Record<Port["id"], PortCall[]> = {};

  getPorts() {
    return this.portIds.map((id) => this.ports[id]);
  }

  async setup(mockData: ValidatedRawData | undefined = undefined) {
    const rawData = mockData ?? (await fetchData());

    const validatedData = validateRawData(rawData);

    const { vessels, vesselsImos, ports, portIds, portCalls } =
      normaliseData(validatedData);

    this.vessels = vessels;
    this.vesselImos = vesselsImos;
    this.ports = ports;
    this.portIds = portIds;
    this.portCalls = portCalls;
  }
}
