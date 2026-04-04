/* js/firebase-config.js */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// These are the exact keys from your screenshot!
const firebaseConfig = {
  apiKey: "AIzaSyC1NN64eEFZeu0FD_GyISuvBfxfWJiii6o",
  authDomain: "roomradar-a7e30.firebaseapp.com",
  projectId: "roomradar-a7e30",
  databaseURL: "https://roomradar-a7e30-default-rtdb.firebaseio.com/",
  storageBucket: "roomradar-a7e30.firebasestorage.app",
  messagingSenderId: "208625960724",
  appId: "1:208625960724:web:a485c2ab32fb0bf100a401"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database and Auth
export const db = getDatabase(app);
export const auth = getAuth(app);

console.log("Firebase initialized successfully! 🚀");
