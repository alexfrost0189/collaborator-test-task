import React, { useEffect } from "react";
import "./App.scss";
import { Filters, FlightsList, Logo, SortingTabs } from "./components";
import { useAppDispatch } from "./store/hooks";
import { fetchFlights } from "./store/slices/flightsSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  return (
    <div className="app">
      <Logo />
      <div className="container">
        <Filters />
        <div className="main">
          <SortingTabs />
          <FlightsList />
        </div>
      </div>
    </div>
  );
}

export default App;
