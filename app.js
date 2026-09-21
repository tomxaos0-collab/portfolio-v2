// =========================================================
// tomxaos™ CoreApps — Interactive Scroll Observer & Micro-animations
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. INTERSECTION OBSERVER FOR FADE-IN SCROLL REVEALS
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.vivid-card, .expertise-card-item, .testimonials-section, .cta-section, .hero-display, .hero-grid'
  );

  animatedElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    if (el.classList.contains('vivid-card') || el.classList.contains('expertise-card-item')) {
      const staggerDelay = (index % 2) * 0.08;
      el.style.transitionDelay = `${staggerDelay}s`;
    }
    scrollObserver.observe(el);
  });

  // 2. SMOOTH SCROLLING FOR NAVIGATION LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 3. SUBTLE DESKTOP PARALLAX TILT & SPOTLIGHT EFFECT
  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tiltCards = document.querySelectorAll('.vivid-card, .service-node, .stat-box');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (!isTouchDevice && !prefersReducedMotion && card.classList.contains('vivid-card')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -2.2;
        const rotateY = ((x - centerX) / centerX) * 2.2;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('vivid-card')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    });
  });

  // 4. LIVE TELEMETRY PING TICKER (Fluctuates between 19ms - 24ms for real-time feel)
  const pingElement = document.getElementById('live-ping-val');
  if (pingElement) {
    setInterval(() => {
      const randomPing = Math.floor(Math.random() * 6) + 19; // 19 to 24ms
      pingElement.textContent = `${randomPing}ms`;
    }, 4500);
  }

});
