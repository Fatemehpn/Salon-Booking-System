import React, { useEffect, useState } from 'react'
import { fetchAvailability } from '../api/api'
import { useNavigate } from 'react-router-dom'

function AvailabilitySelector({ serviceId, staffId, onSelectSlot }) {
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [slots, setSlots]               = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!serviceId || !staffId || !selectedDate) return

    const controller = new AbortController()

    const loadSlots = async () => {
      setLoading(true)
      setError(null)
      setSlots([])
      setSelectedSlot(null)

      try {
        const data = await fetchAvailability(staffId, serviceId, selectedDate)
        if (!controller.signal.aborted) setSlots(data.free_slots ?? [])
      } catch {
        if (!controller.signal.aborted) setError('Failed to load availabilities')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadSlots()
    return () => controller.abort()
  }, [serviceId, staffId, selectedDate])

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
    onSelectSlot(selectedDate, slot)
  }

  // Format "09:00" → "9:00 AM"
  const formatTime = (time) => {
    const [h, m] = time.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hour   = h % 12 || 12
    return `${hour}:${String(m).padStart(2, '0')} ${period}`
  }

  return (
    <div className="container py-4 py-md-5">

      {/* Page header */}
      <div className="text-center mb-4 mb-md-5">
        <h1 className="fw-bold mb-2">Pick a Time</h1>
        <p className="text-muted">Select a date and available slot</p>
      </div>

      {/* Date picker */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-sm-8 col-md-5">
          <label className="form-label fw-semibold">Select Date</label>
          <input
            type="date"
            className="form-control form-control-lg"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Slots area */}
      <div className="mb-5">

        {loading && (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border mb-3" role="status" />
            <p className="mb-0">Checking availability...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {!loading && !error && slots.length === 0 && (
          <div className="text-center text-muted py-4">
            <p className="mb-0">No availability on this date. Please choose another.</p>
          </div>
        )}

        {!loading && slots.length > 0 && (
          <>
            <p className="text-muted text-center mb-3 small">
              {slots.length} slot{slots.length !== 1 ? 's' : ''} available
            </p>
            <div className="row row-cols-3 row-cols-sm-4 row-cols-md-6 g-2 justify-content-center">
              {slots.map(slot => {
                const isSelected = selectedSlot === slot
                return (
                  <div key={slot} className="col">
                    <button
                      className={`btn w-100 ${isSelected ? 'btn-dark' : 'btn-outline-dark'}`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      {formatTime(slot)}
                    </button>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-dark px-4" onClick={() => navigate('/staff')}>
          ← Back
        </button>

        <button
          className={`btn btn-dark px-5 ${!selectedSlot ? 'disabled opacity-50' : ''}`}
          onClick={() => selectedSlot && navigate('/confirm')}
        >
          Confirm →
        </button>
      </div>

    </div>
  )
}

export default AvailabilitySelector