import { useState,useEffect } from 'react'
import Header from './components/Header'
import ServiceList from './components/ServiceList'
import './App.css'
import {apiFetch} from ".//api/api";

function App() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <Header/>
      <ServiceList onSelectService = {setSelectedService}/>
    </>
  )
}

export default App
