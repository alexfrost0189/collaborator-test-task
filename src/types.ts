import { FiltersValue, SortingValue } from "./enums";

export type FilterItem = {
  label: string;
  value: FiltersValue;
};

export type SortItem = {
  label: string;
  value: SortingValue;
};

export interface Price {
  amount: number;
  currency: string;
}

export interface Airline {
  name: string;
  logo: string;
}

export interface FlightLeg {
  from: string;
  to: string;
  departureTimestamp: string;
  arrivalTimestamp: string;
  stopCities: string[];
}

export interface Flight {
  id: number;
  price: Price;
  airline: Airline;
  outbound: FlightLeg;
  inbound: FlightLeg;
}
