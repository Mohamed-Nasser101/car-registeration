import {Contact} from "./contact";

export interface KeyValuePair {
  id: number,
  name: string
}

export interface Vehicle {
  id: number,
  modelId: number,
  isRegistered: boolean,
  contact: Contact,
  features: number[]
}

export interface ServerVehicle {
  id: number,
  modelId: number,
  make: KeyValuePair,
  model: KeyValuePair,
  isRegistered: boolean,
  contact: Contact,
  lastUpdate: Date,
  features: KeyValuePair[]
}
