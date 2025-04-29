document.addEventListener("DOMContentLoaded", () => {
  // Loader Elements
  const welcomeTextElement = document.querySelector(".welcome-text");
  const taglineElement = document.querySelector(".tagline");
  const loaderElement = document.querySelector(".loader");
  const loadingBarFill = document.querySelector(".loading-bar-fill");
  const scrollContainer = document.querySelector(".scroll-container");
  const particlesContainer = document.querySelector(".loader-particles");

  // Loader Configuration
  const duration = 5; // Increased to 5 seconds for better pacing
  let currentPercentage = 0;
  const intervalTime = 40; // Update every 40ms
  const totalIntervals = (duration * 1000) / intervalTime;
  const incrementAmount = 100 / totalIntervals;

  // Typewriter Effect for Welcome Text with Cursor
  const welcomeText = "Welcome to My Portfolio!";
  let charIndex = 0;

  function typeWelcomeText() {
    try {
      if (!welcomeTextElement) {
        console.error("Welcome text element not found!");
        return;
      }
      welcomeTextElement.textContent = "";
      // Add a cursor span
      const cursor = document.createElement("span");
      cursor.classList.add("typewriter-cursor");
      cursor.textContent = "|";
      welcomeTextElement.appendChild(cursor);

      const typeInterval = setInterval(() => {
        if (charIndex < welcomeText.length) {
          welcomeTextElement.textContent = welcomeText.slice(0, charIndex + 1);
          welcomeTextElement.appendChild(cursor);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          cursor.style.animation = "none"; // Stop cursor blinking after typing
          cursor.style.opacity = "0"; // Hide cursor
          // Fade in tagline after typing completes
          if (taglineElement) {
            gsap.to(taglineElement, { opacity: 1, duration: 1, delay: 0.5 });
          } else {
            console.error("Tagline element not found!");
          }
        }
      }, 120); // Slower typing speed for better readability
    } catch (error) {
      console.error("Error in typeWelcomeText:", error);
    }
  }

  // Start typewriter effect after a slight delay
  setTimeout(typeWelcomeText, 500);

  // Particle Animation with Fade Effect
  const particleCount = 15; // Further reduced for performance
  try {
    if (particlesContainer) {
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("loader-particle");
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 8 + 4}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
      }
    } else {
      console.error("Particles container not found!");
    }
  } catch (error) {
    console.error("Error in particle animation:", error);
  }

  // Loader Progress
  function disableScrolling() {
    document.body.style.overflow = "hidden";
  }

  function enableScrolling() {
    document.body.style.overflow = "auto";
  }

  function revealPortfolio() {
    try {
      if (!loaderElement || !scrollContainer) {
        console.error("Loader or scroll container not found!");
        return;
      }
      gsap.to(loaderElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          loaderElement.style.display = "none";
          scrollContainer.classList.remove("hidden");
          enableScrolling();
          animateIntro();
        }
      });
    } catch (error) {
      console.error("Error in revealPortfolio:", error);
    }
  }

  function updateLoader() {
    try {
      if (!loadingBarFill) {
        console.error("Loading bar fill element not found!");
        return;
      }
      currentPercentage += incrementAmount;
      if (currentPercentage >= 100) {
        currentPercentage = 100;
        clearInterval(loaderInterval);
        revealPortfolio();
      }
      loadingBarFill.style.width = `${currentPercentage}%`;
    } catch (error) {
      console.error("Error in updateLoader:", error);
    }
  }

  disableScrolling();
  const loaderInterval = setInterval(updateLoader, intervalTime);

  // Intro Animation (Cube animation unchanged)
  function animateIntro() {
    try {
      gsap.from(".intro-title", { x: -50, opacity: 0, duration: 1, ease: "power2.out" });
      gsap.from(".intro-subtitle", { x: -50, opacity: 0, duration: 1, delay: 0.3, ease: "power2.out" });
      gsap.from(".intro-description", { y: 30, opacity: 0, duration: 1, delay: 0.6, ease: "power2.out" });
      gsap.from(".btn", { y: 30, opacity: 0, duration: 1, delay: 0.9, ease: "power2.out" });
      gsap.from(".cube", { scale: 0, opacity: 0, duration: 1.5, delay: 1.2, ease: "elastic.out(1, 0.5)" });
    } catch (error) {
      console.error("Error in animateIntro:", error);
    }
  }

  // Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      try {
        navLinks.classList.toggle("active");
      } catch (error) {
        console.error("Error in nav toggle:", error);
      }
    });
  } else {
    console.error("Nav toggle or nav links not found!");
  }

  // Smooth Scrolling
  const anchors = document.querySelectorAll('a[href^="#"]');
  if (anchors.length > 0) {
    anchors.forEach(anchor => {
      anchor.addEventListener("click", (e) => {
        try {
          e.preventDefault();
          const targetId = anchor.getAttribute("href");
          const target = document.querySelector(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          } else {
            console.warn(`Target element ${targetId} not found!`);
          }
        } catch (error) {
          console.error("Error in smooth scrolling:", error);
        }
      });
    });
  } else {
    console.warn("No anchor links found for smooth scrolling!");
  }

  // ScrollTrigger Animations for Other Sections
  const panels = gsap.utils.toArray(".panel");
  if (panels.length > 0) {
    panels.forEach((panel) => {
      try {
        gsap.from(panel, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
          }
        });
      } catch (error) {
        console.error("Error in ScrollTrigger animation:", error);
      }
    });
  } else {
    console.warn("No panels found for ScrollTrigger animations!");
  }
});