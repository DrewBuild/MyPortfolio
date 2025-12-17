document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE NAV */
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    /* TYPING EFFECT */
    const phrases = ["Drew Jones", "Greenville, SC", "DrewBuilds.com"];
    const textEl = document.getElementById("typing-text");

    if (textEl) {
        let i = 0, j = 0, deleting = false;

        function type() {
            textEl.textContent = phrases[i].substring(0, j);

            if (!deleting) j++;
            else j--;

            if (j === phrases[i].length) deleting = true;
            if (j === 0 && deleting) {
                deleting = false;
                i = (i + 1) % phrases.length;
            }

            setTimeout(type, deleting ? 60 : 100);
        }
        type();
    }
});
