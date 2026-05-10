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
              <Route path="/" element={<HotelList />}></Route>
              <Route
                path="/hotel-detail/:hotelId"
                element={<HotelDetails />}
              ></Route>
              <Route path="/attractions" element={<Attraction />}></Route>
              <Route path="/auth" element={<AuthForm />}></Route>
              <Route path="/profile" element={<UserProfile />}></Route>
              <Route path="/change-password" element={<PasswordForm />}></Route>
              <Route path="/profile/update" element={<UpdateProfile />}></Route>
              <Route path="/bookings" element={<BookingList />}></Route>
              <Route path="/favorites" element={<FavoriteList />}></Route>
              <Route path="/payment/:bookingId" element={<Payment />} />
              <Route path="/payment" element={<PaymentDetails />} />
              <Route
                path="/payment-success"
                element={<PaymentSuccess />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
