# 🚀 Getting Started with Firebase (From Scratch)

Firebase is a "Backend-as-a-Service." In simple terms: **It provides a database and authentication system that you can talk to directly from your HTML/JavaScript files**, without needing to write a separate Node.js server.

---

## 🏗️ Step 1: Create your Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add Project"** and name it `RoomRadar`.
3.  Click the **Web icon (`</>`)** on the main dashboard to register your app.
4.  Give it a nickname like `RoomRadar Web`.
5.  **Stop!** You will see a `firebaseConfig` object like this:
    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "roomradar.firebaseapp.com",
      projectId: "roomradar",
      storageBucket: "roomradar.firebasestorage.app",
      messagingSenderId: "12345",
      appId: "1:12345:web:abcd"
    };
    ```
    Keep this tab open—you'll need to copy this soon.

---

## 🛠️ Step 2: Initialize Firebase in your Code

In your project folder, create a new file called `js/firebase.js`. This is where all your database connection logic will live.

### `js/firebase.js`
```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// 1. YOUR CONFIG (Replace this with the code from Step 1)
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "roomradar.firebaseapp.com",
  projectId: "roomradar",
  storageBucket: "roomradar.firebasestorage.app",
  messagingSenderId: "12345",
  appId: "1:12345:web:abcd"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. Export the database and auth for use in other files
export const db = getFirestore(app);
export const auth = getAuth(app);
```

---

## 📝 Step 3: Use it in your HTML

Since we're using **Modules** (`import/export`), you must include your script with `type="module"`. 

Example: Connecting the "Submit Review" button in `write-review.html`. 

### Inside `write-review.html` (at the bottom):
```html
<script type="module">
  // Import the database we created in firebase.js
  import { db } from './js/firebase.js';
  import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

  // Handle Form Submission
  const reviewForm = document.getElementById('review-form');
  
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page from refreshing

    const reviewData = {
      overall_rating: document.querySelector('input[name="overall_rating"]:checked')?.value || 0,
      comment: document.getElementById('review-text').value,
      timestamp: serverTimestamp()
    };

    try {
      // "collection(db, 'reviews')" tells Firebase to save this in the 'reviews' folder
      const docRef = await addDoc(collection(db, "reviews"), reviewData);
      alert("Review saved with ID: " + docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  });
</script>
```

---

## 🚦 Important: Security Rules

By default, Firebase locks your database so no one can write to it. For testing, go to the **Firestore > Rules** tab in the console and change them to:

```text
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; 
    }
  }
}
```
> [!CAUTION]
> **This makes your database public!** Once you add authentication, you should change `if true` to `if request.auth != null`.

---

## Summary Checklist
1. [ ] Create Firebase Project.
2. [ ] Add Web App and copy the `firebaseConfig`.
3. [ ] Create `js/firebase.js` and paste your config.
4. [ ] Link your scripts in HTML as `<script type="module">`.
5. [ ] Set Firestore Rules to "Test Mode".
