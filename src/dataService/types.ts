export type Vessel = {
  imo: number;
  name: string;
};

export type Port = {
  id: string;
  name: string;
};

export type PortCall = {
  vesselImo: number;
  portId: string;
  isOmitted: boolean;
  arrival: Date;
  departure: Date;
  duration: number;
};
