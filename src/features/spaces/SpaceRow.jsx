import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import useCreateSpace from "./useCreateSpace";
import Modal from "../../ui/Modal";
import CreateSpaceForm from "./CreateSpaceForm";
import DeleteSpaceModal from "./DeleteSpaceModal";
import { useState } from "react";
import {
  HiMiniTrash,
  HiMiniPencilSquare,
  HiMiniDocumentDuplicate,
} from "react-icons/hi2";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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

export default function SpaceRow({ space }) {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { isCreating, createSpace } = useCreateSpace();

  const {
    id: spaceId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = space;

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
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Space>{name}</Space>
        <div>fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div className="flex gap-2">
          <button>
            <HiMiniPencilSquare
              size={24}
              onClick={() => setIsOpenFormModal(true)}
            />
          </button>
          <button>
            <HiMiniTrash size={24} onClick={() => setIsOpenDeleteModal(true)} />
          </button>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiMiniDocumentDuplicate size={24} />
          </button>
        </div>
      </TableRow>
      {isOpenFormModal && (
        <Modal onCloseModal={() => setIsOpenFormModal(false)}>
          <CreateSpaceForm
            spaceToEdit={space}
            onCloseModal={() => setIsOpenFormModal(false)}
          />
        </Modal>
      )}
      {isOpenDeleteModal && (
        <Modal onCloseModal={() => setIsOpenDeleteModal(false)}>
          <DeleteSpaceModal
            spaceId={spaceId}
            onCloseModal={() => setIsOpenDeleteModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
