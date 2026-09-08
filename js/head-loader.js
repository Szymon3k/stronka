document.addEventListener("DOMContentLoaded", () => {
    const head = document.head;

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = 'img/logo.png';

    const fontConnect = document.createElement('link');
    fontConnect.rel = 'preconnect';
    fontConnect.href = 'https://fonts.googleapis.com';

    const gstaticConnect = document.createElement('link');
    gstaticConnect.rel = 'preconnect';
    gstaticConnect.href = 'https://fonts.gstatic.com';
    gstaticConnect.crossOrigin = 'anonymous';

    const fontsLink = document.createElement('link');
    fontsLink.rel = 'stylesheet';
    fontsLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&family=Fira+Code:wght@400;500&display=swap';

    head.appendChild(favicon);
    head.appendChild(fontConnect);
    head.appendChild(gstaticConnect);
    head.appendChild(fontsLink);
});
