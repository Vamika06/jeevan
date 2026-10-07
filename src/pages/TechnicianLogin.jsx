import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";
import "./TechnicianLogin.css";

const TechnicianLogin = () => {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "/api/technician/login",
        form
      );

      localStorage.setItem("techToken", res.data.token);
      navigate("/technician-dashboard");
    } catch (err) {
      setError("Invalid technician credentials");
    }
  };

  return (
    <div className="tech-login-page">
      <div className="tech-login-card">
        <h2>Technician Login</h2>
        <p className="subtitle">Authorized technicians only</p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Technician Username"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default TechnicianLogin;
