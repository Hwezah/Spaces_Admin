import { deleteSpace as deleteCabinApi } from "../../services/apiSpaces";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export default function useDeleteSpace() {
  const queryClient = useQueryClient();
  // useMutation is a hook from react-query to delete(mutate) data in this case a space
  // deleteSpace is a function(from supabase...in my apiSpaces.js) that will be passed to the mutationFn prop of useMutation
  // mutate then will be called(with the spaceId passed to it) by the button to delete the space from the database
  const { isLoading: isDeleting, mutate: deleteSpace } = useMutation({
    mutationFn: deleteCabinApi,
    // onSuccess is a callback function that will be called when the mutation is successful
    onSuccess: () => {
      // invalidateQueries is a function from react-query to invalidate the cached data of the query
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      // toast is a function from react-toastify to show a success message
      toast.success("Space deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteSpace, isDeleting };
}
