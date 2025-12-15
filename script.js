/* =========================================================
   GLOBAL SCRIPT
   - Safe for Safari, Chrome, Mobile
   - All DOM access guarded
   - No external dependencies
========================================================= */
/* ===============================
   INTRO – FIRST VISIT + TYPING
================================ */

document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro-loader");

    // If intro already seen, kill it instantly
    if (localStorage.getItem("introSeen")) {
        if (intro) intro.style.display = "none";
        return;
    }

    const phrases = [
        "DREW JONES"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingEl = document.getElementById("intro-typing");

    function typeIntro() {
        const phrase = phrases[phraseIndex];

        if (!isDeleting) {
            typingEl.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === phrase.length) {
                setTimeout(() => (isDeleting = true), 900);
            }
        } else {
            typingEl.textContent = phrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex++;
            }
        }

        if (phraseIndex < phrases.length) {
            setTimeout(typeIntro, isDeleting ? 45 : 85);
        } else {
            finishIntro();
        }
    }

    function finishIntro() {
        setTimeout(() => {
            intro.classList.add("hidden");
            localStorage.setItem("introSeen", "true");
        }, 500);
    }

    typeIntro();
});


document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       SCROLL INDICATOR
       - Hides after slight scroll
       - Mobile-safe (passive scroll)
    ===================================== */
    const scrollIndicator = document.querySelector(".scroll-indicator");

    window.addEventListener("scroll", () => {
        if (scrollIndicator && window.scrollY > 50) {
            scrollIndicator.classList.add("hide");
        }
    });


    /* =====================================
       HERO BLOB PARALLAX
       - Mouse-based movement
       - Disabled automatically if blob not present
       - Safari-safe transform usage
    ===================================== */
    document.addEventListener("mousemove", (e) => {
        const blob = document.querySelector(".hero-blue");
        if (!blob) return;

        const x = (e.clientX - window.innerWidth / 2) * 0.02;
        const y = (e.clientY - window.innerHeight / 2) * 0.02;

        blob.style.transform = `translate(${x}px, ${y}px)`;
    });


    /* =====================================
       TYPING EFFECT (HOME PAGE)
       - Looping type/delete animation
       - Uses setTimeout for Safari compatibility
    ===================================== */
    const phrases = ["Drew Jones", "Greenville, SC", "DrewBuilds.com"];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    const textEl = document.getElementById("typing-text");
    if (!textEl) return;

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
});
