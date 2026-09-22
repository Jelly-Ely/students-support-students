/* ==================================================
   STUDENTS SUPPORT STUDENTS
   Global JavaScript
================================================== */


/* ---------- Mobile Navigation ---------- */

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
    if (!menuButton || !navLinks) return;

    navLinks.classList.remove("nav-open");
    menuButton.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
}

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const menuIsOpen = navLinks.classList.toggle("nav-open");

        menuButton.classList.toggle("menu-open", menuIsOpen);
        menuButton.setAttribute("aria-expanded", menuIsOpen.toString());
        menuButton.setAttribute(
            "aria-label",
            menuIsOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });
}


/* ---------- Close Mobile Menu ---------- */

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
    if (!menuButton || !navLinks) return;

    const clickedButton = menuButton.contains(event.target);
    const clickedMenu = navLinks.contains(event.target);

    if (!clickedButton && !clickedMenu) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();

        if (menuButton) {
            menuButton.focus();
        }
    }
});


/* ---------- Header Shadow ---------- */

const header = document.querySelector(".site-header");

function updateHeader() {
    if (!header) return;

    header.classList.toggle(
        "header-scrolled",
        window.scrollY > 20
    );
}

window.addEventListener("scroll", updateHeader);
updateHeader();


/* ---------- Active Navigation Link ---------- */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});


/* ---------- Scroll Reveal ---------- */

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const revealElements = document.querySelectorAll(
    `
    .service-card,
    .step-card,
    .support-card,
    .reason,
    .mission-vision-card,
    .hexagon,
    .audience-card,
    .mentor-card
    `
);

if (!reduceMotion && "IntersectionObserver" in window) {
    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* ---------- Scroll-to-Top Button ---------- */

const scrollButton = document.createElement("button");

scrollButton.className = "scroll-top";
scrollButton.type = "button";
scrollButton.innerHTML = "↑";
scrollButton.setAttribute("aria-label", "Scroll to top");

document.body.appendChild(scrollButton);

function updateScrollButton() {
    scrollButton.classList.toggle(
        "scroll-top-visible",
        window.scrollY > 500
    );
}

window.addEventListener("scroll", updateScrollButton);
updateScrollButton();

scrollButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
    });
});


/* ---------- Current Footer Year ---------- */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}