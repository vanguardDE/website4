// 1. Custom Cursor
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// 2. Smooth Scroll für interne Links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// 3. IntersectionObserver für Reveal-Animation
const obs = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('in-view');
      obs.unobserve(en.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section, .project-card').forEach(el => {
  el.classList.add('pre-anim');
  obs.observe(el);
});

// 4. GSAP ScrollTrigger Animation
gsap.registerPlugin(ScrollTrigger);
gsap.from('.project-card', {
  y: 50, opacity: 0, stagger: 0.2, duration: 0.8,
  scrollTrigger: {
    trigger: '.projects__grid',
    start: 'top 80%'
  }
});

// 5. Three.js – simpler Partikel-Hintergrund im Hero
const canvas = document.getElementById('hero-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(innerWidth, innerHeight);
camera.position.z = 5;

// Partikel-System
const particles = new THREE.BufferGeometry();
const count = 1000;
const posArr = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  posArr[i] = (Math.random() - 0.5) * 10;
}
particles.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
const mat = new THREE.PointsMaterial({ color: 0x00d4cc, size: 0.05 });
const particleMesh = new THREE.Points(particles, mat);
scene.add(particleMesh);

function animate() {
  requestAnimationFrame(animate);
  particleMesh.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Resize-Handler
window.addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// 6. Form-Validation
const form = document.querySelector('.contact__form');
form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll('input,textarea').forEach(el => {
    const error = el.nextElementSibling;
    if (!el.checkValidity()) {
      error.style.display = 'block';
      valid = false;
    } else {
      error.style.display = 'none';
    }
  });

  if (valid) {
    // hier kannst du AJAX oder Thank-You-Message einbauen
    alert('Nachricht gesendet!');
    form.reset();
  }
});
