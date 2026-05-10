import { createSlice } from "@reduxjs/toolkit";

const DUMMY_FAVORITES = [
  {
    id: "b2",
    email: "abd@gmail.com",
    hotelName: "Ocean View Suites",
    propertyType: "Apartment",
    address: "Mumbai, India",
    checkIn: "2025-11-10",
    checkOut: "2025-11-15",
    nights: 5,
    guests: 2,
    offerPrice: 9900,
    originalPrice: 16000,
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop",
  },
];
const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { favorites: DUMMY_FAVORITES },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action) => {
      state.favorites.filter((fav) => fav.id !== action.payload);
    },
    clearFavorites: (state, action) => {
      state.favorites = [];
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
