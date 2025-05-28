import styled from "styled-components";
import { getSpaces } from "../../services/apiSpaces";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import SpaceRow from "../spaces/SpaceRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function SpaceTable() {
  // useQuery is a hook provided by reactQuery to fetch data from an api
  const { data: spaces, isLoading } = useQuery({
    querykey: ["spaces"], // here reactQuery will use this key to identify the query(slot in memory where data is cached)
    queryFn: getSpaces, // This is the actual api call to fetch the data
  });
  if (isLoading) return <Spinner />; //isLoading, error statuses are provided by reactquery by default

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Space</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {spaces?.map((space) => (
        <SpaceRow key={space.id} space={space} />
      ))}
    </Table>
  );
}
