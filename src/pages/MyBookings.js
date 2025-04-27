// src/pages/MyBookings.jsx
import React, { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '../services/bookingService';
import { toast } from 'react-hot-toast';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleEmailSearch = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setLoading(true);
    try {
      const fetchedBookings = await getBookings(email);
      setBookings(fetchedBookings);
      setSearchPerformed(true);
      if (fetchedBookings.length === 0) {
        toast.info('No bookings found for this email address');
      }
    } catch (error) {
      toast.error('Failed to fetch bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await deleteBooking(bookingId);
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        toast.success('Booking cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel booking');
        console.error('Error cancelling booking:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>
      
      <div className="max-w-md mx-auto mb-10">
        <form onSubmit={handleEmailSearch} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {loading ? 'Searching...' : 'Find My Bookings'}
          </button>
        </form>
      </div>

      {searchPerformed && (
        <div>
          {bookings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">{booking.stayName}</h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Location:</span> {booking.location}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Price:</span> ${booking.pricePerNight}/night
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Check-in:</span> {formatDate(booking.checkIn)}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Check-out:</span> {formatDate(booking.checkOut)}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              No bookings found for this email address.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyBookings;