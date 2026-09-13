import type { RootState } from "./index";
import { selectPagedFlights, selectTotalFlightsLength, selectVisibleFlights } from "./selectors";
import { FiltersValue, SortingValue } from "../enums";
import { Flight, FlightLeg } from "../types";

const DEPARTURE = Date.parse("2026-09-15T00:00:00Z");

const makeLeg = (durationMin: number, stops: number): FlightLeg => ({
  from: "LHR",
  to: "DXB",
  departureTimestamp: new Date(DEPARTURE).toISOString(),
  arrivalTimestamp: new Date(DEPARTURE + durationMin * 60000).toISOString(),
  stopCities: Array.from({ length: stops }, (_, i) => `C${i}`),
});

const makeFlight = (id: number, price: number, durationMin: number, stops: number): Flight => ({
  id,
  price: { amount: price, currency: "USD" },
  airline: { name: "Airline", logo: "" },
  outbound: makeLeg(durationMin, stops),
  inbound: makeLeg(durationMin, stops),
});

const makeState = (items: Flight[], filters: Partial<RootState["filters"]> = {}): RootState => ({
  flights: { items, status: "succeeded", error: null },
  filters: { stops: [], sortBy: SortingValue.CHEAP, limit: 5, ...filters },
});

const ids = (flights: Flight[]) => flights.map((flight) => flight.id);

const FLIGHTS = [
  makeFlight(1, 300, 120, 2),
  makeFlight(2, 100, 300, 0),
  makeFlight(3, 200, 60, 1),
  makeFlight(4, 400, 120, 0),
];

describe("selectVisibleFlights", () => {
  it("returns all flights when no stops filter is selected", () => {
    expect(selectVisibleFlights(makeState(FLIGHTS))).toHaveLength(FLIGHTS.length);
  });

  it("keeps only flights matching selected stops", () => {
    const state = makeState(FLIGHTS, { stops: [FiltersValue.NO_STOPS, FiltersValue.STOP_2] });

    expect(ids(selectVisibleFlights(state))).toEqual([2, 1, 4]);
  });

  it("sorts by price for CHEAP", () => {
    const state = makeState(FLIGHTS, { sortBy: SortingValue.CHEAP });

    expect(ids(selectVisibleFlights(state))).toEqual([2, 3, 1, 4]);
  });

  it("sorts by total duration for FAST", () => {
    const state = makeState(FLIGHTS, { sortBy: SortingValue.FAST });

    expect(ids(selectVisibleFlights(state))[0]).toBe(3);
    expect(ids(selectVisibleFlights(state))[3]).toBe(2);
  });

  it("prefers fewer stops on equal duration for OPTIMAL", () => {
    const state = makeState(FLIGHTS, { sortBy: SortingValue.OPTIMAL });

    expect(ids(selectVisibleFlights(state))).toEqual([3, 4, 1, 2]);
  });
});

describe("selectPagedFlights", () => {
  it("limits the list to the current page size", () => {
    expect(selectPagedFlights(makeState(FLIGHTS, { limit: 2 }))).toHaveLength(2);
  });
});

describe("selectTotalFlightsLength", () => {
  it("returns the number of filtered flights", () => {
    const state = makeState(FLIGHTS, { stops: [FiltersValue.STOP_1] });

    expect(selectTotalFlightsLength(state)).toBe(1);
  });
});
