import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import styled from "styled-components";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { HiEllipsisVertical, HiEye, HiTrash } from "react-icons/hi2";

const Space = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

/* eslint-disable react/prop-types */
function BookingRow({
  booking: {
    id: bookingId,
    // created_at, // This was in the original file but not used in the JSX
    startDate,
    endDate,
    numNights,
    // numGuests, // This was in the original file but not used in the JSX
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    spaces: { name: spaceName },
  },
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  if (!guestName) return null; // Or some placeholder/loading state
  return (
    <Table.Row>
      <Space>{spaceName}</Space>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      {/* Actions Menu Cell */}
      <div className="relative" ref={menuRef}>
        <button
          className="p-1 rounded-sm border border-transparent hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
          onClick={() => setIsMenuOpen((s) => !s)}
          aria-label="Open booking actions menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
        >
          <HiEllipsisVertical size={24} />
        </button>

        {isMenuOpen && (
          <div className="absolute flex flex-col gap-3 z-10 right-0 mt-2 w-[14rem] h-[4rem] p-4 bg-white rounded-md shadow-lg focus:outline-none">
            <button
              onClick={() => {
                navigate(`/bookings/${bookingId}`);
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full text-sm text-gray-700 hover:bg-gray-100 gap-3"
            >
              <HiEye size={16} />
              <span>View details</span>
            </button>
            {/* Add other booking-specific actions here, e.g., Check-in/Check-out, Delete */}
            <button
              onClick={() => {
                // Placeholder for delete action. Implement actual deletion logic as needed.
                // For example, you might call a mutation or open a confirmation modal.
                console.log(`Attempting to delete booking ${bookingId}`);
                // Example: openConfirmDeleteModal(bookingId);
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 gap-3"
            >
              <HiTrash size={16} />
              <span>Delete booking</span>
            </button>
          </div>
        )}
      </div>
    </Table.Row>
  );
}

export default BookingRow;
