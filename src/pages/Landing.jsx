import React from 'react'
import { Link } from 'wouter'

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {/* Navigation */}
<nav className="bg-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-600">JeevanCare</h1>
      </div>

      {/* Nav links */}
      <div className="flex space-x-4 items-center">
        <Link href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2">Home</Link>
        <Link href="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2">Services</Link>
        <Link href="/tests" className="text-gray-700 hover:text-blue-600 px-3 py-2">Tests</Link>
        <Link href="/packages" className="text-gray-700 hover:text-blue-600 px-3 py-2">Packages</Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2">About</Link>
        <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2">Contact</Link>

        {/* 🔹 Technician Dashboard Button */}
        <Link
          href="/technician-login"
          className="bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-white transition"
        >
          Technician Dashboard
        </Link>

        {/* Login & Sign Up */}
        <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</a>
        <a href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Sign Up</a>
      </div>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <div id="home" className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Home Diagnostic Services
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Get accurate lab tests done at home with certified technicians and real-time reports
          </p>
          <a href="/book-home-visit" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100">
             Book Home Visit
          </a>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Home Services</h3>
            <p className="text-lg text-gray-600">Professional healthcare services delivered to your doorstep</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl mb-4">🏠</div>
              <h4 className="text-xl font-semibold mb-2">Home Collection</h4>
              <p className="text-gray-600">Sample collection at your convenience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl mb-4">📋</div>
              <h4 className="text-xl font-semibold mb-2">Digital Reports</h4>
              <p className="text-gray-600">Get reports on your phone instantly</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl mb-4">🔬</div>
              <h4 className="text-xl font-semibold mb-2">Lab Tests</h4>
              <p className="text-gray-600">Comprehensive diagnostic testing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h4 className="text-xl font-semibold mb-2">Expert Consultation</h4>
              <p className="text-gray-600">Professional medical guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="text-center mb-12 ">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 ">Our Achievements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center transition transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2 ">50,000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center transition transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl font-bold text-green-600 mb-2">1,00,000+</div>
              <p className="text-gray-600">Tests Completed</p>
            </div>
            <div className="text-center transition transform hover:-translate-y-2 hover:shadow-xl ">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <p className="text-gray-600">Lab Partners</p>
            </div>
            <div className="text-centertransition transform hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <p className="text-gray-600">Service Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Tests Section */}
      <div id="tests" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Popular Lab Tests</h3>
            <p className="text-lg text-gray-600">Most requested diagnostic tests by our customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🩸</div>
              <h4 className="text-xl font-semibold mb-2">Complete Blood Count (CBC)</h4>
              <p className="text-gray-600">Complete blood analysis including RBC, WBC, platelets</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🫀</div>
              <h4 className="text-xl font-semibold mb-2">Lipid Profile</h4>
              <p className="text-gray-600">Cholesterol and triglyceride levels for heart health</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🧬</div>
              <h4 className="text-xl font-semibold mb-2">Thyroid Function Test</h4>
              <p className="text-gray-600">T3, T4, TSH levels for thyroid health assessment</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🍯</div>
              <h4 className="text-xl font-semibold mb-2">Blood Sugar Test</h4>
              <p className="text-gray-600">Fasting and post-meal glucose monitoring</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🦴</div>
              <h4 className="text-xl font-semibold mb-2">Vitamin D Test</h4>
              <p className="text-gray-600">Check vitamin D levels for bone health</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🩺</div>
              <h4 className="text-xl font-semibold mb-2">Liver Function Test</h4>
              <p className="text-gray-600">Comprehensive liver health assessment</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/tests">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
                View All Tests
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Health Packages Section */}
      <div id="packages" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Health Packages</h3>
            <p className="text-lg text-gray-600">Comprehensive health checkup packages at affordable prices</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md flex flex-col justify-between">
              <h4 className="text-2xl font-bold text-blue-600 mb-4">Basic Health Package</h4>
              <p className="text-gray-600 mb-4">Essential tests for routine health monitoring</p>
              <ul className="text-sm text-gray-600 mb-6">
                <li>• Complete Blood Count</li>
                <li>• Blood Sugar Test</li>
                <li>• Urine Analysis</li>
                <li>• Blood Pressure Check</li>
              </ul>
              <div className="text-center">
                <Link href="/packages">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    View Package
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow-md flex flex-col justify-between">
              <h4 className="text-2xl font-bold text-green-600 mb-4">Comprehensive Package</h4>
              <p className="text-gray-600 mb-4">Complete health assessment with specialist consultation</p>
              <ul className="text-sm text-gray-600 mb-6">
                <li>• All Basic Package tests</li>
                <li>• Lipid Profile</li>
                <li>• Thyroid Function</li>
                <li>• Vitamin D & B12</li>
                <li>• Doctor Consultation</li>
              </ul>
              <div className="text-center">
                <Link href="/packages">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                    View Package
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg shadow-md flex flex-col justify-between">
              <h4 className="text-2xl font-bold text-purple-600 mb-4">Premium Package</h4>
              <p className="text-gray-600 mb-4">Advanced diagnostic tests with detailed health report</p>
              <ul className="text-sm text-gray-600 mb-6">
                <li>• All Comprehensive tests</li>
                <li>• Cardiac Risk Assessment</li>
                <li>• Cancer Markers</li>
                <li>• Allergy Panel</li>
                <li>• Detailed Health Report</li>
              </ul>
              <div className="text-center">
                <Link href="/packages">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                    View Package
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
            <p className="text-lg text-gray-600">Real experiences from our satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">"Excellent service! The technician was very professional and the reports came quickly. Highly recommend JeevanCare."</p>
              <div className="font-semibold text-gray-900">- Priya </div>
              <div className="text-gray-500 text-sm">Velachery</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">"Very convenient service. Got my complete health checkup done at home. The reports are detailed and easy to understand."</p>
              <div className="font-semibold text-gray-900">- Rajesh Kumar</div>
              <div className="text-gray-500 text-sm">Adambakkam</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 mb-4">"Great experience! The staff is courteous and the digital reports feature is amazing. Will definitely use again."</p>
              <div className="font-semibold text-gray-900">- Anita </div>
              <div className="text-gray-500 text-sm">Nanganallur</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">About JeevanCare</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Your Health, Our Priority</h4>
              <p className="text-gray-600 mb-6">
                JeevanCare is a leading provider of home diagnostic services, committed to making healthcare accessible and convenient for everyone. With our team of certified professionals and state-of-the-art technology, we bring lab-quality testing directly to your doorstep.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to revolutionize healthcare by providing accurate, timely, and affordable diagnostic services that help you take control of your health journey.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">100+</div>
                  <div className="text-sm text-gray-600">Test Types</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us?</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  NABL certified labs and equipment
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Qualified and experienced technicians
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Same-day and next-day reporting
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Secure and confidential handling
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Affordable and transparent pricing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-lg text-gray-600">Ready to book your home diagnostic service?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h4 className="text-xl font-semibold mb-2">Call Us</h4>
              <p className="text-gray-600">+91 9876543210</p>
              <p className="text-gray-600">Available 24/7</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✉️</div>
              <h4 className="text-xl font-semibold mb-2">Email Us</h4>
              <p className="text-gray-600">info@jeevancare.com</p>
              <p className="text-gray-600">support@jeevancare.com</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="text-xl font-semibold mb-2">Visit Us</h4>
              <p className="text-gray-600">Sakthi Nagar,Adambakkam</p>
              <p className="text-gray-600">Chennai,Tamil Nadu</p>
            </div>
          </div>
          <div className="text-center mt-12">
          <Link href="/book-home-visit">
  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
    Book Your Test Now
  </button>
</Link>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">JeevanCare</h3>
              <p className="text-gray-400 mb-4">Your trusted partner in health. Professional home diagnostic services delivered with care.</p>
              <div className="flex space-x-4">
                <div className="text-2xl">📘</div>
                <div className="text-2xl">📸</div>
                <div className="text-2xl">🐦</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#tests" className="hover:text-white">Lab Tests</a></li>
                <li><a href="#packages" className="hover:text-white">Health Packages</a></li>
                <li><a href="#services" className="hover:text-white">Home Collection</a></li>
                <li><a href="#about" className="hover:text-white">Consultation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91 9876543210</p>
                <p>✉️ info@jeevancare.com</p>
                <p>🏢 Sakthi Nagar,Adambakkam,Chennai</p>
                <p>🕐 24/7 Service Available</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JeevanCare. All rights reserved. | Professional Home Diagnostic Services</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing