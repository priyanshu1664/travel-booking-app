// src/components/HotelList/HotelList.js
import React, { useState } from "react";
import styles from "./HotelDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { FaCheck } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const HotelDetails = () => {
  const DUMMY_HOTELS = useSelector((state) => state.hotel).hotels;
  let { hotelId } = useParams();
  let dispatch = useDispatch();
  const hotel = DUMMY_HOTELS.find((h) => h.id === hotelId);
  const mode = useSelector((state) => state.mode.mode);
  console.log("hotel", hotel);

  let hotelOfferPrice = hotel.offerPrice * hotel.nights * hotel.guests;
  let hotelOriginalPrice = hotel.originalPrice * hotel.nights * hotel.guests;

  if (!hotel) {
    return <div>Hotel not found!</div>;
  }

  const [currImage, setCurrImage] = useState(0);
  const { addBooking } = bookingActions;

  const handleLeftArrow = () => {
    setCurrImage((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1));
  };

  const handleRightArrow = () => {
    setCurrImage((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1));
  };
  const checkIn = new Date();
  const checkOut = new Date();

  const handleBookNow = (hotel) => {
    dispatch(
      bookingActions.addBooking({
        id: hotel.id,
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
        status: "Pending",
      })
    );
    alert(
      "Hotel '" +
        hotel.id +
        hotel.name +
        "' sucessfully booked for " +
        hotel.nights +
        " nights"
    );
  };

  const totalTax = hotel.offerPrice * 0.12;

  return (
    <div
      className={
        mode == "dark" ? styles.hotelContainerDark : styles.hotelContainerLight
      }
    >
      <div className="column">
        <div
          className={`${styles.hotelCard} ${
            mode == "dark" ? styles.dark : styles.light
          }`}
        >
          <Link
            to="/"
            className={`${styles.backLogo} ${
              mode == "dark" ? styles.backLogoDark : styles.backLogoLight
            }`}
          >
            <IoArrowBackCircleOutline />
          </Link>
          {/* Hotel Image */}
          <div className={styles.imageWrapper}>
            <img
              src={hotel.images[currImage]}
              alt="Hotel"
              className={styles.hotelImage}
            />

            {/* Left Arrow */}
            <button className={styles.leftArrow} onClick={handleLeftArrow}>
              <FaChevronLeft />
            </button>

            {/* Right Arrow */}
            <button className={styles.rightArrow} onClick={handleRightArrow}>
              <FaChevronRight />
            </button>
          </div>
          <div className={styles.hotelInfo}>
            {/* Hotel Info Left*/}
            <div className={styles.hotelInfoLeft}>
              <h3
                className={
                  mode == "dark"
                    ? styles.hotelTitleDark
                    : styles.hotelTitleLight
                }
              >
                {hotel.name}{" "}
                <span className={styles.rating}>
                  {Array.from({ length: hotel.stars }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </span>
              </h3>{" "}
              <p className={styles.propertyType}>{hotel.propertyType}</p>
              <p className={styles.hotelLocation}>📍{hotel.address}</p>
              <div
                className={
                  mode == "dark"
                    ? styles.facilitiesDark
                    : styles.facilitiesLight
                }
              >
                {hotel.features.map((facility, index) => (
                  <div
                    className={
                      mode == "dark"
                        ? styles.facilityCardDark
                        : styles.facilityCardLight
                    }
                    key={index}
                  >
                    <FaCheck /> {facility}
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Info Left*/}
            <div className={styles.hotelInfoRight}>
              <div className={styles.scoreContainer}>
                <div className={styles.score}>
                  <p>Review Scores</p>
                  <span>{hotel.reviews} reviews</span>
                </div>
                <div
                  className={
                    mode == "dark"
                      ? styles.ratingBoxDark
                      : styles.ratingBoxLight
                  }
                >
                  {hotel.rating}
                </div>
              </div>
              <div className={styles.totalContainer}>
                <span className={styles.nights}>
                  {hotel.nights} night {hotel.guests} adults
                </span>
                <p className={styles.orignalPrice}>
                  ₹{hotelOriginalPrice} / night
                </p>
                <p className={styles.offerPrice}>₹{hotelOfferPrice} / night</p>
                <span>+ {totalTax} for taxes and fees</span>
              </div>
            </div>
          </div>
          <button
            className={styles.bookBtn}
            onClick={() => handleBookNow(hotel)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
