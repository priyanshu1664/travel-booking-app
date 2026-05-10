import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  FaHome,
  FaBook,
  FaHeart,
  FaCreditCard,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../store/userSlice";
function Sidebar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUserToken(null));
  };
  return (
    <div
      className="d-flex flex-column  p-3"
      style={{
        width: "280px",
        minHeight: "100vh",
        marginTop: "-30px",
        backgroundColor: "#005366",
      }}
    >
      <div
        className={`bg-secondary text-light p-4 my-1 shadow-sm d-flex flex-column align-items-center ${styles.offer}`}
      >
        <h6 className="fw-bold">✨ Special Offer ✨</h6>
        <p className="small mb-1">
          "Book you dream stay today and save <strong>20%</strong> on your first
          booking!"
        </p>
      </div>
      <hr />

      <ul className="nav nav-pills flex-column gap-1 text-light mb-auto">
        <li className="nav-item">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `nav-link mx-2 d-flex flex-row align-items-center gap-2  ${
                isActive ? styles.showActive : styles.menu
              }`
            }
          >
            <FaHome /> Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/bookings"}
            className={({ isActive }) =>
              `nav-link mx-2 d-flex flex-row align-items-center gap-2  ${
                isActive ? styles.showActive : styles.menu
              }`
            }
          >
            <FaBook /> Bookings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/favorites"}
            className={({ isActive }) =>
              `nav-link mx-2 d-flex flex-row align-items-center gap-2  ${
                isActive ? styles.showActive : styles.menu
              }`
            }
          >
            <FaHeart /> Favorites
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/payment"}
            className={({ isActive }) =>
              `nav-link mx-2 d-flex flex-row align-items-center gap-2  ${
                isActive ? styles.showActive : styles.menu
              }`
            }
          >
            <FaCreditCard /> Payments
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              `nav-link mx-2 d-flex flex-row align-items-center gap-2  ${
                isActive ? styles.showActive : styles.menu
              }`
            }
          >
            <FaUser /> Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/auth"}
            onClick={handleLogout}
            className={({ isActive }) =>
              `nav-link mx-2 d-flex flex-row align-items-center gap-2  ${
                isActive ? styles.showActive : styles.menu
              }`
            }
          >
            <FaSignOutAlt /> Logout
          </NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Sidebar;
