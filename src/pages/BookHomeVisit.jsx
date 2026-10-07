import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

// ── All available tests & packages with categories and prices ─────────────────
const ALL_SERVICES = [
  // Hematology
  { name: "Complete Blood Count (CBC)", category: "Hematology", price: 300, icon: "🩸" },
  // Cardiac
  { name: "Lipid Profile", category: "Cardiac", price: 500, icon: "🫀" },
  { name: "ECG (Electrocardiogram)", category: "Cardiac", price: 400, icon: "💓" },
  // Endocrine
  { name: "Thyroid Function Test", category: "Endocrine", price: 600, icon: "🧬" },
  // Diabetes
  { name: "Blood Sugar Test (Fasting)", category: "Diabetes", price: 200, icon: "🍯" },
  { name: "HbA1c Test", category: "Diabetes", price: 400, icon: "📊" },
  // Vitamins
  { name: "Vitamin D Test", category: "Vitamins", price: 800, icon: "☀️" },
  { name: "Vitamin B12 Test", category: "Vitamins", price: 600, icon: "💊" },
  // Hepatology
  { name: "Liver Function Test", category: "Hepatology", price: 700, icon: "🫁" },
  // Nephrology
  { name: "Kidney Function Test", category: "Nephrology", price: 500, icon: "🫘" },
  // General
  { name: "Urine Analysis", category: "General", price: 250, icon: "🔬" },
  // Radiology
  { name: "Chest X-Ray", category: "Radiology", price: 500, icon: "📷" },
  // Packages
  { name: "Basic Health Package", category: "Packages", price: 1200, icon: "📦" },
  { name: "Comprehensive Health Package", category: "Packages", price: 3500, icon: "📦" },
  { name: "Premium Health Package", category: "Packages", price: 6500, icon: "📦" },
  { name: "Diabetes Care Package", category: "Packages", price: 1800, icon: "📦" },
  { name: "Cardiac Health Package", category: "Packages", price: 4500, icon: "📦" },
  { name: "Women's Health Package", category: "Packages", price: 4000, icon: "📦" },
];

const CATEGORIES = ["All", ...Array.from(new Set(ALL_SERVICES.map(s => s.category)))];

const TIME_SLOTS = [
  '8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'
];

// ── Test Selector Panel ───────────────────────────────────────────────────────
function TestSelector({ selected, onToggle }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ALL_SERVICES.filter(s => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const isSelected = (name) => selected.some(s => s.name === name);

  return (
    <div className="border-2 border-blue-100 rounded-xl overflow-hidden">
      {/* Search bar */}
      <div className="p-3 bg-blue-50 border-b border-blue-100">
        <input
          type="text"
          placeholder="🔍  Search tests or packages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 p-3 bg-white border-b border-gray-100 overflow-x-auto flex-nowrap scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service cards grid */}
      <div className="max-h-64 overflow-y-auto p-3 bg-white grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.length === 0 && (
          <p className="col-span-2 text-center text-gray-400 text-sm py-6">No tests found</p>
        )}
        {filtered.map(service => {
          const sel = isSelected(service.name);
          return (
            <button
              key={service.name}
              type="button"
              onClick={() => onToggle(service)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                sel
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-100 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <span className="text-2xl">{service.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold truncate ${sel ? 'text-blue-700' : 'text-gray-800'}`}>
                  {service.name}
                </p>
                <p className="text-xs text-gray-400">{service.category}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`text-xs font-bold ${sel ? 'text-blue-600' : 'text-green-600'}`}>
                  ₹{service.price}
                </span>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  sel ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {sel ? '✓' : '+'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Cart Summary ──────────────────────────────────────────────────────────────
function CartSummary({ items, onRemove }) {
  const total = items.reduce((sum, s) => sum + s.price, 0);
  if (items.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-blue-800 text-sm flex items-center gap-2">
          🛒 Selected Services
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{items.length}</span>
        </h4>
        <span className="text-sm font-bold text-green-600">Est. ₹{total.toLocaleString()}</span>
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <span className="text-xs font-medium text-gray-700 truncate max-w-36">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-green-600">₹{item.price}</span>
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="w-5 h-5 rounded-full bg-red-100 text-red-500 hover:bg-red-200 flex items-center justify-center text-xs font-bold transition-all"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-blue-200 flex justify-between items-center">
        <span className="text-xs text-gray-500">Home collection included</span>
        <span className="text-base font-bold text-blue-700">Total: ₹{total.toLocaleString()}</span>
      </div>
    </div>
  );
}

// ── Success Screen ─────────────────────────────────────────────────────────────
function SuccessScreen({ bookedServices, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-8 text-center text-white">
          <div className="text-6xl mb-3 animate-bounce">✓</div>
          <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
          <p className="text-green-100 mt-1 text-sm">Our technician will contact you soon</p>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">Services Booked:</h3>
          <div className="space-y-2 mb-6">
            {bookedServices.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                <span>{s.icon} {s.name}</span>
                <span className="ml-auto text-green-600 font-medium">₹{s.price}</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-3 mb-6 text-center">
            <p className="text-xs text-gray-500">Total estimate</p>
            <p className="text-2xl font-bold text-blue-600">₹{bookedServices.reduce((s,i) => s+i.price,0).toLocaleString()}</p>
          </div>
          <button
            onClick={onBack}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main BookHomeVisit Component ───────────────────────────────────────────────
function BookHomeVisit() {
  const [, setLocation] = useLocation();

  const selectedTest    = localStorage.getItem('selectedTest')    ? JSON.parse(localStorage.getItem('selectedTest'))    : null;
  const selectedPackage = localStorage.getItem('selectedPackage') ? JSON.parse(localStorage.getItem('selectedPackage')) : null;

  // Pre-fill from localStorage if coming from Tests/Packages page
  const getInitialServices = () => {
    if (selectedTest) {
      const match = ALL_SERVICES.find(s => s.name === selectedTest.name);
      return match ? [match] : [];
    }
    if (selectedPackage) {
      const match = ALL_SERVICES.find(s => s.name === selectedPackage.name);
      return match ? [match] : [];
    }
    return [];
  };

  const [selectedServices, setSelectedServices] = useState(getInitialServices);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', preferredDate: '', preferredTime: '', notes: ''
  });
  const [isLoading, setIsLoading]     = useState(false);
  const [success, setSuccess]         = useState(false);
  const [bookedServices, setBookedServices] = useState([]);
  const [error, setError]             = useState('');
  const cartRef = useRef(null);

  // ── Auth guard: redirect unauthenticated users to login ──────────────────
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      // Save intended destination so Login can redirect back
      localStorage.setItem('redirectAfterLogin', '/book-home-visit');
      setLocation('/login');
    }
  }, []);

  useEffect(() => {
    if (selectedTest)    localStorage.removeItem('selectedTest');
    if (selectedPackage) localStorage.removeItem('selectedPackage');
  }, []);

  // Scroll to cart when first item added
  useEffect(() => {
    if (selectedServices.length === 1 && cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedServices.length]);

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.some(s => s.name === service.name)
        ? prev.filter(s => s.name !== service.name)
        : [...prev, service]
    );
  };

  const removeService = (service) => {
    setSelectedServices(prev => prev.filter(s => s.name !== service.name));
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const hasPackage = selectedServices.some(s => s.category === 'Packages');
  const bookingType = hasPackage ? 'package' : 'test';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedServices.length === 0) { setError('Please select at least one test or package.'); return; }
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('userToken');
      const payload = {
        ...formData,
        services: selectedServices,
        bookingType,
      };

      const res = await fetch("/api/book-home-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setBookedServices(selectedServices);
        setSuccess(true);
      } else {
        setError(data.error || "Booking failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) return <SuccessScreen bookedServices={bookedServices} onBack={() => setLocation('/')} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center h-16">
          <button onClick={() => setLocation('/')} className="text-2xl font-bold text-blue-600">JeevanCare</button>
          <div className="flex items-center gap-3">
            {selectedServices.length > 0 && (
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                {selectedServices.length} test{selectedServices.length > 1 ? 's' : ''} selected
              </span>
            )}
            <button onClick={() => setLocation('/')} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium">
              ← Back
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Home Visit</h1>
          <p className="text-gray-500 mt-2">Select multiple tests, fill your details, and we'll come to you</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* LEFT COLUMN — Test Selector + Cart */}
            <div className="lg:col-span-3 space-y-4">

              {/* Step 1 — Select Tests */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h2 className="font-bold text-gray-800">Select Tests / Packages</h2>
                    <p className="text-gray-400 text-xs">Pick one or more — mix & match freely</p>
                  </div>
                </div>
                <TestSelector selected={selectedServices} onToggle={toggleService} />
              </div>

              {/* Cart */}
              <div ref={cartRef}>
                <CartSummary items={selectedServices} onRemove={removeService} />
              </div>

              {/* Step 2 — Date & Time */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h2 className="font-bold text-gray-800">Pick Date & Time</h2>
                    <p className="text-gray-400 text-xs">When should we visit?</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Preferred Date *</label>
                    <input
                      type="date" name="preferredDate" value={formData.preferredDate}
                      onChange={handleChange} required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Preferred Time *</label>
                    <select
                      name="preferredTime" value={formData.preferredTime}
                      onChange={handleChange} required
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                      <option value="">Select time slot</option>
                      {TIME_SLOTS.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Patient Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h2 className="font-bold text-gray-800">Your Details</h2>
                    <p className="text-gray-400 text-xs">Who should we contact?</p>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm mb-4">{error}</div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1 uppercase tracking-wide">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Eg. Priya Sharma"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1 uppercase tracking-wide">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1 uppercase tracking-wide">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1 uppercase tracking-wide">Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" placeholder="Full address with landmark"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1 uppercase tracking-wide">Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows="2" placeholder="Any special instructions..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || selectedServices.length === 0}
                  className={`mt-5 w-full py-3 rounded-xl font-bold text-white text-sm transition-all ${
                    selectedServices.length === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading
                    ? "Booking..."
                    : selectedServices.length === 0
                    ? "Select at least 1 test"
                    : `Confirm ${selectedServices.length} Test${selectedServices.length > 1 ? 's' : ''} →`
                  }
                </button>
                {selectedServices.length > 0 && (
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Est. total: ₹{selectedServices.reduce((s,i) => s+i.price, 0).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default BookHomeVisit;
