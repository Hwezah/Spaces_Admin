import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditSpace } from "../../services/apiSpaces";
export default function useEditSpace() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editSpace } = useMutation({
    mutationFn: ({ newSpaceData, id }) => createEditSpace(newSpaceData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaces"] });

      toast.success("Space Edited successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    isEditing,
    editSpace,
  };
}
