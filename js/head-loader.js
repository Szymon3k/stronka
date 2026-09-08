document.addEventListener("DOMContentLoaded", function () {
    const isSubfolder = window.location.pathname.includes('/oferta/');
    const basePath = isSubfolder ? '../' : '';

    const navHTML = `
        <nav class="navbar">
            <a href="${basePath}index.html" class="nav-link">Strona Główna</a>
            <div class="dropdown">
                <a href="#" class="nav-link dropdown-toggle">Oferta <span class="arrow">∨</span></a>
                <div class="dropdown-menu">
                    <a href="${basePath}oferta/boty-discord.html">Boty Discord</a>
                    <a href="${basePath}oferta/minecraft.html">Serwery Minecraft</a>
                </div>
            </div>
            <a href="${basePath}kontakt.html" class="nav-link">Kontakt</a>
            <a href="${basePath}polityka.html" class="nav-link">Polityka</a>
        </nav>
    `;

    const navContainer = document.getElementById("head-container") || document.querySelector("header") || document.body;
    if (navContainer) {
        navContainer.innerHTML = navHTML;
    }
});
