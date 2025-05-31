import styled from "styled-components";
import useSpaces from "../spaces/useSpaces";
import Spinner from "../../ui/Spinner";
import SpaceRow from "../spaces/SpaceRow";
import { useState } from "react";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
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
  const [openMenuId, setOpenMenuId] = useState(null); // tracks which row's menu is open
  const { spaces, isLoading, error } = useSpaces();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />; //isLoading, error statuses are provided by reactquery by default

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Error loading spaces: {error.message}
      </p>
    );
  }

  const filterValue = searchParams.get("discount") || "all"; //filter is a query param that is passed in the url
  let filteredSpaces; //filteredSpaces is a copy of spaces that will be used to render the table
  if (filterValue === "all") filteredSpaces = spaces;
  if (filterValue === "with-discount")
    filteredSpaces = spaces.filter((space) => space.discount > 0);
  if (filterValue === "no-discount")
    filteredSpaces = spaces.filter((space) => space.discount === 0);
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Space</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={filteredSpaces}
        render={(space) => (
          <SpaceRow
            key={space.id}
            space={space}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
          />
        )}
      />
    </Table>
  );
}
