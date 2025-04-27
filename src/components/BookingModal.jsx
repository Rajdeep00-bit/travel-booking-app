import React, { useState, useEffect } from 'react';

function BookingModal({ stay, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Calculate total price based on selected dates
  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
    
    return days > 0 ? days * stay.price : 0;
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!checkIn) newErrors.checkIn = "Check-in date is required";
    if (!checkOut) newErrors.checkOut = "Check-out date is required";
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      newErrors.checkOut = "Check-out date must be after check-in date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    const totalPrice = calculateTotalPrice();
    const bookingDate = new Date().toISOString();
    
    const bookingData = {
      stayId: stay.id,
      stayName: stay.name,
      stayImage: stay.image,
      name,
      email,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      bookingDate,
      status: 'confirmed'
    };
    
    try {
      await onConfirm(bookingData);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Error saving booking:", error);
      setErrors({submit: "Failed to save booking. Please try again."});
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseSuccess = () => {
    setBookingSuccess(false);
    onClose();
  };

  // Prevent scrolling of background when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-90vh overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Book {stay.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {bookingSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Booking Confirmed!</h3>
            <p className="mt-2 text-gray-600">Your reservation at {stay.name} has been successfully booked.</p>
            <p className="mt-1 text-gray-600">Check-in: {new Date(checkIn).toLocaleDateString()}</p>
            <p className="text-gray-600">Check-out: {new Date(checkOut).toLocaleDateString()}</p>
            <p className="mt-2 font-medium text-gray-900">Total: ${calculateTotalPrice()}</p>
            <p className="mt-4 text-sm text-gray-500">A confirmation email has been sent to {email}</p>
            <button 
              onClick={handleCloseSuccess}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <img src={stay.image} alt={stay.name} className="h-16 w-16 object-cover rounded mr-4" 
                  onError={(e) => {e.target.src = "/api/placeholder/400/320"}}
                />
                <div>
                  <h3 className="font-semibold">{stay.name}</h3>
                  <p className="text-gray-600">{stay.location}</p>
                  <p className="text-blue-600 font-medium">${stay.price} / night</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`border rounded-lg p-2 w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`border rounded-lg p-2 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Check-in Date</label>
                  <input
                    type="date"
                    className={`border rounded-lg p-2 w-full ${errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}
                    value={checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                  {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Check-out Date</label>
                  <input
                    type="date"
                    className={`border rounded-lg p-2 w-full ${errors.checkOut ? 'border-red-500' : 'border-gray-300'}`}
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                  {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Number of Guests</label>
                <select
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              
              {checkIn && checkOut && calculateTotalPrice() > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <h3 className="font-medium text-gray-800">Price Summary</h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">${stay.price} x {Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights</span>
                    <span className="font-medium">${calculateTotalPrice()}</span>
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                </div>
              )}
              
              {errors.submit && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg">
                  {errors.submit}
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  disabled={isSaving}
                >
                  {isSaving ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingModal;