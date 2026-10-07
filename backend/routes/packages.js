const express = require("express");
const router = express.Router();

// Sample packages data
const packages = [
  {
    id: 1,
    name: "Basic Health Package",
    description: "Essential tests for routine health monitoring. Perfect for annual checkups.",
    price: 1200,
    testCount: 5,
    tests: [
      "Complete Blood Count (CBC)",
      "Blood Sugar Test (Fasting)",
      "Urine Analysis",
      "Blood Pressure Check",
      "Basic Health Consultation"
    ]
  },
  {
    id: 2,
    name: "Comprehensive Health Package",
    description: "Complete health assessment with specialist consultation. Ideal for detailed health evaluation.",
    price: 3500,
    testCount: 10,
    tests: [
      "Complete Blood Count (CBC)",
      "Lipid Profile",
      "Thyroid Function Test",
      "Blood Sugar Test (Fasting)",
      "Vitamin D Test",
      "Vitamin B12 Test",
      "Liver Function Test",
      "Kidney Function Test",
      "Urine Analysis",
      "Doctor Consultation"
    ]
  },
  {
    id: 3,
    name: "Premium Health Package",
    description: "Advanced diagnostic tests with detailed health report. Best for comprehensive health screening.",
    price: 6500,
    testCount: 15,
    tests: [
      "Complete Blood Count (CBC)",
      "Lipid Profile",
      "Thyroid Function Test",
      "Blood Sugar Test (Fasting)",
      "HbA1c Test",
      "Vitamin D Test",
      "Vitamin B12 Test",
      "Liver Function Test",
      "Kidney Function Test",
      "ECG (Electrocardiogram)",
      "Chest X-Ray",
      "Urine Analysis",
      "Complete Health Report",
      "Specialist Consultation",
      "Follow-up Consultation"
    ]
  },
  {
    id: 4,
    name: "Diabetes Care Package",
    description: "Comprehensive diabetes monitoring package with regular follow-ups.",
    price: 1800,
    testCount: 6,
    tests: [
      "Blood Sugar Test (Fasting)",
      "HbA1c Test",
      "Complete Blood Count (CBC)",
      "Kidney Function Test",
      "Lipid Profile",
      "Diabetes Consultation"
    ]
  },
  {
    id: 5,
    name: "Cardiac Health Package",
    description: "Complete heart health assessment with advanced cardiac tests.",
    price: 4500,
    testCount: 8,
    tests: [
      "Lipid Profile",
      "ECG (Electrocardiogram)",
      "Complete Blood Count (CBC)",
      "Blood Sugar Test (Fasting)",
      "Thyroid Function Test",
      "Chest X-Ray",
      "Cardiac Consultation",
      "Detailed Cardiac Report"
    ]
  },
  {
    id: 6,
    name: "Women's Health Package",
    description: "Comprehensive health package designed specifically for women's health needs.",
    price: 4000,
    testCount: 12,
    tests: [
      "Complete Blood Count (CBC)",
      "Thyroid Function Test",
      "Vitamin D Test",
      "Vitamin B12 Test",
      "Blood Sugar Test (Fasting)",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Urine Analysis",
      "Hormone Profile",
      "Pap Smear",
      "Gynecologist Consultation"
    ]
  }
];

// Get all packages
router.get("/", (req, res) => {
  res.json(packages);
});

// Get package by ID
router.get("/:id", (req, res) => {
  const package = packages.find(p => p.id === parseInt(req.params.id));
  if (!package) {
    return res.status(404).json({ error: "Package not found" });
  }
  res.json(package);
});

module.exports = router;

