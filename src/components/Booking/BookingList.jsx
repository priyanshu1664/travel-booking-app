import React, { useEffect } from "react";
import BookingCard from "./BookingCard";
import { useDispatch, useSelector } from "react-redux";
import { LuHeading3 } from "react-icons/lu";
import useFetchProfile from "../../hooks/useFetchProfile";
import LoadingSpinner from "../Layouts/LoadingSpinner";
import styles from "./BookingList.module.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { addBooking, setBooking } from "../../store/bookingSlice";
import { db } from "../../firebase/firebaseConfig";

function BookingList() {
  let dispatch = useDispatch();
  const { loading, error } = useFetchProfile();

  const DUMMY_BOOKINGS = useSelector((s) => s.booking.bookings);
  const { user, token } = useSelector((s) => s.user);
  const { mode } = useSelector((s) => s.mode);
  // console.log("DUMMY_BOOKINGS", DUMMY_BOOKINGS);
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        toast.success("No logged-in user found ");
        console.warn("No logged-in user found ");
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, "bookings"));

        const bookingWithId = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(bookingWithId);
        dispatch(setBooking(bookingWithId));
        console.log("Booking Fetched");
      } catch (error) {
        console.log("Error Occured While Fetching Bookings", error);
      }
    };

    fetchBookings();
  }, [dispatch, user]);

  let filteredBookings = [];
  if (DUMMY_BOOKINGS.length > 0) {
    filteredBookings = DUMMY_BOOKINGS.filter(
      (booking) => booking.email === user.email
    );
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div
      className={`${styles.bookingContainer} ${
        mode === "dark" ? styles.dark : styles.light
      }`}
    >
      {token && (
        <>
          <h1 className="mb-5">My Bookings:</h1>
          {filteredBookings.length === 0 ? (
            <h4>No Bookings Found.</h4>
          ) : (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </>
      )}
    </div>
  );
}

export default BookingList;
