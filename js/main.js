(function () {
  'use strict';

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('year');

  // Header scroll effect
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Contact form submit (placeholder — replace with your backend or Formspree etc.)
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      var data = Object.fromEntries(formData);
      console.log('Form data:', data);
      alert('Hvala na poruci. Kontaktirat ćemo vas uskoro.');
      contactForm.reset();
    });
  }

  // Footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
