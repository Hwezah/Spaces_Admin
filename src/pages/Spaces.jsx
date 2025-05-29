import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SpaceTable from "../features/spaces/SpaceTable";
import AddSpace from "../features/spaces/AddSpace";
function Spaces() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All spaces</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <SpaceTable />
        <AddSpace />
      </Row>
    </>
  );
}

export default Spaces;
