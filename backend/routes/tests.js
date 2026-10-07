const express = require("express");
const router = express.Router();

// Sample tests data
const tests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    description: "Complete blood analysis including RBC, WBC, platelets, and hemoglobin levels",
    price: 300,
    category: "Hematology"
  },
  {
    id: 2,
    name: "Lipid Profile",
    description: "Cholesterol and triglyceride levels for heart health assessment",
    price: 500,
    category: "Cardiac"
  },
  {
    id: 3,
    name: "Thyroid Function Test",
    description: "T3, T4, TSH levels for thyroid health assessment",
    price: 600,
    category: "Endocrine"
  },
  {
    id: 4,
    name: "Blood Sugar Test (Fasting)",
    description: "Fasting glucose monitoring for diabetes screening",
    price: 200,
    category: "Diabetes"
  },
  {
    id: 5,
    name: "Vitamin D Test",
    description: "Check vitamin D levels for bone health",
    price: 800,
    category: "Vitamins"
  },
  {
    id: 6,
    name: "Liver Function Test",
    description: "Comprehensive liver health assessment including ALT, AST, bilirubin",
    price: 700,
    category: "Hepatology"
  },
  {
    id: 7,
    name: "Kidney Function Test",
    description: "Creatinine, urea, and electrolyte levels for kidney health",
    price: 500,
    category: "Nephrology"
  },
  {
    id: 8,
    name: "HbA1c Test",
    description: "Average blood sugar levels over 3 months",
    price: 400,
    category: "Diabetes"
  },
  {
    id: 9,
    name: "Vitamin B12 Test",
    description: "Check vitamin B12 levels for anemia and nerve health",
    price: 600,
    category: "Vitamins"
  },
  {
    id: 10,
    name: "Urine Analysis",
    description: "Complete urine examination for infections and kidney issues",
    price: 250,
    category: "General"
  },
  {
    id: 11,
    name: "ECG (Electrocardiogram)",
    description: "Heart rhythm and electrical activity test",
    price: 400,
    category: "Cardiac"
  },
  {
    id: 12,
    name: "Chest X-Ray",
    description: "X-ray imaging of chest for lung and heart conditions",
    price: 500,
    category: "Radiology"
  }
];

// Get all tests
router.get("/", (req, res) => {
  res.json(tests);
});

// Get test by ID
router.get("/:id", (req, res) => {
  const test = tests.find(t => t.id === parseInt(req.params.id));
  if (!test) {
    return res.status(404).json({ error: "Test not found" });
  }
  res.json(test);
});

module.exports = router;

