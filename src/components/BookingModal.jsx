import React, { useState } from 'react';

function BookingModal({ stay, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);  // New state for success message

  const handleSubmit = async () => {
    setIsSaving(true);
    const bookingData = {
      stayId: stay.id,
      stayName: stay.name,
      name,
      email,
      checkIn,
      checkOut,
    };
    await onConfirm(bookingData);
    setIsSaving(false);
    
    // Show success message after booking
    setBookingSuccess(true);

    // Clear form fields after confirm
    setName('');
    setEmail('');
    setCheckIn('');
    setCheckOut('');
  };

  const handleCloseSuccess = () => {
    setBookingSuccess(false);  // Close success message when user clicks 'Close'
    onClose();  // Close the modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg sm:max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Book {stay.name}</h2>

        {/* Success Message - Add this block */}
        {bookingSuccess && (
          <div className="bg-green-100 p-4 rounded mb-4 text-green-800">
            <h3 className="text-lg font-semibold">Booking Successful!</h3>
            <p>Your booking for {stay.name} has been confirmed.</p>
            <button 
              onClick={handleCloseSuccess}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}

        {/* Form Inputs - Show this when bookingSuccess is false */}
        {!bookingSuccess && (
          <>
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 w-full mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border p-2 w-full mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              placeholder="Check-in Date"
              className="border p-2 w-full mb-3"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              type="date"
              placeholder="Check-out Date"
              className="border p-2 w-full mb-3"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Confirm Booking"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
