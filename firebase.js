// Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC8-KUrtqEzwu2G2ZcDp4g4Jv4S9lItqhE",
  authDomain: "sivasakthi-hotel-account.firebaseapp.com",
  projectId: "sivasakthi-hotel-account",
  storageBucket: "sivasakthi-hotel-account.firebasestorage.app",
  messagingSenderId: "486658977027",
  appId: "1:486658977027:web:d638d24ebf8d2dfb3c8d36",
  measurementId: "G-0X75B3H7Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Export Database
export { db };