import {React, useState} from 'react'

function BookingCard({service, onClick, isSelected}) {

  return (
    <div className={`card ${isSelected ? 'border-primary shadow' : 'shadow-sm'}`}
    >
      <div className='card-body'>
            <h2 className='card-title'>{service.name}
            </h2>
            <p className='card-text'>Duration: {service.duration_min} minutes</p>
            <p className='card-text'>Price: ${service.price}</p>
            <button className={`btn ${isSelected ? 'btn-success' : 'btn-dark'}`}
                    onClick = {onClick}
            >
              {isSelected ? 'Selected' : 'Book now'}
            </button>
      </div>

    </div>
  )
}

export default BookingCard