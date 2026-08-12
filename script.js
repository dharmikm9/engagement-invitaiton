/* ==========================================================================
   SCRIPT.JS — ENGAGEMENT INVITATION INTERACTION & ANIMATION
   ========================================================================== */

// ── 1. LANGUAGE TOGGLE ──────────────────────────────────
let currentLang = 'en';
let i18nElements = null;
let btnEn = null;
let btnGu = null;

function initLanguage() {
  btnEn = document.getElementById('btnEn');
  btnGu = document.getElementById('btnGu');
  i18nElements = document.querySelectorAll('[data-en]');
}

function setLang(lang) {
  currentLang = lang;
  document.body.classList.toggle('lang-gu', lang === 'gu');
  
  if (btnEn && btnGu) {
    btnEn.classList.toggle('active', lang === 'en');
    btnGu.classList.toggle('active', lang === 'gu');
  }

  if (!i18nElements) {
    i18nElements = document.querySelectorAll('[data-en]');
  }

  i18nElements.forEach(el => {
    const targetText = lang === 'gu' ? el.dataset.gu : el.dataset.en;
    if (targetText) {
      el.textContent = targetText;
    }
  });
}


// ── 2. BACKGROUND MUSIC TOGGLE ──────────────────────────
let audioPlayerInitialized = false;

function initMusicPlayer() {
  const audio = document.getElementById('bgMusic');
  const btn = document.getElementById('musicBtn');
  if (!audio || !btn || audioPlayerInitialized) return;
  audioPlayerInitialized = true;

  const iconPlay = btn.querySelector('.icon-play');
  const iconMute = btn.querySelector('.icon-mute');
  const equalizer = btn.querySelector('.music-equalizer');
  const musicText = btn.querySelector('.music-text');

  function updateUI(isPlaying) {
    if (isPlaying) {
      btn.classList.add('playing');
      if (iconPlay) iconPlay.style.display = 'none';
      if (iconMute) iconMute.style.display = 'none';
      if (equalizer) equalizer.style.display = 'flex';
      if (musicText) {
        musicText.dataset.en = "Music ON";
        musicText.dataset.gu = "સંગીત ચાલુ";
        musicText.textContent = currentLang === 'gu' ? "સંગીત ચાલુ" : "Music ON";
      }
    } else {
      btn.classList.remove('playing');
      if (iconPlay) iconPlay.style.display = 'block';
      if (iconMute) iconMute.style.display = 'none';
      if (equalizer) equalizer.style.display = 'none';
      if (musicText) {
        musicText.dataset.en = "Music";
        musicText.dataset.gu = "સંગીત";
        musicText.textContent = currentLang === 'gu' ? "સંગીત" : "Music";
      }
    }
  }

  // Sync UI with audio events
  audio.addEventListener('play', () => updateUI(true));
  audio.addEventListener('pause', () => updateUI(false));
  audio.addEventListener('ended', () => updateUI(false));
  audio.addEventListener('error', (e) => {
    console.error('Audio playback error:', e);
    updateUI(false);
  });

  // Global toggle handler
  window.toggleMusic = function() {
    if (audio.paused) {
      audio.play().then(() => {
        updateUI(true);
      }).catch(err => {
        console.warn('Playback error or blocked by browser policy:', err);
        updateUI(false);
      });
    } else {
      audio.pause();
      updateUI(false);
    }
  };
}


// ── 3. COUNTDOWN TIMER ──────────────────────────────────
let daysEl, hoursEl, minsEl, secsEl;
const targetDateMs = new Date('2026-08-23T09:00:00+05:30').getTime();

function initCountdown() {
  daysEl = document.getElementById('countDays');
  hoursEl = document.getElementById('countHours');
  minsEl = document.getElementById('countMins');
  secsEl = document.getElementById('countSecs');
}

function updateCountdown() {
  const now = Date.now();
  const diff = targetDateMs - now;

  if (diff <= 0) {
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minsEl) minsEl.textContent = '00';
    if (secsEl) secsEl.textContent = '00';
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const pad = n => String(n).padStart(2, '0');

  const setVal = (el, val) => {
    if (!el) return;
    const formattedVal = pad(val);
    if (el.textContent !== formattedVal) {
      el.textContent = formattedVal;
    }
  };

  setVal(daysEl, d);
  setVal(hoursEl, h);
  setVal(minsEl, m);
  setVal(secsEl, s);
}


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


// ── 5. FALLING ROSE PETALS CANVAS (PATH2D HARDWARE ACCELERATED) ──
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

  // Optimized Path2D object reusable for all petal draws
  const petalShape = new Path2D();
  petalShape.ellipse(0, -0.5, 0.35, 0.65, 0, 0, Math.PI * 2);

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
    ctx.scale(p.size, p.size);

    ctx.fillStyle = p.color;
    ctx.fill(petalShape);

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


// ── INITIALIZATION ──────────────────────────────────
function initApp() {
  initLanguage();
  initMusicPlayer();
  initCountdown();
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
