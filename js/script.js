document.addEventListener("DOMContentLoaded", function () {
    // 1. Obsługa rozwijanego menu (Dropdown) na urządzeniach mobilnych / dotykowych
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdown = document.querySelector(".dropdown");

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener("click", function (e) {
            // Zapobiega przeładowaniu po kliknięciu na urządzeniach mobilnych
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle("active");
            }
        });
    }

    // 2. Automatyczne podświetlanie aktywnej zakładki w menu
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link, .dropdown-menu a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href && currentPath.endsWith(href.replace('../', ''))) {
            link.classList.add("active");
        }
    });

    // 3. Płynne przewijanie do sekcji (Smooth Scroll) dla linków z hashem (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
