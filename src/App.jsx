import React, { useState } from 'react';
import stays from './data/stays';
import StayCard from './components/StayCard';
import BookingModal from './components/BookingModal';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {
  const [selectedStay, setSelectedStay] = useState(null);

  const handleBookClick = (stay) => {
    setSelectedStay(stay);
  };

  const handleCloseModal = () => {
    setSelectedStay(null);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      // Reference the 'bookings' collection in Firestore
      const bookingsRef = collection(db, "bookings");
      
      // Add the booking data to Firestore
      await addDoc(bookingsRef, bookingData);
      
      // Success message
      alert("Booking Confirmed and Saved!");
      setSelectedStay(null);
    } catch (error) {
      console.error("Error adding booking: ", error);
      alert("Failed to save booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Travel Booking App</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stays.map(stay => (
          <StayCard key={stay.id} stay={stay} onBook={handleBookClick} />
        ))}
      </div>

      {selectedStay && (
        <BookingModal 
          stay={selectedStay}
          onClose={handleCloseModal}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}

export default App;
