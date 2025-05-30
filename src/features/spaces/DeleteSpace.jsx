import Modal from "../../ui/Modal";
import DeleteSpaceModal from "./DeleteSpaceModal";
import { HiMiniTrash } from "react-icons/hi2";
export default function DeleteSpace({ spaceId }) {
  return (
    <>
      <Modal>
        <Modal.OpenDelete
          opensDeleteSpaceModal={`delete-space-modal-${spaceId}`}
        >
          {/* This button acts as the trigger to open the modal */}
          <button aria-label="Delete space" className="p-1">
            {" "}
            {/* Added padding for easier clicking */}
            <HiMiniTrash size={24} />
          </button>
        </Modal.OpenDelete>
        <Modal.Window name={`delete-space-modal-${spaceId}`}>
          <DeleteSpaceModal spaceId={spaceId} />
        </Modal.Window>
      </Modal>
    </>
  );
}
