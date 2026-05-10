import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Payment() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { bookings } = useSelector((s) => s.booking);
  const { user } = useSelector((s) => s.user);
  if (bookings.length === 0) {
    return <h4>No Booking Found</h4>;
  }

  let booking = bookings.find((booking) => booking.id === bookingId);
  console.log(booking);

  const handlePayment = async () => {
    try {
      const options = {
        key: import.meta.env.VITE_RZP_TEST_KEY,
        amount: Number(booking.offerPrice.toFixed(2)) * 100,
        currency: "INR",
        name: "TravelBooking",
        description: "Hotel Booking Payment",
        image: "https://cdn-icons-png.flaticon.com/512/201/201623.png",

        handler: async function (response) {
          console.log(response);

          await addDoc(collection(db, "payments"), {
            adminId: booking.adminId,
            bookingId: booking.id,
            hotelName: booking.hotelName,
            amount: booking.offerPrice.toFixed(2) * 100,
            userEmail: user.email,
            paymentId: response.razorpay_payment_id,
            status: "Paid",
            createdAt: new Date(),
          });

          await updateDoc(doc(db, "bookings", booking.id), {
            paymentStatus: "Paid",
          });

          toast.success("Payment Successful!");
          setTimeout(() => {
            navigate("/payment-success");
          }, 1000);
        },

        prefill: {
          name: user.username,
          email: user.email,
        },

        theme: {
          color: "#0D6EFD",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment Failed");
    }
  };
  return (
    <div className="container py-5">
      <div className="card p-4 shadow">
        <h2 className="mb-3">Payment Page</h2>

        <h5>Hotel: {booking.hotelName}</h5>
        <h5>
          {booking.nights} Nights {booking.guests} Guests
        </h5>

        <h5>Amount: ₹{booking.offerPrice.toFixed(2)}</h5>

        <button className="btn btn-primary mt-4" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
