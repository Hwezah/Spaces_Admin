import { getBookings } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
export function useBookings() {
  const [searchParams] = useSearchParams();
  // Serverside Filtering
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // Serverside Sorting
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  // useQuery is a hook provided by reactQuery to fetch data from an api
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy], // here reactQuery will use this key to identify the query(slot in memory where data is cached)
    queryFn: () => getBookings({ filter, sortBy }), // This is the actual api call to fetch the data
  });
  return {
    bookings,
    isLoading,
    error,
  };
}
