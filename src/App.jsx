import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";
import Sidebar from "./components/Layouts/Sidebar";
import HotelList from "./components/HotelDisplay/HotelList";
import HotelDetails from "./components/HotelDisplay/HotelDetails";
import Attraction from "./components/Attractions/Attraction";
import AuthForm from "./components/AuthForm/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./components/Profile/UserProfile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import { Toaster } from "react-hot-toast";
import BookingList from "./components/Booking/BookingList";
import { useEffect } from "react";
import { setHotels } from "./store/hotelSlice";
import { getHotelsFromFirebase } from "./firebase/firebaseConfig";
import FavoriteList from "./components/Favorites/FavoriteList";
import FilterPanel from "./components/Layouts/FilterPanel";
import Payment from "./components/Payment/Payment";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import PaymentDetails from "./components/Payment/PaymentDetails";
import PasswordForm from "./components/Profile/PasswordForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((s) => s.user);
  const { mode } = useSelector((s) => s.mode);
  const { hotels } = useSelector((s) => s.hotel);
  const { displayFilter } = useSelector((s) => s.filter);
  //console.log("displayFilter", displayFilter);
  console.log("Token", token !== null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotels = await getHotelsFromFirebase();
        dispatch(setHotels(hotels));
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <>
      <Header />
      {displayFilter && <FilterPanel />}
      <div className="main-layout">
        <div className=" d-flex flex-row mt-5">
          <Toaster />
          {token && <Sidebar />}
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HotelList />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/auth" element={<AuthForm />}></Route>
              <Route
                path="/hotel-detail/:hotelId"
                element={
                  <ProtectedRoute>
                    <HotelDetails />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/attractions"
                element={
                  <ProtectedRoute>
                    <Attraction />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <PasswordForm />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoriteList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payment/:bookingId"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payment-success"
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
