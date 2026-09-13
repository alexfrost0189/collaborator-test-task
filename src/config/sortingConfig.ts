import { SortItem } from "../types";
import { SortingValue } from "../enums";

export const sortingConfig: SortItem[] = [
  {
    label: "Найдешевший",
    value: SortingValue.CHEAP,
  },
  {
    label: "Найшвидший",
    value: SortingValue.FAST,
  },
  {
    label: "Оптимальний",
    value: SortingValue.OPTIMAL,
  },
];
