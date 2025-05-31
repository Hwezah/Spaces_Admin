import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SpaceTable from "../features/spaces/SpaceTable";
import AddSpace from "../features/spaces/AddSpace";
import SpaceTableOperations from "../features/spaces/SpaceTableOperations";
function Spaces() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All spaces</Heading>
        <SpaceTableOperations />
      </Row>
      <Row>
        <SpaceTable />
        <AddSpace />
      </Row>
    </>
  );
}

export default Spaces;
