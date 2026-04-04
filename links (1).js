// links.js - Konfiguracja linków LordHost
// Ustaw linki do panelu, Discorda i innych zasobów

const LINKS = {
  // Jeśli panelUrl jest pusty, przycisk "Panel" przenosi na /panel
  panelUrl: "",

  // Link do serwera Discord
  discordUrl: "https://discord.gg/lordhost",

  // Dodatkowe linki (opcjonalne)
  statusUrl: "",
  supportUrl: "",
};

// Funkcja zwracająca URL panelu
function getPanelUrl() {
  return LINKS.panelUrl || "/panel";
}

module.exports = { LINKS, getPanelUrl };
