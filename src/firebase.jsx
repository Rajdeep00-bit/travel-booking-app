// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Import for future authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeIl_BVQsuXc6nSEFOaRza2dPJpIF6niw",
  authDomain: "travel-booking-app-e5c8d.firebaseapp.com",
  projectId: "travel-booking-app-e5c8d",
  storageBucket: "travel-booking-app-e5c8d.appspot.com",
  messagingSenderId: "290591682545",
  appId: "1:290591682545:web:70495ecf1e2461ec999e50",
  measurementId: "G-KF73CWEYRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);  // Authentication setup for future use

// Export for use in components
export { db, auth };