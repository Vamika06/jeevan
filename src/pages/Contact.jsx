import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl">We’re here to help you 24/7</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-4">📞 +91 9876543210</p>
          <p className="text-gray-600 mb-4">✉️ info@jeevancare.com</p>
          <p className="text-gray-600 mb-4">🏢 Chennai, Tamil Nadu</p>
        </div>

        <form className="bg-white p-8 rounded-xl shadow-md space-y-4">
          <input className="w-full border p-3 rounded" placeholder="Your Name" />
          <input className="w-full border p-3 rounded" placeholder="Your Email" />
          <textarea className="w-full border p-3 rounded" rows="4" placeholder="Your Message"></textarea>
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
