import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import modeSlice from "./modeSlice";
import hotelSlice from "./hotelSlice";
import bookingSlice from "./bookingSlice";
import favoriteSlice from "./favoriteSlice";
import filterSlice from "./filterSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage.default || storage,
  whitelist: ["user", "mode"],
};
const rootReducer = combineReducers({
  user: userSlice,
  hotel: hotelSlice,
  booking: bookingSlice,
  favorite: favoriteSlice,
  mode: modeSlice,
  filter: filterSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
