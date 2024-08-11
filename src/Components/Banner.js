import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Banner.css"; // Optional CSS import for styling

const formatTime = (seconds) => {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return { days, hours, minutes, secs };
};

const Banner = () => {
  const [bannerData, setBannerData] = useState({
    description: "",
    timer: 0,
    link: "",
    isVisible: false,
  });

  useEffect(() => {
    // Fetch the banner data from the backend
    axios
      .get("http://localhost:5000/api/banner")
      .then((response) => {
        setBannerData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the banner data!", error);
      });
  }, []);

  useEffect(() => {
    let countdown;

    if (bannerData.isVisible && bannerData.timer > 0) {
      countdown = setInterval(() => {
        setBannerData((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
        }));
      }, 1000);
    }

    // Clear the interval when the timer reaches zero
    if (bannerData.timer <= 0) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [bannerData.timer, bannerData.isVisible]);

  const { days, hours, minutes, secs } = formatTime(bannerData.timer);

  if (!bannerData.isVisible || bannerData.timer <= 0) {
    return null; // Don't render the banner if it's not visible or timer has ended
  }

  return (
    <div className="banner">
      <p>{bannerData.description}</p>
      <p className="timer">
        Time remaining:{" "}
        {days > 0 && `${days} days `}
        {hours > 0 && `${hours} hours `}
        {minutes > 0 && `${minutes} minutes `}
        {secs > 0 && `${secs} seconds`}
      </p>
      {bannerData.link && <a href={bannerData.link}>Learn More</a>}
    </div>
  );
};

export default Banner;
