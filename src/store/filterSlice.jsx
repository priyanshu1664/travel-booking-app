// src/store/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const formatDate = (date) => date.toISOString().split("T")[0];
const initialState = {
  displayFilter: false,
  searchVal: "",
  propertyType: "All",
  checkIn: formatDate(today),
  checkOut: formatDate(tomorrow),
  nights: 1,
  guests: 1,
  price: 20000, // max price
  rating: 10,
  city: "",
  availability: "",
};
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleDisplayFilter(state, action) {
      state.displayFilter = state.displayFilter === true ? false : true;
    },
    setPropertyType(state, action) {
      state.propertyType = action.payload;
    },
    setSearchVal(state, action) {
      state.searchVal = action.payload;
    },
    setCheckIn(state, action) {
      state.checkIn = action.payload;
    },
    setCheckOut(state, action) {
      state.checkOut = action.payload;
    },
    setNights(state, action) {
      state.nights = action.payload;
    },
    setGuests(state, action) {
      state.guests = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setAvailability(state, action) {
      state.availability = action.payload;
    },
    setRating(state, action) {
      state.rating = action.payload;
    },
    resetFilters(state) {
      return initialState;
    },
  },
});

export const {
  setCity,
  setAvailability,
  setRating,
  setCheckIn,
  setCheckOut,
  setGuests,
  setNights,
  setPrice,
  setPropertyType,
  setSearchVal,
  toggleDisplayFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
