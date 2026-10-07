const mongoose = require("mongoose");
const Technician = require("./models/Technician");

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jeevancare");

async function seed() {
  await Technician.deleteMany();

  await Technician.create([
    {
      username: "tech001",
      password: "tech123",
      name: "Arun Kumar",
      email: "arun@jeevancare.com"
    },
    {
      username: "tech002",
      password: "tech456",
      name: "Priya Sharma",
      email: "priya@jeevancare.com"
    }
  ]);

  console.log("✅ Technicians seeded successfully");
  mongoose.disconnect();
}

seed();
