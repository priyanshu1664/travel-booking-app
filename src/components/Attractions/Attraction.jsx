import styles from "./Attraction.module.css";

function Attraction() {
  let images = [
    { src: "./images/Agra.jpg", title: "Agra" },
    { src: "./images/Jaipur.jpg", title: "Jaipur" },
    { src: "./images/Kashmir.jpg", title: "Kashmir" },
    { src: "./images/Kerala.jpg", title: "Kerela" },
    { src: "./images/Goa.jpg", title: "Goa" },
  ];
  return (
    <>
      <div className={styles.destinationContainer}>
        <h2 className="mb-5">Visit Destinations</h2>
        <div className={styles.container}>
          {images.map((img, index) => (
            <div
              key={index}
              className={styles.destinationCard}
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: "cover",
              }}
            >
              <span>{img.title}</span>
            </div>
          ))}
        </div>
      </div>{" "}
      <section className={styles.featuresSection}>
        <h2 className={styles.heading}>We've got you covered</h2>
        <p className={styles.subHeading}>Explore top attractions</p>

        <div className={styles.featuresContainer}>
          <div className={styles.featureCard}>
            <h3>Experience the best</h3>
            <p>
              Discover the best of your destination with attractions, tours,
              activities, and more.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>Fast and flexible</h3>
            <p>
              Book tickets online in minutes, with free cancellation on many
              attractions.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>Support when you need it</h3>
            <p>
              Booking.com's global Customer Service team is here to help 24/7.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Attraction;
