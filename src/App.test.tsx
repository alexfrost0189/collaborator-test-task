import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import flightsReducer from "./store/slices/flightsSlice";
import filtersReducer from "./store/slices/filtersSlice";
import { Flight } from "./types";

const ACTIVE_CLASS = "tabs__item--active";
const AIRLINE = "Test Airline";

const makeFlight = (id: number): Flight => ({
  id,
  price: { amount: 10000 + id, currency: "USD" },
  airline: { name: AIRLINE, logo: "/images/test.png" },
  outbound: {
    from: "LHR",
    to: "DXB",
    departureTimestamp: "2026-09-15T10:00:00Z",
    arrivalTimestamp: "2026-09-15T15:00:00Z",
    stopCities: [],
  },
  inbound: {
    from: "DXB",
    to: "LHR",
    departureTimestamp: "2026-09-22T10:00:00Z",
    arrivalTimestamp: "2026-09-22T15:00:00Z",
    stopCities: [],
  },
});

const FLIGHTS = Array.from({ length: 7 }, (_, i) => makeFlight(i + 1));

const renderApp = async () => {
  const store = configureStore({
    reducer: { flights: flightsReducer, filters: filtersReducer },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  await screen.findAllByRole("img", { name: AIRLINE });
};

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ flights: FLIGHTS }),
    }) as unknown as typeof fetch;
  });

  it("renders the page skeleton", async () => {
    await renderApp();

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
    expect(screen.getByText("КІЛЬКІСТЬ ПЕРЕСАДОК")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("starts with no filter selected", async () => {
    await renderApp();

    screen.getAllByRole("checkbox").forEach((item) => {
      expect(item).not.toBeChecked();
    });
  });

  it("starts with exactly one active tab", async () => {
    await renderApp();

    const active = screen
      .getAllByRole("button")
      .filter((item) => item.classList.contains(ACTIVE_CLASS));

    expect(active).toHaveLength(1);
  });

  it("renders the first page of flights and loads more", async () => {
    await renderApp();

    expect(screen.getAllByRole("img", { name: AIRLINE })).toHaveLength(5);

    userEvent.click(screen.getByRole("button", { name: "Показати ще 2 квитки" }));

    expect(screen.getAllByRole("img", { name: AIRLINE })).toHaveLength(7);
    expect(screen.queryByRole("button", { name: /Показати ще/ })).not.toBeInTheDocument();
  });
});
