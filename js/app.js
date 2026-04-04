// RoomRadar — Shared Application Logic

(function () {
  "use strict";

  // =============================================
  // Dark Mode Toggle
  // =============================================
  const THEME_KEY = "roomradar-theme";

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggleUI(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function updateThemeToggleUI(theme) {
    // Update all theme icons in the page (navbar toggle)
    document.querySelectorAll(".theme-icon").forEach(function (icon) {
      icon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
    });
  }

  // Initialize theme
  const stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  // =============================================
  // Navigation — Active State
  // =============================================
  function setActiveNav() {
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "") || "index";

    const navMap = {
      dashboard: "dashboard",
      rooms: "rooms",
      "room-detail": "rooms",
      compare: "rooms",
      predictor: "predictor",
      profile: "profile",
    };

    const activeKey = navMap[page] || "";

    document.querySelectorAll(".nav-link").forEach((item) => {
      const itemPage = item.getAttribute("data-page");
      if (itemPage === activeKey) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // =============================================
  // Password Visibility Toggle (Login page)
  // =============================================
  function initPasswordToggle() {
    const btn = document.getElementById("toggle-password");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const input = document.getElementById("password-input");
      const icon = btn.querySelector(".material-symbols-outlined");
      if (input.type === "password") {
        input.type = "text";
        if (icon) icon.textContent = "visibility_off";
      } else {
        input.type = "password";
        if (icon) icon.textContent = "visibility";
      }
    });
  }

  // =============================================
<<<<<<< Updated upstream
  // Room Type Interactivity
  // =============================================
  function initRoomTypeInteractivity() {
    const roomTypeSection = Array.from(document.querySelectorAll('p')).find(p => p.textContent.trim() === 'Room Types');
    if (!roomTypeSection) return;
    
    const btnsContainer = roomTypeSection.nextElementSibling;
    if (!btnsContainer) return;

    const buttons = btnsContainer.querySelectorAll('button');
    const blockContainers = document.querySelectorAll('.grid.place-items-center > div.flex-col');

    const roomData = {
      "6NAC": { "A": 12, "E-annex": 12 },
      "6AC":  { "F": 78 },
      "4NAC": { "A": 80 },
      "4AC":  { "C": 208, "D": 56, "E": 56, "F": 76 },
      "3NAC": { "H": 6, "J": 105 },
      "3AC":  {},
      "2NAC": { "A": 8, "E-annex": 6 },
      "2AC":  { "C": 8, "D": 4, "E": 160, "E-annex": 20 },
      "1NAC": { "B": 11 },
      "1AC":  { "D": 31, "E-annex": 15, "F": 3 },
      "6 NAPT": { "H": 90, "J": 54 },
      "5 NAPT": { "J": 15 },
      "4 NAPT": { "H": 84, "J": 98 },
      "3 NAPT": {},
      "2 NAPT": {},
      "4 Apt":  { "H": 128 },
      "3 Apt":  {},
      "2 Apt":  { "J": 40 }
    };

    blockContainers.forEach(block => {
      const relativeDiv = block.querySelector('.relative');
      if (relativeDiv && !relativeDiv.querySelector('.qty-span')) {
        const span = document.createElement('span');
        span.className = "absolute inset-0 flex items-center justify-center text-sm font-bold qty-span text-on-surface";
        span.textContent = "-";
        relativeDiv.appendChild(span);
        const progressCircle = relativeDiv.querySelector('circle:nth-child(2)');
        if (progressCircle) {
           progressCircle.setAttribute('stroke-dasharray', '176');
           progressCircle.setAttribute('stroke-dashoffset', '176');
           progressCircle.style.transition = 'stroke-dashoffset 0.5s ease-out';
        }
      }
    });

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('bg-primary');
        if (isActive) {
          btn.classList.remove('bg-primary', 'text-on-primary');
          btn.classList.add('bg-surface-container-high', 'text-on-surface');
        } else {
          btn.classList.add('bg-primary', 'text-on-primary');
          btn.classList.remove('bg-surface-container-high', 'text-on-surface');
        }

        const activeTypes = Array.from(buttons)
          .filter(b => b.classList.contains('bg-primary'))
          .map(b => b.textContent.trim());

        blockContainers.forEach(block => {
           let blockName = block.getAttribute('title').replace('Block ', '').trim();
           
           let qty = 0;
           activeTypes.forEach(type => {
               const data = roomData[type] || {};
               qty += (data[blockName] || 0);
           });

           const span = block.querySelector('.qty-span');
           const progressCircle = block.querySelector('circle:nth-child(2)');

           if (span) {
             span.textContent = qty > 0 ? qty : "-";
             span.classList.toggle('text-tertiary', qty > 0);
           }
           
           if (progressCircle) {
             if (qty > 0) {
               const offset = 176 - Math.min((qty / 200) * 176, 176); 
               progressCircle.setAttribute('stroke-dashoffset', offset);
             } else {
               progressCircle.setAttribute('stroke-dashoffset', '176');
             }
           }
        });
=======
  // Room Photo Upload (rooms.html)
  // =============================================
  function initPhotoUploads() {
    document.querySelectorAll('.add-photo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const input = btn.nextElementSibling;
        if (input && input.classList.contains('room-photo-upload')) {
          input.click();
        }
      });
    });

    document.querySelectorAll('.room-photo-upload').forEach(input => {
      // Prevent clicking the hidden input directly from bubbling up to the card link
      input.addEventListener('click', (e) => e.stopPropagation());
      
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const container = input.closest('.relative');
            if (container) {
               const img = container.querySelector('img.room-image');
               if (img) img.src = e.target.result;
            }
          };
          reader.readAsDataURL(file);
        }
>>>>>>> Stashed changes
      });
    });
  }

  // =============================================
<<<<<<< Updated upstream
=======
  // Review Form Photo Upload Preview (write-review.html)
  // =============================================
  function initReviewPhotoUpload() {
    const uploadInput = document.getElementById('review-photo-upload');
    const previewContainer = document.getElementById('review-photo-preview');
    if (!uploadInput || !previewContainer) return;

    uploadInput.addEventListener('change', (e) => {
      previewContainer.innerHTML = ''; // Clear previous previews
      const files = Array.from(e.target.files);
      
      files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgWrapper = document.createElement('div');
          imgWrapper.className = 'w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-outline-variant/20 relative group shadow-sm bg-surface-container-high';
          
          const img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'w-full h-full object-cover';
          
          imgWrapper.appendChild(img);
          previewContainer.appendChild(imgWrapper);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  // =============================================
  // Add Room Modal Logic (rooms.html)
  // =============================================
  function initAddRoomModal() {
    const openBtn = document.getElementById('open-add-room-modal');
    const closeBtn = document.getElementById('close-add-room-modal');
    const backdrop = document.getElementById('add-room-backdrop');
    const modal = document.getElementById('add-room-modal');
    const dialog = document.getElementById('add-room-dialog');

    if (!modal || !openBtn) return;

    const openModal = () => {
      modal.classList.remove('hidden');
      // trigger reflow
      void modal.offsetWidth;
      dialog.classList.remove('scale-95', 'opacity-0');
      dialog.classList.add('scale-100', 'opacity-100');
    };

    const closeModal = () => {
      dialog.classList.remove('scale-100', 'opacity-100');
      dialog.classList.add('scale-95', 'opacity-0');
      setTimeout(() => modal.classList.add('hidden'), 300);
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
  }

  // =============================================
>>>>>>> Stashed changes
  // Init on DOM ready
  // =============================================
  document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    initPasswordToggle();
<<<<<<< Updated upstream
    initRoomTypeInteractivity();
=======
    initPhotoUploads();
    initReviewPhotoUpload();
    initAddRoomModal();
>>>>>>> Stashed changes

    // Theme toggle click handler
    document.querySelectorAll("#theme-toggle").forEach((toggle) => {
      toggle.addEventListener("click", toggleTheme);
    });

    // Re-apply theme UI after DOM is ready
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    updateThemeToggleUI(theme);
  });

  // Expose for inline use if needed
  window.RoomRadar = { toggleTheme, applyTheme };
})();
