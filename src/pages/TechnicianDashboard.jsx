import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#facc15", "#34d399"];

function TechnicianDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [searchName, setSearchName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // ---------------- FETCH BOOKINGS (STABLE) ----------------
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("techToken");
      const res = await axios.get("/api/technician/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data || []);
    } catch (err) {
      console.error("Fetch bookings error:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    console.log("Bookings stable:", bookings.length);
  }, [bookings.length]); // Only log on length change

  // ---------------- UPDATE STATUS ----------------
  const updateStatus = async (id) => {
    try {
      const token = localStorage.getItem("techToken");
      await axios.patch(
        `/api/technician/bookings/${id}`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optimistic update
      setBookings(prev =>
        prev.map(b =>
          b._id === id ? { ...b, status: "Completed" } : b
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update status");
      fetchBookings(); // Refresh on error
    }
  };

  // ---------------- FILTER LOGIC ----------------
  const filteredBookings = bookings.filter(b => {
    return (
      b.name?.toLowerCase().includes(searchName.toLowerCase()) &&
      (filterStatus ? b.status === filterStatus : true) &&
      (filterDate ? b.preferredDate === filterDate : true)
    );
  });

  // ---------------- CHART DATA ----------------
  const statusData = [
    { name: "Pending", value: bookings.filter(b => b.status === "Pending").length },
    { name: "Completed", value: bookings.filter(b => b.status === "Completed").length }
  ];

  const serviceData = Object.values(
    bookings.reduce((acc, curr) => {
      const service = curr.serviceType || "Unknown";
      acc[service] = (acc[service] || { service, count: 0 });
      acc[service].count++;
      return acc;
    }, {})
  );

  if (loading) {
    return <h3 className="text-center mt-10">Loading bookings...</h3>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Technician Dashboard</h1>

      {/* Refresh button */}
      <button 
        onClick={fetchBookings}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Refresh Bookings
      </button>

      {/* Rest of your JSX remains exactly the same */}
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h3>Total Bookings</h3>
          <p className="text-3xl font-bold">{bookings.length}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3>Pending</h3>
          <p className="text-3xl font-bold text-yellow-500">{statusData[0].value}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3>Completed</h3>
          <p className="text-3xl font-bold text-green-600">{statusData[1].value}</p>
        </div>
      </div>

      {/* CHARTS - unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="mb-4 font-semibold">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" label>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="mb-4 font-semibold">Services Booked</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={serviceData}>
              <XAxis dataKey="service" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FILTERS - unchanged */}
      <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* TABLE - unchanged */}
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(b => (
              <tr key={b._id} className="text-center">
                <td className="p-2 border">{b.name}</td>
                <td className="p-2 border">{b.email}</td>
                <td className="p-2 border">{b.address}</td>
                <td className="p-2 border">{b.serviceType}</td>
                <td className="p-2 border">{b.preferredDate}</td>
                <td className="p-2 border">{b.preferredTime}</td>
                <td className="p-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      b.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-2 border">
                  {b.status !== "Completed" && (
                    <button
                      onClick={() => updateStatus(b._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TechnicianDashboard;
