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
  // Init on DOM ready
  // =============================================
  document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    initPasswordToggle();

    // Theme toggle click handler
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", toggleTheme);
    }

    // Re-apply theme UI after DOM is ready
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    updateThemeToggleUI(theme);
  });

  // Expose for inline use if needed
  window.RoomRadar = { toggleTheme, applyTheme };
})();
