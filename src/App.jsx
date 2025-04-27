import React, { useState, useEffect } from 'react';
import stays from './data/stays';
import StayCard from './components/StayCard';
import BookingModal from './components/BookingModal';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [selectedStay, setSelectedStay] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStays, setFilteredStays] = useState(stays);
  const [userBookings, setUserBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [loading, setLoading] = useState(false);

  // Apply search query to stays
  useEffect(() => {
    let result = [...stays];

    if (searchQuery) {
      result = result.filter(stay =>
        stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStays(result);
  }, [searchQuery]);

  // Fetch user bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      // In a real app with auth, you'd filter by user ID
      const bookingsRef = collection(db, "bookings");
      const querySnapshot = await getDocs(bookingsRef);

      const bookings = [];
      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setUserBookings(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await deleteDoc(doc(db, "bookings", bookingId));
        setUserBookings(userBookings.filter(booking => booking.id !== bookingId));
        alert("Booking canceled successfully");
      } catch (error) {
        console.error("Error canceling booking:", error);
        alert("Failed to cancel booking");
      }
    }
  };

  const handleBookClick = (stay) => {
    setSelectedStay(stay);
  };

  const handleCloseModal = () => {
    setSelectedStay(null);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      // Add the booking data to Firestore
      const bookingsRef = collection(db, "bookings");
      await addDoc(bookingsRef, bookingData);

      // Refresh bookings list if we're showing them
      if (showBookings) {
        fetchBookings();
      }

      return true;
    } catch (error) {
      console.error("Error adding booking: ", error);
      throw error;
    }
  };

  // Toggle between stays and bookings views
  const toggleBookingsView = () => {
    setShowBookings(!showBookings);
    if (!showBookings) {
      fetchBookings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h1 className="text-2xl font-bold">UpInTheSky Travel</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {showBookings ? (
          // Bookings View
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

            {loading && (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Loading your bookings...</p>
              </div>
            )}

            {!loading && userBookings.length === 0 && (
              <div className="text-center py-10 bg-white rounded-lg shadow">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 0 002-2M9 5a2 2 0 012-2h2a2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
                <p className="mt-1 text-gray-500">You don't have any travel bookings yet.</p>
                <div className="mt-6">
                  <button
                    onClick={toggleBookingsView}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Browse Stays
                  </button>
                </div>
              </div>
            )}

            {!loading && userBookings.length > 0 && (
              <div className="grid grid-cols-1 gap-6">
                {userBookings.map(booking => (
                  <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={booking.stayImage}
                        alt={booking.stayName}
                        className="h-40 w-full md:w-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                        onError={(e) => {e.target.src = "/api/placeholder/400/320"}}
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{booking.stayName}</h3>
                        <p className="text-gray-500 mb-2">{new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}</p>
                        <div className="flex items-center mb-2">
                          <svg className="w-5 h-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="text-gray-700">{booking.name}</p>
                        </div>
                        <p className="mb-2">
                          <span className="font-medium">Email:</span> {booking.email}
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Guests:</span> {booking.guests || 1}
                        </p>
                        <p className="font-bold text-lg mb-4">
                          Total: ${booking.totalPrice || "N/A"}
                        </p>
                        <div className="flex justify-end">
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Stays View
          <>
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Find Your Perfect Getaway</h2>
              <p className="text-lg mb-6">Discover amazing places to stay around the world</p>

              <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row">
                <input
                  type="text"
                  placeholder="Search destinations, properties..."
                  className="flex-1 p-2 rounded border-0 focus:ring-0 text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={toggleBookingsView}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0 md:ml-2"
                >
                  My Bookings
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {filteredStays.length} {filteredStays.length === 1 ? 'stay' : 'stays'} found
              </h2>
            </div>

            {/* Stay Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStays.map(stay => (
                <StayCard key={stay.id} stay={stay} onBook={handleBookClick} />
              ))}
            </div>

            {filteredStays.length === 0 && (
              <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No stays found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">UpInTheSky Travel</h3>
              <p className="text-gray-400">Find your perfect getaway</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Safety</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cancellation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} UpInTheSky Travel. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

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
