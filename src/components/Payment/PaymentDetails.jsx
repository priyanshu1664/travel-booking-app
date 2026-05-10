// src/components/Payment/PaymentDetails.js

import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "./PaymentDetails.module.css";

function PaymentDetails() {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const { mode } = useSelector((s) => s.mode);
  const { user } = useSelector((s) => s.user);
  let filteredPayments = [];
  if (payments.length > 0) {
    filteredPayments = payments.filter(
      (payment) => payment.userEmail === user.email
    );
  }

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const q = query(
          collection(db, "payments"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const paymentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPayments(paymentData);
      } catch (error) {
        console.log(error);

        toast.error("Error fetching payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h3>Loading Payments...</h3>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${
        mode === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.topSection}>
        <h2 className={styles.heading}>Payment Details</h2>

        <span className={styles.totalBadge}>
          Total Payments: {filteredPayments.length}
        </span>
      </div>

      {filteredPayments.length === 0 ? (
        <div className={styles.emptyCard}>No Payments Found</div>
      ) : (
        <div className={styles.grid}>
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className={`${styles.paymentCard} ${
                mode === "dark" ? styles.cardDark : styles.cardLight
              }`}
            >
              <div className={styles.cardTop}>
                <h5 className={styles.hotelName}>{payment.hotelName}</h5>

                <span className={styles.statusBadge}>{payment.status}</span>
              </div>

              <div className={styles.info}>
                <strong>Amount: </strong>
                <span>₹{payment.amount}</span>
              </div>

              <div className={styles.info}>
                <strong>Email: </strong>
                <span>{payment.userEmail}</span>
              </div>

              <div className={styles.info}>
                <strong>Booking ID: </strong>
                <span>{payment.bookingId}</span>
              </div>

              <div className={styles.info}>
                <strong>Payment ID: </strong>
                <span>{payment.paymentId}</span>
              </div>

              <div className={styles.date}>
                {payment.createdAt?.seconds
                  ? new Date(payment.createdAt.seconds * 1000).toLocaleString()
                  : "Date not available"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentDetails;
