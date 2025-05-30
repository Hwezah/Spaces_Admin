import Button from "../../ui/Button";
import useDeleteSpace from "./useDeleteSpace";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";

export default function DeleteSpaceModal({ spaceId }) {
  const { deleteSpace, isDeleting } = useDeleteSpace();
  const { close } = useContext(ModalContext);

  function handleDelete() {
    deleteSpace(spaceId, {
      onSuccess: () => {
        close?.(); // Close the modal on success
      },
    });
  }
  const handleCancel = () => {
    close?.(); // Close the modal on cancel
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="font-semibold">Delete Space?</h1>
      <p className="">
        Are you sure you want to delete this space permanently?{" "}
        <span className="block">This action cannot be undone.</span>
      </p>
      <div className="flex gap-4 justify-end">
        <Button
          variation="secondary"
          onClick={handleCancel}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={isDeleting} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
