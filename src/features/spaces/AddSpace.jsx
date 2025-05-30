import CreateSpaceForm from "./CreateSpaceForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
// export default function AddSpace() {
//   const [isOpenFormModal, setIsOpenFormModal] = useState(false);
//   return (
//     <div>
//       {isOpenFormModal && (
//         <Modal onCloseModal={() => setIsOpenFormModal(false)}>
//           <CreateSpaceForm onCloseModal={() => setIsOpenFormModal(false)} />
//         </Modal>
//       )}
//       <Button
//         className="w-max"
//         onClick={() =>
//           setIsOpenFormModal((isOpenFormModal) => !isOpenFormModal)
//         }
//       >
//         Add Space
//       </Button>
//     </div>
//   );
// }
export default function AddSpace() {
  return (
    <Modal>
      <Modal.OpenForm opensSpaceForm="space-form">
        <Button>Add Space</Button>
      </Modal.OpenForm>
      <Modal.Window name="space-form">
        <CreateSpaceForm />
      </Modal.Window>
    </Modal>
  );
}
