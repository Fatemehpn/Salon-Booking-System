import {React, useState} from 'react'

function BookingCard({service, onClick}) {

      const [isbooked, setIsBooked] = useState(false);

  return (
    <div className='card'>
      <div className='card-body'>
            <h2 className='card-title'>{service.name}</h2>
            <p className='card-text'>Duration: {service.duration_min} minutes</p>
            <p className='card-text'>Price: ${service.price}</p>



      </div>

    </div>
  )
}

export default BookingCard