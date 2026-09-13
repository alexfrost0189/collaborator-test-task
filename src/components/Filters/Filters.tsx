import clsx from "clsx";
import React, { useState } from "react";
import { Checkboxes } from "../index";
import { filtersConfig } from "../../config";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FiltersValue } from "../../enums";
import { toggleAllStops, toggleStop } from "../../store/slices/filtersSlice";
import "./Filters.scss";

export default function Filters() {
  const dispatch = useAppDispatch();
  const stops = useAppSelector((state) => state.filters.stops);

  const [expanded, setExpanded] = useState(false);

  const stopsState =
    stops.length === Object.values(FiltersValue).length ? [...stops, "all"] : stops;

  const handleChangeFilters = (value: string) => {
    if (value === "all") {
      dispatch(toggleAllStops());
      return;
    }
    if (!Object.values(FiltersValue).includes(value as FiltersValue)) {
      return;
    }

    dispatch(toggleStop(value as FiltersValue));
  };

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="filters">
      <button
        type="button"
        onClick={handleToggleExpand}
        aria-expanded={expanded}
        className={clsx("filters__header", { "filters__header--expanded": expanded })}
      >
        Фільтри
      </button>
      <div className={clsx("filters__main", { "filters__main--expanded": expanded })}>
        <Checkboxes
          title="КІЛЬКІСТЬ ПЕРЕСАДОК"
          config={[{ label: "Всі", value: "all" }, ...filtersConfig]}
          value={stopsState}
          onChange={handleChangeFilters}
        />
      </div>
    </div>
  );
}
