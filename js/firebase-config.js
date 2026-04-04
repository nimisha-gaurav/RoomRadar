/* js/firebase-config.js */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// These keys are now managed centrally in js/firebase-keys.js
// Ensure that file is loaded BEFORE this script if not using a bundler
const firebaseConfig = window.firebaseConfig; 

if (!firebaseConfig) {
  console.error("Firebase configuration not found! Please ensure js/firebase-keys.js is loaded.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database and Auth
export const db = getDatabase(app);
export const auth = getAuth(app);

console.log("Firebase initialized successfully! 🚀");
