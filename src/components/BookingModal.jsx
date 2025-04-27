import React, { useState } from 'react';

function BookingModal({ stay, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      stayId: stay.id,
      stayName: stay.name,
      name,
      email,
      checkIn,
      checkOut
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Book {stay.name}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2"
            required
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2"
            required
          />
          <input 
            type="date" 
            value={checkIn} 
            onChange={(e) => setCheckIn(e.target.value)}
            className="border rounded p-2"
            required
          />
          <input 
            type="date" 
            value={checkOut} 
            onChange={(e) => setCheckOut(e.target.value)}
            className="border rounded p-2"
            required
          />

          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded">
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Confirm Booking
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default BookingModal;
