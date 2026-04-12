import React, { useEffect, useState } from 'react'
import { fetchStaff } from '../api/api'
import { useNavigate } from 'react-router-dom'

function StaffSelector({ serviceId, salonId, onSelectedStaff }) {
  const navigate = useNavigate()

  const [staff, setStaff]         = useState([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    if (!salonId || !serviceId) return
    setLoading(true)

    const loadStaff = async () => {
      try {
        const data = await fetchStaff(salonId, serviceId)
        setStaff(data)
      } catch (err) {
        setError('Failed to load staff')
      } finally {
        setLoading(false)
      }
    }
    loadStaff()
  }, [salonId, serviceId])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
      <div className="text-center text-muted">
        <div className="spinner-border mb-3" role="status" />
        <p className="mb-0">Loading stylists...</p>
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


      <div className="text-center mb-4 mb-md-5">
        <h2 className="fw-bold mb-2">Choose a Stylist</h2>
        <p className="text-muted">Select the person you'd like to work with</p>
      </div>


      {staff.length === 0 && (
        <div className="text-center text-muted py-5">
          <p className="mb-0">No stylists available for this service.</p>
        </div>
      )}


      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
        {staff.map(person => {
          const isSelected = selectedId === person.id
          return (
            <div key={person.id} className="col">
              <div
                className={`card h-100 ${isSelected ? 'border-2 border-dark shadow' : 'border shadow-sm'}`}
                style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                onClick={() => {
                  setSelectedId(person.id)
                  onSelectedStaff(person)
                }}
              >
                <div className="card-body d-flex flex-column align-items-center text-center p-4">

                  <div
                    className={`rounded-circle d-flex align-items-center justify-content-center mb-3 fw-bold fs-4 ${isSelected ? 'bg-dark text-white' : 'bg-light text-dark'}`}
                    style={{ width: 64, height: 64, transition: 'background-color 0.2s' }}
                  >
                    {person.full_name.charAt(0).toUpperCase()}
                  </div>

                  <h5 className="card-title fw-bold mb-1">{person.full_name}</h5>
                  <p className="text-muted small mb-3">{person.role}</p>

                  {isSelected && (
                    <span className="badge bg-dark">✓ Selected</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>


      <div className="d-grid d-sm-flex justify-content-sm-between gap-2">
        <button className="btn btn-outline-dark px-4" onClick={() => navigate('/')}>
          ← Back
        </button>
        <button
          className={`btn btn-dark px-5 ${!selectedId ? 'disabled opacity-50' : ''}`}
          onClick={() => selectedId && navigate('/availability')}
        >
          Next →
        </button>
      </div>

    </div>
  )
}

export default StaffSelector