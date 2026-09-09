/* =============================================
   SkyFleet Technologies — script.js
   Enterprise B2B Client Logic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT ── */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
  }, { passive: true });

  if (sections.length && navAnchors.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            if (a.getAttribute('href') === '#' + id) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-30% 0px -50% 0px' });

    sections.forEach(s => sectionObserver.observe(s));
  }


  /* ── 2. MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  /* ── 3. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 4. DYNAMIC FOOTER YEAR ── */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
