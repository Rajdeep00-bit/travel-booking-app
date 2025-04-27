// src/services/bookingService.js
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const BOOKINGS_COLLECTION = 'bookings';

export const saveBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
      ...bookingData,
      createdAt: new Date()
    });
    return { id: docRef.id, ...bookingData };
  } catch (error) {
    console.error("Error saving booking: ", error);
    throw error;
  }
};

export const getBookings = async (userEmail = null) => {
  try {
    let bookingsQuery;
    
    if (userEmail) {
      bookingsQuery = query(
        collection(db, BOOKINGS_COLLECTION), 
        where("email", "==", userEmail)
      );
    } else {
      bookingsQuery = collection(db, BOOKINGS_COLLECTION);
    }
    
    const querySnapshot = await getDocs(bookingsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting bookings: ", error);
    throw error;
  }
};

export const deleteBooking = async (bookingId) => {
  try {
    await deleteDoc(doc(db, BOOKINGS_COLLECTION, bookingId));
    return true;
  } catch (error) {
    console.error("Error deleting booking: ", error);
    throw error;
  }
};