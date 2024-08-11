import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = ({ onBannerUpdate }) => {
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(60);
  const [link, setLink] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fetch current banner settings
    axios
      .get("http://localhost:5000/api/banner")
      .then((response) => {
        const { description, timer, link, isVisible } = response.data;
        setDescription(description || "");
        setTimer(timer || 60);
        setLink(link || "");
        setIsVisible(isVisible);
      })
      .catch((error) => console.error("Error fetching banner data:", error));
  }, []);

  const handleSubmit = () => {
    const updatedBanner = { description, timer, link, isVisible };
    axios
      .post("http://localhost:5000/api/banner", updatedBanner)
      .then((response) => {
        onBannerUpdate(updatedBanner);
        alert("Banner updated successfully");
      })
      .catch((error) => console.error("Error updating banner:", error));
  };

  return (
    <div className="dashboard">
      <h2>Banner Dashboard</h2>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Timer (seconds):</label>
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Link:</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div>
        <label>Banner Visibility:</label>
        <input
          type="checkbox"
          checked={isVisible}
          onChange={(e) => setIsVisible(e.target.checked)}
        />
      </div>
      <button onClick={handleSubmit}>Update Banner</button>
    </div>
  );
};

export default Dashboard;
