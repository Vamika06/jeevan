import React from "react";

function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl">Professional diagnostic services delivered to your home</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          { icon: "🏠", title: "Home Sample Collection", desc: "Trained technicians collect samples at your convenience." },
          { icon: "🔬", title: "Advanced Lab Testing", desc: "State-of-the-art NABL certified labs for accurate results." },
          { icon: "📊", title: "Digital Reports", desc: "Get reports instantly on your phone and email." },
          { icon: "🩺", title: "Doctor Consultation", desc: "Expert medical advice after your reports." },
          { icon: "⏱️", title: "Fast Turnaround", desc: "Same-day or next-day reporting for most tests." },
          { icon: "🔒", title: "Secure Data Handling", desc: "Your medical data is fully confidential and protected." }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <div className="text-4xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
