const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  email: String
});

module.exports = mongoose.model("Technician", technicianSchema);
