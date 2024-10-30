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
  arrival: Date;
  departure: Date;
  duration: number;
};
