import React from 'react'

function BookingCard({ service, onClick, isSelected }) {
  return (
    <div
      className={`card h-100 ${isSelected ? 'border-2 border-dark shadow' : 'border shadow-sm'}`}
      style={{ cursor: 'pointer', transition: 'box-shadow 0.2s, border-color 0.2s' }}
      onClick={onClick}
    >
      <div className="card-body d-flex flex-column p-4">

        {/* Selected badge */}
        {isSelected && (
          <span className="badge bg-dark mb-3 align-self-start">✓ Selected</span>
        )}

        {/* Service name */}
        <h5 className="card-title fw-bold mb-3">{service.name}</h5>

        {/* Details */}
        <ul className="list-unstyled text-muted mb-4 flex-grow-1">
          <li className="mb-1">
            <small>⏱ {service.duration_min} minutes</small>
          </li>
          <li>
            <small>💲{service.price}</small>
          </li>
        </ul>

        {/* CTA button */}
        <button
          className={`btn w-100 ${isSelected ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>

      </div>
    </div>
  )
}

export default BookingCard