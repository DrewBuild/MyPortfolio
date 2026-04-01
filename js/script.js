/* =========================================================
GLOBAL SCRIPT
- Safe for Safari, Chrome, Mobile
- All DOM access guarded
- No external dependencies
========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
  MOBILE MENU
  - Toggle hamburger menu open/close
  - Close on link click
  - Close on Escape
  - Reset on desktop resize
  ===================================== */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("scroll-locked");
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
      document.body.classList.toggle("scroll-locked", isActive);
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }
    });
  }

  /* =====================================
  SCROLL INDICATOR
  - Hide after user scrolls down
  - Show only near top of page
  ===================================== */
  const scrollIndicator = document.querySelector(".scroll-indicator");

  function updateScrollIndicator() {
    if (!scrollIndicator) return;

    if (window.scrollY > 40) {
      scrollIndicator.classList.add("hide");
    } else {
      scrollIndicator.classList.remove("hide");
    }
  }

  if (scrollIndicator) {
    updateScrollIndicator();
    window.addEventListener("scroll", updateScrollIndicator, { passive: true });
    window.addEventListener("load", updateScrollIndicator);
  }

  /* =====================================
  HERO BLOB PARALLAX
  - Mouse-based movement
  - Desktop only
  ===================================== */
  const blob = document.querySelector(".hero-blue");
  const isDesktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (blob && isDesktopPointer) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.02;
      const y = (e.clientY - window.innerHeight / 2) * 0.02;
      blob.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* =====================================
  TYPING EFFECT (HOME PAGE)
  - Looping type/delete animation
  ===================================== */
  const textEl = document.getElementById("typing-text");

  if (textEl) {
    const phrases = ["Drew Jones", "Greenville, SC", "DrewBuilds.com"];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeLoop() {
      const phrase = phrases[currentPhrase];

      if (!isDeleting) {
        textEl.textContent = phrase.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === phrase.length) {
          isDeleting = true;
          setTimeout(typeLoop, 2500);
          return;
        }
      } else {
        textEl.textContent = phrase.substring(0, currentChar - 1);
        currentChar--;

        if (currentChar === 0) {
          isDeleting = false;
          currentPhrase = (currentPhrase + 1) % phrases.length;
        }
      }

      setTimeout(typeLoop, isDeleting ? 60 : 90);
    }

    typeLoop();
  }

});