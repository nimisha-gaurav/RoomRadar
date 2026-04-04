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
      roomies: "roomies",
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
  // Roomie Finder Interactivity
  // =============================================
  function initRoomieFinder() {
    const tabRoom = document.getElementById('tab-need-room');
    const tabRoomie = document.getElementById('tab-need-roomie');
    const containerRoom = document.getElementById('container-need-room');
    const containerRoomie = document.getElementById('container-need-roomie');

    if (!tabRoom || !tabRoomie) return;

    tabRoom.addEventListener('click', () => {
      tabRoom.className = "flex-1 text-sm font-bold py-2 px-4 rounded-full bg-primary text-on-primary transition-all shadow-md";
      tabRoomie.className = "flex-1 text-sm font-bold py-2 px-4 rounded-full text-on-surface-variant hover:text-on-surface transition-all";
      containerRoom.classList.remove('hidden');
      containerRoomie.classList.add('hidden');
    });

    tabRoomie.addEventListener('click', () => {
      tabRoomie.className = "flex-1 text-sm font-bold py-2 px-4 rounded-full bg-primary text-on-primary transition-all shadow-md";
      tabRoom.className = "flex-1 text-sm font-bold py-2 px-4 rounded-full text-on-surface-variant hover:text-on-surface transition-all";
      containerRoomie.classList.remove('hidden');
      containerRoom.classList.add('hidden');
    });

    // Request Buttons
    const requestBtns = document.querySelectorAll('.roomie-request-btn');
    requestBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.disabled) return;
        this.disabled = true;
        this.className = "w-full bg-surface-container-high text-on-surface-variant font-bold py-2 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed border border-outline-variant/5 transition-all outline-none";
        this.innerHTML = `Request Sent <span class="material-symbols-outlined text-sm">schedule</span>`;
      });
    });

    // Accept Button (Simulating email reveal)
    const acceptBtns = document.querySelectorAll('.roomie-accept-btn');
    acceptBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.disabled) return;
        this.disabled = true;
        this.className = "w-full bg-secondary-container text-on-secondary-container border border-secondary/20 font-bold py-2 rounded-lg flex items-center justify-center gap-2 break-all px-2 text-sm transition-all shadow-inner";
        // Reveal email
        this.innerHTML = `<span class="material-symbols-outlined text-sm">mail_lock</span> sneha.r@vit.edu`;
        
        // Remove the pulse notification and update status
        const card = this.closest('.bg-surface-container-lowest');
        if (card) {
           const badge = card.querySelector('.pulse-badge');
           if (badge) {
              badge.classList.remove('animate-pulse', 'bg-tertiary-container', 'text-on-tertiary-container');
              badge.classList.add('bg-secondary-container', 'text-on-secondary-container');
              badge.textContent = "Connected";
           }
           // Swap card accent to green/secondary instead of purple
           card.classList.remove('border-tertiary');
           card.classList.add('border-secondary/30');
           const topBar = card.querySelector('.bg-tertiary');
           if (topBar) {
              topBar.classList.replace('bg-tertiary', 'bg-secondary');
           }
        }
      });
    });
  }

  // =============================================
  // Add Roomie Modal Interactivity
  // =============================================
  function initAddRoomieModal() {
    const openBtn = document.getElementById('open-add-roomie-modal');
    const closeBtn = document.getElementById('close-add-roomie-modal');
    const modal = document.getElementById('add-roomie-modal');
    const dialog = document.getElementById('add-roomie-dialog');
    const form = document.getElementById('add-roomie-form');

    if (!modal || !openBtn || !form) return;

    function openModal() {
      modal.classList.remove('hidden');
      // Trigger reflow
      void modal.offsetWidth;
      dialog.classList.remove('scale-95', 'opacity-0');
      dialog.classList.add('scale-100', 'opacity-100');
    }

    function closeModal() {
      dialog.classList.remove('scale-100', 'opacity-100');
      dialog.classList.add('scale-95', 'opacity-0');
      setTimeout(() => modal.classList.add('hidden'), 300);
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'add-roomie-backdrop') closeModal();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const type = document.getElementById('post-type').value;
      const name = document.getElementById('post-name').value;
      const details = document.getElementById('post-details').value;
      const tagsStr = document.getElementById('post-tags').value;
      
      const tagsHtml = tagsStr.split(',').map(tag => {
        const t = tag.trim();
        if (!t) return '';
        return `<span class="px-2 py-1 text-[10px] font-bold rounded bg-surface-container text-on-surface border border-outline-variant/10">${t}</span>`;
      }).join('');

      const firstChar = name.charAt(0).toUpperCase();

      const colors = [
        'bg-primary-container text-primary',
        'bg-secondary-container text-secondary', 
        'bg-tertiary-container text-tertiary'
      ];
      const randColor = colors[Math.floor(Math.random() * colors.length)];

      const cardHtml = `
        <div class="bg-surface-container-lowest border border-outline-variant/5 p-6 rounded-xl hover:shadow-lg transition-shadow border-l-4 border-l-primary/50 animate-[pulse_0.5s_ease-out]">
          <div class="flex justify-between items-start mb-4">
             <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full ${randColor} flex items-center justify-center font-bold text-xl">${firstChar}</div>
              <div>
                <h4 class="font-headline font-bold text-lg leading-tight">${name}</h4>
                <p class="text-xs text-on-surface-variant">${details}</p>
              </div>
            </div>
             <span class="bg-primary-container text-on-primary-container text-[10px] px-2 py-1 rounded font-bold uppercase">Just Now</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-6">
             ${tagsHtml}
          </div>
          <button class="w-full bg-primary-container hover:bg-primary-container/80 text-on-primary-container font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 roomie-request-btn border border-primary/10">
            Send Request <span class="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      `;

      const targetContainerId = type === 'need-room' ? 'container-need-room' : 'container-need-roomie';
      const container = document.getElementById(targetContainerId);
      
      if (container) {
          container.insertAdjacentHTML('afterbegin', cardHtml);
          
          const newCard = container.firstElementChild;
          const newBtn = newCard.querySelector('.roomie-request-btn');
          if (newBtn) {
            newBtn.addEventListener('click', function() {
              if (this.disabled) return;
              this.disabled = true;
              this.className = "w-full bg-surface-container-high text-on-surface-variant font-bold py-2 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed border border-outline-variant/5 transition-all outline-none";
              this.innerHTML = `Request Sent <span class="material-symbols-outlined text-sm">schedule</span>`;
            });
          }
          if (typeof initBorderGlow === 'function') {
             initBorderGlow(newCard);
          }
      }

      form.reset();
      closeModal();
    });
  }

  // =============================================
  // BorderGlow Vanilla Implementation
  // =============================================
  function initBorderGlow(container = document) {
    const parseHSL = (hslStr) => {
      const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
      if (!match) return { h: 40, s: 80, l: 80 };
      return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
    };

    const buildGlowVars = (glowColor, intensity) => {
      const { h, s, l } = parseHSL(glowColor);
      const base = `${h}deg ${s}% ${l}%`;
      const opacities = [100, 60, 50, 40, 30, 20, 10];
      const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
      const vars = {};
      for (let i = 0; i < opacities.length; i++) {
        vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
      }
      return vars;
    };

    const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
    const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
    const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

    const buildGradientVars = (colors) => {
      const vars = {};
      for (let i = 0; i < 7; i++) {
          const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
          vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
      }
      vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
      return vars;
    };

    function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
    function easeInCubic(x) { return x * x * x; }

    function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
      const t0 = performance.now() + delay;
      function tick() {
          const elapsed = performance.now() - t0;
          const t = Math.min(elapsed / duration, 1);
          onUpdate(start + (end - start) * ease(t));
          if (t < 1) requestAnimationFrame(tick);
          else if (onEnd) onEnd();
      }
      setTimeout(() => requestAnimationFrame(tick), delay);
    }

    const getCenterOfElement = (el) => {
      const { width, height } = el.getBoundingClientRect();
      return [width / 2, height / 2];
    };

    const getEdgeProximity = (el, x, y) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity, ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    };

    const getCursorAngle = (el, x, y) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    };

    const targets = container.classList && container.classList.contains('border-glow-card') 
        ? [container] 
        : container.querySelectorAll('.border-glow-card');

    targets.forEach(card => {
      const edgeSensitivity = card.dataset.edgeSensitivity || 30;
      const glowColor = card.dataset.glowColor || '200 80 50'; 
      const backgroundColor = card.dataset.backgroundColor || '#060010';
      const borderRadius = card.dataset.borderRadius || 28;
      const glowRadius = card.dataset.glowRadius || 40;
      const glowIntensity = card.dataset.glowIntensity || 1;
      const coneSpread = card.dataset.coneSpread || 25;
      const animated = card.dataset.animated === 'true';
      const fillOpacity = card.dataset.fillOpacity || 0.5;
      const colors = card.dataset.colors 
        ? JSON.parse(card.dataset.colors) 
        : ['#c084fc', '#f472b6', '#38bdf8'];

      card.style.setProperty('--card-bg', backgroundColor);
      card.style.setProperty('--edge-sensitivity', edgeSensitivity);
      card.style.setProperty('--border-radius', `${borderRadius}px`);
      card.style.setProperty('--glow-padding', `${glowRadius}px`);
      card.style.setProperty('--cone-spread', coneSpread);
      card.style.setProperty('--fill-opacity', fillOpacity);
      
      const glowVars = buildGlowVars(glowColor, glowIntensity);
      for (const [key, val] of Object.entries(glowVars)) {
        card.style.setProperty(key, val);
      }
      const gradVars = buildGradientVars(colors);
      for (const [key, val] of Object.entries(gradVars)) {
        card.style.setProperty(key, val);
      }

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);
        card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
        card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
      });

      if (animated) {
        const angleStart = 110;
        const angleEnd = 465;
        card.classList.add('sweep-active');
        card.style.setProperty('--cursor-angle', `${angleStart}deg`);

        animateValue({ duration: 500, onUpdate: v => card.style.setProperty('--edge-proximity', v) });
        animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`) });
        animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`) });
        animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
          onUpdate: v => card.style.setProperty('--edge-proximity', v),
          onEnd: () => card.classList.remove('sweep-active'),
        });
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
    initRoomieFinder();
    initAddRoomieModal();
    initBorderGlow();

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
