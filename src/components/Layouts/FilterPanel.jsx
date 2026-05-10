import { useEffect, useRef, useState } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvailability,
  setCheckIn,
  setCheckOut,
  setCity,
  setGuests,
  setNights,
  setPrice,
  setPropertyType,
  setRating,
} from "../../store/filterSlice";
import { changeGuests, changeNights } from "../../store/hotelSlice";

const FilterPanel = ({ onFilterChange }) => {
  let dispatch = useDispatch();
  let filters = useSelector((state) => state.filter);
  const mode = useSelector((state) => state.mode.mode);

  useEffect(() => {
    if (filters.checkIn !== "" && filters.checkOut !== "") {
      let timeDiff = new Date(filters.checkOut) - new Date(filters.checkIn);
      let nights = timeDiff / (1000 * 60 * 60 * 24);
      dispatch(setNights(nights));
      dispatch(changeNights(nights));
    }
  }, [filters.checkIn, filters.checkOut]);

  return (
    <div
      className={`${styles.panelContainer} ${
        mode == "dark" ? styles.dark : styles.light
      }`}
    >
      <h5>Browse By (User Filters):</h5>
      <div className={styles.panelMenu}>
        <div
          className={`
            ${styles.filterItem} ${
            mode === "dark" ? styles.filterItemDark : styles.filterItemLight
          }
          `}
        >
          <label>
            Property Type :
            <select
              value={filters.propertyType}
              onChange={(e) => {
                dispatch(setPropertyType(e.target.value));
              }}
            >
              <option value="All">All</option>
              <option value="Hotel">Hotel</option>
              <option value="Resort">Resort</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Guesthouse">Guesthouse</option>
              <option value="Houseboat">Houseboat</option>
            </select>
          </label>
        </div>

        {/* Dates */}
        <div
          className={`
            ${styles.filterItem} ${
            mode === "dark" ? styles.filterItemDark : styles.filterItemLight
          }
          `}
        >
          <label>
            Check-In :
            <input
              className={`
           ${
             mode === "dark" ? styles.filterInputDark : styles.filterInputLight
           }`}
              type="date"
              value={filters.checkIn}
              onChange={(e) => {
                dispatch(setCheckIn(e.target.value));
              }}
            />
          </label>
          <label>
            Check-Out :
            <input
              className={`
           ${
             mode === "dark" ? styles.filterInputDark : styles.filterInputLight
           }`}
              type="date"
              value={filters.checkOut}
              onChange={(e) => {
                dispatch(setCheckOut(e.target.value));
              }}
            />
          </label>
        </div>

        {/* Adults */}
        <div
          className={`
            ${styles.filterItem} ${
            mode === "dark" ? styles.filterItemDark : styles.filterItemLight
          }
          `}
        >
          <label>
            Adults :
            <input
              className={`
           ${
             mode === "dark" ? styles.filterInputDark : styles.filterInputLight
           }`}
              type="number"
              min="1"
              value={filters.guests}
              onChange={(e) => {
                dispatch(setGuests(parseInt(e.target.value)));
                dispatch(changeGuests(parseInt(e.target.value)));
              }}
            />
          </label>
        </div>

        {/* Price */}
        <div
          className={`
            ${styles.filterItem} ${
            mode === "dark" ? styles.filterItemDark : styles.filterItemLight
          }
          `}
        >
          <label>Max Price (₹ per/night) : </label>
          <label style={{ fontWeight: "500", textAlign: "center" }}>
            {filters.price}
          </label>
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={filters.price}
            onChange={(e) => {
              dispatch(setPrice(e.target.value));
            }}
          />
        </div>
        <div className={styles.panelMenuDown}>
          <div
            className={`flex flex-row 
            ${styles.filterItem} ${
              mode === "dark" ? styles.filterItemDark : styles.filterItemLight
            }
          `}
          >
            <label>Location : </label>
            <input
              className={`
           ${
             mode === "dark" ? styles.filterInputDark : styles.filterInputLight
           }`}
              type="text"
              value={filters.city}
              onChange={(e) => {
                dispatch(setCity(e.target.value));
              }}
            />
          </div>
          <div
            className={` flex flex-row 
            ${styles.filterItem} ${
              mode === "dark" ? styles.filterItemDark : styles.filterItemLight
            }
          `}
          >
            <label>Rating : </label>
            <div className="flex flex-col ml-2 gap-1 ">
              <label style={{ fontWeight: "500", textAlign: "center" }}>
                {filters.rating}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={filters.rating}
                onChange={(e) => {
                  dispatch(setRating(e.target.value));
                }}
              />
            </div>
          </div>
          <div
            className={`
            ${styles.filterItem} ${
              mode === "dark" ? styles.filterItemDark : styles.filterItemLight
            }
          `}
          >
            <label>
              Availability :
              <select
                value={filters.availability}
                onChange={(e) => {
                  dispatch(setAvailability(e.target.value));
                }}
              >
                <option value="">--Availability--</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
