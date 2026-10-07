import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">About JeevanCare</h1>
        <p className="text-xl">Your trusted partner in home healthcare diagnostics</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            JeevanCare is a modern diagnostic service platform focused on delivering
            lab-quality testing directly to your home. We combine technology,
            medical expertise, and convenience to make healthcare easy.
          </p>
          <p className="text-gray-600 mb-4">
            Our mission is to empower people to take control of their health with
            reliable, fast, and affordable diagnostic services.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Certified labs & expert technicians</li>
            <li>✔ Home sample collection</li>
            <li>✔ Fast & accurate reports</li>
            <li>✔ Affordable pricing</li>
            <li>✔ 24/7 customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
