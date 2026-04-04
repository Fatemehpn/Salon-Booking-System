import React, { useEffect, useState } from 'react'
import { fetchStaff } from '../api/api';
import { useNavigate } from 'react-router-dom';

function StaffSelector({serviceId , salonId, onSelectedStaff}) {
    const navigate = useNavigate();
     
    const[staff, setStaff]           = useState([]);
    const[loading, setLoading]       = useState(false);
    const[error, setError]           = useState(null);
    const[selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if(!salonId || !serviceId) return;

        setLoading(true);

        const loadStaff = async () => {
            try{
                const data = await fetchStaff(salonId, serviceId);
                setStaff(data)
            } catch(err){
                setError('Failed to load staff');
            } finally{
                setLoading(false)
            }
        }

        loadStaff();
    },[salonId, serviceId])

    if(loading) return <p>Loading Staff...</p>
    if(error)   return <p>{error}</p>


  return (
    <div className='container'>
       <h2>Choose a stylist</h2>
        {
            staff.length === 0 && !loading && !error && 
            (<p>No stylist available for this service</p>)
        }

        <div>
            {
                staff.map(person=> (
                    <div
                        key={person.id}
                        onClick ={() => {
                                setSelectedId(person.id)
                                onSelectedStaff(person)
                            }
                        }
                        className='person card'
                    >
                        <p>{person.full_name}</p>
                    </div>
                ))
            }
        </div>
            <button
                onClick={() => navigate('/')}
            >
                 Back
            </button>

            <button
                onClick={() => navigate('/availability')}
            >
                 Next
            </button>
    </div>
  )
}

export default StaffSelector