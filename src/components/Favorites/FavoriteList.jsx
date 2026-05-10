import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuHeading3 } from "react-icons/lu";
import useFetchProfile from "../../hooks/useFetchProfile";
import LoadingSpinner from "../Layouts/LoadingSpinner";
import styles from "./FavoriteList.module.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { addBooking, setBooking } from "../../store/bookingSlice";
import { db } from "../../firebase/firebaseConfig";
import FavoriteCard from "./FavoriteCard";
import { setFavorites } from "../../store/favoriteSlice";

function FavoriteList() {
  let dispatch = useDispatch();
  const { loading, error } = useFetchProfile();

  const favorites = useSelector((s) => s.favorite.favorites);
  const { user, token } = useSelector((s) => s.user);
  const { mode } = useSelector((s) => s.mode);
  // console.log("DUMMY_BOOKINGS", DUMMY_BOOKINGS);
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        toast.error("No logged-in user found ");
        console.warn("No logged-in user found ");
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, "favorites"));

        const favoritesWithId = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(bookingWithId);
        dispatch(setFavorites(favoritesWithId));
        console.log("Favorites List Fetched");
      } catch (error) {
        console.log("Error Occured While Fetching Favorites", error);
      }
    };

    fetchFavorites();
  }, [dispatch, user]);

  let filteredFavorites = [];
  if (favorites.length > 0) {
    filteredFavorites = favorites.filter((fav) => fav.email === user.email);
  }

  // console.log("filteredFavorites", filteredFavorites);
  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div
      className={`${styles.bookingContainer} ${
        mode === "dark" ? styles.dark : styles.light
      }`}
    >
      {token && (
        <>
          <h1 className="mb-5">Favorite List:</h1>
          {filteredFavorites?.length === 0 ? (
            <h4>No Favorites Found.</h4>
          ) : (
            filteredFavorites?.map((favorite) => (
              <FavoriteCard key={favorite.id} favorite={favorite} />
            ))
          )}
        </>
      )}
    </div>
  );
}

export default FavoriteList;
