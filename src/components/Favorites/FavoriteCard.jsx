import { useDispatch, useSelector } from "react-redux";
import styles from "./FavoriteCard.module.css";

import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useState } from "react";
import { addBooking, deleteBooking } from "../../store/bookingSlice";
import toast from "react-hot-toast";
import { removeFavorite } from "../../store/favoriteSlice";
import { useNavigate } from "react-router";

const FavoriteCard = ({ favorite }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("favorite", favorite);
  const [loading, setLoading] = useState(false);

  const mode = useSelector((state) => state.mode.mode);

  const total = favorite.offerPrice * favorite.nights * favorite.guests;
  const taxes = Math.floor(total * 0.12);
  const grandTotal = total + taxes;

  const handleBooking = async (hotel) => {
    const bookingData = {
      email: hotel.email,
      adminId: hotel.adminId,
      hotelName: hotel.hotelName,
      propertyType: hotel.propertyType,
      address: hotel.address,
      checkIn: hotel.checkIn,
      checkOut: hotel.checkOut,
      nights: hotel.nights,
      guests: hotel.guests,
      offerPrice: hotel.offerPrice,
      originalPrice: hotel.originalPrice,
      image: hotel.image,
      status: "pending",
      paymentStatus: "Pending",
    };

    try {
      const docRef = doc(collection(db, "bookings"));
      const bookingWithId = { ...bookingData, id: docRef.id };
      await setDoc(docRef, bookingWithId);

      dispatch(addBooking(bookingWithId));

      console.log("Booking stored with ID:", docRef.id);
      toast.success(
        `Hotel '${hotel.name}' successfully booked for ${hotel.nights} nights!`
      );
      await handleDeleteFavorite();
      navigate("/bookings");
    } catch (err) {
      console.error("Error adding booking:", err);
      toast.error("Failed to store booking: " + err.message);
    }
  };

  const handleDeleteFavorite = async () => {
    try {
      setLoading(true);

      await deleteDoc(doc(db, "favorites", favorite.id));

      dispatch(removeFavorite(favorite.id));

      toast.success(
        `Booking for '${favorite.hotelName}' cancelled successfully`
      );
    } catch (err) {
      console.error("Error deleting favorite:", err);

      toast.error("Failed to cancel favorite");
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
          src={favorite.image}
          alt={favorite.hotelName}
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
          {favorite.hotelName}

          <span className={styles.propertyType}>({favorite.propertyType})</span>
        </h3>

        <p className={styles.location}>📍 {favorite.address}</p>

        <p className={styles.datesHead}>Booking Dates</p>

        <p className={styles.dates}>
          {favorite.checkIn
            ? new Date(favorite.checkIn).toLocaleDateString()
            : "N/A"}{" "}
          →
          {favorite.checkOut
            ? new Date(favorite.checkOut).toLocaleDateString()
            : "N/A"}
        </p>

        <p className={styles.orignalPrice}>₹{favorite.originalPrice} / night</p>

        <p className={styles.offerPrice}>
          ₹{favorite.offerPrice.toFixed(2)} / night
        </p>
      </div>

      {/* Right Price */}

      <div className={styles.hotelInfoRight}>
        <div className={styles.totalContainer}>
          <p className={styles.guests}>
            {favorite.nights} nights • {favorite.guests} adults
          </p>

          <p className={styles.totalPrice}>Total : ₹{total.toFixed(2)}</p>

          <span>+ ₹{taxes} taxes & fees</span>
          <p
            className={`${styles.status} ${
              styles[favorite.status?.toLowerCase()]
            }`}
          >
            {favorite?.status || "N/A"}
          </p>
          <p className={styles.grandPrice}>
            Grand Total : ₹{grandTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Actions */}

      <div className={styles.actions}>
        <button
          className={styles.detailsBtn}
          onClick={() => handleBooking(favorite)}
        >
          Book Now
        </button>

        <button
          className={styles.cancelBtn}
          onClick={handleDeleteFavorite}
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Delete Favorite"}
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;
