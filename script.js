/* =============================================
   NexaCore IT Solutions — script.js
   Handles: navbar, mobile menu, scroll reveal,
   counter animation, contact form submission
   ============================================= */

/* ── 1. NAVBAR — add .scrolled class on scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ── 2. MOBILE HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ── 3. SCROLL REVEAL — IntersectionObserver ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


/* ── 4. COUNTER ANIMATION (Stats section) ── */
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600; // ms
  const step     = 16;   // ~60fps
  const increment= target / (duration / step);
  let current    = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, step);
}

// Trigger counters only when the stats section is visible
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNums.forEach(animateCounter);
      counterObserver.disconnect(); // run once
    }
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) counterObserver.observe(statsSection);


/* ── 5. CONTACT FORM SUBMISSION ── */
/*
  The form POSTs JSON to the Node.js backend (server.js) running at /send-email.
  To use PHP instead, change the fetch URL to 'mail.php' and adjust accordingly.
  See server.js / mail.php for backend setup instructions.
*/

const form       = document.getElementById('contactForm');
const btnText    = document.getElementById('btnText');
const btnLoader  = document.getElementById('btnLoader');
const submitBtn  = document.getElementById('submitBtn');
const formSuccess= document.getElementById('formSuccess');
const formError  = document.getElementById('formError');

// Basic front-end validation helper
function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.name.trim())              return 'Please enter your name.';
  if (!emailRegex.test(data.email))   return 'Please enter a valid email address.';
  if (!data.service)                  return 'Please select a service.';
  if (!data.message.trim())           return 'Please enter a message.';
  return null;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Hide old feedback
  formSuccess.classList.add('hidden');
  formError.classList.add('hidden');

  // Gather form data
  const formData = {
    name:    document.getElementById('name').value,
    email:   document.getElementById('email').value,
    phone:   document.getElementById('phone').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value,
  };

  // Validate
  const error = validateForm(formData);
  if (error) {
    formError.textContent = '❌ ' + error;
    formError.classList.remove('hidden');
    return;
  }

  // Show loading state
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  submitBtn.disabled = true;

  try {
    // ── Change the URL below to match your backend ──
    // Node.js:  'http://localhost:3001/send-email'
    // PHP:      'mail.php'
    const response = await fetch('mail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      formSuccess.classList.remove('hidden');
      form.reset();
    } else {
      let serverMessage = 'Could not send message. Please email us directly.';
      try {
        const payload = await response.json();
        if (payload?.error) serverMessage = payload.error;
      } catch (_) {
        // Keep default message if server returned non-JSON.
      }
      throw new Error(serverMessage);
    }
  } catch (err) {
    console.error('Form submission error:', err);
    formError.textContent = '❌ ' + err.message;
    formError.classList.remove('hidden');
  } finally {
    // Restore button
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    submitBtn.disabled = false;
  }
});


/* ── 6. SMOOTH ACTIVE NAV HIGHLIGHT ── */
/*
  Highlight the nav link matching the current section in view.
*/
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id
          ? 'var(--accent)'
          : 'var(--text-muted)';
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── 7. HERO PARALLAX + CARD TILT ── */
const hero = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero-glow');

if (hero && heroGlow) {
  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroGlow.style.transform = `translateX(-50%) translate3d(${x * 28}px, ${y * 18}px, 0)`;
  });

  hero.addEventListener('mouseleave', () => {
    heroGlow.style.transform = 'translateX(-50%) translate3d(0, 0, 0)';
  });
}

const tiltCards = document.querySelectorAll('.service-card, .portfolio-card');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
