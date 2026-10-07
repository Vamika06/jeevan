import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { useAuthStatus } from '../hooks/useAuthStatus'

function Tests() {
  const [, navigate] = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const { isAuthenticated, isLoading: authLoading } = useAuthStatus()
  
  const { data: tests = [], isLoading } = useQuery({
    queryKey: ['/api/tests'],
  })

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBookTest = (test) => {
    if (!isAuthenticated) {
      // Store selected test and redirect to login
      localStorage.setItem('selectedTest', JSON.stringify(test))
      navigate('/login')
      return
    }
    // Store selected test in localStorage and navigate to book home visit
    localStorage.setItem('selectedTest', JSON.stringify(test))
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
              <Link href="/packages">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  View Packages
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Tests</h2>
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">Loading tests...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <div key={test.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.name}</h3>
                  <p className="text-gray-600 mb-4">{test.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">₹{test.price}</span>
                    <button 
                      onClick={() => handleBookTest(test)}
                      className={`px-4 py-2 rounded-md ${
                        isAuthenticated 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
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
                <div className="text-lg text-gray-600">No tests found</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tests