import {React,useState,useEffect} from 'react'
import BookingCard from './BookingCard'
import {fetchServices} from '../api/api'

function ServiceList({onSelectService}) {
      const [services, setServices] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError]     = useState(null);

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
            <div className='row'>
                  {
                        services.map((s) => (          
                              <div key={s.id} className='col col-md-auto'>
                                    <BookingCard
                                          service  = {s}
                                          onClick =  {() => onSelectService(s)}
                                    />
                              </div>                    

                           )
                        )
                  }
            </div>

      </div>
  )
}

export default ServiceList