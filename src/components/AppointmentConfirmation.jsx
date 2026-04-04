import React, { useState } from 'react'
import { createAppointment } from "../api/api"
import { useNavigate } from 'react-router-dom'

function AppointmentConfirmation({ selectedService, selectedStaff, selectedDateTime, onConfirm, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const navigate              = useNavigate();

    const handleConfirm = async () => {
        if (!selectedService || !selectedStaff || !selectedDateTime) return;

        const durationMs  = selectedService.duration_min * 60 * 1000;
        const startDate   = new Date(`${selectedDateTime.date}T${selectedDateTime.time}:00`);
        const endDate     = new Date(startDate.getTime() + durationMs);
        const endTime     = endDate.toTimeString().slice(0, 5);

        const appointmentData = {
            salon_id:      selectedService.salon_id,
            staff_user_id: selectedStaff.id,
            service_id:    selectedService.id,
            start_time:    `${selectedDateTime.date}T${selectedDateTime.time}:00`,
            end_time:      `${selectedDateTime.date}T${endTime}:00`,
        };

        try {
            setLoading(true);
            setError(null);
            const result = await createAppointment(appointmentData);
            console.log('Booking response:', result);
            onConfirm();
        } catch (err) {
            setError(err.message || 'Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mt-4'>
            <h2>Review your booking</h2>

            <div className='card p-4 mb-4 shadow-sm'>
                <h5 className='card-title mb-3'>Booking Summary</h5>

                <div className='row mb-2'>
                    <div className='col-5 text-muted'>Service</div>
                    <div className='col-7 fw-semibold'>{selectedService.name}</div>
                </div>

                <div className='row mb-2'>
                    <div className='col-5 text-muted'>Staff</div>
                    <div className='col-7 fw-semibold'>{selectedStaff.name}</div>
                </div>

                <div className='row mb-2'>
                    <div className='col-5 text-muted'>Date</div>
                    <div className='col-7 fw-semibold'>
                        {new Date(selectedDateTime.date + 'T00:00:00').toLocaleDateString('en-CA', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                    </div>
                </div>

                <div className='row mb-2'>
                    <div className='col-5 text-muted'>Time</div>
                    <div className='col-7 fw-semibold'>{selectedDateTime.time}</div>
                </div>

                <div className='row mb-2'>
                    <div className='col-5 text-muted'>Duration</div>
                    <div className='col-7 fw-semibold'>{selectedService.duration_min} minutes</div>
                </div>

                <hr />

                <div className='row'>
                    <div className='col-5 text-muted'>Total</div>
                    <div className='col-7 fw-bold fs-5'>${selectedService.price}</div>
                </div>
            </div>

            {error && (
                <div className='alert alert-danger'>{error}</div>
            )}

            <div className='d-flex gap-2'>
                <button
                    className='btn btn-outline-secondary'
                    onClick={onCancel}
                    disabled={loading}
                >
                    Back
                </button>

                <button
                    className='btn btn-success flex-grow-1'
                    onClick={handleConfirm}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className='spinner-border spinner-border-sm me-2' role='status' />
                            Confirming...
                        </>
                    ) : (
                        'Confirm Booking'
                    )}
                </button>
            </div>
        </div>
    );
}

export default AppointmentConfirmation