import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FiltersValue, SortingValue } from "../../enums";
import { LOAD_MORE_LIMIT } from "../../constants";

interface FiltersState {
  stops: FiltersValue[];
  sortBy: SortingValue;
  limit: number;
}

const initialState: FiltersState = {
  stops: [],
  sortBy: SortingValue.CHEAP,
  limit: LOAD_MORE_LIMIT,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleStop: (state, action: PayloadAction<FiltersValue>) => {
      const value = action.payload;

      state.stops = state.stops.includes(value)
        ? state.stops.filter((s) => s !== value)
        : [...state.stops, value];
      state.limit = LOAD_MORE_LIMIT;
    },
    toggleAllStops: (state) => {
      state.stops =
        state.stops.length === Object.values(FiltersValue).length
          ? []
          : Object.values(FiltersValue);
      state.limit = LOAD_MORE_LIMIT;
    },
    setSortBy: (state, action: PayloadAction<SortingValue>) => {
      state.sortBy = action.payload;
      state.limit = LOAD_MORE_LIMIT;
    },
    showMore: (state) => {
      state.limit += LOAD_MORE_LIMIT;
    },
  },
});

export const { toggleStop, setSortBy, showMore, toggleAllStops } = filtersSlice.actions;
export default filtersSlice.reducer;
