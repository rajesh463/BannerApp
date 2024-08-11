import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Banner from "./Components/Banner";
import "./App.css"; // Import the CSS file

const App = () => {
  const [bannerData, setBannerData] = useState({
    description: "",
    timer: 60,
    link: "",
    isVisible: true,
  });

  const handleBannerUpdate = (updatedBanner) => {
    setBannerData(updatedBanner);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <Link to="/" className="header-title">
            My Banners
          </Link>
          <nav>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Banner {...bannerData} />} />
            <Route
              path="/dashboard"
              element={<Dashboard onBannerUpdate={handleBannerUpdate} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
