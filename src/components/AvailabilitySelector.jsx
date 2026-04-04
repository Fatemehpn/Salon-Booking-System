import React, { useEffect, useState } from 'react'
import {fetchAvailability} from '../api/api'
import { useNavigate } from 'react-router-dom';

function AvailabilitySelector({serviceId, staffId, onSelectSlot}) {
        const today = new Date().toISOString().split('T')[0];
        const[selectedDate, setSelectedDate] = useState(today);
        const[slots, setSlots]               = useState([])
        const[selectedSlot, setSelectedSlot] = useState(null)
        const[loading, setLoading]           = useState(false);
        const[error, setError]               = useState(null);
        const navigate = useNavigate();



        useEffect( () => {
            if(!serviceId || !staffId || !selectedDate) return;

            const loadSlots = async() => {
                setLoading(true);
                setError(false);
                setSlots([]);

                try {
                    const data = await fetchAvailability(staffId, serviceId, selectedDate);
                    console.log('availabilities: ', data);
                    setSlots(data.free_slots);

                }catch{
                    setError('Failed to load availabilities')
                }finally{
                    setLoading(false)
                }
            };

            loadSlots();

        },[serviceId,staffId,selectedDate])

        const handleSlotSelect = (slot) => {
            setSelectedSlot(slot);
            onSelectSlot(selectedDate, slot);
        }


  return (
    <div className='container'>
        <h2>Pick a time</h2>

        <div className='date-picker '>
            <label htmlFor="">Select Date</label>
            <input 
                type="date"
                min={today}
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
            />
        </div>

        {
            slots.length > 0 ?
                 <div>
                        {
                            slots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => handleSlotSelect(slot)}
                                >
                                    {slot}
                                </button>
                            ))
                        }
                </div>
            :
               <p>staff is not available. Please choose another date.</p>

        }

        {
            selectedSlot &&
            (           
                <button
                    onClick={() => navigate('/confirm')}
                >
                    Confirm
                </button>
            )
        }

            <button
                onClick={() => navigate('/staff')}
            >
                 Back
            </button>


    </div>
  )
}

export default AvailabilitySelector