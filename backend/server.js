require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const Booking = require("./models/Booking");
const Technician = require("./models/Technician");
const authRoutes = require("./routes/auth");
const testsRoutes = require("./routes/tests");
const packagesRoutes = require("./routes/packages");
const bookingsRoutes = require("./routes/bookings");
const { authenticateTechnician, authenticateUser } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "tech_secret_key";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jeevancare";

app.set("trust proxy", 1);
// Frontend and backend share one origin in production; CORS only matters for local Vite dev.
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

/* ================= API ================= */
app.use("/api/auth", authRoutes);
app.use("/api/tests", testsRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/bookings", bookingsRoutes);

app.post("/api/book-home-visit", authenticateUser, async (req, res) => {
  try {
    const { services, ...rest } = req.body;
    // Readable serviceType summary from the selected services
    const serviceType =
      services && services.length > 0
        ? services.map((s) => s.name).join(", ")
        : rest.serviceType || "";

    const booking = new Booking({
      ...rest,
      services: services || [],
      serviceType,
      email: req.user.email, // always the logged-in user's email
    });
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/technician/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const tech = await Technician.findOne({ username });
    if (!tech) return res.status(401).json({ message: "Username not found" });
    if (tech.password !== password) return res.status(401).json({ message: "Password mismatch" });
    const token = jwt.sign({ id: tech._id, role: "technician" }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
});

app.get("/api/technician/validate", authenticateTechnician, (req, res) => {
  res.json({ valid: true, technician: req.technician });
});

app.get("/api/technician/bookings", authenticateTechnician, async (req, res) => {
  try {
    res.json(await Booking.find().sort({ createdAt: -1 }));
  } catch {
    res.status(500).json({ error: "Fetch failed" });
  }
});

app.patch("/api/technician/bookings/:id", authenticateTechnician, async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Unknown /api routes -> JSON 404 (not the website)
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

/* ================= FRONTEND (built by `npm run build`) ================= */
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));
app.get("*", (req, res, next) => {
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) next(); // dist missing in local dev -> use Vite on :5173 instead
  });
});

/* ================= START ================= */
async function seedTechniciansIfEmpty() {
  if ((await Technician.countDocuments()) === 0) {
    await Technician.create([
      { username: "tech001", password: "tech123", name: "Arun Kumar", email: "arun@jeevancare.com" },
      { username: "tech002", password: "tech456", name: "Priya Sharma", email: "priya@jeevancare.com" },
    ]);
    console.log("Default technicians created (tech001/tech123, tech002/tech456)");
  }
}

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedTechniciansIfEmpty();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
