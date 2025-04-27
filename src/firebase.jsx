// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Important for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeIl_BVQsuXc6nSEFOaRza2dPJpIF6niw",
  authDomain: "travel-booking-app-e5c8d.firebaseapp.com",
  projectId: "travel-booking-app-e5c8d",
  storageBucket: "travel-booking-app-e5c8d.appspot.com", // ✅ corrected .appspot.com not .app
  messagingSenderId: "290591682545",
  appId: "1:290591682545:web:70495ecf1e2461ec999e50",
  measurementId: "G-KF73CWEYRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore(app);


export { db };
