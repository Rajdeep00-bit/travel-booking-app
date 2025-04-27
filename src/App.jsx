import React, { useState, useEffect } from 'react';
import stays from './data/stays';
import StayCard from './components/StayCard';
import BookingModal from './components/BookingModal';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import './App.css';  // Importing the new CSS file

function App() {
  const [selectedStay, setSelectedStay] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleBookClick = (stay) => {
    setSelectedStay(stay);
  };

  const handleCloseModal = () => {
    setSelectedStay(null);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      const bookingsRef = collection(db, 'bookings');
      await addDoc(bookingsRef, bookingData);
      toast.success('Booking confirmed successfully!');
      setSelectedStay(null);
    } catch (error) {
      console.error('Error adding booking: ', error);
      toast.error('Failed to save booking.');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsNavbarVisible(false); // Scroll Down - hide navbar
      } else {
        setIsNavbarVisible(true);  // Scroll Up - show navbar
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className={`navbar ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div>UpInTheSky</div>
        <div className="navbar-links">
          {["About", "Blog", "Contact Us", "SignUp", "Login"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '')}`} className="navbar-link">
              {item}
            </a>
          ))}
        </div>
      </nav>

      <header className="header">
        <div>
          <h1 className="header-title">
            Life-long memories just a few days away.
          </h1>
          <p className="header-subtitle">
            Discover amazing places at exclusive deals!
          </p>
        </div>
      </header>

      <main className="main-content">
        <h2 className="main-title">Find your perfect stay</h2>
        <div className="stay-cards">
          {stays.map((stay) => (
            <StayCard key={stay.id} stay={stay} onBook={handleBookClick} />
          ))}
        </div>
      </main>

      {selectedStay && (
        <BookingModal
          stay={selectedStay}
          onClose={handleCloseModal}
          onConfirm={handleConfirmBooking}
        />
      )}

      <footer className="footer">
        © {new Date().getFullYear()} Travel Booking App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
