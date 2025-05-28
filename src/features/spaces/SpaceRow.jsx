import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { deleteSpace } from "../../services/apiSpaces";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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
  const {
    id: spaceId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = space;

  const queryClient = useQueryClient();
  // useMutation is a hook from react-query to delete(mutate) data in this case a space
  // deleteSpace is a function(from supabase...in my apiSpaces.js) that will be passed to the mutationFn prop of useMutation
  // mutate then will be called(with the spaceId passed to it) by the button to delete the space from the database
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteSpace,
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

  return (
    <TableRow role="row">
      <Img src={image} alt={name} />
      <Space>{name}</Space>
      <div>fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button onClick={() => mutate(spaceId)} disabled={isDeleting}>
        Delete
      </button>
    </TableRow>
  );
}
