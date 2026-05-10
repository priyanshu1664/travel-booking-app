import React, { useState } from "react";
import styles from "./UpdateProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase/firebaseConfig";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link } from "react-router";
import useFetchProfile from "../../hooks/useFetchProfile";
import { doc, setDoc } from "firebase/firestore";
import { setUser } from "../../store/userSlice";

function UpdateProfile() {
  const dispatch = useDispatch();
  const { userData, setUserData, loading, error } = useFetchProfile();
  const { user } = useSelector((state) => state.user);
  console.log("Redux userData", user);
  // console.log(auth.currentUser);
  console.log(userData);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("No user is logged in");
      return;
    }
    try {
      await setDoc(doc(db, "users", currentUser.uid), userData, {
        merge: true,
      });
      dispatch(setUser({ ...user, userData }));
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile: " + err.message);
    }
  };

  if (loading)
    return (
      <p className="text-lg flex justify-center font-bold">
        Loading profile...
      </p>
    );
  if (error) return <p>{error}</p>;
  return (
    <div>
      {" "}
      <section className={styles.profileContainer}>
        <div className="d-flex justify-left gap-65">
          <Link to={"/profile"} className={` ${styles.leftArrow}`}>
            <FiArrowLeftCircle />
          </Link>

          <h1 className={styles.title}>UpdateProfile</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.profileInfo}>
            {userData.profileImage}
            <img
              src={
                userData.profileUrl ||
                "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
              }
              alt="profile"
              className={styles.profileImage}
            />

            <div className={styles.details}>
              <p>
                <strong>User Name :</strong>{" "}
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </p>
              <p>
                <strong>Email :</strong>{" "}
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </p>
              <p>
                <strong>Phone :</strong>{" "}
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </p>
              <p>
                <strong>Profile Url :</strong>{" "}
                <input
                  type="text"
                  name="profileUrl"
                  value={userData.profileUrl}
                  onChange={handleChange}
                  placeholder="Enter profile URL number"
                />
              </p>
            </div>
          </div>
          <div className="d-flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className={` ${styles.submitBtn}`}
            >
              Save Profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateProfile;
