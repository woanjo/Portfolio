// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const bodyElement = document.body;

// Load saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light-mode';
bodyElement.classList.add(savedTheme);
updateThemeToggle();

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    bodyElement.classList.toggle('dark-mode');
    
    // Save preference
    const isDarkMode = bodyElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
    
    updateThemeToggle();
  });
}

function updateThemeToggle() {
  if (themeToggle) {
    const isDarkMode = bodyElement.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active navigation link highlighting
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-card, .edu-column, .hobby-image, .info-box, .skill-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Add hover effects to cards
function enhanceCards() {
  const cards = document.querySelectorAll('.project-card, .edu-column, .hobby-image, .info-box, .skill-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
    });
  });
}

document.addEventListener('DOMContentLoaded', enhanceCards);

// Responsive navigation for mobile
function initializeMobileNav() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks && window.innerWidth <= 768) {
    navLinks.style.maxHeight = 'none';
  }
}

window.addEventListener('resize', initializeMobileNav);
document.addEventListener('DOMContentLoaded', initializeMobileNav);

// Prevent layout shift on scroll
let scrollY = 0;
window.addEventListener('scroll', function() {
  scrollY = window.scrollY;
});
