import React, { useState, useEffect } from 'react'
import BookingCard from './BookingCard'
import { fetchServices } from '../api/api'
import { useNavigate } from 'react-router-dom'

function ServiceList({ onSelectService, selectedService }) {
  const navigate = useNavigate()

  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices()
        setServices(data)
      } catch (err) {
        setError('Failed to load services')
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
      <div className="text-center text-muted">
        <div className="spinner-border mb-3" role="status" />
        <p className="mb-0">Loading services...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger text-center">{error}</div>
    </div>
  )

  return (
    <div className="container py-4 py-md-5">

      {/* Page header */}
      <div className="text-center mb-4 mb-md-5">
        <h1 className="fw-bold mb-2">Our Services</h1>
        <p className="text-muted">Choose a service to get started</p>
      </div>

      {/* Service cards grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-4 mb-md-5">
        {services.map((s) => (
          <div key={s.id} className="col">
            <BookingCard
              service    = {s}
              onClick    = {() => onSelectService(s)}
              isSelected = {selectedService?.id === s.id}
            />
          </div>
        ))}
      </div>

      {/* Footer action */}
      <div className="d-flex justify-content-end">
        <button
          className={`btn btn-dark btn-lg px-5 ${!selectedService ? 'disabled opacity-50' : ''}`}
          onClick={() => selectedService && navigate('/staff')}
        >
          Next →
        </button>
      </div>

    </div>
  )
}

export default ServiceList