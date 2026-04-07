/* ========================================
   PERFORMANCE-OPTIMIZED ANIMATIONS
   Ultra-Realistic Motion Physics - Optimized
   ======================================== */

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger);

// ========== PERFORMANCE CONSTANTS ==========
const PHYSICS = {
  SPRING_STIFFNESS: 0.3,
  SPRING_DAMPING: 0.7,
  MOMENTUM_DECAY: 0.95,
  GRAVITY: 0.5,
  FRICTION: 0.8,
  BOUNCE_DAMPING: 0.6
};

// ========== UTILITY FUNCTIONS (OPTIMIZED) ==========

// Throttle function for scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounce for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========== ADVANCED PHYSICS ENGINE (OPTIMIZED) ==========
class PhysicsEngine {
  // Cached easing calculations
  static easingCache = {};

  static springAnimation(target, properties, config = {}) {
    const { stiffness = PHYSICS.SPRING_STIFFNESS, damping = PHYSICS.SPRING_DAMPING } = config;
    const cacheKey = `${stiffness}-${damping}`;

    if (!this.easingCache[cacheKey]) {
      const omega = Math.sqrt(stiffness);
      const zeta = damping / (2 * Math.sqrt(stiffness));
      const beta = Math.sqrt(1 - zeta * zeta) * omega;

      this.easingCache[cacheKey] = (t) => {
        if (zeta < 1) {
          return 1 - Math.exp(-zeta * omega * t) *
                 (Math.cos(beta * t) + (zeta * omega / beta) * Math.sin(beta * t));
        } else {
          return 1 - Math.exp(-zeta * omega * t) * (1 + zeta * omega * t);
        }
      };
    }

    return gsap.to(target, {
      ...properties,
      ease: this.easingCache[cacheKey],
      duration: config.duration || 1.2
    });
  }

  static momentumScroll(element, velocity, config = {}) {
    const { decay = PHYSICS.MOMENTUM_DECAY, minVelocity = 0.1 } = config;
    let currentVelocity = velocity;

    const animate = () => {
      if (Math.abs(currentVelocity) < minVelocity) return;
      element.scrollLeft += currentVelocity;
      currentVelocity *= decay;
      requestAnimationFrame(animate);
    };

    animate();
  }

  static realisticEase(type) {
    const easings = {
      bounce: (t) => {
        const n1 = 7.5625, d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
      },
      elastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
      },
      gravity: (t) => 1 - Math.pow(1 - t, 3)
    };
    return easings[type] || ((t) => t);
  }
}

// ========== DOM CACHE (OPTIMIZED) ==========
const DOM_CACHE = {
  fadeElements: null,
  gridItems: null,
  horizontalSections: null,
  cards: null,
  navLinks: null,
  sections: null,
  contactForm: null,
  heroObject: null,
  heroVisual: null,
  
  // Initialize caches
  init() {
    this.fadeElements = document.querySelectorAll('.fade');
    this.gridItems = document.querySelectorAll('.grid img, .grid a');
    this.horizontalSections = document.querySelectorAll('.horizontal-scroll');
    this.cards = document.querySelectorAll('.grid img, .grid a, .art-card, .book-card');
    this.navLinks = document.querySelectorAll('nav a');
    this.sections = document.querySelectorAll('section');
    this.contactForm = document.querySelector('.contact-form');
    this.heroObject = document.querySelector('.hero-object');
    this.heroVisual = document.querySelector('.hero-visual');
  }
};

// ========== LAZY LOAD IMAGES (OPTIMIZED) ==========
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }
}

// ========== SCROLL ANIMATIONS (OPTIMIZED) ==========
function setupScrollAnimations() {
  // Fade animations with reusable observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('show')) {
        PhysicsEngine.springAnimation(entry.target, {
          opacity: 1,
          y: 0,
          scale: 1
        }, {
          stiffness: 0.4,
          damping: 0.8,
          duration: 1.0
        });
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  DOM_CACHE.fadeElements.forEach(el => {
    gsap.set(el, { opacity: 0, y: 30, scale: 0.95 });
    observer.observe(el);
  });

  // Grid items with efficient batch animation
  gsap.set(DOM_CACHE.gridItems, { opacity: 0, y: 60, rotationX: -15 });

  gsap.to(DOM_CACHE.gridItems, {
    scrollTrigger: {
      trigger: '.grid',
      start: 'top 85%',
      end: 'top 15%',
      markers: false,
      scrub: 0.5
    },
    opacity: 1,
    y: 0,
    rotationX: 0,
    stagger: {
      amount: 0.8,
      from: 'start',
      ease: 'power2.out'
    },
    ease: PhysicsEngine.realisticEase('gravity')
  });

  // Parallax effect
  gsap.to('#hero', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    },
    y: (i, target) => -target.offsetHeight * 0.3,
    ease: 'none'
  });

  // Hero visual
  if (DOM_CACHE.heroVisual) {
    gsap.set(DOM_CACHE.heroVisual, { opacity: 0, scale: 0.8, rotationY: -20 });
    PhysicsEngine.springAnimation(DOM_CACHE.heroVisual, {
      opacity: 1,
      scale: 1,
      rotationY: 0
    }, {
      stiffness: 0.2,
      damping: 0.9,
      duration: 2.0
    });
  }
}

// ========== HERO SCENE (OPTIMIZED) ==========
function setupHeroScene() {
  if (!DOM_CACHE.heroObject) return;

  // Ring rotation
  gsap.to('.hero-ring', {
    rotation: 360,
    duration: 24,
    repeat: -1,
    ease: 'none'
  });

  // Particle system with optimized animation
  const particles = document.createElement('div');
  particles.className = 'hero-particles';
  DOM_CACHE.heroVisual.appendChild(particles);

  const particlesArray = [];
  const particleCount = 15;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement('span');
    dot.className = 'particle-dot';
    particles.appendChild(dot);

    const particle = {
      element: dot,
      angle: gsap.utils.random(0, Math.PI * 2),
      radius: gsap.utils.random(80, 150),
      speed: gsap.utils.random(0.5, 1.5),
      size: gsap.utils.random(2, 6),
      opacity: gsap.utils.random(0.3, 0.8),
      phase: 0
    };

    particlesArray.push(particle);

    gsap.set(dot, {
      width: particle.size,
      height: particle.size,
      background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity}), transparent)`,
      position: 'absolute',
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      x: Math.cos(particle.angle) * particle.radius,
      y: Math.sin(particle.angle) * particle.radius
    });
  }

  // Single optimized animation loop
  function animateParticles() {
    particlesArray.forEach((particle) => {
      particle.angle += particle.speed * 0.01;
      particle.phase += 0.02;

      const x = Math.cos(particle.angle) * particle.radius;
      const y = Math.sin(particle.angle) * particle.radius;
      const scale = 1 + Math.sin(particle.phase) * 0.3;
      const opacity = particle.opacity * (0.7 + Math.sin(particle.phase) * 0.3);

      particle.element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      particle.element.style.opacity = opacity;
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

// ========== NAVIGATION (OPTIMIZED) ==========
function setupNavigation() {
  // Event delegation for nav clicks
  document.querySelector('nav')?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // Throttled scroll for active nav
  const updateActiveNav = throttle(() => {
    let current = '';
    const scrollPos = window.pageYOffset;

    for (const section of DOM_CACHE.sections) {
      if (scrollPos >= section.offsetTop - 150) {
        current = section.getAttribute('id');
      }
    }

    DOM_CACHE.navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, 100);

  window.addEventListener('scroll', updateActiveNav, { passive: true });
}

// ========== HORIZONTAL SCROLL (OPTIMIZED) ==========
function setupHorizontalScroll() {
  DOM_CACHE.horizontalSections.forEach(section => {
    let velocity = 0;
    let lastTime = 0;
    let momentumActive = false;

    section.addEventListener('wheel', (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();

      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime;

      if (timeDelta > 0) {
        velocity = (e.deltaY / timeDelta) * 10;
      }

      section.scrollLeft += e.deltaY * 2.2;

      if (!momentumActive && Math.abs(velocity) > 50) {
        momentumActive = true;
        PhysicsEngine.momentumScroll(section, velocity * 0.5, {
          decay: 0.92,
          minVelocity: 0.5
        });
        setTimeout(() => { momentumActive = false; }, 1000);
      }

      lastTime = currentTime;
    }, { passive: false });

    // Optimized drag support
    let isDown = false, startX, scrollLeft, lastX = 0;

    const handleStart = (clientX) => {
      isDown = true;
      startX = clientX - section.offsetLeft;
      scrollLeft = section.scrollLeft;
      lastX = clientX;
    };

    const handleMove = (clientX) => {
      if (!isDown) return;
      const x = clientX - section.offsetLeft;
      const delta = clientX - lastX;
      velocity = delta;
      section.scrollLeft = scrollLeft - (x - startX) * 1.2;
      lastX = clientX;
    };

    const handleEnd = () => {
      if (!isDown) return;
      isDown = false;
      if (Math.abs(velocity) > 5) {
        PhysicsEngine.momentumScroll(section, velocity * 20, {
          decay: 0.88,
          minVelocity: 1
        });
      }
    };

    section.addEventListener('mousedown', (e) => handleStart(e.pageX));
    section.addEventListener('mousemove', (e) => handleMove(e.pageX));
    section.addEventListener('mouseup', handleEnd);
    section.addEventListener('mouseleave', handleEnd);
    section.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX));
    section.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX));
    section.addEventListener('touchend', handleEnd);
  });
}

// ========== CARD EFFECTS (OPTIMIZED) ==========
function setupCardEffects() {
  DOM_CACHE.cards.forEach(card => {
    let animationFrame;
    let currentRotation = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left - centerX;
      const mouseY = e.clientY - rect.top - centerY;

      targetRotation.x = (mouseY / centerY) * 25;
      targetRotation.y = -(mouseX / centerX) * 25;

      if (animationFrame) cancelAnimationFrame(animationFrame);

      const animate = () => {
        const springForce = 0.15;
        const damping = 0.85;

        velocity.x = (targetRotation.x - currentRotation.x) * springForce;
        velocity.y = (targetRotation.y - currentRotation.y) * springForce;

        currentRotation.x += velocity.x;
        currentRotation.y += velocity.y;

        velocity.x *= damping;
        velocity.y *= damping;

        const translateZ = 80 + Math.abs(currentRotation.x + currentRotation.y) * 0.5;
        const scale = 1.12 + Math.abs(currentRotation.x + currentRotation.y) * 0.002;
        const intensity = Math.abs(currentRotation.x + currentRotation.y) * 0.02;

        card.style.transform = `perspective(1200px) translateZ(${translateZ}px) rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg) scale(${scale})`;
        card.style.filter = `brightness(${1 + intensity}) contrast(${1 + intensity * 0.5})`;

        if (Math.abs(velocity.x) > 0.01 || Math.abs(velocity.y) > 0.01) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animate();
    };

    const onMouseLeave = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      targetRotation = { x: 0, y: 0 };
      PhysicsEngine.springAnimation(card, {
        transform: 'perspective(1200px) translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1)',
        filter: 'brightness(1) contrast(1)'
      }, { stiffness: 0.25, damping: 0.75, duration: 1.2 });
      currentRotation = { x: 0, y: 0 };
      velocity = { x: 0, y: 0 };
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.3,
        boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1)',
        ease: 'power2.out'
      });
    });
  });
}

// ========== CONTACT FORM (OPTIMIZED) ==========
function setupContactForm() {
  if (!DOM_CACHE.contactForm) return;

  const inputs = DOM_CACHE.contactForm.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      PhysicsEngine.springAnimation(input, {
        scale: 1.02,
        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.3)'
      }, { stiffness: 0.4, damping: 0.8, duration: 0.6 });
    });

    input.addEventListener('blur', () => {
      PhysicsEngine.springAnimation(input, {
        scale: 1,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.1)'
      }, { stiffness: 0.3, damping: 0.9, duration: 0.4 });
    });

    input.addEventListener('input', () => {
      gsap.to(input, {
        borderColor: input.checkValidity() ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  DOM_CACHE.contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = DOM_CACHE.contactForm.querySelector('button');
    const originalText = button.textContent;

    PhysicsEngine.springAnimation(button, {
      scale: 0.95,
      rotation: 5
    }, { stiffness: 0.5, damping: 0.7, duration: 0.3 }).then(() => {
      gsap.to(button, {
        scale: 1.1,
        rotation: 0,
        background: 'linear-gradient(135deg, #4CAF50, #45a049)',
        duration: 0.5,
        ease: PhysicsEngine.realisticEase('bounce')
      });

      button.textContent = 'Sent! 🎉';
      button.style.pointerEvents = 'none';

      setTimeout(() => {
        PhysicsEngine.springAnimation(button, {
          scale: 1,
          background: 'linear-gradient(135deg, #667eea, #764ba2)'
        }, { stiffness: 0.3, damping: 0.8, duration: 0.6 });

        DOM_CACHE.contactForm.reset();
        button.textContent = originalText;
        button.style.pointerEvents = 'auto';

        inputs.forEach(input => {
          gsap.to(input, {
            borderColor: 'rgba(255,255,255,0.1)',
            scale: 1,
            duration: 0.3
          });
        });
      }, 2500);
    });
  });
}

// ========== MICRO-INTERACTIONS (OPTIMIZED) ==========
function setupMicroInteractions() {
  // Optimized navbar effects
  document.querySelector('nav')?.addEventListener('mouseenter', (e) => {
    if (e.target.tagName === 'A') {
      PhysicsEngine.springAnimation(e.target, {
        scale: 1.05,
        y: -2
      }, { stiffness: 0.4, damping: 0.8, duration: 0.4 });
    }
  }, true);

  document.querySelector('nav')?.addEventListener('mouseleave', (e) => {
    if (e.target.tagName === 'A') {
      PhysicsEngine.springAnimation(e.target, {
        scale: 1,
        y: 0
      }, { stiffness: 0.3, damping: 0.9, duration: 0.3 });
    }
  }, true);

  gsap.set('body', { opacity: 0 });
  gsap.to('body', { opacity: 1, duration: 0.8, ease: 'power2.out' });

  createBackgroundParticles();
}

function createBackgroundParticles() {
  const container = document.createElement('div');
  container.className = 'background-particles';
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;overflow:hidden';
  document.body.appendChild(container);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `position:absolute;width:2px;height:2px;background:rgba(255,255,255,0.1);border-radius:50%;top:${Math.random()*100}%;left:${Math.random()*100}%`;
    container.appendChild(particle);

    gsap.to(particle, {
      y: gsap.utils.random(-20, 20),
      x: gsap.utils.random(-20, 20),
      opacity: gsap.utils.random(0.1, 0.3),
      duration: gsap.utils.random(3, 8),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: gsap.utils.random(0, 2)
    });
  }
}

// ========== INITIALIZATION (OPTIMIZED) ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing Optimized Portfolio...');

  // Single DOM cache initialization
  DOM_CACHE.init();

  // Setup in optimal order
  setupScrollAnimations();
  setupNavigation();
  setupHorizontalScroll();
  setupCardEffects();
  setupContactForm();
  setupHeroScene();
  setupMicroInteractions();

  console.log('✅ Portfolio Ready - Performance Optimized!');
}, { once: true });

// ========== OPTIMIZED RESIZE HANDLER ==========
window.addEventListener('resize', debounce(() => {
  ScrollTrigger.refresh();
  ScrollTrigger.update();
}, 150));

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
  console.warn('⚠️ Animation handled gracefully:', e.message);
});