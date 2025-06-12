import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking"], // here reactQuery will use this key to identify the query(slot in memory where data is cached)
    queryFn: () => getBooking(bookingId), // This is the actual api call to fetch the data
    retry: false,
  });
  return {
    booking,
    isLoading,
    error,
  };
}
