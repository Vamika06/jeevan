import React from "react";
import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Tests from "./pages/Tests.jsx";
import Packages from "./pages/Packages.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import BookHomeVisit from "./pages/BookHomeVisit.jsx";
import TechnicianDashboard from "./pages/TechnicianDashboard.jsx";
import TechnicianLogin from "./pages/TechnicianLogin.jsx";
import TechnicianProtected from "./components/TechnicianProtected.jsx";
import NotFound from "./pages/NotFound.jsx";

// 🔹 Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const endpoint = queryKey[0];
        const { data } = await axios.get(`${endpoint}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("techToken") || ""}`
          }
        });
        return data;
      },
      staleTime: 1000 * 60 * 5,
      retry: 1
    }
  }
});

/* ---------- USER AUTH (PATIENT) ---------- */
function useAuth() {
  const token = localStorage.getItem("userToken");

  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user", token],
    queryFn: async () => {
      if (!token) return null;
      try {
        const { data } = await axios.get("/api/auth/user", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        });
        return data;
      } catch {
        localStorage.removeItem("userToken");
        return null;
      }
    },
    retry: false,
    enabled: !!token
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user
  };
}

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/book-home-visit" component={BookHomeVisit} />
          <Route path="/tests" component={Tests} />
          <Route path="/packages" component={Packages} />
          <Route path="/services" component={Services} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />

          {/* ---------- TECHNICIAN AUTH ---------- */}
          <Route path="/technician-login" component={TechnicianLogin} />

          <Route path="/technician-dashboard">
            <TechnicianProtected>
              <TechnicianDashboard />
            </TechnicianProtected>
          </Route>

          {/* ---------- USER ROUTES ---------- */}
          {isLoading || !isAuthenticated ? (
            <Route path="/" component={Landing} />
          ) : (
            <Route path="/" component={Home} />
          )}

          {/* ---------- 404 ---------- */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
