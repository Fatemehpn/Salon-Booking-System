import { useState,useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header'
import ServiceList from './components/ServiceList'
import StaffSelector from './components/StaffSelector';
import {apiFetch} from ".//api/api";
import AvailabilitySelector from './components/AvailabilitySelector';
import AppointmentConfirmation from './components/AppointmentConfirmation';


function App() {
  const [selectedService, setSelectedService]   = useState(null);
  const [selectedStaff, setSelectedStaff]       = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const navigate = useNavigate();

  return (
    <>

      <div className='body-wrapper' >
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

          <Route path='/availability'
                 element={
                  selectedStaff ?
                  <AvailabilitySelector
                    serviceId = {selectedService.id}
                    staffId   = {selectedStaff.id}
                    onSelectSlot = { (date, time) => {
                      setSelectedDateTime({ date, time });
                    }

                    }
                  />
                  : 'Select a staff first'
                 }
          />

          <Route
            path='/confirm'
            element={
              selectedService && selectedStaff && selectedDateTime?
              (<AppointmentConfirmation
                  selectedService  = {selectedService}
                  selectedStaff    = {selectedStaff}
                  selectedDateTime = {selectedDateTime}
                  onConfirm={() => {
                    setSelectedService(null);
                    setSelectedStaff(null);
                    setSelectedDateTime(null);
                    navigate('/');
                  }}

                  onCancel = {() => navigate('availability')}
              
              />)
              : (<Navigate to="/" replace />)
            }
          />
        </Routes>



      </div>

    </>
  )
}

export default App
