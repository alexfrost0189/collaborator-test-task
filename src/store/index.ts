import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "./slices/flightsSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    flights: flightsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
