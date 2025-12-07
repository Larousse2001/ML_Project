import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import './index.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load the comprehensive JSON from public folder
        const response = await fetch('/ml_project_complete_results.json')
        if (!response.ok) {
          throw new Error('Failed to load results')
        }
        const jsonData = await response.json()
        console.log('Loaded comprehensive ML data:', jsonData)
        setData(jsonData)
      } catch (err) {
        console.error('Error loading data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-lg font-bold">Error: {error}</p>
          <p className="text-sm mt-2">Please ensure ml_project_results.json is in the correct directory</p>
        </div>
      </div>
    )
  }

  return data ? <Dashboard data={data} /> : null
}

export default App
