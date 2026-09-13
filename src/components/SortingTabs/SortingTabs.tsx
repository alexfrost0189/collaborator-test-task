import { Tabs } from "../index";
import { sortingConfig } from "../../config";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SortingValue } from "../../enums";
import { setSortBy } from "../../store/slices/filtersSlice";

export default function SortingTabs() {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.filters.sortBy);

  const handleChangeSorting = (value: string) => {
    if (!Object.values(SortingValue).includes(value as SortingValue)) return false;

    dispatch(setSortBy(value as SortingValue));
  };

  return <Tabs config={sortingConfig} value={sortBy} onChange={handleChangeSorting} />;
}
