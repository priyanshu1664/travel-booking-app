import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "/images/app_logo.png";
import styles from "./Header.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../store/modeSlice";
import { setIsLogin, setUserToken } from "../../store/userSlice";
import { FaCog, FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";
import { LuMoon, LuSun } from "react-icons/lu";
import { setSearchVal, toggleDisplayFilter } from "../../store/filterSlice";
import { IoFilterSharp } from "react-icons/io5";
function Header({}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchVal } = useSelector((s) => s.filter);
  const { token, isLogin, user } = useSelector((s) => s.user);
  const { mode } = useSelector((s) => s.mode);
  // console.log(mode);
  const [searchInput, setSearchInput] = useState(searchVal);
  console.log(searchVal);
  const handleModeToggle = () => {
    dispatch(toggleMode());
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    dispatch(setSearchVal(e.target.value));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchVal(searchInput));
  };
  return (
    <header
      style={{
        minHeight: "80px",
        minWidth: "100%",
        marginBottom: "-20px",
        backgroundColor: "#0D3B66",
      }}
    >
      <div className="px-3 py-2 border-bottom border-warning">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className="d-flex align-items-center text-white text-decoration-none"
          >
            <img
              src={logo}
              alt="Logo"
              width="220"
              height="45"
              className="me-2"
            />
          </Link>

          <div>
            {token == null && (
              <>
                <button
                  type="button"
                  className="btn btn-light text-dark me-2"
                  onClick={() => {
                    dispatch(setUserToken(null));
                    dispatch(setIsLogin(true));
                    navigate("/auth");
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={() => dispatch(setIsLogin(false))}
                >
                  Signup
                </button>
              </>
            )}
            {token && (
              <>
                <div className={styles.topRight}>
                  <div className="d-flex align-items-center me-3">
                    <button
                      onClick={handleModeToggle}
                      className="border-0 bg-transparent text-white fs-4"
                    >
                      {mode === "light" ? <LuSun /> : <LuMoon />}
                    </button>
                  </div>

                  <div className="dropdown text-end">
                    <Link
                      to="#"
                      className="d-flex align-items-center link-light text-decoration-none dropdown-toggle"
                      id="dropdownUser1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={
                          user.profileUrl ||
                          "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
                        }
                        alt="profile"
                        width={"32"}
                        height={"32"}
                        className="rounded-circle me-2"
                      />
                      {user.username || "John Doe"}
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-end text-small shadow"
                      aria-label="dropdownUser1"
                    >
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center gap-2"
                          to={"#"}
                        >
                          <FaCog />
                          Settings
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center gap-2"
                          to={"profile"}
                        >
                          <FaUser />
                          Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center gap-2"
                          to={"/change-password"}
                        >
                          <FaKey />
                          Change Password
                        </Link>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={() => {
                            dispatch(setUserToken(null));
                            navigate("/auth");
                          }}
                        >
                          <FaSignOutAlt />
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {token && (
        <div
          className="px-3 py-2   text-white border-bottom mb-3"
          style={{
            marginBottom: "-20px",
            backgroundColor: "#0D3B66",
            height: "90px",
            minWidth: "100%",
            marginBottom: "-20px",
            backgroundColor: "#0D3B66",
          }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            {/* Menu Left */}
            <ul className="nav col-12 col-lg-auto my-2 justify-content-start text-small">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link text-light  ${
                      isActive ? styles.menuActive : styles.menu
                    } `
                  }
                >
                  Stays
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `nav-link text-light  ${
                      isActive ? styles.menuActive : styles.menu
                    } `
                  }
                >
                  Favorites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/bookings"
                  className={({ isActive }) =>
                    `nav-link text-light  ${
                      isActive ? styles.menuActive : styles.menu
                    } `
                  }
                >
                  Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/under-construction"
                  className={({ isActive }) =>
                    `nav-link text-light  ${
                      isActive ? styles.menuActive : styles.menu
                    } `
                  }
                >
                  Flights
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/attraction"
                  className={({ isActive }) =>
                    `nav-link text-light  ${
                      isActive ? styles.menuActive : styles.menu
                    } `
                  }
                >
                  Attractions
                </NavLink>
              </li>
            </ul>
            <div>
              <button
                className={` ${styles.filter} `}
                onClick={() => dispatch(toggleDisplayFilter())}
              >
                <IoFilterSharp />
                Filter
              </button>
            </div>
            {/* Search Right */}
            <form
              className="d-flex me-4"
              role="search"
              onSubmit={handleFormSubmit}
            >
              <input
                type="search"
                className="form-control me-4"
                style={{ flex: "300px 0 0" }}
                placeholder="Search Hotels..."
                aria-label="Search"
                value={searchInput}
                onChange={handleChange}
              />

              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
