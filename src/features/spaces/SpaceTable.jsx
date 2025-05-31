import styled from "styled-components";
import useSpaces from "../spaces/useSpaces";
import Spinner from "../../ui/Spinner";
import SpaceRow from "../spaces/SpaceRow";
import { useState } from "react";
import Table from "../../ui/Table";
// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function SpaceTable() {
  const [openMenuId, setOpenMenuId] = useState(null); // tracks which row's menu is open
  const { spaces, isLoading } = useSpaces();
  console.log(spaces);
  if (isLoading) return <Spinner />; //isLoading, error statuses are provided by reactquery by default

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
        data={spaces}
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
