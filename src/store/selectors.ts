import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { Flight, FlightLeg } from "../types";
import { getDurationMinutes } from "../utils";
import { FiltersValue, SortingValue } from "../enums";

const legDuration = (leg: FlightLeg) =>
  getDurationMinutes(leg.departureTimestamp, leg.arrivalTimestamp);

const totalDuration = (flight: Flight) =>
  legDuration(flight.outbound) + legDuration(flight.inbound);
const flightStops = (flight: Flight) =>
  Math.max(flight.outbound.stopCities.length, flight.inbound.stopCities.length);
const flightPrice = (flight: Flight) => flight.price.amount;

const selectItems = (state: RootState) => state.flights.items;
const selectStops = (state: RootState) => state.filters.stops;
const selectSorting = (state: RootState) => state.filters.sortBy;
const selectLimit = (state: RootState) => state.filters.limit;

const filtersMap: Record<FiltersValue, number> = {
  [FiltersValue.NO_STOPS]: 0,
  [FiltersValue.STOP_1]: 1,
  [FiltersValue.STOP_2]: 2,
  [FiltersValue.STOP_3]: 3,
};

const comparators: Record<SortingValue, (a: Flight, b: Flight) => number> = {
  [SortingValue.CHEAP]: (a, b) => flightPrice(a) - flightPrice(b),
  [SortingValue.FAST]: (a, b) => totalDuration(a) - totalDuration(b),
  [SortingValue.OPTIMAL]: (a, b) =>
    totalDuration(a) - totalDuration(b) ||
    flightStops(a) - flightStops(b) ||
    flightPrice(a) - flightPrice(b),
};

export const selectVisibleFlights = createSelector(
  [selectItems, selectStops, selectSorting],
  (items, stops, sortBy) => {
    const allowedStops = stops.map((stop) => filtersMap[stop]);
    const filtered = allowedStops.length
      ? items.filter((flight) => allowedStops.includes(flightStops(flight)))
      : items;

    return [...filtered].sort(comparators[sortBy]);
  },
);

export const selectPagedFlights = createSelector(
  [selectVisibleFlights, selectLimit],
  (flights, limit) => flights.slice(0, limit),
);

export const selectTotalFlightsLength = (state: RootState) => selectVisibleFlights(state).length;
