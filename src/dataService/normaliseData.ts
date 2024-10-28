import type { Port, PortCall, Vessel } from "./types";
import type { ValidatedRawData } from "./validateRawData";

export type NormalisedData = {
  vessels: Record<Vessel["imo"], Vessel>;
  vesselsImos: Vessel["imo"][];
  ports: Record<Port["id"], Port>;
  portIds: Port["id"][];
  portCalls: Record<Port["id"], PortCall[]>;
};

export function normaliseData(rawData: ValidatedRawData): NormalisedData {
  const vessels: Record<Vessel["imo"], Vessel> = {};
  const vesselsImos: Vessel["imo"][] = [];

  const ports: Record<Port["id"], Port> = {};
  const portIds: Port["id"][] = [];

  const portCalls: Record<Port["id"], PortCall[]> = {};

  for (const entry of rawData) {
    const vessel = entry.vessel;

    vessels[vessel.imo] = vessel;
    vesselsImos.push(vessel.imo);

    for (const pc of entry.portCalls) {
      const port: Port = pc.port;

      ports[port.id] = port;

      if (!portIds.includes(port.id)) {
        portIds.push(port.id);
      }

      const arrival = new Date(pc.arrival);
      const departure = new Date(pc.departure);
      const duration = departure.getTime() - arrival.getTime();

      const portCall: PortCall = {
        vesselImo: vessel.imo,
        portId: pc.port.id,
        isOmitted: pc.isOmitted,
        arrival,
        departure,
        duration,
      };

      if (!portCalls[port.id]) {
        portCalls[port.id] = [];
      }

      portCalls[port.id].push(portCall);
    }
  }

  return {
    vessels,
    vesselsImos,
    ports,
    portIds,
    portCalls,
  };
}
