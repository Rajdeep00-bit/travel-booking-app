// src/pages/Home.jsx
import React, { useState } from "react";
import stays from "../data/stays.json";
import StayList from "../components/StayList";
import Hero from "../components/Hero";
import BookingModal from "../components/BookingModal";
import { saveBooking } from "../services/bookingService";
import { toast } from "react-hot-toast"; // Optional: for notifications

export default function Home() {
  const [selectedStay, setSelectedStay] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBookNow = (stay) => {
    setSelectedStay(stay);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStay(null);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      await saveBooking(bookingData);
      toast.success("Booking confirmed successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to confirm booking. Please try again.");
      console.error("Booking error:", error);
    }
  };

  return (
    <div>
      <Hero />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center my-8">Featured Stays</h2>
        <StayList stays={stays} onBook={handleBookNow} />
      </div>
      
      {showModal && (
        <BookingModal 
          stay={selectedStay} 
          onClose={handleCloseModal} 
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}