// inject.js
const fetchNavbar = fetch('/shared/navbar.html')
  .then(res => res.text())
  .then(data => document.getElementById('navbar').innerHTML = data);

  // Active state to navbar for all web pages
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelector('.nav-links li a');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});

const fetchFooter = fetch('/shared/footer.html')
  .then(res => res.text())
  .then(data => {
    const footer = document.createElement('div');
    footer.innerHTML = data;
    document.body.appendChild(footer);
  });

const fetchMarquee = fetch('/shared/marquee.html')
  .then(res => res.text())
  .then(data => {
    const marqueeSection = document.createElement('div');
    marqueeSection.className = 'marquee-section';
    marqueeSection.innerHTML = data;

    const navbar = document.querySelector('#navbar') || document.querySelector('.navbar');
    if (navbar && navbar.parentNode) {
      navbar.parentNode.insertBefore(marqueeSection, navbar.nextSibling);
    } else {
      document.body.insertBefore(marqueeSection, document.body.firstChild); // Fallback
    }
  });


  // Scroll animations for sections
  Promise.all([fetchNavbar, fetchFooter, fetchMarquee])
  .then(() => {
    const animatedElements = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        } else {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
        }
      });
    }, {
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  });

  // Fade-in effect for the body
  document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('page-loaded');
});


