/*const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/create", async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(200).json({ message: "Booking saved", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
*/
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { authenticateUser } = require("../middleware/auth");

// POST: Create a booking linked to the logged-in user
router.post("/create", authenticateUser, async (req, res) => {
    try {
        // We spread req.body but override the email with the one from the token
        // This ensures the booking always belongs to the logged-in user
        const booking = new Booking({
            ...req.body,
            email: req.user.email 
        });

        await booking.save();
        res.status(200).json({ message: "Booking saved successfully", booking });
    } catch (err) {
        console.error("Booking creation error:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch bookings for the logged-in user for the dashboard
router.get("/my-bookings", authenticateUser, async (req, res) => {
    try {
        // Filters the database for bookings matching the user's authenticated email
        const userBookings = await Booking.find({ email: req.user.email }).sort({ createdAt: -1 });
        res.status(200).json(userBookings);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

module.exports = router;