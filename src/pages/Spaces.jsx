import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getSpaces } from "../services/apiSpaces";
import SpaceTable from "../features/spaces/SpaceTable";

function Spaces() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All spaces</Heading>
      </Row>
      <Row>
        <SpaceTable />
      </Row>
    </>
  );
}

export default Spaces;
