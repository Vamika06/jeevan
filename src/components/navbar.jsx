import React from "react";
import { Link, useLocation } from "wouter";
import "./navbar.css";

const Navbar = () => {
  const [, navigate] = useLocation();


  const techToken = localStorage.getItem("techToken");

  const handleLogout = () => {
    localStorage.removeItem("techToken");
    navigate("/");
  };


  const handleTechnicianClick = () => {
    navigate("/technician-login");
  };

  return (
    <nav className="navbar">
      <div className="logo">JEEVANCARE</div>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/book-home-visit">Book a Test</Link>

        {/* Technician button - unified navigation to login */}
        <button
          onClick={handleTechnicianClick}
          className="tech-btn"
        >
          {techToken ? "Technician Dashboard" : "Technician Login"}
        </button>

        {/* Logout button - only visible when technician token exists */}
        {techToken && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
