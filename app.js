// =========================================================
// JOEY PORTFOLIO - MODERN INTERACTIVE ANIMATIONS & SCROLL OBSERVER
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. INTERSECTION OBSERVER FOR FADE-IN SCROLL ANIMATIONS
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
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

  // Target elements to animate on scroll
  const animatedElements = document.querySelectorAll(
    '.vivid-card, .expertise-card-item, .testimonials-section, .cta-section, .hero-display, .hero-side-content'
  );

  animatedElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    // Stagger animation delays for grid items
    if (el.classList.contains('vivid-card') || el.classList.contains('expertise-card-item')) {
      const staggerDelay = (index % 2) * 0.12;
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

  // 3. CARD TILT / GLOW PARALLAX EFFECT ON HOVER (DESKTOP)
  const cards = document.querySelectorAll('.vivid-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 800) return; // Only on desktop
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

});
