# Saadhya's File

This file has been created as requested. Any changes or updates you ask me to track can be added here.

## Navigation Fixes
- Standardized the navigation bar across `predictor.html` and `profile.html` to be consistent with `dashboard.html` and `rooms.html` (Top-nav only).
- Removed redundant fixed bottom navs from `predictor.html` and `profile.html`.
- Updated `js/app.js` dark mode toggle functionality to support multiple `#theme-toggle` elements safely.

## Compare Functionality changes
- Removed the absolute positioned floating prices and the "Yearly Rent" rows completely from `compare.html`.
- Made the "Compare" button at the bottom of `room-detail.html` a tightly-fitting centered pill by removing flex-grow capabilities and tightly wrapping the container.

## Further Navigation Standardization
- Brought `room-detail.html` and `compare.html` completely up to standard by replacing their custom headers with the unified top-right icon nav bar.
- Removed their floating bottom navs for extreme consistency across all views.

## New Review Functionality
- Created a brand new `write-review.html` page tailored with a responsive, modern form for users to leave their room reviews and sliders for granular criteria rating.
- Added a "Write Review" button to the Student Voice section in `room-detail.html`, directing users to the new facility.

## Image Support & User Uploads
- Replaced the blank grey placeholder cards on `rooms.html` with realistic, high-resolution AI-generated placeholder images of actual college hostels (single, double, and triple setups).
- Included interactive "Add Photo" overlay buttons giving users the ability to seamlessly upload UI-rendered photos of dorms straight from their devices (using FileReaders to preview them locally in the UI elements).
- Integrated a drag-and-drop compatible file upload area directly inside the `write-review.html` form, processing multiple images with dynamic real-time thumbnail previews logic in `app.js`.

## UI Cleanups
- Removed the Predictor call-to-action cards from both the `rooms.html` and `profile.html` interfaces to streamline the views.

## New Feature: Add a Room
- Created a beautifully styled "Add New Room" menu (accessible via a brand new grid card on `rooms.html` reading "Don't see your room?").
- The CTA opens a highly-responsive animated modal popup allowing users to enter a new block ID, room sharing capacity, AC/Non-AC type, and attach initial photos.
- Clicking "Submit" triggers a smooth confirmation and auto-closes the animated menu.

*(The main home page `index.html` was untouched)*
