import Button from "../../ui/Button";
import useDeleteSpace from "./useDeleteSpace";
export default function DeleteSpaceModal({ spaceId, onCloseModal }) {
  const { deleteSpace, isDeleting } = useDeleteSpace();
  function handleDelete() {
    deleteSpace(spaceId);
    // onCloseModal(); // Close the modal after deletion
  }
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="bold text-2xl">Delete Space?</h1>
      <p className="">
        Are you sure you want to delete this space permanently?{" "}
        <p>This action cannot be undone.</p>
      </p>
      <div className="flex gap-4 justify-end">
        <Button variation="secondary" onClick={onCloseModal}>
          Cancle
        </Button>
        <Button variation="danger" disabled={isDeleting} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
