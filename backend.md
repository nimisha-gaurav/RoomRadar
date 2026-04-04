# 🔥 RoomRadar Realtime Database Implementation Guide

We transitioned to **Realtime Database (RTDB)** because it offers a 100% free tier without requiring billing information for most projects.

---

## 🛠️ Step 1: Firebase Project Setup

1.  **Create Project**: Go to [Firebase Console](https://console.firebase.google.com/).
2.  **Enable Services**:
    - **Authentication**: Enable "Email/Password".
    - **Realtime Database**: 
        - Click "Create Database".
        - Select a location (e.g., `us-central1`).
        - **Security Rules**: Select **"Start in test mode"**.
3.  **Install SDK**:
    ```bash
    npm install firebase
    ```

---

## 🗄️ Step 2: Database Structure (JSON Tree)

Realtime Database is one giant JSON tree.

```json
{
  "reviews": {
    "A-204": {
      "unique_id_1": {
        "overallRating": 5,
        "reviewText": "Great room!",
        "metrics": { "cleanliness": 5, "noise": 4 },
        "createdAt": 1712312312
      }
    }
  },
  "counselling": {
    "currentRank": 450,
    "totalRanks": 2000
  }
}
```

---

## 🔐 Step 3: Auth with College Email Filter

Same as before, but ensure you use `getAuth(app)` in your config.

---

## 📡 Step 4: Live Updates (The Power of RTDB)

RTDB is built for speed. Use `onValue` to listen for changes:

```javascript
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const dbRef = ref(db, 'reviews/A-204');
onValue(dbRef, (snapshot) => {
  const data = snapshot.val();
  console.log("Real-time data:", data);
});
```

---

## 🚀 Deployment

1.  Initialize Firebase CLI: `firebase init`
2.  Select **Hosting** and **Realtime Database**.
3.  Run `firebase deploy`.
