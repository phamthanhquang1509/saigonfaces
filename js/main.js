// Initialize Lenis for smooth scrolling with robust defaults
const lenis = new Lenis();

// Force recalculation when all images (including Unsplash) are fully loaded
window.addEventListener('load', () => {
  lenis.resize();
});

// Also recalculate on window resize
window.addEventListener('resize', () => {
  lenis.resize();
});

// Request animation frame is handled by GSAP Ticker

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');

if(cursor) {
  // Move cursor
  window.addEventListener('mousemove', (e) => {
    // Only animate if fine pointer (mouse)
    if(matchMedia('(pointer: fine)').matches) {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    }
  });

  // Hover states for links and cards
  const hoverElements = document.querySelectorAll('a, .card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
    });
  });
}

// --- GSAP Animations ---

// 1. Hero Reveal (Top of page load)
const heroTitle = document.querySelector('.hero .title-giant');
const heroSubtitle = document.querySelector('.hero-subtitle');

if(heroTitle) {
  gsap.fromTo(heroTitle, 
    { y: 100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
  );
  gsap.fromTo(heroSubtitle, 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.8 }
  );
}

// 2. Fade Up Elements on Scroll
const fadeUpElements = document.querySelectorAll('.fade-up');
fadeUpElements.forEach(el => {
  gsap.fromTo(el,
    { y: 50, opacity: 0, visibility: 'visible' },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

// 3. Image Parallax Effect
const parallaxImages = document.querySelectorAll('.parallax-img');
parallaxImages.forEach(img => {
  gsap.fromTo(img,
    { y: -30, scale: 1.1, visibility: 'visible' },
    {
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
});
