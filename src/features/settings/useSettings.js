import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getSettings } from "../../services/apiSettings";
export default function useSettings() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["spaces"],
    queryFn: getSettings,
    // onSuccess is a callback function that will be called when the mutation is successful
    onSuccess: () => {
      // invalidateQueries is a function from react-query to invalidate the cached data of the query
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      // reset function is called from useForm hook to reset the form fields

      // toast is a function from react-toastify to show a success message
      //   toast.success("Settings updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoading, error, settings };
}
