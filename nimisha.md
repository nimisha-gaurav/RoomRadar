# RoomRadar — Change Log (Nimisha)

## Build 1 — Initial Frontend Scaffold
**Date:** 2026-04-05

### Files Created
| File | Purpose |
|------|---------|
| `css/theme.css` | CSS custom properties for light/dark theme (50+ tokens in RGB format) |
| `js/tailwind-config.js` | Shared Tailwind config referencing CSS variables |
| `js/app.js` | Dark mode toggle, nav active state, password visibility |
| `index.html` | Login / Welcome page with auth form |
| `dashboard.html` | Live counselling dashboard with rank, inventory, room cards |
| `rooms.html` | Room listings with bento grid, filters, search |
| `room-detail.html` | Room detail with photo gallery, ratings, reviews |
| `compare.html` | Side-by-side room comparison |
| `predictor.html` | NCGPA rank predictor with form + results |
| `profile.html` | Profile page with settings |

---

## Build 2 — Navbar Unification & Cleanup
**Date:** 2026-04-05

### Changes
- **Uniform top navbar** added across all pages (dashboard, rooms, room-detail, compare, predictor, profile)
  - Logo + nav links (Home, Rooms, Predictor, Profile) + dark/light toggle button
  - Responsive: icons always visible, text labels on md+ screens
- **Bottom navigation removed** from all pages
- **Fees/prices removed** from all room cards across dashboard, rooms, compare pages
- **Dark/Light toggle moved** from Profile settings card → permanent top navbar
- **Profile page** cleaned up: removed standalone theme toggle card
- `pb-32` removed from body classes (no longer needed without bottom nav)
- `app.js` updated: nav-link active state support, theme icon in navbar
- `theme.css` updated: added `.nav-link` styles
