/* ========================================
   ADVANCED ANIMATIONS & INTERACTIONS
   Ultra-level Portfolio Enhancement
   ======================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ========================================
   ULTRA-REALISTIC MOTION PHYSICS
   Advanced Portfolio Enhancement
   ======================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ========== PHYSICS CONSTANTS ==========
const PHYSICS = {
  SPRING_STIFFNESS: 0.3,
  SPRING_DAMPING: 0.7,
  MOMENTUM_DECAY: 0.95,
  GRAVITY: 0.5,
  FRICTION: 0.8,
  BOUNCE_DAMPING: 0.6
};

// ========== ADVANCED PHYSICS UTILITIES ==========
class PhysicsEngine {
  static springAnimation(target, properties, config = {}) {
    const { stiffness = PHYSICS.SPRING_STIFFNESS, damping = PHYSICS.SPRING_DAMPING } = config;

    return gsap.to(target, {
      ...properties,
      ease: (t) => {
        // Realistic spring physics
        const omega = Math.sqrt(stiffness);
        const zeta = damping / (2 * Math.sqrt(stiffness));
        const beta = Math.sqrt(1 - zeta * zeta) * omega;

        if (zeta < 1) {
          // Underdamped
          return 1 - Math.exp(-zeta * omega * t) *
                 (Math.cos(beta * t) + (zeta * omega / beta) * Math.sin(beta * t));
        } else {
          // Critically damped or overdamped
          return 1 - Math.exp(-zeta * omega * t) * (1 + zeta * omega * t);
        }
      },
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
        const n1 = 7.5625;
        const d1 = 2.75;

        if (t < 1 / d1) {
          return n1 * t * t;
        } else if (t < 2 / d1) {
          return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
          return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
          return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
      },

      elastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
      },

      gravity: (t) => {
        return 1 - Math.pow(1 - t, 3);
      }
    };

    return easings[type] || ((t) => t);
  }
}

// ========== ENHANCED SCROLL ANIMATIONS ==========

function setupScrollAnimations() {
  // Advanced intersection observer with physics
  const faders = document.querySelectorAll('.fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Physics-based fade-in with spring
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

  faders.forEach(el => {
    gsap.set(el, { opacity: 0, y: 30, scale: 0.95 });
    observer.observe(el);
  });

  // Enhanced stagger animations with realistic physics
  const gridItems = document.querySelectorAll('.grid img, .grid a');
  gsap.set(gridItems, { opacity: 0, y: 60, rotationX: -15 });

  gsap.to(gridItems, {
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

  // Advanced parallax with physics
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

  // Hero visual with enhanced physics
  gsap.set('.hero-visual', { opacity: 0, scale: 0.8, rotationY: -20 });
  PhysicsEngine.springAnimation('.hero-visual', {
    opacity: 1,
    scale: 1,
    rotationY: 0
  }, {
    stiffness: 0.2,
    damping: 0.9,
    duration: 2.0
  });
}

function setupHeroScene() {
  if (!document.querySelector('.hero-object')) return;

  // Enhanced ring rotation with physics
  gsap.to('.hero-ring', {
    rotation: 360,
    duration: 24,
    repeat: -1,
    ease: 'none'
  });

  // Ultra-realistic particle system
  const particles = document.createElement('div');
  particles.className = 'hero-particles';
  document.querySelector('.hero-visual').appendChild(particles);

  const particleCount = 15;
  const particlesArray = [];

  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement('span');
    dot.className = 'particle-dot';
    particles.appendChild(dot);

    // Physics-based particle properties
    const particle = {
      element: dot,
      angle: gsap.utils.random(0, Math.PI * 2),
      radius: gsap.utils.random(80, 150),
      speed: gsap.utils.random(0.5, 1.5),
      size: gsap.utils.random(2, 6),
      opacity: gsap.utils.random(0.3, 0.8),
      phase: gsap.utils.random(0, Math.PI * 2)
    };

    particlesArray.push(particle);

    // Set initial styles
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

  // Advanced particle animation with physics
  function animateParticles() {
    particlesArray.forEach((particle, index) => {
      particle.angle += particle.speed * 0.01;
      particle.phase += 0.02;

      const x = Math.cos(particle.angle) * particle.radius;
      const y = Math.sin(particle.angle) * particle.radius;
      const scale = 1 + Math.sin(particle.phase) * 0.3;
      const opacity = particle.opacity * (0.7 + Math.sin(particle.phase) * 0.3);

      gsap.to(particle.element, {
        x: x,
        y: y,
        scale: scale,
        opacity: opacity,
        duration: 0.1,
        ease: 'none'
      });
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

// ========== NAVBAR INTERACTIONS ==========

function setupNavigation() {
  // Smooth scroll
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Active nav on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  });
}

// ========== ENHANCED HORIZONTAL SCROLL WITH PHYSICS ==========

function setupHorizontalScroll() {
  const horizontalSections = document.querySelectorAll('.horizontal-scroll');

  horizontalSections.forEach(section => {
    let velocity = 0;
    let lastTime = 0;
    let lastScrollLeft = 0;
    let momentumActive = false;

    // Enhanced wheel event with physics
    section.addEventListener('wheel', (e) => {
      e.preventDefault();

      const deltaY = e.deltaY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime;

      // Calculate velocity for momentum
      if (timeDelta > 0) {
        velocity = (deltaY / timeDelta) * 10;
      }

      // Apply scroll with enhanced multiplier
      const scrollAmount = deltaY * 2.2;
      section.scrollLeft += scrollAmount;

      // Apply momentum after scroll
      if (!momentumActive && Math.abs(velocity) > 50) {
        momentumActive = true;
        PhysicsEngine.momentumScroll(section, velocity * 0.5, {
          decay: 0.92,
          minVelocity: 0.5
        });

        setTimeout(() => {
          momentumActive = false;
        }, 1000);
      }

      lastTime = currentTime;
      lastScrollLeft = section.scrollLeft;
    });

    // Enhanced touch/drag support with physics
    let isDown = false;
    let startX;
    let scrollLeft;
    let touchStartTime;
    let touchStartPos;

    const handleStart = (clientX) => {
      isDown = true;
      startX = clientX - section.offsetLeft;
      scrollLeft = section.scrollLeft;
      touchStartTime = Date.now();
      touchStartPos = clientX;
      velocity = 0;
    };

    const handleMove = (clientX) => {
      if (!isDown) return;

      const x = clientX - section.offsetLeft;
      const walk = (x - startX) * 1.2; // Enhanced sensitivity
      section.scrollLeft = scrollLeft - walk;

      // Calculate velocity for momentum
      const currentTime = Date.now();
      const timeDelta = currentTime - touchStartTime;
      if (timeDelta > 0) {
        velocity = ((clientX - touchStartPos) / timeDelta) * 100;
      }
    };

    const handleEnd = () => {
      if (!isDown) return;
      isDown = false;

      // Apply momentum on touch end
      if (Math.abs(velocity) > 100) {
        PhysicsEngine.momentumScroll(section, velocity * 0.3, {
          decay: 0.88,
          minVelocity: 1
        });
      }
    };

    // Mouse events
    section.addEventListener('mousedown', (e) => handleStart(e.pageX));
    section.addEventListener('mousemove', (e) => handleMove(e.pageX));
    section.addEventListener('mouseup', handleEnd);
    section.addEventListener('mouseleave', handleEnd);

    // Touch events
    section.addEventListener('touchstart', (e) => {
      handleStart(e.touches[0].clientX);
    });

    section.addEventListener('touchmove', (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    });

    section.addEventListener('touchend', handleEnd);
  });
}

// ========== ULTRA-REALISTIC CARD EFFECTS ==========

function setupCardEffects() {
  const cards = document.querySelectorAll('.grid img, .grid a, .art-card, .book-card');

  cards.forEach(card => {
    let animationFrame;
    let currentRotation = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };

    // Enhanced mouse tracking with physics
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const mouseX = e.clientX - rect.left - centerX;
      const mouseY = e.clientY - rect.top - centerY;

      // Calculate target rotation with enhanced sensitivity
      targetRotation.x = (mouseY / centerY) * 25; // Increased from 10 to 25
      targetRotation.y = -(mouseX / centerX) * 25;

      // Cancel previous animation
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      // Physics-based animation loop
      const animate = () => {
        // Spring physics for smooth transitions
        const springForce = 0.15;
        const damping = 0.85;

        velocity.x = (targetRotation.x - currentRotation.x) * springForce;
        velocity.y = (targetRotation.y - currentRotation.y) * springForce;

        currentRotation.x += velocity.x;
        currentRotation.y += velocity.y;

        velocity.x *= damping;
        velocity.y *= damping;

        // Apply 3D transform with enhanced depth
        const perspective = 1200;
        const translateZ = 80 + Math.abs(currentRotation.x + currentRotation.y) * 0.5;
        const scale = 1.12 + Math.abs(currentRotation.x + currentRotation.y) * 0.002;

        card.style.transform = `
          perspective(${perspective}px)
          translateZ(${translateZ}px)
          rotateX(${currentRotation.x}deg)
          rotateY(${currentRotation.y}deg)
          scale(${scale})
        `;

        // Add realistic lighting effect
        const intensity = Math.abs(currentRotation.x + currentRotation.y) * 0.02;
        card.style.filter = `brightness(${1 + intensity}) contrast(${1 + intensity * 0.5})`;

        // Continue animation if velocity is significant
        if (Math.abs(velocity.x) > 0.01 || Math.abs(velocity.y) > 0.01) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animate();
    });

    // Enhanced mouse leave with bounce physics
    card.addEventListener('mouseleave', () => {
      targetRotation = { x: 0, y: 0 };

      // Cancel existing animation
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      // Spring back to original position with bounce
      PhysicsEngine.springAnimation(card, {
        transform: 'perspective(1200px) translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1)',
        filter: 'brightness(1) contrast(1)'
      }, {
        stiffness: 0.25,
        damping: 0.75,
        duration: 1.2
      });

      currentRotation = { x: 0, y: 0 };
      velocity = { x: 0, y: 0 };
    });

    // Add subtle hover micro-animations
    card.addEventListener('mouseenter', () => {
      // Subtle glow effect
      gsap.to(card, {
        duration: 0.3,
        boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1)',
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.5,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        ease: 'power2.out'
      });
    });
  });
}

// ========== ENHANCED CONTACT FORM WITH PHYSICS ==========

function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');

    // Enhanced input focus effects with physics
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        PhysicsEngine.springAnimation(input, {
          scale: 1.02,
          boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.3)'
        }, {
          stiffness: 0.4,
          damping: 0.8,
          duration: 0.6
        });
      });

      input.addEventListener('blur', () => {
        PhysicsEngine.springAnimation(input, {
          scale: 1,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.1)'
        }, {
          stiffness: 0.3,
          damping: 0.9,
          duration: 0.4
        });
      });

      // Real-time validation feedback
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          gsap.to(input, {
            borderColor: 'rgba(76, 175, 80, 0.5)',
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(input, {
            borderColor: 'rgba(244, 67, 54, 0.5)',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const button = contactForm.querySelector('button');
      const originalText = button.textContent;

      // Enhanced submit animation with physics
      PhysicsEngine.springAnimation(button, {
        scale: 0.95,
        rotation: 5
      }, {
        stiffness: 0.5,
        damping: 0.7,
        duration: 0.3
      }).then(() => {
        // Success animation
        gsap.to(button, {
          scale: 1.1,
          rotation: 0,
          background: 'linear-gradient(135deg, #4CAF50, #45a049)',
          duration: 0.5,
          ease: PhysicsEngine.realisticEase('bounce')
        });

        button.textContent = 'Sent! 🎉';
        button.style.pointerEvents = 'none';

        // Success particles
        createSuccessParticles(button);

        setTimeout(() => {
          // Reset with physics
          PhysicsEngine.springAnimation(button, {
            scale: 1,
            background: 'linear-gradient(135deg, #667eea, #764ba2)'
          }, {
            stiffness: 0.3,
            damping: 0.8,
            duration: 0.6
          });

          contactForm.reset();
          button.textContent = originalText;
          button.style.pointerEvents = 'auto';

          // Reset input styles
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
}

// Success particle effect
function createSuccessParticles(button) {
  const particleContainer = document.createElement('div');
  particleContainer.style.position = 'absolute';
  particleContainer.style.pointerEvents = 'none';
  particleContainer.style.top = '0';
  particleContainer.style.left = '0';
  particleContainer.style.width = '100%';
  particleContainer.style.height = '100%';
  particleContainer.style.overflow = 'hidden';
  button.style.position = 'relative';
  button.appendChild(particleContainer);

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#4CAF50';
    particle.style.borderRadius = '50%';
    particle.style.top = '50%';
    particle.style.left = '50%';

    particleContainer.appendChild(particle);

    gsap.fromTo(particle, {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1
    }, {
      x: gsap.utils.random(-40, 40),
      y: gsap.utils.random(-40, 40),
      opacity: 0,
      scale: 0,
      duration: 1.2,
      ease: 'power2.out',
      delay: i * 0.1
    });
  }

  setTimeout(() => {
    particleContainer.remove();
  }, 1500);
}

// ========== PERFORMANCE OPTIMIZATIONS ==========

// Hardware acceleration and performance monitoring
function optimizePerformance() {
  // Force hardware acceleration on key elements
  const acceleratedElements = document.querySelectorAll('.hero-visual, .grid img, .grid a, .hero-ring, .particle-dot');
  acceleratedElements.forEach(el => {
    el.style.willChange = 'transform, opacity';
    el.style.backfaceVisibility = 'hidden';
    el.style.perspective = '1000px';
  });

  // Optimize scroll performance
  let ticking = false;
  const optimizedScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Update scroll-based animations here if needed
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', optimizedScroll, { passive: true });
}

// ========== MICRO-INTERACTIONS ==========

function setupMicroInteractions() {
  // Enhanced navbar hover effects
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      PhysicsEngine.springAnimation(link, {
        scale: 1.05,
        y: -2
      }, {
        stiffness: 0.4,
        damping: 0.8,
        duration: 0.4
      });
    });

    link.addEventListener('mouseleave', () => {
      PhysicsEngine.springAnimation(link, {
        scale: 1,
        y: 0
      }, {
        stiffness: 0.3,
        damping: 0.9,
        duration: 0.3
      });
    });
  });

  // Page load entrance animation
  gsap.set('body', { opacity: 0 });
  gsap.to('body', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  });

  // Subtle background particle effect
  createBackgroundParticles();
}

function createBackgroundParticles() {
  const backgroundParticles = document.createElement('div');
  backgroundParticles.className = 'background-particles';
  backgroundParticles.style.position = 'fixed';
  backgroundParticles.style.top = '0';
  backgroundParticles.style.left = '0';
  backgroundParticles.style.width = '100%';
  backgroundParticles.style.height = '100%';
  backgroundParticles.style.pointerEvents = 'none';
  backgroundParticles.style.zIndex = '-1';

  document.body.appendChild(backgroundParticles);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(255,255,255,0.1)';
    particle.style.borderRadius = '50%';
    particle.style.top = gsap.utils.random(0, 100) + '%';
    particle.style.left = gsap.utils.random(0, 100) + '%';

    backgroundParticles.appendChild(particle);

    // Subtle floating animation
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

// ========== INITIALIZATION WITH ENHANCED PHYSICS ==========

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Ultra-Realistic Motion Physics Portfolio...');

  // Performance optimizations first
  optimizePerformance();

  // Setup all enhanced animations
  setupScrollAnimations();
  setupNavigation();
  setupHorizontalScroll();
  setupCardEffects();
  setupContactForm();
  setupHeroScene();
  setupMicroInteractions();

  console.log('Portfolio enhanced with ultra-realistic motion physics! 🚀');
});

// ========== ENHANCED RESPONSIVE HANDLING ==========

window.addEventListener('resize', () => {
  ScrollTrigger.refresh();

  // Recalculate physics on resize
  setTimeout(() => {
    ScrollTrigger.update();
  }, 100);
});

// ========== ERROR HANDLING ==========

window.addEventListener('error', (e) => {
  console.warn('Animation error handled gracefully:', e.message);
  // Continue execution even if one animation fails
});