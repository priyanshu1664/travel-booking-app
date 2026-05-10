import { useDispatch, useSelector } from "react-redux";
import styles from "./BookingCard.module.css";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useState } from "react";
import { deleteBooking } from "../../store/bookingSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const BookingCard = ({ booking }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const mode = useSelector((state) => state.mode.mode);

  const total = booking.offerPrice * booking.nights * booking.guests;
  const taxes = Math.floor(total * 0.12);
  const grandTotal = total + taxes;

  const handleDeleteBooking = async () => {
    try {
      setLoading(true);

      await deleteDoc(doc(db, "bookings", booking.id));

      dispatch(deleteBooking(booking.id));

      toast.success(
        `Booking for '${booking.hotelName}' cancelled successfully`
      );
    } catch (err) {
      console.error("Error deleting booking:", err);

      toast.error("Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.bookingCard} ${
        mode === "dark" ? styles.dark : styles.light
      }`}
    >
      {/* Left Image */}

      <div className={styles.imageWrapper}>
        <img
          src={booking.image}
          alt={booking.hotelName}
          className={styles.hotelImage}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1566073771259-6a8506099945";
          }}
        />
      </div>

      {/* Center Info */}

      <div className={styles.hotelInfoLeft}>
        <h3
          className={
            mode === "dark" ? styles.hotelTitleDark : styles.hotelTitleLight
          }
        >
          {booking.hotelName}

          <span className={styles.propertyType}>({booking.propertyType})</span>
        </h3>

        <p className={styles.location}>📍 {booking.address}</p>
        <p className={`font-bold`}>
          {" "}
          Payment Status:{" "}
          <span className="font-medium">{booking.paymentStatus}</span>
        </p>
        <p className={styles.dates}>
          {booking.checkIn
            ? new Date(booking.checkIn).toLocaleDateString()
            : "N/A"}{" "}
          →
          {booking.checkOut
            ? new Date(booking.checkOut).toLocaleDateString()
            : "N/A"}
        </p>

        <p className={styles.orignalPrice}>₹{booking.originalPrice} / night</p>

        <p className={styles.offerPrice}>
          ₹{booking.offerPrice.toFixed(2)} / night
        </p>
      </div>

      {/* Right Price */}

      <div className={styles.hotelInfoRight}>
        <div className={styles.totalContainer}>
          <p className={styles.guests}>
            {booking.nights} nights • {booking.guests} adults
          </p>

          <p className={styles.totalPrice}>Total : ₹{total.toFixed(2)}</p>

          <span>+ ₹{taxes} taxes & fees</span>
          <p
            className={`${styles.status} ${
              styles[booking.status?.toLowerCase()]
            }`}
          >
            {booking?.status || "N/A"}
          </p>
          <p className={styles.grandPrice}>
            Grand Total : ₹{grandTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Actions */}

      <div className={styles.actions}>
        {
          <button
            className={styles.detailsBtn}
            onClick={() => navigate(`/payment/${booking.id}`)}
            disabled={booking.paymentStatus === "Paid"}
          >
            Pay Now
          </button>
        }
        <button
          className={styles.cancelBtn}
          onClick={handleDeleteBooking}
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Cancel Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
