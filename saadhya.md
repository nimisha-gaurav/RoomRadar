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

*(The main home page `index.html` was untouched)*
