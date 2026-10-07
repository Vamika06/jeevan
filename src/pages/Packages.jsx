import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { useAuthStatus } from '../hooks/useAuthStatus'

function Packages() {
  const [, navigate] = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const { isAuthenticated } = useAuthStatus()
  
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['/api/packages'],
  })

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBookPackage = (pkg) => {
    if (!isAuthenticated) {
      // Store selected package and redirect to login
      localStorage.setItem('selectedPackage', JSON.stringify(pkg))
      navigate('/login')
      return
    }
    // Store selected package and navigate to book home visit
    localStorage.setItem('selectedPackage', JSON.stringify(pkg))
    localStorage.setItem('selectedTest', JSON.stringify({ name: pkg.name, price: pkg.price }))
    navigate('/book-home-visit')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">JeevanCare</h1>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/">
                <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                  Home
                </button>
              </Link>
              <Link href="/tests">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  View Tests
                </button>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/book-home-visit">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                      Book Home Visit
                    </button>
                  </Link>
                  <button 
                    onClick={async () => {
                      await fetch('/api/auth/logout', { 
                        method: 'POST',
                        credentials: 'include'
                      })
                      localStorage.removeItem('userToken')
                      navigate('/')
                      window.location.reload()
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Login
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Packages</h2>
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">Loading packages...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Includes {pkg.testCount} tests</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">₹{pkg.price}</span>
                    <button 
                      onClick={() => handleBookPackage(pkg)}
                      className={`px-4 py-2 rounded-md ${
                        isAuthenticated 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                      }`}
                    >
                      {isAuthenticated ? 'Book Now' : 'Login to Book'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <div className="text-lg text-gray-600">No packages found</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Packages
