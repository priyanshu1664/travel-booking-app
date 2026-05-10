import { createSlice } from "@reduxjs/toolkit";

const DUMMY_BOOKINGS = [
  // {
  //   id: "b1",
  //   email: "abc123@gmail.com",
  //   hotelName: "Hotel Blue Lagoon",
  //   propertyType: "Hotel",
  //   address: "Pune, India",
  //   checkIn: "2025-10-01",
  //   checkOut: "2025-10-05",
  //   nights: 4,
  //   guests: 2,
  //   offerPrice: 7200,
  //   originalPrice: 12000,
  //   status: "Confirmed",
  //   image:
  //     "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&auto=format&fit=crop",
  // },
  // {
  //   id: "b2",
  //   email: "abd@gmail.com",
  //   hotelName: "Ocean View Suites",
  //   propertyType: "Apartment",
  //   address: "Mumbai, India",
  //   checkIn: "2025-11-10",
  //   checkOut: "2025-11-15",
  //   nights: 5,
  //   guests: 2,
  //   offerPrice: 9900,
  //   originalPrice: 16000,
  //   status: "Pending",
  //   image:
  //     "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop",
  // },
];

let bookingSlice = createSlice({
  name: "booking",
  initialState: { bookings: DUMMY_BOOKINGS },
  reducers: {
    setBooking: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings = [...state.bookings, action.payload];
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
    clearBooking: (state, action) => {
      state.bookings = [];
    },
  },
});

export const { setBooking, addBooking, deleteBooking, clearBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
