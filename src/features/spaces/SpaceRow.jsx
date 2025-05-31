import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import useCreateSpace from "./useCreateSpace";
import DeleteSpace from "./DeleteSpace"; // Import the refactored DeleteSpace componen
import { HiMiniPencilSquare, HiMiniDocumentDuplicate } from "react-icons/hi2";
import Modal from "../../ui/Modal"; // For the edit modal
import CreateSpaceForm from "./CreateSpaceForm"; // For the edit modal
import { HiEllipsisVertical } from "react-icons/hi2";
import { useEffect, useRef } from "react";
import Table from "../../ui/Table";
/* eslint-disable react/prop-types */

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Space = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function SpaceRow({ space, openMenuId, setOpenMenuId }) {
  const { isCreating, createSpace } = useCreateSpace();
  const menuRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (!menuRef.current || menuRef.current.contains(e.target)) return;
      setOpenMenuId(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMenuId]);

  const {
    id: spaceId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = space;
  const isOpenModal = openMenuId === spaceId;
  function handleDuplicate() {
    createSpace({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} alt={name} />
        <Space>{name}</Space>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div className="relative">
          <button className="p-1 w-fit focus:outline-none focus:ring-0">
            <HiEllipsisVertical
              size={24}
              onClick={() =>
                setOpenMenuId((prev) => (prev === spaceId ? null : spaceId))
              }
            />
          </button>

          {isOpenModal && (
            <div
              className="flex flex-col gap-2 absolute shadow-md right-[16rem] top-0 bg-gray-50 rounded-lg !p-10"
              // ref={menuRef}
            >
              <Modal>
                <Modal.OpenForm opensSpaceForm={`edit-space-form-${spaceId}`}>
                  <button
                    aria-label="Edit space"
                    className="flex items-center gap-4 focus:outline-none focus:ring-0"
                  >
                    <HiMiniPencilSquare size={24} /> <span>Edit</span>
                  </button>
                </Modal.OpenForm>
                <Modal.Window name={`edit-space-form-${spaceId}`}>
                  <CreateSpaceForm spaceToEdit={space} />
                </Modal.Window>
              </Modal>
              <DeleteSpace spaceId={spaceId} />
              <button
                onClick={handleDuplicate}
                disabled={isCreating}
                aria-label="Duplicate space"
                className="flex items-center gap-4 focus:outline-none focus:ring-0"
              >
                {" "}
                {/* Added padding */}
                <HiMiniDocumentDuplicate size={24} /> <span>Duplicate</span>
              </button>
            </div>
          )}
        </div>
      </Table.Row>
    </>
  );
}
