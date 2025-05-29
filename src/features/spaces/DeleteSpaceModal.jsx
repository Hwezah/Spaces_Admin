import Button from "../../ui/Button";
import useDeleteSpace from "./useDeleteSpace";
export default function DeleteSpaceModal({ spaceId, onCloseModal }) {
  const { deleteSpace, isDeleting } = useDeleteSpace();
  function handleDelete() {
    deleteSpace(spaceId);
    onCloseModal(); // Close the modal after deletion
  }
  return (
    <div className="flex flex-col gap-4 ">
      <p className="">Are you sure you want to delete this space?</p>
      <div className="flex gap-4 justify-end">
        <Button variation="danger" disabled={isDeleting} onClick={handleDelete}>
          Yes
        </Button>
        <Button onClick={onCloseModal}>No</Button>
      </div>
    </div>
  );
}
