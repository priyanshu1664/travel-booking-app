import React from "react";
import { Link } from "react-router";

function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 ">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-green-600">✓</span>
        </div>

        <h2 className="text-3xl font-bold text-blue-500 mb-3">
          Payment Successful
        </h2>

        <p className="text-gray-600 mb-8">
          Your booking has been confirmed successfully.
        </p>

        <Link
          to="/"
          className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-semibold py-3 px-6 rounded-2xl w-full flex justify-center items-center"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
