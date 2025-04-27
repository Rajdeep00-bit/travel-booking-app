import React, { useState } from 'react';
import '@/styles/BookingModal.css';

function BookingModal({ stay = {}, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const bookingData = {
      name,
      email,
      checkIn,
      checkOut,
      stayName: stay?.name || '',
      pricePerNight: stay?.price || 0,
      location: stay?.location || '',
    };

    await onConfirm(bookingData);
    setIsLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="modal-title">
          Book {stay?.name || 'Stay'}
        </h2>

        {/* Booking Form */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <div className="date-fields">
            <div className="date-field-container">
              <label className="date-label">Check-in</label>
              <input
                type="date"
                placeholder="Check-in date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="input-field"
                aria-label="Check-in date"
              />
            </div>
            <div className="date-field-container">
              <label className="date-label">Check-out</label>
              <input
                type="date"
                placeholder="Check-out date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="input-field"
                aria-label="Check-out date"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="confirm-button" disabled={isLoading}>
              {isLoading ? 'Booking...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;