/* ========================================
   ADVANCED ANIMATION & 3D ENGINE
   Ultra-level Portfolio Enhancement
   ======================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ========== 3D SCENE INITIALIZATION ==========

function init3DScene(containerId, width, height) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a1a);
  scene.fog = new THREE.Fog(0x0a0a1a, 100, 1000);

  // Camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x667eea, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0x764ba2, 0.8);
  pointLight2.position.set(-5, -5, 5);
  scene.add(pointLight2);

  return { scene, camera, renderer, container };
}

// ========== HERO 3D SCENE ==========

function createHero3DScene() {
  const container = document.getElementById('canvas-container-hero');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;
  const sceneData = init3DScene('canvas-container-hero', width, height);
  
  if (!sceneData) return;

  const { scene, camera, renderer } = sceneData;

  // Create rotating icosahedron
  const geometry = new THREE.IcosahedronGeometry(2, 4);
  const material = new THREE.MeshPhongMaterial({
    color: 0x667eea,
    emissive: 0x764ba2,
    shininess: 100,
    wireframe: false
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Create particle system
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 15;
    posArray[i + 1] = (Math.random() - 0.5) * 15;
    posArray[i + 2] = (Math.random() - 0.5) * 15;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x667eea,
    opacity: 0.5,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(particlesGeometry, particleMaterial);
  scene.add(particles);

  // Animation loop
  let animationFrameId;
  let mouseX = 0;
  let mouseY = 0;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;

    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0001;

    // Mouse follow
    mesh.rotation.x += (mouseY - mesh.rotation.x) * 0.05;
    mesh.rotation.y += (mouseX - mesh.rotation.y) * 0.05;

    renderer.render(scene, camera);
  }

  animate();

  // Mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Handle window resize
  function onWindowResize() {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }

  window.addEventListener('resize', onWindowResize);

  return { scene, camera, renderer, mesh, particles };
}

// ========== ART GALLERY 3D ==========

function createArtGallery3D() {
  const container = document.getElementById('canvas-container-art');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;
  const sceneData = init3DScene('canvas-container-art', width, height);
  
  if (!sceneData) return;

  const { scene, camera, renderer } = sceneData;

  // Create rotating frames
  const frameGroup = new THREE.Group();
  
  for (let i = 0; i < 6; i++) {
    const frameGeometry = new THREE.BoxGeometry(1.5, 2, 0.2);
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: 0x667eea,
      emissive: 0x764ba2,
      shininess: 80
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    
    frame.position.x = (i - 2.5) * 1.8;
    frame.rotation.y = Math.PI * 0.1;
    frameGroup.add(frame);
  }

  camera.position.z = 8;
  scene.add(frameGroup);

  // Animation
  let animationFrameId;
  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    frameGroup.rotation.x += 0.0005;
    frameGroup.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  // Resize
  function onWindowResize() {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }

  window.addEventListener('resize', onWindowResize);
}

// ========== BOOKS 3D GALLERY ==========

function createBooks3D() {
  const container = document.getElementById('canvas-container-books');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;
  const sceneData = init3DScene('canvas-container-books', width, height);
  
  if (!sceneData) return;

  const { scene, camera, renderer } = sceneData;

  // Create rotating books
  const booksGroup = new THREE.Group();
  
  for (let i = 0; i < 5; i++) {
    const bookGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.3);
    const bookMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(0.6 + i * 0.08, 0.8, 0.5),
      emissive: new THREE.Color().setHSL(0.6 + i * 0.08, 0.8, 0.3),
      shininess: 90
    });
    const book = new THREE.Mesh(bookGeometry, bookMaterial);
    
    book.position.x = (i - 2) * 1.5;
    book.rotation.z = (Math.random() - 0.5) * 0.3;
    booksGroup.add(book);
  }

  camera.position.z = 6;
  scene.add(booksGroup);

  // Animation
  let animationFrameId;
  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    booksGroup.children.forEach((book, index) => {
      book.rotation.x += 0.0015;
      book.rotation.y += (index - 2) * 0.001;
      book.position.y = Math.sin(Date.now() * 0.001 + index) * 0.5;
    });
    renderer.render(scene, camera);
  }
  animate();

  // Resize
  function onWindowResize() {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }

  window.addEventListener('resize', onWindowResize);
}

// ========== COMMISSION 3D ELEMENT ==========

function createCommission3D() {
  const container = document.getElementById('canvas-container-commission');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;
  const sceneData = init3DScene('canvas-container-commission', width, height);
  
  if (!sceneData) return;

  const { scene, camera, renderer } = sceneData;

  // Create torus knot
  const geometry = new THREE.TorusKnotGeometry(2, 0.6, 100, 16);
  const material = new THREE.MeshPhongMaterial({
    color: 0xf093fb,
    emissive: 0x667eea,
    shininess: 100
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Animation
  let animationFrameId;
  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.001;
    torusKnot.rotation.y += 0.0015;
    renderer.render(scene, camera);
  }
  animate();

  // Resize
  function onWindowResize() {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }

  window.addEventListener('resize', onWindowResize);
}

// ========== SCROLL ANIMATIONS ==========

function setupScrollAnimations() {
  // Fade animations
  const faders = document.querySelectorAll('.fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));

  // Stagger animations for grid items
  const gridItems = document.querySelectorAll('.grid img, .grid a');
  gsap.from(gridItems, {
    scrollTrigger: {
      trigger: '.grid',
      start: 'top 80%',
      end: 'top 20%',
      markers: false
    },
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out'
  });

  // Parallax effect
  gsap.to('#hero', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: -100,
    ease: 'none'
  });
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

// ========== HORIZONTAL SCROLL ==========

function setupHorizontalScroll() {
  const horizontalSections = document.querySelectorAll('.horizontal-scroll');

  horizontalSections.forEach(section => {
    section.addEventListener('wheel', (e) => {
      if (e.deltaY > 0 || e.deltaY < 0) {
        e.preventDefault();
        section.scrollLeft += e.deltaY * 0.8;
      }
    });

    // Touch support
    let isDown = false;
    let startX;
    let scrollLeft;

    section.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - section.offsetLeft;
      scrollLeft = section.scrollLeft;
    });

    section.addEventListener('mouseleave', () => {
      isDown = false;
    });

    section.addEventListener('mouseup', () => {
      isDown = false;
    });

    section.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - section.offsetLeft;
      const walk = (x - startX) * 1;
      section.scrollLeft = scrollLeft - walk;
    });
  });
}

// ========== ADVANCED CARD EFFECTS ==========

function setupCardEffects() {
  const cards = document.querySelectorAll('.grid img, .grid a, .art-card, .book-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        duration: 0.6,
        transform: `perspective(1000px) translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.6,
        transform: 'perspective(1000px) translateZ(0) rotateX(0) rotateY(0) scale(1)',
        ease: 'back.out'
      });
    });
  });
}

// ========== CONTACT FORM ==========

function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Submit animation
      const button = contactForm.querySelector('button');
      const originalText = button.textContent;
      
      gsap.to(button, {
        duration: 0.3,
        scale: 0.95,
        yoyo: true,
        repeat: 1
      });

      button.textContent = 'Sent! 🎉';
      button.style.pointerEvents = 'none';

      setTimeout(() => {
        contactForm.reset();
        button.textContent = originalText;
        button.style.pointerEvents = 'auto';
      }, 2000);
    });
  }
}

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Ultra-Advanced Portfolio...');

  // Initialize 3D scenes
  createHero3DScene();
  createArtGallery3D();
  createBooks3D();
  createCommission3D();

  // Setup animations
  setupScrollAnimations();
  setupNavigation();
  setupHorizontalScroll();
  setupCardEffects();
  setupContactForm();

  console.log('Portfolio enhanced with 3D, animations, and advanced interactions!');
});

// ========== RESPONSIVE HANDLING ==========

window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
