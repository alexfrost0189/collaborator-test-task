import { FilterItem } from "../types";
import { FiltersValue } from "../enums";

export const filtersConfig: FilterItem[] = [
  {
    label: "Без пересадок",
    value: FiltersValue.NO_STOPS,
  },
  {
    label: "1 пересадка",
    value: FiltersValue.STOP_1,
  },
  {
    label: "2 пересадки",
    value: FiltersValue.STOP_2,
  },
  {
    label: "3 пересадки",
    value: FiltersValue.STOP_3,
  },
];
