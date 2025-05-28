import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditSpace } from "../../services/apiSpaces";

export default function UseCreateSpace() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createSpace } = useMutation({
    // mutationFn: (newSpace) => createSpace(newSpace), same thing as bellow
    mutationFn: createEditSpace,
    // onSuccess is a callback function that will be called when the mutation is successful
    onSuccess: () => {
      // invalidateQueries is a function from react-query to invalidate the cached data of the query
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      // reset function is called from useForm hook to reset the form fields

      // toast is a function from react-toastify to show a success message
      toast.success("Space added successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isCreating, createSpace };
}
