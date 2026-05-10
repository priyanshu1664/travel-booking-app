import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { useSelector } from "react-redux";
import { LuHeading3 } from "react-icons/lu";
import useFetchProfile from "../../hooks/useFetchProfile";
import LoadingSpinner from "../Layouts/LoadingSpinner";
import styles from "./HotelList.module.css";

function HotelList() {
  const DUMMY_HOTELS = useSelector((s) => s.hotel.hotels);
  const { loading, error } = useFetchProfile();
  const { user, token } = useSelector((s) => s.user);
  const { mode } = useSelector((s) => s.mode);
  const filters = useSelector((state) => state.filter);
  let [filteredHotels, setFilteredHotels] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!DUMMY_HOTELS || DUMMY_HOTELS.length === 0) {
      setFilteredHotels([]);
      return;
    }

    let result = [...DUMMY_HOTELS];

    if (filters.propertyType && filters.propertyType !== "All") {
      result = result.filter((hotel) => {
        // console.log(
        //   "hotel.propertyType",
        //   hotel.propertyType,
        //   "filters.propertyType",
        //   filters.propertyType
        // );
        return hotel.propertyType == filters.propertyType;
      });
    }
    if (filters.availability && filters.propertyType !== "") {
      let temp = filters.availability == "true" ? true : false;
      result = result.filter((hotel) => {
        // console.log(
        //   "hotel.isAvailable",
        //   hotel.isAvailable,
        //   "filters.availability",
        //   filters.availability
        // );

        return hotel.isAvailable == temp;
      });
    }

    if (filters.rating) {
      result = result.filter((hotel) => hotel.rating <= filters.rating);
    }

    if (filters.price) {
      result = result.filter((hotel) => hotel.offerPrice <= filters.price);
    }

    if (filters.searchVal && filters.searchVal.trim() !== "") {
      result = result.filter((hotel) =>
        hotel.name.toLowerCase().includes(filters.searchVal.toLowerCase())
      );
    }
    if (filters.city && filters.city.trim() !== "") {
      result = result.filter(
        (hotel) =>
          hotel.city.toLowerCase().includes(filters.city.toLowerCase()) ||
          hotel.address.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    setCurrentPage(1);
    //console.log("result", result);
    setFilteredHotels(result);
  }, [filters, DUMMY_HOTELS, filters.searchVal]);

  const hotelsPerPage = 10;

  const indexOfLastHotel = currentPage * hotelsPerPage;

  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;

  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error}</p>;

  return (
    <div
      className={`${styles.hotelContainer} ${
        mode === "dark" ? styles.dark : styles.light
      }`}
    >
      {token && (
        <>
          <h1 className="mb-5">Available Hotels:</h1>

          {filteredHotels.length === 0 ? (
            <h3>No Hotels Found.</h3>
          ) : (
            <>
              {currentHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}

              <div className={styles.pagination}>
                <button
                  className={styles.pageBtn}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
                {currentPage == 1 &&
                  Array.from({ length: 2 }, (_, index) => {
                    const pageNumber = currentPage + index;

                    if (pageNumber > totalPages) return null;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`${styles.pageBtn} ${
                          currentPage === pageNumber ? styles.activePage : ""
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                {currentPage !== 1 &&
                  Array.from({ length: 3 }, (_, index) => {
                    const pageNumber = currentPage - 1 + index;

                    if (pageNumber > totalPages) return null;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`${styles.pageBtn} ${
                          currentPage === pageNumber ? styles.activePage : ""
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                {currentPage < totalPages - 2 && (
                  <strong className="fw-bold">...</strong>
                )}

                {currentPage < totalPages - 1 &&
                  Array.from({ length: 1 }, (_, index) => {
                    const pageNumber = totalPages + index;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`${styles.pageBtn} ${
                          currentPage === pageNumber ? styles.activePage : ""
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                <button
                  className={styles.pageBtn}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default HotelList;
