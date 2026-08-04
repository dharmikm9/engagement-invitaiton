/* ==========================================================================
   SCRIPT.JS — ENGAGEMENT INVITATION INTERACTION & ANIMATION
   ========================================================================== */

// ── 1. LANGUAGE TOGGLE ──────────────────────────────────
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.body.classList.toggle('lang-gu', lang === 'gu');
  
  const btnEn = document.getElementById('btnEn');
  const btnGu = document.getElementById('btnGu');
  
  if (btnEn && btnGu) {
    btnEn.classList.toggle('active', lang === 'en');
    btnGu.classList.toggle('active', lang === 'gu');
  }

  document.querySelectorAll('[data-en]').forEach(el => {
    const targetText = lang === 'gu' ? el.dataset.gu : el.dataset.en;
    if (targetText) {
      el.textContent = targetText;
    }
  });
}


// ── 2. BACKGROUND MUSIC TOGGLE ──────────────────────────
let isPlaying = false;

function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  const btn = document.getElementById('musicBtn');
  if (!audio || !btn) return;

  const iconPlay = btn.querySelector('.icon-play');
  const iconMute = btn.querySelector('.icon-mute');

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    if (iconPlay) iconPlay.style.display = 'block';
    if (iconMute) iconMute.style.display = 'none';
  } else {
    audio.play().then(() => {
      isPlaying = true;
      if (iconPlay) iconPlay.style.display = 'none';
      if (iconMute) iconMute.style.display = 'block';
    }).catch(err => {
      console.log('Audio playback interaction needed:', err);
    });
  }
}


// ── 3. COUNTDOWN TIMER ──────────────────────────────────
function updateCountdown() {
  const targetDate = new Date('2026-08-23T09:00:00+05:30');
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    ['Days', 'Hours', 'Mins', 'Secs'].forEach(id => {
      const el = document.getElementById('count' + id);
      if (el) el.textContent = '00';
    });
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const pad = n => String(n).padStart(2, '0');

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    const formattedVal = pad(val);
    if (el.textContent !== formattedVal) {
      el.textContent = formattedVal;
    }
  };

  setVal('countDays', d);
  setVal('countHours', h);
  setVal('countMins', m);
  setVal('countSecs', s);
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ── 4. ADD TO CALENDAR ──────────────────────────────────
function addToCalendar() {
  const title = encodeURIComponent("Dharmik & Drashti Engagement Ceremony");
  const details = encodeURIComponent("Join us for the engagement ceremony of Dharmik & Drashti at Ramvadi, Nawa Para, Bhavnagar, Gujarat.");
  const location = encodeURIComponent("Ramvadi, Nawa Para, Bhavnagar, Gujarat");
  const startDate = "20260823T033000Z"; // 9:00 AM IST is 03:30 AM UTC
  const endDate = "20260823T083000Z";   // 2:00 PM IST is 08:30 AM UTC

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  window.open(calendarUrl, '_blank');
}


// ── 5. FALLING ROSE PETALS CANVAS (PERFORMANCE OPTIMIZED) ─────────
(function initPetalsCanvas() {
  const canvas = document.getElementById('petalsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let W, H;
  let animId = null;
  let isTabActive = true;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Reduce petal count on mobile screens to maintain smooth 60fps
  const PETAL_COUNT = W < 600 ? 18 : 32;
  const COLORS = ['#e8ab3e', '#f4ead5', '#ff9aa2', '#bf872b'];

  const petals = Array.from({ length: PETAL_COUNT }, () => createPetal());

  function createPetal(fromTop = false) {
    return {
      x: Math.random() * W,
      y: fromTop ? -20 : Math.random() * H,
      size: 6 + Math.random() * 10,
      speedY: 0.5 + Math.random() * 1.0,
      speedX: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      opacity: 0.3 + Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    ctx.beginPath();
    ctx.ellipse(0, -p.size * 0.5, p.size * 0.35, p.size * 0.65, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    ctx.restore();
  }

  function render() {
    if (!isTabActive) return;
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.y * 0.01) * 0.35;
      p.rotation += p.rotSpeed;

      if (p.y > H + 30) {
        Object.assign(p, createPetal(true));
      }

      drawPetal(p);
    });
    animId = requestAnimationFrame(render);
  }

  // Pause canvas animation when tab is inactive to preserve CPU & mobile battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isTabActive = false;
      if (animId) cancelAnimationFrame(animId);
    } else {
      if (!isTabActive) {
        isTabActive = true;
        render();
      }
    }
  });

  render();
})();
