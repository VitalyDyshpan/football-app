import type { UUID } from "crypto";

export type City = {
  [key: string]: unknown;
  id: number;
  name: string;
  area_type: string | null;
  timezone: string;
  fias_id: UUID;
  latitude: string;
  longitude: string;
  region: Region | null;
};

export type Region = {
  name: string;
  type: string;
};
