import { useState } from "react";
import CreateSpaceForm from "./CreateSpaceForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
export default function AddSpace() {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  return (
    <div>
      {isOpenFormModal && (
        <Modal onCloseModal={() => setIsOpenFormModal(false)}>
          <CreateSpaceForm onCloseModal={() => setIsOpenFormModal(false)} />
        </Modal>
      )}
      <Button
        className="w-max"
        onClick={() =>
          setIsOpenFormModal((isOpenFormModal) => !isOpenFormModal)
        }
      >
        Add Space
      </Button>
    </div>
  );
}
// function AddSpace() {
//   return (
//     <Modal>
//       <Modal.Open opens="space-form">
//         <Button>Add Space</Button>
//       </Modal.Open>
//       <Modal.Window name="space-form">
//         <CreateSpaceForm />
//       </Modal.Window>

//       <Modal.Open opens="table">
//         <Button>Show Table</Button>
//       </Modal.Open>
//       <Modal.Window name="table">
//         <CreateSpaceForm />
//       </Modal.Window>
//     </Modal>
//   );
// }
