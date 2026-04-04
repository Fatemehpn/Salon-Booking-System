const API_BASE_URL = 'http://localhost:3000';

//Helper function
export async function apiFetch(endpoint, options={}){
      const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : "/"}${endpoint}`;
      
      try{
            const response = await fetch(url, {
                  ...options,
                  headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                  }
            }

            )
      

            if(!response.ok){
                  let errorData;
                  try {
                        errorData = await response.json();
                  } catch {
                        errorData = { error: 'Something went wrong' };
                  }
                  throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
            }

            return await response.json();
      }

      catch (err) {

            console.error('API error:', err);

            throw err;
      }
}

export async function fetchServices() {
  return apiFetch('/services');
}

export async function createAppointment(appointmentData) {
  return apiFetch('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
}

export async function fetchStaff(salon_id, service_id) {
  return apiFetch(`/staff-for-service?salon_id=${salon_id}&service_id=${service_id}`);
}

export async function fetchAvailability(staffId, serviceId, date){
      return apiFetch(`/availability/slots/?staff_user_id=${staffId}&service_id=${serviceId}&date=${date}`);
}