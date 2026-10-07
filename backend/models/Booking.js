const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  // Legacy single service field (kept for backward compat)
  serviceType: String,
  // New: array of selected services
  services: [
    {
      name: String,
      category: String,
      price: Number
    }
  ],
  preferredDate: String,
  preferredTime: String,
  notes: String,
  bookingType: {
    type: String,
    default: "test" // "test" | "package"
  },
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
