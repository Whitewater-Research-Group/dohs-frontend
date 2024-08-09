import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import axios from 'axios'

const HealthDashboard = () => {
  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      window.location.href = '/login'
    }
  }

  return (
    <>
      <Navbar />

      <div className='min-h-screen bg-gray-100 flex flex-col mt-30'>
        <main className='flex-grow container mx-auto p-4'>
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h1 className='text-2xl font-bold text-gray-800 mb-4'>
              You are seeing this because you are registered as a Health Worker
            </h1>

            <button
              onClick={handleLogout}
              className='mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-danger focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              Logout
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default HealthDashboard
