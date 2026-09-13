import reducer, { setSortBy, showMore, toggleAllStops, toggleStop } from "./filtersSlice";
import { FiltersValue, SortingValue } from "../../enums";
import { LOAD_MORE_LIMIT } from "../../constants";

describe("filtersSlice", () => {
  it("toggles a single stop and resets the limit", () => {
    const expanded = reducer(undefined, showMore());

    const selected = reducer(expanded, toggleStop(FiltersValue.STOP_1));
    expect(selected.stops).toEqual([FiltersValue.STOP_1]);
    expect(selected.limit).toBe(LOAD_MORE_LIMIT);

    const unselected = reducer(selected, toggleStop(FiltersValue.STOP_1));
    expect(unselected.stops).toEqual([]);
  });

  it("selects and deselects all stops", () => {
    const all = reducer(undefined, toggleAllStops());
    expect(all.stops).toEqual(Object.values(FiltersValue));

    const none = reducer(all, toggleAllStops());
    expect(none.stops).toEqual([]);
  });

  it("changes sorting and resets the limit", () => {
    const state = reducer(reducer(undefined, showMore()), setSortBy(SortingValue.FAST));

    expect(state.sortBy).toBe(SortingValue.FAST);
    expect(state.limit).toBe(LOAD_MORE_LIMIT);
  });

  it("increases the limit on showMore", () => {
    const state = reducer(undefined, showMore());

    expect(state.limit).toBe(LOAD_MORE_LIMIT * 2);
  });
});
