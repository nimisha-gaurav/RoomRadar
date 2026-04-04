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
  // Room Type Interactivity
  // =============================================
  function initRoomTypeInteractivity() {
    const roomTypeSection = Array.from(document.querySelectorAll('p')).find(p => p && p.textContent && p.textContent.trim() === 'Room Types');
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
      });
    });
  }

  // =============================================
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
      });
    });
  }

  // =============================================
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
  // GSAP BounceCards Gallery (room-detail.html)
  // =============================================
  function initBounceCards() {
    const container = document.getElementById('bounce-cards-container');
    if (!container || typeof gsap === 'undefined') return;

    const images = [
      "images/room-single.png", 
      "images/room-double.png", 
      "images/room-triple.png"
    ];

    const transformStyles = [
      "rotate(-8deg) translate(-100px)",
      "rotate(0deg)",
      "rotate(8deg) translate(100px)"
    ];

    // Render cards
    images.forEach((src, idx) => {
      const card = document.createElement('div');
      card.className = `card card-${idx}`;
      card.style.transform = transformStyles[idx] || 'none';
      card.style.zIndex = Math.abs(idx - 1) === 0 ? 10 : 9;

      const img = document.createElement('img');
      img.className = 'image';
      img.src = src;
      img.alt = `Room view ${idx + 1}`;

      card.appendChild(img);
      container.appendChild(card);
    });

    const animationDelay = 0.5;
    const animationStagger = 0.08;
    const easeType = 'elastic.out(1, 0.8)';

    // Initial animation
    gsap.fromTo('.card', 
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay
      }
    );

    const getNoRotationTransform = (transformStr) => {
      const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
      if (hasRotate) {
        return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
      } else if (transformStr === 'none') {
        return 'rotate(0deg)';
      } else {
        return `${transformStr} rotate(0deg)`;
      }
    };

    const getPushedTransform = (baseTransform, offsetX) => {
      const translateRegex = /translate\(([-0-9.]+)px\)/;
      const match = baseTransform.match(translateRegex);
      if (match) {
        const currentX = parseFloat(match[1]);
        const newX = currentX + offsetX;
        return baseTransform.replace(translateRegex, `translate(${newX}px)`);
      } else {
        return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
      }
    };

    const pushSiblings = (hoveredIdx) => {
      images.forEach((_, i) => {
        const target = container.querySelector(`.card-${i}`);
        gsap.killTweensOf(target);
        const baseTransform = transformStyles[i] || 'none';

        if (i === hoveredIdx) {
          const noRotationTransform = getNoRotationTransform(baseTransform);
          gsap.to(target, {
            transform: noRotationTransform,
            duration: 0.4,
            ease: 'back.out(1.4)',
            zIndex: 100, // Bring to front
            overwrite: 'auto'
          });
        } else {
          const offsetX = i < hoveredIdx ? -140 : 140;
          const pushedTransform = getPushedTransform(baseTransform, offsetX);
          const distance = Math.abs(hoveredIdx - i);
          const delay = distance * 0.05;

          gsap.to(target, {
            transform: pushedTransform,
            duration: 0.4,
            ease: 'back.out(1.4)',
            delay,
            zIndex: 10 - distance,
            overwrite: 'auto'
          });
        }
      });
    };

    const resetSiblings = () => {
      images.forEach((_, i) => {
        const target = container.querySelector(`.card-${i}`);
        gsap.killTweensOf(target);
        const baseTransform = transformStyles[i] || 'none';
        gsap.to(target, {
          transform: baseTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          zIndex: Math.abs(i - 1) === 0 ? 10 : 9,
          overwrite: 'auto'
        });
      });
    };

    // Attach hover listeners manually
    images.forEach((_, idx) => {
      const target = container.querySelector(`.card-${idx}`);
      target.addEventListener('mouseenter', () => pushSiblings(idx));
      target.addEventListener('mouseleave', resetSiblings);
    });
  }

  // =============================================
  // Constellations Background Effect (Canvas 2D)
  // =============================================
  function initConstellations() {
    // If pixel snow container exists, remove it
    const snowContainer = document.getElementById('pixel-snow-container');
    if (snowContainer) snowContainer.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'constellation-canvas';
    canvas.className = 'fixed inset-0 pointer-events-none z-[-10]';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 8000), 120); // Responsive density
    const maxVelocity = 0.5;
    const connectionRadius = 130;
    const mouseRadius = 150;

    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * maxVelocity * 2;
        this.vy = (Math.random() - 0.5) * maxVelocity * 2;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (slight repulsion physics)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          const ax = (dx / dist) * force * 0.05;
          const ay = (dy / dist) * force * 0.05;
          
          this.vx -= ax;
          this.vy -= ay;

          // Soft cap velocity
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > maxVelocity * 2) {
            this.vx = (this.vx / speed) * maxVelocity * 2;
            this.vy = (this.vy / speed) * maxVelocity * 2;
          }
        }
      }

      draw() {
        const isDark = document.documentElement.classList.contains("dark");
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(146, 63, 95, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = document.documentElement.classList.contains("dark");
      const lineRGB = isDark ? '255, 255, 255' : '146, 63, 95';

      for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionRadius) {
            const opacity = 1 - (dist / connectionRadius);
            ctx.strokeStyle = `rgba(${lineRGB}, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Draw line to mouse
        const dxm = particles[i].x - mouse.x;
        const dym = particles[i].y - mouse.y;
        const distm = Math.sqrt(dxm * dxm + dym * dym);

        if (distm < mouseRadius) {
          const opacity = 1 - (distm / mouseRadius);
          ctx.strokeStyle = `rgba(${lineRGB}, ${opacity * 0.5})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      requestAnimationFrame(animate);
    }
    
    animate();
  }

  // =============================================
  // ClickSpark (Canvas 2D Cursor Effect)
  // =============================================
  function initClickSpark() {
    const canvas = document.createElement('canvas');
    canvas.id = 'click-spark-canvas';
    canvas.className = 'fixed inset-0 pointer-events-none z-[9999]';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let sparks = [];
    let animationId = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      sparks = sparks.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= 400) return false;

        const progress = elapsed / 400;
        const eased = progress * (2 - progress);

        const distance = eased * 15;
        const lineLength = 10 * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        // Requested Pink Color
        ctx.strokeStyle = '#ff69b4';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparks.length > 0) {
        animationId = requestAnimationFrame(draw);
      }
    };

    document.addEventListener('click', (e) => {
      const now = performance.now();
      const sparkCount = 8;
      
      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      }));

      sparks.push(...newSparks);
      if (sparks.length === sparkCount) {
        animationId = requestAnimationFrame(draw);
      }
    });
  }

  // =============================================
  // Init on DOM ready
  // =============================================
  document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    initPasswordToggle();
    initRoomTypeInteractivity();
    initPhotoUploads();
    initReviewPhotoUpload();
    initAddRoomModal();
    initBounceCards();
    initConstellations();
    initClickSpark();

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
