import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router";
import useFetchProfile from "../../hooks/useFetchProfile";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, setUserData, loading, error } = useFetchProfile();
  const { user } = useSelector((state) => state.user);
  //console.log("Redux userData", user);
  // console.log(auth.currentUser);
  //console.log(userData);

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
        <h1 className={styles.title}>User Profile</h1>

        <div className={styles.card}>
          <div className={styles.profileInfo}>
            <img
              src={
                userData.profileUrl ||
                "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
              }
              alt="profile"
              className={styles.profileImage}
            />

            <div className={styles.details}>
              <div>
                <strong>User Name :</strong>{" "}
                <p className="capitalize">{userData.username || "N/A"}</p>
              </div>
              <div>
                <strong>Email :</strong>
                <p className="">{userData.email || "N/A"}</p>
              </div>
              <div>
                <strong>Phone :</strong> <p>{userData.phone || "N/A"}</p>
              </div>
              <div>
                <strong>Profile Url :</strong>{" "}
                <p>{userData.profileUrl !== "" ? "true" : "false"}</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/profile/update")}
              className={` ${styles.submitBtn}`}
            >
              Update Profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
