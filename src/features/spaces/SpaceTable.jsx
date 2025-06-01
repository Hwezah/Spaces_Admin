import { useSpaces } from "../spaces/useSpaces";
import Spinner from "../../ui/Spinner";
import SpaceRow from "../spaces/SpaceRow";
import { useState } from "react";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
export default function SpaceTable() {
  const [openMenuId, setOpenMenuId] = useState(null); // tracks which row's menu is open
  const { spaces, isLoading, error } = useSpaces();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />; //isLoading, error statuses are provided by reactquery by default
  if (!spaces.length) return <Empty resourceName="spaces" />;

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Error loading spaces: {error.message}
      </p>
    );
  }
  // Filter
  const filterValue = searchParams.get("discount") || "all"; //filter is a query param that is passed in the url
  let filteredSpaces; //filteredSpaces is a copy of spaces that will be used to render the table
  if (filterValue === "all") filteredSpaces = spaces;
  if (filterValue === "with-discount")
    filteredSpaces = spaces.filter((space) => space.discount > 0);
  if (filterValue === "no-discount")
    filteredSpaces = spaces.filter((space) => space.discount === 0);

  // Sort
  // const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const sortBy = searchParams.get("sortBy") || "name-asc"; // Default to a valid option
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  // Sort a copy of filteredSpaces
  const sortedSpaces = [...filteredSpaces].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    let comparisonResult;

    // Handle string fields
    if (field === "name") {
      comparisonResult = String(valA ?? "").localeCompare(String(valB ?? ""));
    }
    // Handle numeric fields
    else if (field === "regularPrice" || field === "maxCapacity") {
      comparisonResult = (Number(valA) || 0) - (Number(valB) || 0);
    }
    // Fallback for any other fields (should ideally not be reached if sortBy values are controlled)
    else {
      if (valA < valB) comparisonResult = -1;
      else if (valA > valB) comparisonResult = 1;
      else comparisonResult = 0;
    }

    return comparisonResult * modifier;
  });
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
        data={sortedSpaces}
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
