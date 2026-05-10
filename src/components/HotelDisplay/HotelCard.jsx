import React, { useState } from "react";
import styles from "./HotelCard.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, setDoc } from "firebase/firestore";
import { addBooking } from "../../store/bookingSlice";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebaseConfig";
import { addFavorite } from "../../store/favoriteSlice";

function HotelCard({ hotel }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { user } = useSelector((state) => state.user);
  let { mode } = useSelector((state) => state.mode);
  let { checkIn, checkOut } = useSelector((state) => state.filter);

  const hotelOfferPrice = Math.floor(
    hotel.offerPrice * hotel.nights * hotel.guests
  );
  const hotelOriginalPrice = Math.floor(
    hotel.originalPrice * hotel.nights * hotel.guests
  );
  let totalTax = Math.floor(hotel.offerPrice * 0.12);

  const [currImage, setCurrImage] = useState(0);
  let isAvailable = hotel.isAvailable;

  const handleLeftArrow = () => {
    setCurrImage((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1));
  };

  const handleRightArrow = () => {
    setCurrImage((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1));
  };
  const handleFavorite = async () => {
    const favoriteData = {
      email: user.email,
      adminId: hotel.adminId,
      hotelName: hotel.name,
      propertyType: hotel.propertyType,
      address: hotel.address,
      checkIn: checkIn,
      checkOut: checkOut,
      nights: hotel.nights,
      guests: hotel.guests,
      offerPrice: hotel.offerPrice,
      originalPrice: hotel.originalPrice,
      image: hotel.images[0],
    };

    try {
      const docRef = doc(collection(db, "favorites"));
      const favoriteWithId = { ...favoriteData, id: docRef.id };
      await setDoc(docRef, favoriteWithId);

      dispatch(addFavorite(favoriteWithId));
      console.log("Favorite stored with ID:", docRef.id);
      toast.success(`Hotel '${hotel.name}' successfully added to favorite`);
    } catch (err) {
      console.error("Error adding favorite:", err);
      toast.error("Failed to store favorite: " + err.message);
    }
  };
  const handleBooking = async () => {
    const bookingData = {
      email: user.email,
      adminId: hotel.adminId,
      hotelName: hotel.name,
      propertyType: hotel.propertyType,
      address: hotel.address,
      checkIn: checkIn,
      checkOut: checkOut,
      nights: hotel.nights,
      guests: hotel.guests,
      offerPrice: hotel.offerPrice,
      originalPrice: hotel.originalPrice,
      image: hotel.images[0],
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
    } catch (err) {
      console.error("Error adding booking:", err);
      toast.error("Failed to store booking: " + err.message);
    }
  };
  return (
    <div
      className={`${styles.hotelCard} ${
        mode === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.imageWrapper}>
        <img
          src={hotel.images[currImage]}
          alt="Hotel"
          className={styles.hotelImage}
        />

        <button
          className={styles.favotireIcon}
          onClick={() => handleFavorite(hotel)}
        >
          <MdFavoriteBorder />
        </button>
        <button className={styles.leftArrow} onClick={handleLeftArrow}>
          <FaChevronLeft />
        </button>
        <button className={styles.rightArrow} onClick={handleRightArrow}>
          <FaChevronRight />
        </button>
        {isAvailable ? (
          <div className={styles.availableBadge}> Available </div>
        ) : (
          <div className={styles.notAvailableBadge}> Not Available </div>
        )}
        {isAvailable ? (
          <button className={styles.heartBadge} onClick={handleFavorite}>
            {" "}
            <FaHeart />
          </button>
        ) : (
          <button disabled={true} className={styles.notHeartBadge}>
            {" "}
            <FaRegHeart />
          </button>
        )}
      </div>
      <Link to={`/hotel-detail/${hotel.id}`} className={styles.hotelInfoLeft}>
        <h3
          className={`${
            mode === "dark" ? styles.hotelTitleDark : styles.hotelTitleLight
          }`}
        >
          {hotel.name}{" "}
          <span className={styles.rating}>
            {Array.from({ length: hotel.stars }, (_, i) => (
              <span key={i}>⭐</span>
            ))}
          </span>
        </h3>
        <p
          className={`${styles.propertyType} ${
            mode === "dark" ? styles.dark : styles.light
          }`}
        >
          {hotel.propertyType}
        </p>
        <p
          className={`d-flex align-items-center gap-2 ${
            mode === "dark"
              ? styles.hotelLocationDark
              : styles.hotelLocationLight
          }`}
        >
          <MdLocationOn /> {hotel.address}
        </p>
        <div
          className={
            mode === "dark" ? styles.facilitiesDark : styles.facilitiesLight
          }
        >
          {hotel.features.map((facility, i) => (
            <p
              key={i}
              className="d-flex align-items-center gap-2 "
              style={{ marginBottom: "8px" }}
            >
              <FaCheck /> {facility}
            </p>
          ))}
        </div>
      </Link>
      <div className={styles.hotelInfoRight}>
        <div className={styles.scoreContainer}>
          <div className={styles.score}>
            <p>Review Scores</p>
            <span>{hotel.reviews} reviews</span>
          </div>
          <div
            className={
              mode === "dark" ? styles.ratingBoxDark : styles.ratingBoxLight
            }
          >
            {hotel.rating}
          </div>
        </div>

        <div className={styles.totalContainer}>
          <span>
            {hotel.nights} night {hotel.guests} guests
          </span>
          <p className={styles.orignalPrice}> {hotelOriginalPrice} / nights</p>
          <p className="">{hotelOfferPrice} /night</p>
          <span> + {totalTax} for taxes and fees</span>
          <button
            className={styles.bookBtn}
            onClick={handleBooking}
            disabled={!isAvailable}
          >
            {isAvailable ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
