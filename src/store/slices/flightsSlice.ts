import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { Flight } from "../../types";

export type Status = "idle" | "loading" | "succeeded" | "failed";

interface FlightsState {
  items: Flight[];
  status: Status;
  error: string | null;
}

const initialState: FlightsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    const res = await fetch(`${process.env.PUBLIC_URL}/data/data.json`);
    if (!res.ok) throw new Error("Не вдалося завантажити рейси");
    const data: { flights: Flight[] } = await res.json();
    return data.flights;
  },
  {
    condition: (_, { getState }) => {
      const { status } = (getState() as RootState).flights;
      return status === "idle" || status === "failed";
    },
  },
);

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Невідома помилка";
        state.items = [];
      });
  },
});

export default flightsSlice.reducer;
