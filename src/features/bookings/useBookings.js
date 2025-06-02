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
  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // useQuery is a hook provided by reactQuery to fetch data from an api
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // here reactQuery will use this key to identify the query(slot in memory where data is cached)
    queryFn: () => getBookings({ filter, sortBy, page }), // This is the actual api call to fetch the data
  });
  return {
    bookings,
    isLoading,
    error,
    count,
  };
}
