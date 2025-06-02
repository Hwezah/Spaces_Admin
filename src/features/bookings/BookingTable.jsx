import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
// import Menus from "../../ui/Menus";

function BookingTable() {
  const { bookings, isLoading, count, error } = useBookings();
  if (isLoading) return <Spinner />;
  if (error)
    return <Empty resourceName={`bookings (Error: ${error.message})`} />;
  if (!bookings || bookings.length === 0)
    return <Empty resourceName="bookings" />;
  return (
    // <Menus>
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Space</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
    // </Menus>
  );
}

export default BookingTable;
