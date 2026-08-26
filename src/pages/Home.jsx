import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Server, ArrowRight, Bot, Sparkles,
  Network, Cpu, MemoryStick, HardDrive, MapPin, Activity, Gauge, Box,
  Database, Menu, X, ChevronDown, LogOut, MessageCircle, ExternalLink,
} from "lucide-react";

/* ============ DATA ============ */
const DISCORD_PLANS = [
  { badge: "Discord Mini", price: "1,49 zł", specs: [
    { icon: "cpu", label: "Procesor:", value: "1 vCore" },
    { icon: "ram", label: "RAM:", value: "256 MB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "5 GiB SSD" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
  { badge: "Discord Medium", price: "3,50 zł", highlighted: true, specs: [
    { icon: "cpu", label: "Procesor:", value: "2 vCore" },
    { icon: "ram", label: "RAM:", value: "512 MB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "10 GiB SSD" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
  { badge: "Discord Big", price: "4,99 zł", specs: [
    { icon: "cpu", label: "Procesor:", value: "3 vCore" },
    { icon: "ram", label: "RAM:", value: "1 GiB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "15 GiB SSD" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
];

const VPS_PLANS = [
  { badge: "VPS Start S", price: "6,99 zł", specs: [
    { icon: "cpu", label: "Procesor:", value: "2 vCore" },
    { icon: "ram", label: "RAM:", value: "4 GB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "40 GB NVMe" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
  { badge: "VPS Start M", price: "12,99 zł", highlighted: true, specs: [
    { icon: "cpu", label: "Procesor:", value: "4 vCore" },
    { icon: "ram", label: "RAM:", value: "8 GB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "80 GB NVMe" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
  { badge: "VPS Start L", price: "24,99 zł", specs: [
    { icon: "cpu", label: "Procesor:", value: "6 vCore" },
    { icon: "ram", label: "RAM:", value: "16 GB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "160 GB NVMe" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
];

const MC_PLANS = [
  { badge: "Minecraft Stone", price: "4,99 zł", specs: [
    { icon: "cpu", label: "Procesor:", value: "2 vCore" },
    { icon: "ram", label: "RAM:", value: "2 GB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "25 GiB NVMe" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
  { badge: "Minecraft Iron", price: "8,99 zł", highlighted: true, specs: [
    { icon: "cpu", label: "Procesor:", value: "4 vCore" },
    { icon: "ram", label: "RAM:", value: "4 GB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "50 GiB NVMe" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
  { badge: "Minecraft Diamond", price: "16,99 zł", specs: [
    { icon: "cpu", label: "Procesor:", value: "6 vCore" },
    { icon: "ram", label: "RAM:", value: "8 GB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "100 GiB NVMe" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
];

const DB_PLANS = [
  { badge: "MariaDB Mini", price: "1,99 zł", specs: [
    { icon: "ram", label: "RAM:", value: "256 MB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "5 GiB SSD" },
    { icon: "cpu", label: "Połączenia:", value: "50" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
  { badge: "MariaDB Standard", price: "3,99 zł", highlighted: true, specs: [
    { icon: "ram", label: "RAM:", value: "512 MB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "15 GiB SSD" },
    { icon: "cpu", label: "Połączenia:", value: "150" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
  { badge: "MariaDB Pro", price: "6,99 zł", specs: [
    { icon: "ram", label: "RAM:", value: "1 GB DDR4 ECC" },
    { icon: "disk", label: "Dysk:", value: "30 GiB SSD" },
    { icon: "cpu", label: "Połączenia:", value: "500" },
    { icon: "shield", label: "", value: "Premium Anty-DDoS" },
    { icon: "location", label: "", value: "Lokalizacja Warszawa" },
  ]},
];

const FEATURES = [
  { icon: Zap, title: "Natychmiastowa instalacja", desc: "Twoja usługa gotowa do działania w ciągu kilkudziesięciu sekund od zamówienia." },
  { icon: ShieldCheck, title: "Solidne zabezpieczenia", desc: "Wzmocniona ochrona Anty-DDoS warstwy 4 i 7 dla każdej usługi bez dopłaty." },
  { icon: Gauge, title: "Procesory AMD Ryzen", desc: "Wysokotaktowane vCore i pamięć DDR4 ECC dla maksymalnej wydajności." },
  { icon: Activity, title: "Wsparcie 24/7", desc: "Polskojęzyczny zespół ekspertów dostępny całą dobę na Discordzie." },
];

const OFFERS = [
  { label: "Boty Discord", href: "#discord", icon: Bot, desc: "Od 1,49 zł / mc" },
  { label: "VPS Start", href: "#vps", icon: Server, desc: "Od 6,99 zł / mc" },
  { label: "Serwery Minecraft", href: "#minecraft", icon: Box, desc: "Od 4,99 zł / mc" },
  { label: "Bazy danych MariaDB", href: "#bazy", icon: Database, desc: "Od 1,99 zł / mc" },
];

const TICKER = [
  "Warszawa · 12 ms", "PL-1 · 99.99% uptime", "Anty-DDoS · 2 Tbps", "NVMe Gen4 · aktywny",
  "AMD Ryzen 9 · 5.7 GHz", "Warszawa · 8 ms", "Sieć 25 Gbps", "MariaDB · online",
];

const SPEC_ICONS = { cpu: Cpu, ram: MemoryStick, disk: HardDrive, shield: ShieldCheck, location: MapPin };
const LOGO = "https://media.base44.com/images/public/6a8f08921c3512bcf29c00a4/22d50ec75_generated_image.png";

/* ============ NAVBAR ============ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/60" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
          <img src={LOGO} alt="ZenixHost" className="h-9 w-9 rounded-md object-cover" />
          <span className="font-display font-bold text-lg tracking-tight">Zenix<span className="text-primary">Host</span></span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          <a href="#home" className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md">Strona główna</a>
          <div className="relative" onMouseEnter={() => setOffersOpen(true)} onMouseLeave={() => setOffersOpen(false)}>
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md">
              Oferty <ChevronDown className={`h-3.5 w-3.5 transition-transform ${offersOpen ? "rotate-180" : ""}`} />
            </button>
            {offersOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2">
                <div className="w-[520px] bg-popover border border-border rounded-2xl p-3 shadow-2xl shadow-primary/10 grid grid-cols-2 gap-1.5">
                  {OFFERS.map((o) => (
                    <a key={o.label} href={o.href} onClick={() => setOffersOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group">
                      <span className="grid place-items-center h-9 w-9 rounded-lg bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <o.icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-foreground">{o.label}</span>
                        <span className="block text-xs text-muted-foreground">{o.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="https://dc.gg/zenixhost" target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md">Centrum pomocy</a>
          <a href="#kontakt" className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md">Kontakt</a>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="https://panel.zenixhost.pl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all shadow-lg shadow-primary/30">
            <LogOut className="h-4 w-4" /> Panel Klienta
          </a>
        </div>

        <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl px-5 py-4 space-y-1">
          <a href="#home" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary">Strona główna</a>
          {OFFERS.map((o) => (
            <a key={o.label} href={o.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary">
              <o.icon className="h-4 w-4 text-primary" /> {o.label}
            </a>
          ))}
          <a href="https://dc.gg/zenixhost" target="_blank" rel="noopener noreferrer" className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary">Centrum pomocy</a>
          <a href="#kontakt" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary">Kontakt</a>
          <a href="https://panel.zenixhost.pl" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            <LogOut className="h-4 w-4" /> Panel Klienta
          </a>
        </div>
      )}
    </header>
  );
}

/* ============ PRICING CARD ============ */
function PricingCard({ badge, price, period = "/ mc", specs = [], highlighted = false, cta = "Zamów teraz ten pakiet" }) {
  return (
    <div className={`relative group flex flex-col rounded-2xl border p-6 transition-all duration-300 ${highlighted ? "border-primary/70 bg-card shadow-2xl shadow-primary/20" : "border-border/70 bg-card hover:border-primary/40"}`}>
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 violet-aura -z-10" />
      <div className="inline-flex w-fit items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide">{badge}</div>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display font-bold text-3xl text-foreground">{price}</span>
        <span className="text-muted-foreground text-sm font-mono">{period}</span>
      </div>
      <a href="https://panel.zenixhost.pl" target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex items-center justify-center min-h-[48px] w-full rounded-xl text-sm font-semibold uppercase tracking-wide transition-all ${highlighted ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110" : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"}`}>
        {cta}
      </a>
      <div className="mt-6 pt-5 border-t border-border/60">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Szczegółowa specyfikacja</p>
        <ul className="space-y-3.5">
          {specs.map((s, i) => {
            const Icon = SPEC_ICONS[s.icon] || Cpu;
            return (
              <li key={i} className="flex items-center gap-3">
                <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-sm">
                  <span className="text-muted-foreground">{s.label} </span>
                  <span className="font-semibold text-foreground">{s.value}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer id="kontakt" className="relative border-t border-border/60 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img src={LOGO} alt="ZenixHost" className="h-9 w-9 rounded-md object-cover" />
              <span className="font-display font-bold text-lg">Zenix<span className="text-primary">Host</span></span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Hosting premium za najniższą cenę. Boty Discord, VPS, serwery Minecraft i bazy danych MariaDB — bez kompromisów.
            </p>
            <a href="https://dc.gg/zenixhost" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[#5865F2] text-white text-sm font-semibold hover:brightness-110 transition">
              <MessageCircle className="h-4 w-4" /> Dołącz na Discord
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Oferta</p>
            <ul className="space-y-3 text-sm">
              <li><a href="#discord" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><Bot className="h-4 w-4" /> Boty Discord</a></li>
              <li><a href="#vps" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><Server className="h-4 w-4" /> VPS Start</a></li>
              <li><a href="#minecraft" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><Box className="h-4 w-4" /> Serwery Minecraft</a></li>
              <li><a href="#bazy" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><Database className="h-4 w-4" /> Bazy danych MariaDB</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Pomoc</p>
            <ul className="space-y-3 text-sm">
              <li><a href="https://dc.gg/zenixhost" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">Centrum pomocy <ExternalLink className="h-3.5 w-3.5" /></a></li>
              <li><a href="https://panel.zenixhost.pl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">Panel klienta <ExternalLink className="h-3.5 w-3.5" /></a></li>
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition">Status usług</a></li>
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition">Regulamin</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Kontakt</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground"><span className="h-2 w-2 rounded-full bg-success animate-node" /> Warszawa, PL</li>
              <li><a href="https://dc.gg/zenixhost" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">dc.gg/zenixhost</a></li>
              <li><a href="https://panel.zenixhost.pl" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">panel.zenixhost.pl</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">© {new Date().getFullYear()} ZenixHost — Wszelkie prawa zastrzeżone.</p>
          <p className="text-xs text-muted-foreground font-mono">Site Designed by <span className="text-primary font-semibold">KuleczkaCWL</span> — crimsonxxdev on DC</p>
        </div>
      </div>
    </footer>
  );
}

/* ============ HELPERS ============ */
function SectionHeader({ id, kicker, title, desc }) {
  return (
    <div id={id} className="scroll-mt-24 max-w-2xl">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold uppercase tracking-wider">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-node" /> {kicker}
      </span>
      <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl tracking-tight">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground text-lg leading-relaxed">{desc}</p>}
    </div>
  );
}

/* ============ PAGE ============ */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section id="home" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 grid-blueprint opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] violet-aura pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-success animate-node" />
              <span className="text-success font-semibold">SYSTEM ONLINE</span>
              <span className="text-muted-foreground">· 99.99% uptime</span>
            </span>
            <h1 className="mt-6 font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight chromatic">
              Hosting premium.<br />
              <span className="text-primary text-glow">Najwyższa jakość, najniższa cena.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Boty Discord, VPS, serwery Minecraft i bazy danych MariaDB — uruchamiane w kilka sekund na procesorach AMD Ryzen, z ochroną Anty-DDoS w cenie. Budowane w Warszawie, dla Twojej społeczności.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#discord" className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:brightness-110 transition">
                Zobacz ofertę <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://panel.zenixhost.pl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full border border-border bg-card/60 backdrop-blur font-semibold text-sm hover:border-primary/50 transition">
                Panel Klienta
              </a>
            </div>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Bot, t: "Boty Discord", from: "Od 1,49 zł / mc", href: "#discord", glow: "from-primary/25" },
              { icon: Server, t: "VPS Start", from: "Od 6,99 zł / mc", href: "#vps", glow: "from-chart-3/25" },
            ].map((c) => (
              <a key={c.t} href={c.href} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 hover:border-primary/50 transition-all">
                <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${c.glow} to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition`} />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="grid place-items-center h-12 w-12 rounded-xl bg-primary/15 text-primary"><c.icon className="h-6 w-6" /></div>
                    <h3 className="mt-4 font-display font-bold text-2xl">{c.t}</h3>
                    <p className="mt-1 text-sm font-mono text-muted-foreground">{c.from}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Network className="h-3.5 w-3.5 text-primary" /> {t}
              <span className="text-success text-xs">●</span>
            </span>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader kicker="Dlaczego ZenixHost" title="Infrastruktura, na której możesz polegać" desc="Stabilna sieć, szybkie uruchomienie usług i wydajność dostępna każdego dnia — bez kompromisów." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-border/70 bg-card p-6 hover:border-primary/40 transition">
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition"><f.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader id="discord" kicker="Boty Discord" title="Hosting botów Discord w klasie premium" desc="Stabilne, zawsze-online środowisko dla Twoich botów. Ceny niższe niż u konkurencji — ten sam poziom usług." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">{DISCORD_PLANS.map((p) => <PricingCard key={p.badge} {...p} />)}</div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-border/40 bg-card/20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader id="vps" kicker="VPS Start" title="VPS na procesorach AMD Ryzen" desc="Pełna kontrola, dyski NVMe Gen4 i dedykowane zasoby. Uruchom swój projekt online w kilka minut." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">{VPS_PLANS.map((p) => <PricingCard key={p.badge} {...p} />)}</div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader id="minecraft" kicker="Serwery Minecraft" title="Serwery Minecraft bez limitu slotów" desc="Niskie opóźnienia, natychmiastowy start i ochrona Anty-DDoS w cenie. Idealne dla społeczności każdej wielkości." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">{MC_PLANS.map((p) => <PricingCard key={p.badge} {...p} />)}</div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-b border-border/40 bg-card/20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader id="bazy" kicker="Bazy danych" title="Zarządzane bazy danych MariaDB" desc="Bezpieczne, dostępne i gotowe pod Twój projekt. Pełna kompatybilność MariaDB, codzienne kopie zapasowe." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">{DB_PLANS.map((p) => <PricingCard key={p.badge} {...p} />)}</div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 lg:p-14 text-center">
            <div className="absolute inset-0 violet-aura pointer-events-none" />
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary mx-auto" />
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl tracking-tight">Gotowy wystartować?</h2>
              <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">Dołącz do tysięcy społeczności, które wybrały ZenixHost. Wsparcie na Discordzie dostępne 24/7.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="https://dc.gg/zenixhost" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:brightness-110 transition">Discord support</a>
                <a href="https://panel.zenixhost.pl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[48px] px-7 rounded-full border border-border bg-background font-semibold text-sm hover:border-primary/50 transition">Przejdź do panelu</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
