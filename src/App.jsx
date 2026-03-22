import { useState,useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'
import ServiceList from './components/ServiceList'
import StaffSelector from './components/StaffSelector';
import {apiFetch} from ".//api/api";


function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  return (
    <>

      <div className='body-wrapper'>
        <Header/>
        <Routes>
          <Route path='/'
                 element= {
                                 
                  <ServiceList 
                    onSelectService = {setSelectedService}
                    selectedService = {selectedService}
                  />
                 }
          />

          <Route path='/staff'
                 element={                       
                    selectedService &&
                    <StaffSelector
                      serviceId       = {selectedService.id}
                      salonId         = {selectedService.salon_id}
                      onSelectedStaff = {setSelectedStaff}
                    />    
                 }
          />
        </Routes>



      </div>

    </>
  )
}

export default App
