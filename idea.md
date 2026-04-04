# 🏠 RoomRadar — College Hostel Room Selection Platform

> A web platform to help college students make informed decisions during hostel room counselling. Covers only **Ladies' Hostel** with counselling workflows.

---

## 📌 Problem Statement

Every semester/year, students go through hostel room counselling where rooms are allotted based on a **Normalized CGPA (NCGPA) ranking**. Students currently have:
- **No visibility** into what rooms look like before counselling
- **No peer reviews** of rooms (noise, ventilation, proximity, etc.)
- **No way to predict** their rank or which rooms they might get
- **No live updates** during the counselling process

RoomRadar solves all of this in one platform.

---

## 🧮 Ranking System — NCGPA Formula

Room counselling rank is determined by **Normalized CGPA (NCGPA)**:

```
NCGPA = CGPA × (Group Topper CGPA / Branch Topper CGPA)
```

- **CGPA** — Student's own CGPA
- **Group Topper CGPA** — Highest CGPA in the student's counselling group
- **Branch Topper CGPA** — Highest CGPA in the student's branch/department

---

## 👥 Counselling Groups (2025-26 Policy)

Students are divided into **4 groups** based on their program and year of study. The group determines which pool they compete in for ranking.

### Group I (G1) — Senior Undergraduates
| # | Year | Programs |
|---|------|----------|
| 1 | III Year | B.Des, B.Tech, M.Tech (Integrated) & M.Sc. (Integrated) |
| 2 | II Year | BBA, BCA, B.Com & B.Sc. |
| 3 | III Year | B.Arch |

### Group II (G2) — Sophomore Year
| # | Year | Programs |
|---|------|----------|
| 1 | II Year | B.Tech, B.Arch, B.Sc (Agri), B.Des, M.Tech (Integrated) & M.Sc. (Integrated) |

### Group III (G3) — First Year Students
| # | Year | Programs |
|---|------|----------|
| 1 | I Year | BBA, BCA, B.Com, B.Sc, B.Arch, B.Des, B.Tech & B.Sc (Agri) |
| 2 | I Year | M.Tech (Integrated) & M.Sc. (Integrated) |

### Group IV (G4) — Postgraduates & Senior Integrated
| # | Year | Programs |
|---|------|----------|
| 1 | I Year | M.Arch, MBA, M.Des, M.Sc, MSW |
| 2 | IV Year | M.Tech (Integrated) & M.Sc. (Integrated) |

> **Note:** Group Topper CGPA is the **highest CGPA within the student's group** (not branch). This means a B.Tech III Year student in G1 competes with BBA II Year students from the same group for ranking purposes.

---

## 🚀 Core Features

### 1. 🔍 Room Reviews & Ratings
- Students can **write reviews** for any hostel room they've stayed in
- Rate rooms on multiple parameters:
  - ⭐ **Overall Rating** (1-5 stars)
  - 🌬️ **Ventilation / Airflow**
  - 🔇 **Noise Level**
  - 🚿 **Washroom Proximity & Cleanliness**
  - 📶 **Wi-Fi Signal Strength**
  - 🔌 **Power Outlet Availability**
  - ☀️ **Sunlight / Natural Light**
  - 📐 **Room Size / Space**
- Filter reviews by hostel block, floor, room type (single/double/triple)
- Upvote/downvote helpful reviews

### 2. 📸 Room Photo Gallery
- Students can **upload photos** of their rooms
- Photos tagged by:
  - Hostel name & block
  - Room number
  - Floor
  - Room type

### 3. 📡 Live Hostel Counselling Updates
- **Real-time feed** during counselling sessions
- Shows:
  - 🟢 Currently being allotted rank number
  - 📊 Rooms filled so far (with live count)
  - 🏢 Which blocks/floors/room types still have availability
-live feed for **Ladies'** counselling
- Push notifications when your rank range is approaching
- Historical data from previous counselling sessions

### 4. 🎯 Rank Predictor
- Input your details:
  - CGPA
  - Branch/Department
  - Year of study
  - Program (B.Tech, BBA, etc.)
- System calculates:
  - Your **counselling group** (G1/G2/G3/G4)
  - Your **estimated NCGPA** (using historical group/branch topper data)
  - Your **predicted rank range**
  - Confidence level of prediction
- Shows historical NCGPA cutoffs from previous years

### 5. 🏘️ Room Options & Availability Predictor
- Based on predicted rank, shows:
  - **Rooms likely available** when your turn comes
  - Room details with reviews, photos, and ratings
  - **Recommended rooms** based on your preferences
  - Probability of getting your preferred room
- Interactive **hostel map** showing:
  - All rooms color-coded by availability status
  - Click on any room to see reviews/photos
  - Floor-by-floor navigation
- Preference list builder — create and save your room wishlist

### 6. 🧑‍🤝‍🧑 Roommate Finder

A **two-sided marketplace** where students can either look for a roommate or offer a spot in their room. Both parties post listings and browse/match based on lifestyle preferences.

#### How It Works — Two Modes

| Mode | Who Posts | What They Share |
|------|-----------|----------------|
| 🔎 **Looking for a Room** | Student who needs a roommate/room | Their preferences + lifestyle habits |
| 🏠 **Offering a Room** | Student who has a room and wants a compatible roommate | Room details + what they're looking for in a roommate |

#### Preference Filters & Matching Criteria

Every roommate listing (both seeking and offering) includes:

- 😴 **Sleep Schedule**
  - Early sleeper (before 11 PM)
  - Night owl (after 12 AM)
  - Flexible / varies
- 🔇 **Noise Tolerance**
  - Silent study environment
  - Moderate — music/calls at reasonable hours
  - Doesn't mind noise
- ❄️ **AC Preference**
  - AC room required
  - Non-AC is fine
  - No preference
- 🧹 **Cleanliness Level**
  - Very tidy — clean daily
  - Moderate — clean weekly
  - Relaxed
- 👥 **Guest Policy**
  - Friends over often
  - Occasionally
  - Prefer privacy
- 📚 **Study Habits**
  - Studies in room
  - Studies in library/elsewhere
  - Mix of both
- 🍳 **Cooking / Appliance Use**
  - Uses induction/kettle in room
  - Doesn't cook in room

#### Pros & Cons Section

Each listing has a **freeform Pros & Cons** section where the poster describes:

**For "Offering a Room" posts:**
| Pros (what's great about the room) | Cons (what to be aware of) |
|------------------------------------|----------------------------|
| Corner room, very quiet | Far from mess/canteen |
| AC, attached washroom | 3rd floor, no elevator |
| Great Wi-Fi signal | Road-facing, can be noisy during events |
| Near laundry room | Small balcony |

**For "Looking for a Room" posts:**
| Pros (about me as a roommate) | Cons (honest heads-up) |
|-------------------------------|------------------------|
| Very clean and organized | Light sleeper |
| Respectful of shared space | Sometimes studies late |
| Happy to share appliances | Prefers AC on at night |

#### Matching & Discovery
- **Smart matching** — algorithm suggests compatible roommates based on preference overlap
- **Browse & filter** — search by branch, year, hostel block preference, AC/non-AC
- **Save & shortlist** — bookmark interesting profiles
- **In-app messaging** — chat with potential roommates before deciding
- **Mutual interest** — both parties must express interest for contact details to be shared
- **Urgency tag** — mark posts as "urgent" during counselling season
- **Verified profiles** — linked to college email for trust

---

## 🏗️ Additional Features (Nice-to-Have)

### 💬 Discussion Forum
- Hostel-specific discussion threads
- Q&A about hostel life, facilities, mess food
- Tips from seniors

### 📊 Analytics Dashboard
- Historical trends of room allotment
- Popular rooms/floors across years
- NCGPA distribution charts per group

### 🔔 Notification System
- Alerts when counselling dates are announced
- Updates when new reviews are posted for saved rooms

---

## 🛠️ Tech Stack (Proposed)

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript (or React/Vite if needed) |
| Backend | Node.js with Express / Firebase |
| Database | Firebase Firestore / MongoDB |
| Auth | Firebase Auth (college email verification) |
| Storage | Firebase Storage / Cloudinary (for room photos) |
| Real-time | Firebase Realtime DB / WebSockets |
| Hosting | Vercel / Firebase Hosting |

---

## 🗂️ Data Models (High-Level)

### Student
```
- studentId
- name
- email (college email)
- branch
- year
- program
- cgpa
- counsellingGroup (G1/G2/G3/G4) — auto-calculated
```

### Room
```
- roomId
- hostelName
- blockName
- floorNumber
- roomNumber
- roomType (single / double / triple)
- ac / non-ac / apartment / non-apartment
- bunk / non-bunk
- capacity
- amenities[]
- averageRating
- totalReviews
```

### Review
```
- reviewId
- roomId
- studentId
- overallRating
- ventilationRating
- noiseRating
- washroomRating
- wifiRating
- comment
- photos[]
- timestamp
- upvotes / downvotes
```

### RoommatePost
```
- postId
- studentId
- postType ("looking_for_room" / "offering_room")
- status (active / closed / expired)
- isUrgent (boolean)
- preferences:
    - sleepSchedule (early / night_owl / flexible)
    - noiseTolerance (silent / moderate / doesnt_mind)
    - acPreference (required / fine_without / no_preference)
    - cleanliness (very_tidy / moderate / relaxed)
    - guestPolicy (often / occasionally / prefer_privacy)
    - studyHabits (in_room / library / mix)
    - cooking (uses_appliances / doesnt_cook)
- pros[] (freeform text list)
- cons[] (freeform text list)
- roomDetails (only for "offering_room"):
    - hostelBlock
    - floorNumber
    - roomNumber
    - roomType
    - acType
- preferredBranch (optional)
- preferredYear (optional)
- preferredBlock (optional)
- description (freeform bio/note)
- createdAt
- expiresAt
```

### CounsellingSession
```
- sessionId
- year
- hostelBlock
- status (upcoming / live / completed)
- currentRankBeingAllotted
- totalRanks
- allotments[] { rank, roomId, timestamp }
```

### RankPrediction (historical data)
```
- year
- group
- branchTopperCGPA
- groupTopperCGPA
- ncgpaCutoffs { roomType: minNCGPA }
```

---

## 📱 Page Structure

1. **Landing Page** — Hero section, feature highlights, CTA to sign up
2. **Dashboard** — Personalized view with rank prediction, saved rooms, upcoming counselling
3. **Room Explorer** — Browse all rooms with filters, search, map view
4. **Room Detail Page** — Reviews, photos, ratings, availability history
5. **Rank Predictor** — Calculator tool with NCGPA formula
6. **Live Counselling** — Real-time updates feed
7. **Roommate Finder** — Browse/post roommate listings, filter by preferences, chat with matches
8. **Profile** — Student info, review history, room wishlist, my roommate posts
9. **Admin Panel** — For hostel administration to manage rooms, upload data, manage counselling sessions

---

## 🎯 Target Users

- **Primary**: All female students participating in Ladies' Hostel room counselling
- **Secondary**: Hostel administration (for managing counselling data)
- **Scope**: **Ladies' Hostel only** — all groups (G1–G4)

---

## 📅 Development Phases

### Phase 1 — MVP
- [ ] Room reviews & ratings system
- [ ] Photo upload for rooms
- [ ] NCGPA rank predictor calculator
- [ ] Basic room explorer with filters
- [ ] Roommate Finder — post listings (seeking / offering) + preference matching

### Phase 2 — Live Features
- [ ] Live counselling update feed
- [ ] Room availability predictor
- [ ] Push notifications
- [ ] Interactive hostel map
- [ ] In-app roommate chat & mutual interest system

### Phase 3 — Community & Analytics
- [ ] Discussion forum
- [ ] Historical analytics dashboard
- [ ] Admin panel for hostel management
- [ ] Smart roommate matching algorithm

---

> **RoomRadar** — *Know your room before you pick it.* 🎯
