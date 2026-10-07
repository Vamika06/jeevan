import React, { useState } from 'react';
import { useLocation } from 'wouter';

function Login() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Login failed' }));
        setError(errorData.error || errorData.message || 'Login failed');
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('userToken', data.token);
      }

      // Priority 1: explicit redirect saved by BookHomeVisit auth guard
      const redirectTo = localStorage.getItem('redirectAfterLogin');
      if (redirectTo) {
        localStorage.removeItem('redirectAfterLogin');
        setLocation(redirectTo);
        window.location.reload();
        return;
      }

      // Priority 2: came from Tests or Packages page with a pre-selected item
      const selectedTest    = localStorage.getItem('selectedTest');
      const selectedPackage = localStorage.getItem('selectedPackage');
      if (selectedTest || selectedPackage) {
        setLocation('/book-home-visit');
        window.location.reload();
        return;
      }

      // Default: go to dashboard
      setLocation('/');
      window.location.reload();

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message?.includes('Failed to fetch')
        ? 'Cannot connect to server. Please try again in a moment.'
        : 'Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">JeevanCare</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Show a friendly nudge if redirected from the booking form */}
        {typeof window !== 'undefined' && localStorage.getItem('redirectAfterLogin') === '/book-home-visit' && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4 text-sm">
            Please sign in to continue booking your home visit.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password" name="password" value={formData.password}
              onChange={handleChange} required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit" disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
