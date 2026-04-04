import {React,useState,useEffect} from 'react'
import BookingCard from './BookingCard'
import {fetchServices} from '../api/api'
import { useNavigate } from 'react-router-dom';

function ServiceList({onSelectService, selectedService}) {
      const navigate = useNavigate();


      const [services, setServices]               = useState([]);
      const [loading, setLoading]                 = useState(true);
      const [error, setError]                     = useState(null);
      useEffect(() => {
            const loadServices = async () =>{
                  try{
                        const data = await fetchServices();
                        setServices(data);
                  
                  } catch(err) {
                        setError('Failed to load services');
                  } finally{
                        setLoading(false);
                  }
            }

            loadServices();
      }, [])

      if (loading) return <p>Loading services...</p>;
      if (error) return <p>{error}</p>;

      return (
      <div className='container text-center'>
            <h2>Select a service</h2>
            <div className='row'>
                  {
                        services.map((s) => (          
                              <div key={s.id} className='col col-md-auto'>
                                    <BookingCard
                                          service  = {s}
                                          onClick =  {() => 
                                                onSelectService(s)
                                          }
                                          isSelected = {selectedService?.id === s.id}
                                    /> 
                              </div>                    

                           )
                        )
                  }
            </div>
                  <button onClick={
                        () => selectedService != null ? navigate('/staff') : null
                  }>
                        Next
                  </button>
      </div>
  )
}

export default ServiceList