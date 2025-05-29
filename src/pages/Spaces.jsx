import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getSpaces } from "../services/apiSpaces";
import SpaceTable from "../features/spaces/SpaceTable";
import Button from "../ui/Button";
import { useState } from "react";
import FormModal from "../ui/FormModal";
function Spaces() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All spaces</Heading>
      </Row>
      <Row>
        <SpaceTable />
        <Button
          className="w-max"
          onClick={() => setShowForm((showForm) => !showForm)}
        >
          Add Space
        </Button>
        {showForm && (
          <FormModal showForm={showForm} setShowForm={setShowForm} />
        )}
      </Row>
    </>
  );
}

export default Spaces;
