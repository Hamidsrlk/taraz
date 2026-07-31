# Taraz — Development Changelog

## v10 — Theme Switch (Dark/Light Mode)

**Folder:** `taraz-site-v10-theme-switch`

### Added
- **Dark/Light theme toggle** — persistent toggle button in header, saves preference to `localStorage`
- **Light mode CSS** — full inverted color scheme using `[data-theme="light"]` custom properties:
  - Backgrounds inverted (dark→light)
  - Text colors inverted (light→dark)
  - Accent colors adjusted for contrast
  - SVG/logo colors use CSS variables → switch automatically
- **Theme JS** — `initTheme()` in `main.js`:
  - Reads `localStorage.theme` or system `prefers-color-scheme`
  - Sets `data-theme` on `<html>`
  - Updates toggle button icon (sun/moon)
  - Syncs across page navigation

### Changed
- **Header** — added theme toggle button (sun/moon SVG) next to language button
- **CSS** — all color values moved behind CSS custom properties; light mode overrides every `--color-*` var
- **Logo** — `.brand-svg` colors (stroke, fill) use `var(--color-brand-signal)` and `var(--color-accent)` → auto switch

---

## v9 — Logo System (Wordmark + Waveform)

**Folder:** `taraz-site-v9-logo`

### Added
- **`logo-wordmark.js`** — builds SVG wordmark "Taraz" with waveform signature line:
  - `initBrandLogo(container, opts)` — clones `<template id="brandLogoTpl">`, measures text via SVG `getExtentOfChar()`, computes waveform path (12 control points), positions node at peak, arrow barb at 'z', and traveling dot pulse
  - `startPulse(svg)` — `requestAnimationFrame` loop moves the white dot along the sig path (2800ms cycle)
  - Font-aware: waits for Space Grotesk 700 to load before computing
- **`<template id="brandLogoTpl">`** in HTML — SVG structure:
  - "T" — hollow/stroked (`fill="none" stroke="var(--color-brand-signal)"`, stroke-width=3)
  - "araz" — filled (`fill="var(--color-brand-signal)"`)
  - `.sig` — waveform path from T→z (accent color, 5.5px stroke)
  - `.arrow` — upward barb at end of waveform
  - `.sig-dot` — traveling white pulse (r=3.5)
  - `.node-pop` — circle at waveform peak (halo r=8.5, node r=5.5)
- **CSS** — `.brand-svg` sizing: header 52px, drawer 44px, footer 38px; `direction:ltr` for RTL safety

### Changed
- **Header/drawer/footer logos** — replaced text spans (`TARAZ`) with empty containers (`#brandLogoHeader`, etc.) injected by JS
- **Waveform thickness** — increased from 3.4 to 5.5, arrow 5, dot/node scaled up
- **Tagline "AI & TECHNOLOGY"** — removed per user request
- **RTL fix** — `direction:ltr; unicode-bidi:embed` on SVG prevents text reversal in Persian mode

### Fixed
- **Persian translations** — added all missing `services.page.*` keys (~30 keys) with proper Persian text
- **Logo RTL corruption** — SVG text "Taraz" was rendering reversed in `dir="rtl"` mode

---

## v8 — Header Revamp

**Folder:** `taraz-site-v8-header-revamp`

### Added
- **Full-width sticky header** — `position:fixed` with `backdrop-filter: blur(20px)`
- **Mobile drawer** — slide-in panel with backdrop, focus trap, keyboard navigation (Escape/Shift+Tab)
- **Active-link tracking** — `IntersectionObserver` highlights current section nav link
- **Scroll elevation** — `.is-scrolled` class adds opaque background + top glow line
- **Premium top glow line** — linear gradient (`::before` pseudo-element)

### Changed
- **Header structure** — flex layout: logo | nav | actions (CTA, lang, hamburger)
- **Responsive** — `--nav-height`: 64px desktop → 56px tablet → 52px mobile
- **Logo** — "T" hollow/stroked with glow, "ARAZ" filled with signal color
- **Persian RTL** — language toggle switches `dir="rtl"`, Vazirmatn font for body
- **Full i18n** — complete English/Persian translation tables in `main.js`
