import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPagedFlights, selectTotalFlightsLength } from "../../store/selectors";
import { showMore } from "../../store/slices/filtersSlice";
import { formatTickets } from "../../utils";
import { FlightCard } from "../index";
import { LOAD_MORE_LIMIT } from "../../constants";

export default function FlightsList() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectPagedFlights);
  const totalItemsLength = useAppSelector(selectTotalFlightsLength);
  const status = useAppSelector((state) => state.flights.status);
  const error = useAppSelector((state) => state.flights.error);

  const remainingCount = totalItemsLength - items.length;
  const buttonLabelCount = Math.min(remainingCount, LOAD_MORE_LIMIT);

  const handleLoadMore = () => {
    dispatch(showMore());
  };

  if (status === "loading") return <div>Завантаження...</div>;
  if (status === "failed") return <div>{error}</div>;
  if (status !== "succeeded") return null;
  if (items.length === 0) return <div>Квитків не знайдено</div>;

  return (
    <>
      {items.map((item) => (
        <FlightCard key={item.id} {...item} />
      ))}
      {remainingCount > 0 && (
        <button onClick={handleLoadMore} className="button">
          Показати ще {formatTickets(buttonLabelCount)}
        </button>
      )}
    </>
  );
}
