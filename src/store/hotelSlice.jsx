import { createSlice } from "@reduxjs/toolkit";
const initialState = { hotels: [], selectedHotel: null };
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    toggleAvailable: (state, action) => {
      const hotel = state.hotels.filter((hotel) => hotel.id === action.payload);
      if (hotel) {
        hotel.isAvailable = !hotel.isAvailable;
      }
    },
    addHotel: (state, action) => {
      state.hotels = [...state.hotels, action.payload];
    },
    selectHotel: (state, action) => {
      state.selectedHotel = action.payload;
    },
    removeHotel: (state, action) => {
      if (state.hotels.length > 0) {
        state.hotels.filter((hotel) => hotel.id !== action.payload);
      }
    },
    changeNights: (state, action) => {
      state.nights = state.hotels.map(
        (hotel) => (hotel.nights = action.payload)
      );
    },
    changeGuests: (state, action) => {
      state.guests = state.hotels.map(
        (hotel) => (hotel.guests = action.payload)
      );
    },
  },
});

export const {
  setHotels,
  toggleAvailable,
  selectHotel,
  removeHotel,
  addHotel,
  changeNights,
  changeGuests,
} = hotelSlice.actions;

export default hotelSlice.reducer;
