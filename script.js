// ===============================
// Project RAH
// Main Script
// ===============================

// Section Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId !== "#") {

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }

    });

});

// ====================================
// Animated Counters on Scroll
// ====================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        const counter = entry.target;

        if (entry.isIntersecting) {

            if (counter.classList.contains("counted")) return;

            counter.classList.add("counted");

            const target = parseInt(counter.dataset.target);
            let count = 0;

            const increment = Math.max(1, Math.ceil(target / 80));

            function updateCounter() {

                count += increment;

                if (count >= target) {

                    count = target;

                    counter.innerText = target + "+";

                    return;
                }

                counter.innerText = count;

                requestAnimationFrame(updateCounter);
            }

            updateCounter();

        } else {

            counter.classList.remove("counted");
            counter.innerText = "0";

        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});