# Homepage Content Map — Taraz (v8 Header Revamp)

## v8 Changelog (Header Revamp)

**What changed:**
- Replaced floating pill-style `.nav` with a full-width editorial `.site-header`
- Added mobile drawer with slide-from-right animation, focus trap, backdrop
- Added active-section tracking via IntersectionObserver (`is-active` class)
- Added scroll-elevation state (`is-scrolled` at > 8px scroll)
- Added hamburger toggle with animated X transform
- Added CTA button in header ("Request an Assessment")
- Updated nav link labels: Solutions, Method, Process, Work, Contact
- Added `--nav-height` variable for consistent spacing
- Added `:focus-visible` global outline for accessibility
- Updated RTL support for all new header/drawer elements
- Updated responsive breakpoints (960px hides nav/CTA, shows hamburger; 640px full-width drawer)

**Files touched:**
- `index.html` — new header + drawer HTML, updated footer nav
- `assets/css/main.css` — replaced `.nav` block with `.site-header` + `.drawer` + `.header__*` classes
- `assets/js/main.js` — added `initHeaderScroll()`, `initMobileDrawer()`, `initActiveNav()`, updated `applyLang()` for drawer, updated `initStaticLogos()` for drawer logo, updated `boot()` wiring
- `docs/homepage-content-map.md` — this section

**How to tweak later:**
- Nav links: edit `<li><a>` inside `.header__links` (desktop) and `.drawer__links` (mobile)
- Header CTA label: edit `data-i18n="nav.cta"` value in I18N object
- Scroll threshold: change `scrollY > 8` in `initHeaderScroll()`
- Drawer width: change `width: min(100vw, 380px)` on `.drawer`
- Active nav threshold: adjust `rootMargin` in `initActiveNav()` IntersectionObserver

---

# Homepage Content Map — Taraz

## Narrative Strategy

The homepage positions Taraz as a premium enterprise AI consulting and product engineering studio.
The tone is **confident, editorial, and executive-friendly** — minimal, spacious, and outcome-driven.

**Core message:**
> Smarter Systems. Clearer Decisions.

Every section reinforces practical enterprise impact. The page is designed for CTOs, heads of operations, and founders evaluating a technical partner.

---

## Section Structure

| # | Section | ID | Purpose |
|---|---------|----|---------|
| 1 | Nav | `#nav` | Fixed navigation, language toggle, logo |
| 2 | Hero | `#hero` | Position Taraz as a B2B AI product partner |
| 3 | Trust Metrics | — | Outcome-oriented trust signals |
| 4 | Services | `#services` | 4 service cards: AI Strategy, Process Automation, Internal Tools, Product Engineering |
| 5 | Process | `#process` | 4-step operating model: Discover, Design, Deliver, Iterate |
| 6 | Selected Work | `#work` | 3 anonymized sample engagement case cards |
| 7 | About | `#about` | Brand story + 3 principles |
| 8 | Banner | `#banner` | Impact metrics section with full-bleed image |
| 9 | Contact | `#contact` | Premium contact form with 2-column row layout |
| 10 | Footer | — | Brand, navigation echo, copyright |

---

## Header / Nav v8 — Detailed Reference

### DOM Structure (Desktop)
```
header.site-header#header
  div.header__inner
    a.header__logo              ← brand mark + wordmark (TarazLogo SVG)
      div#navLogo.logo-nav
    nav.header__nav             ← desktop nav only
      ul.header__links
        li: a.header__link[href="#services"]  → Solutions
        li: a.header__link[href="#process"]   → Method
        li: a.header__link[href="#process"]   → Process
        li: a.header__link[href="#work"]      → Work
        li: a.header__link[href="#contact"]   → Contact
    div.header__actions
      a.btn.btn-primary.header__cta        ← "Request an Assessment"
      button.header__lang#langBtn          ← language toggle (FA/EN)
      button.header__toggle#menuToggle     ← hamburger (hidden on desktop)

### DOM Structure (Mobile Drawer — opened by hamburger)
div.drawer#mobileDrawer[role="dialog"][aria-modal="true"]
  div.drawer__inner
    div.drawer__header
      div.drawer__logo → #drawerLogo
      button.drawer__close → × icon
    nav (mobile nav)
      ul.drawer__links → same 5 links as desktop
    div.drawer__actions
      a.btn.btn-primary.drawer__cta
      button.header__lang.drawer__lang#drawerLangBtn
div.drawer__backdrop#drawerBackdrop
```

### Class Names & States

| Class | Element | Purpose |
|-------|---------|---------|
| `.site-header` | `header` | Fixed top bar, backdrop-blur, hairline border |
| `.site-header.is-scrolled` | same | Slightly opaque bg + stronger border on scroll > 8px |
| `.header__inner` | div | Constrained width container, flex layout |
| `.header__logo` | a | Logo link (click → top) |
| `.header__nav` | nav | Desktop nav (hidden ≤960px) |
| `.header__links` | ul | Nav link list |
| `.header__link` | a | Individual nav item |
| `.header__link:hover` | a | Brightens text + thin underline scales in |
| `.header__link.is-active` | a | Active section indicator (accent underline) |
| `.header__actions` | div | CTA + lang toggle + hamburger group |
| `.header__cta` | a | Primary CTA button (hidden ≤960px) |
| `.header__lang` | button | Language toggle |
| `.header__toggle` | button | Hamburger icon (hidden ≥960px) |
| `.header__toggle[aria-expanded="true"]` | button | Animated X (3 spans rotate) |
| `.drawer` | div | Fixed slide-in panel (right side, 380px) |
| `.drawer.is-open` | div | Slid into view (transform: translateX(0)) |
| `.drawer__backdrop` | div | Semi-transparent overlay |
| `.drawer__backdrop.is-visible` | div | Fade-in overlay |
| `.drawer__inner` | div | Flex column layout |
| `.drawer__header` | div | Logo + close button row |
| `.drawer__close` | button | Close (×) button |
| `.drawer__links` | ul | Mobile nav link list |
| `.drawer__link` | a | Mobile nav item |
| `.drawer__actions` | div | CTA + lang at bottom of drawer |
| `.drawer__cta` | a | Full-width CTA in drawer |
| `.drawer__lang` | button | Lang toggle in drawer |

### States Overview

| State | Trigger | Visual |
|-------|---------|--------|
| Default | Page load | Transparent bg (0.72), blur, hairline border |
| `is-scrolled` | scrollY > 8px | bg → 0.88, border → 0.12 |
| `is-active` | Section visible via IntersectionObserver | Nav link text brightens, underline appears |
| `is-open` (drawer) | Hamburger click | Drawer slides in, backdrop fades in |
| `[aria-expanded="true"]` (toggle) | Drawer open | Hamburger → X animation |

### i18n Keys Used in Header

| Key | EN | FA |
|-----|----|----|
| `nav.solutions` | Solutions | راهکارها |
| `nav.method` | Method | روش |
| `nav.process` | Process | فرآیند |
| `nav.work` | Work | پروژه‌ها |
| `nav.contact` | Contact | تماس |
| `nav.cta` | Request an Assessment | درخواست ارزیابی |

### How to Add a New Nav Item Safely

1. In `index.html`:
   - Add `<li><a href="#new-id" data-i18n="nav.newkey" class="header__link">Label</a></li>` inside `.header__links`
   - Add same link inside `.drawer__links`
2. In `assets/js/main.js`:
   - Add `'nav.newkey': 'Label'` to `I18N.en` and `I18N.fa`
3. In `assets/css/main.css`:
   - No changes needed (`.header__link` / `.drawer__link` styles apply automatically)
4. Create the target section with `id="new-id"` in `index.html`
   - If section doesn't exist yet, add a `<!-- TODO -->` comment

### How RTL Is Handled

- The `header__inner` uses flexbox with `justify-content: space-between` — RTL reverses naturally
- `.drawer` uses `right: 0` by default; `[dir="rtl"] .drawer` swaps to `left: 0` + `border-right`
- `.drawer` transforms from `translateX(100%)` (LTR) / `translateX(-100%)` (RTL)
- `.header__link::after` underline centers via `left: 50%; transform: translateX(-50%)` — works in both directions
- Farsi text uses Vazirmatn font with adjusted letter-spacing (RTL overrides in `[dir="rtl"]` block)

### JS Functions

| Function | File:Line | Purpose |
|----------|-----------|---------|
| `initHeaderScroll()` | main.js | Toggles `.is-scrolled` class on header via requestAnimationFrame |
| `initMobileDrawer()` | main.js | Opens/closes drawer, focus trap, ESC, backdrop, link-close |
| `initActiveNav()` | main.js | IntersectionObserver per section → adds `.is-active` to matching `.header__link` |
| `applyLang()` update | main.js | Now also updates `#drawerLangBtn` alongside `#langBtn` |
| `initStaticLogos()` update | main.js | Now also renders logo in `#drawerLogo` |

### Accessibility

- Semantic `<header>` and `<nav>` elements with `aria-label`
- Hamburger has `aria-expanded` and `aria-controls="mobileDrawer"`
- Drawer has `role="dialog"` and `aria-modal="true"`
- Focus trapped inside drawer when open (Tab/Shift+Tab cycle)
- Close on ESC key, backdrop click, or link click
- Language toggle has dynamic `aria-label` ("Switch to Persian" / "Switch to English")
- Focus-visible outlines use accent color (`#4F46E5`)
- Body scroll is prevented when drawer is open (`overflow: hidden`)

---

## Copy Inventory

### Key prefix conventions

| Prefix | Section |
|--------|---------|
| `nav.*` | Navigation |
| `hero.*` | Hero |
| `trust.*` | Trust bar |
| `services.*` | Services (4 cards) |
| `process.*` | Process (4 steps) |
| `work.*` | Selected Work (3 cards) |
| `about.*` | About / Philosophy |
| `banner.*` | Banner metrics |
| `contact.*` | Contact |
| `footer.*` | Footer |

### EN / FA bilingual keys

All copy is stored in `assets/js/main.js` in the `I18N` object.
- `I18N.en` — English values
- `I18N.fa` — Persian (Farsi) values

To add a new language, create `I18N.xx` and populate all keys.

### Trust Metric Notes

3 trust metrics appear below the hero:
- 50% Average Operational Cost Reduction
- 10x Workflow Acceleration
- 100% Custom Enterprise Design

These are **outcome framings**, not literal verified claims. They illustrate the type of impact Taraz helps create.

---

## Image Inventory

### Image Slots

| File | Section | Usage |
|------|---------|-------|
| `https://images.unsplash.com/photo-1497366216548-37526070297c` | Hero | Right-side hero visual (enterprise office) |
| `https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a` | Services card 1 | AI Strategy icon |
| `https://images.unsplash.com/photo-1551288049-bebda4e38f71` | Services card 2 | Process Automation icon |
| `https://images.unsplash.com/photo-1519389950473-47ba0277781c` | Services card 3 | Internal Tools icon |
| `https://images.unsplash.com/photo-1498050108023-c5249f4df085` | Services card 4 | Product Engineering icon |
| `https://images.unsplash.com/photo-1460925895917-afdab827c52f` | Work card 1 | Operations dashboard |
| `https://images.unsplash.com/photo-1551288049-bebda4e38f71` | Work card 2 | Document processing |
| `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d` | Work card 3 | Healthcare workflow |
| `https://images.unsplash.com/photo-1504384308090-c894fdcc538d` | Banner | Full-bleed background |

### Placeholder System

Images are loaded from Unsplash URLs. For production, replace with local assets in `assets/img/` and update the `src` attributes in `index.html`.

### Alt text strategy

Each image gets a meaningful alt describing its content and context.

---

## Visual Direction Notes

- **Palette:** `#08080C` (bg), `#F3F4F6` (primary text), `#9CA3AF` (muted), `#4F46E5` (accent)
- **Typography:** Inter (body/headings), Space Mono (UI/meta/eyebrows), Vazirmatn (Persian)
- **Borders:** Hairline `rgba(255,255,255,0.04)` — barely visible, adds depth without noise
- **Surfaces:** Layered `#0D0D14` (surface) and `#14141F` (elevated/hover)
- **Radial glow:** Subtle accent glow behind hero content

---

## Motion & Interaction

| Element | Effect | Class |
|---------|--------|-------|
| All sections | Fade-up on scroll | `.reveal` + `.d1`–`.d4` delays |
| Hero ambient | Indigo light field, mouse-follow | Canvas via `hero-canvas.js` |
| Nav background | Blur + opacity on scroll | `.nav.scrolled` toggled by JS |
| Buttons | Hover lift + shadow | `.btn:hover` |
| Cards (service, work, process) | Hover lift + tilt via card-tilt | `.card-tilt` + `.card-tilt-content` |
| Principle items | Left border highlight on hover | `.principle:hover` |
| Hero spotlight | Mouse-follow radial glow | `#heroSpotlight` |
| Parallax | Subtle scroll-based Y offset | `.parallax` |
| Reduced motion | All transitions/animations disabled | `prefers-reduced-motion` |

### Canvas Ambient Light

- File: `assets/js/hero-canvas.js`
- Draws a single radial gradient in indigo (`rgba(79,70,229,0.025)`)
- Mouse-follows with 0.025 lerp for slow, quiet drift
- No particles, no noise, no color shifts
- Disabled entirely when `prefers-reduced-motion: reduce`

---

## CSS Class Map

| Class | Type | Used on |
|-------|------|---------|
| `.container` | Layout | Every section wrapper |
| `.section` | Layout | `#services`, `#process`, `#work`, `#about`, `#contact` |
| `.section-header` | Composition | Heading group in each section |
| `.eyebrow` | Typography | Section label above h2 |
| `.lede` | Typography | Supporting paragraph |
| `.gradient-text` | Inline | Accent gradient on key text |
| `.btn` | Component | CTA buttons |
| `.btn-primary` | Modifier | Primary action |
| `.btn-secondary` | Modifier | Secondary action |
| `.site-header` | Component | Full-width fixed header with blur |
| `.site-header.is-scrolled` | Modifier | Elevated scroll state |
| `.header__inner` | Layout | Constrained container for header content |
| `.header__logo` | Component | Logo link wrapper |
| `.header__nav` | Layout | Desktop nav element |
| `.header__links` | Layout | Flex row of nav links |
| `.header__link` | Component | Individual nav link with underline indicator |
| `.header__link.is-active` | Modifier | Active section indicator |
| `.header__actions` | Layout | CTA + lang + hamburger group |
| `.header__cta` | Component | Primary CTA button inside header |
| `.header__lang` | Component | Language toggle button |
| `.header__toggle` | Component | Hamburger icon (3 spans) |
| `.drawer` | Component | Slide-in mobile navigation panel |
| `.drawer.is-open` | Modifier | Visible state |
| `.drawer__backdrop` | Graphic | Semi-transparent overlay |
| `.drawer__backdrop.is-visible` | Modifier | Fade-in state |
| `.drawer__inner` | Layout | Flex column inside drawer |
| `.drawer__header` | Layout | Logo + close row |
| `.drawer__close` | Component | Close button for drawer |
| `.drawer__links` | Layout | Stacked mobile nav list |
| `.drawer__link` | Component | Mobile nav item |
| `.drawer__actions` | Layout | CTA + lang at drawer bottom |
| `.drawer__cta` | Component | Full-width CTA in drawer |
| `.drawer__lang` | Component | Lang toggle in drawer |
| `.logo-nav` | Media | TarazLogo SVG container in header |
| `.hero` | Section | Hero |
| `.hero-content` | Layout | Hero text block |
| `.hero-subtitle` | Typography | Hero description |
| `.hero-actions` | Layout | CTA wrapper |
| `.hero-visual` | Media | Hero image container |
| `.hero-visual-overlay` | Graphic | Gradient overlay |
| `.hero-visual-glow` | Graphic | Radial glow behind visual |
| `.hero-spotlight` | Graphic | Mouse-follow spotlight |
| `.trust-bar` | Section | Trust row |
| `.trust-grid` | Layout | 3-column grid |
| `.trust-item` | Component | Individual trust metric |
| `.trust-label` | Typography | Metric label |
| `.services-grid` | Layout | 2-col service cards |
| `.service-card` | Component | Individual service |
| `.service-visual` | Media | Service icon container |
| `.process-section` | Section | Process (= surface bg) |
| `.process-grid` | Layout | 4-col process steps |
| `.process-step` | Component | Individual step |
| `.process-num` | Typography | Step number |
| `.work-section` | Section | Selected work |
| `.work-grid` | Layout | 3-col case cards |
| `.work-card` | Component | Individual case |
| `.work-media` | Media | Case image container |
| `.work-body` | Layout | Card text content |
| `.work-tag` | Typography | Engagement type label |
| `.work-detail` | Layout | Problem/approach block |
| `.work-label` | Typography | Detail label |
| `.work-result` | Composition | Result highlight |
| `.about-section` | Section | About |
| `.about-layout` | Layout | 2-col: text + principles |
| `.about-text` | Typography | Body copy |
| `.about-principles` | Layout | Principle list |
| `.principle` | Component | Single principle |
| `.principle-num` | Typography | Principle number |
| `.banner-section` | Section | Banner |
| `.banner-bg` | Media | Full-bleed background |
| `.banner-overlay` | Graphic | Gradient overlay |
| `.banner-content` | Layout | Centered text block |
| `.banner-metrics` | Layout | Metrics row |
| `.banner-metric` | Component | Single metric |
| `.banner-metric-num` | Typography | Gradient numeral |
| `.banner-metric-label` | Typography | Metric label |
| `.contact-section` | Section | Contact |
| `.contact-card` | Component | Form card with glow |
| `.contact-form` | Component | Form layout |
| `.contact-form-row` | Layout | 2-column input row |
| `.contact-trust` | Typography | Privacy note |
| `.footer` | Section | Footer |
| `.footer-layout` | Layout | Brand + nav + copyright |
| `.footer-brand` | Layout | Logo + descriptor |
| `.footer-tagline` | Typography | Caption |
| `.footer-nav` | Navigation | Footer links |
| `.footer-copy` | Typography | Copyright |
| `.card-tilt` | Interaction | 3D tilt on hover |
| `.card-tilt-content` | Interaction | Tilt child |
| `.parallax` | Motion | Scroll-based Y offset |
| `.reveal` | Motion | Fade-up trigger |
| `.reveal-left` | Motion | Slide-left trigger |
| `.reveal-right` | Motion | Slide-right trigger |
| `.reveal-scale` | Motion | Scale-in trigger |
| `.logo-nav`, `.logo-hero`, `.logo-footer` | Media | TarazLogo SVG containers |

---

## Editing Guide

### How to replace text

1. Find the `data-i18n` attribute value in the HTML (e.g. `services.item1.title`)
2. Locate that key in `I18N.en` and `I18N.fa` in `assets/js/main.js`
3. Edit the string value. HTML is allowed in values (e.g. `<span class="gradient-text">`)
4. Refresh the page. The change appears instantly (no build step).

### How to swap images

1. Add the image file to `assets/img/`
2. Find the `img` tag in `index.html` for the relevant section
3. Replace the `src` attribute with your local path
4. Update the `alt` text

### How to add a new section

1. Add the section HTML in `index.html` using existing patterns (`.section > .container > .section-header`)
2. Add `reveal` and optional `d1`–`d4` class for scroll animation
3. Add `data-i18n="yourprefix.key"` attributes for all text
4. Add `I18N.en` and `I18N.fa` entries in `main.js`
5. Add corresponding CSS in `main.css` (or extend existing component classes)
6. If section needs a logo, add a `#id` div and register in `initStaticLogos()` config array

### How i18n keys are organized

- Keys follow the pattern: `{section}.{element}.{variant}`
- Example: `work.card1.result` — Work section, card 1, result line
- All keys exist in both `I18N.en` and `I18N.fa`
- HTML-in-string is allowed for inline elements like `span.gradient-text`
- The language toggle button toggles between `en` and `fa`
- The hero title i18n key includes `<br>` and `<span>` — ensure HTML structure matches

---

## Design Rationale

**Why the page feels premium:**

1. **Spacing rhythm** — Generous whitespace ratios (up to `128px` section padding) create an unhurried, editorial pace.
2. **Restrained palette** — Only one accent color (indigo) used sparingly for highlights, borders, and hover states.
3. **Hairline borders** — `rgba(255,255,255,0.04)` separators are barely perceptible but provide structure.
4. **Typography hierarchy** — Two font families with distinct roles: Inter for reading, Space Mono for meta/UI labels.
5. **Outcome framing** — Every service card and work case ends with a concrete outcome line.
6. **Anonymized work** — Case cards are labeled as sample engagements with problem/approach/result format.
7. **Atmospheric depth** — Subtle radial glow behind hero and indigo ambient canvas create quiet space.
8. **3D card tilt** — Subtle perspective shift on hover feels tactile without being distracting.

**What was deliberately avoided:**
- Particle effects or canvas noise
- Animated backgrounds or excessive parallax
- Client logos or testimonials
- Stock photography of handshakes or server racks
- Count-up animations with unverifiable precision
- Rotating/staggered hero words

---

## Production Image Replacement Checklist

Replace Unsplash URLs with local assets:

- [ ] `assets/img/hero-visual.jpg` — Hero section (line ~48)
- [ ] `assets/img/service-strategy.jpg` — Services card 1 (line ~125)
- [ ] `assets/img/service-automation.jpg` — Services card 2 (line ~134)
- [ ] `assets/img/service-tools.jpg` — Services card 3 (line ~143)
- [ ] `assets/img/service-engineering.jpg` — Services card 4 (line ~152)
- [ ] `assets/img/work-operations.jpg` — Work card 1 (line ~172)
- [ ] `assets/img/work-data.jpg` — Work card 2 (line ~192)
- [ ] `assets/img/work-healthcare.jpg` — Work card 3 (line ~212)
- [ ] `assets/img/banner-bg.jpg` — Banner background (line ~262)
- [ ] `assets/img/og-cover.jpg` — Add `<meta property="og:image">` in `<head>`
