(function () {
  'use strict';

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('year');

  // ----- Scroll reveal (Intersection Observer) -----
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ----- Header scroll effect -----
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile menu -----
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Carousel helper (touch + mouse drag, swipe on laptop) -----
  function initCarousel(options) {
    var track = options.track;
    var dotsContainer = options.dotsContainer;
    if (!track || !dotsContainer) return;

    var viewport = track.parentElement;
    if (!viewport) return;

    var slides = track.children;
    var count = slides.length;
    if (count === 0) return;

    var index = 0;
    var isTouch = false;
    var isMouseDrag = false;
    var startX = 0;
    var currentX = 0;

    function getViewportWidth() {
      return viewport.offsetWidth || 100;
    }

    function goTo(i, noTransition) {
      i = Math.max(0, Math.min(i, count - 1));
      index = i;
      if (noTransition) track.style.transition = 'none';
      else track.style.transition = '';
      var pct = count > 1 ? (index * 100 / count) : 0;
      track.style.transform = 'translate3d(-' + pct + '%, 0, 0)';

      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach(function (dot, j) {
        dot.classList.toggle('active', j === index);
        dot.setAttribute('aria-selected', j === index);
      });
    }

    function applyDragOffset(deltaX) {
      var vw = getViewportWidth();
      var slidePct = 100 / count;
      var dragPct = (deltaX / vw) * slidePct;
      var totalPct = (index * 100 / count) + dragPct;
      track.style.transition = 'none';
      track.style.transform = 'translate3d(-' + totalPct + '%, 0, 0)';
    }

    function endMouseDrag() {
      if (!isMouseDrag) return;
      isMouseDrag = false;
      viewport.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      var deltaX = startX - currentX;
      var threshold = getViewportWidth() * 0.15;
      if (deltaX > threshold) goTo(index + 1);
      else if (deltaX < -threshold) goTo(index - 1);
      else goTo(index);
    }

    // Create dots
    dotsContainer.innerHTML = '';
    for (var d = 0; d < count; d++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot' + (d === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (d + 1));
      dot.setAttribute('aria-selected', d === 0 ? 'true' : 'false');
      dot.setAttribute('role', 'tab');
      (function (idx) {
        dot.addEventListener('click', function () {
          goTo(idx);
        });
      })(d);
      dotsContainer.appendChild(dot);
    }

    // Touch support
    viewport.addEventListener('touchstart', function (e) {
      isTouch = true;
      startX = e.touches[0].clientX;
      currentX = startX;
    }, { passive: true });

    viewport.addEventListener('touchmove', function (e) {
      if (!isTouch) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    viewport.addEventListener('touchend', function () {
      if (!isTouch) return;
      isTouch = false;
      var diff = startX - currentX;
      var threshold = getViewportWidth() * 0.2;
      if (diff > threshold) goTo(index + 1);
      else if (diff < -threshold) goTo(index - 1);
      else goTo(index);
    }, { passive: true });

    // Mouse drag (swipe on laptop)
    viewport.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      isMouseDrag = true;
      startX = e.clientX;
      currentX = startX;
      viewport.classList.add('dragging');
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    });

    viewport.addEventListener('mousemove', function (e) {
      if (!isMouseDrag) return;
      currentX = e.clientX;
      applyDragOffset(startX - currentX);
    });

    viewport.addEventListener('mouseup', endMouseDrag);
    viewport.addEventListener('mouseleave', endMouseDrag);
    document.addEventListener('mouseup', endMouseDrag);

    goTo(0);
  }

  // ----- Testimonials carousel (all viewports, single visible slide) -----
  var testimonialsTrack = document.getElementById('testimonialsTrack');
  var testimonialsDots = document.getElementById('testimonialsDots');
  if (testimonialsTrack && testimonialsDots) {
    initCarousel({ track: testimonialsTrack, dotsContainer: testimonialsDots });
  }

  // ----- Process carousel (mobile only; init when visible) -----
  var processTrack = document.getElementById('processTrack');
  var processDots = document.getElementById('processDots');
  if (processTrack && processDots) {
    function initProcessCarousel() {
      if (window.matchMedia('(max-width: 768px)').matches) {
        if (!processDots.querySelector('.carousel-dot')) {
          initCarousel({ track: processTrack, dotsContainer: processDots });
        }
      }
    }
    initProcessCarousel();
    window.addEventListener('resize', initProcessCarousel);
  }

  // ----- Services carousel (mobile only) -----
  var servicesTrack = document.getElementById('servicesTrack');
  var servicesDots = document.getElementById('servicesDots');
  if (servicesTrack && servicesDots) {
    function initServicesCarousel() {
      if (window.matchMedia('(max-width: 768px)').matches) {
        if (!servicesDots.querySelector('.carousel-dot')) {
          initCarousel({ track: servicesTrack, dotsContainer: servicesDots });
        }
      }
    }
    initServicesCarousel();
    window.addEventListener('resize', initServicesCarousel);
  }

  // ----- Service cards: tap/click za okret na mobilnim (flip) -----
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (window.matchMedia('(hover: none)').matches) {
        this.classList.toggle('flipped');
      }
    });
  });

  // ----- Contact form -----
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

  // ----- Footer year -----
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
