// BookingModal.jsx
import React, { useState } from 'react';

function BookingModal({ stay, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = () => {
    const bookingData = {
      stayId: stay.id,
      stayName: stay.name,
      name,
      email,
      checkIn,
      checkOut,
    };
    onConfirm(bookingData);

    // ✅ Clear the form fields after confirm
    setName('');
    setEmail('');
    setCheckIn('');
    setCheckOut('');
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Book {stay.name}</h2>

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
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
