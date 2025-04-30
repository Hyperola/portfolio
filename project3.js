window.addEventListener('scroll', () => {
    const nav = document.querySelector('.float-nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Toggle navigation on mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });