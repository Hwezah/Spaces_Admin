import { getSpaces } from "../../services/apiSpaces";
import { useQuery } from "@tanstack/react-query";
export function useSpaces() {
  // useQuery is a hook provided by reactQuery to fetch data from an api
  const {
    data: spaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["spaces"], // here reactQuery will use this key to identify the query(slot in memory where data is cached)
    queryFn: getSpaces, // This is the actual api call to fetch the data
  });
  return {
    spaces,
    isLoading,
    error,
  };
}
