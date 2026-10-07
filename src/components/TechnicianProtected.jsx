import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

const TechnicianProtected = ({ children }) => {
  const [, navigate] = useLocation();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("techToken");
    if (!token) {
      navigate("/technician-login");
      return;
    }

    // Validate token with your backend API
    const validateToken = async () => {
      try {
        const response = await fetch("/api/technician/validate", {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });
        if (response.ok) {
          setIsValid(true);
        } else {
          localStorage.removeItem("techToken");
          navigate("/technician-login");
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("techToken");
        navigate("/technician-login");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [navigate]);

  if (isLoading) {
    return <div>Verifying access...</div>;  // Add spinner CSS class
  }

  if (!isValid) {
    return null;
  }

  return <>{children}</>;
};

export default TechnicianProtected;
