# Taraz — Development Changelog

## v18 — Secure Chat: Serverless Proxy, No Secrets in the Client

**Folder:** `taraz-site-v18-chat-secure-openrouter` (git repo carried over from v17)

### Security — GH013 Push Protection remediation
- **Problem:** the OpenRouter key was committed in `assets/js/chat.js:7` (commit `02b61fe`); GitHub blocked the push with GH013
- **Fix:** the key is **removed from the client**; the chat now talks to an internal endpoint that holds the key in environment variables only
- Commit `02b61fe` was rewritten with `git commit --amend` (the commit had never reached GitHub — `origin/main` was one commit behind)
- **IMPORTANT:** the leaked key (the `sk-or-v1-` key that was in `chat.js:7`) must be **revoked** at https://openrouter.ai/keys and replaced with a new one, stored only as `OPENROUTER_API_KEY` in the deploy environment

### Architecture (new)
- `assets/js/chat.js` — no key, no OpenRouter URL, no system prompt; sends `{ messages, locale }` to `POST /api/chat`, expects `{ replyText }`; falls back to canned keyword replies on any failure (offline / 503 / no key)
- `api/chat.js` — **Vercel serverless function**: reads `OPENROUTER_API_KEY` from env, proxies to OpenRouter (`/api/v1/chat/completions`) with `HTTP-Referer: https://taraz.studio` + `X-Title`, model fallback chain, 20s timeout per attempt, sanitized input (max 30 messages, 2000 chars each), **no stack traces or secrets in responses**
- `worker.js` — **Cloudflare Workers alternative** (Service Worker format; secret read from the `OPENROUTER_API_KEY` binding; deploy with `wrangler`)
- System prompts moved server-side, **bilingual** (`fa`/`en` selected by client `locale`): Taraz facts list (the only allowed company info), lead-qualification flow, flawless Persian rules (standard orthography, Persian digits, no foreign words)

### Model chain (server-side)
1. `deepseek/deepseek-v4-flash-0731` — near-free, best Persian (needs a few cents of credit on the account)
2. `google/gemma-4-31b-it:free` — free fallback
3. `nvidia/nemotron-3-super-120b-a12b:free` — last free fallback
- If every model fails (429/402/5xx/timeout) → `503 { error: 'ai_unavailable' }` → client renders canned replies

### UX preserved (unchanged from v17)
- Typing indicator, conversation history in `localStorage`, clear + mailto transcript, quick chips re-render on language switch, RTL/FA + LTR/EN, `prefers-reduced-motion`

### Docs
- New `docs/chat-integration.md` — architecture, GH013 fix steps, key rotation, Vercel + Cloudflare deployment, curl test

---

## v17.1 — AI-Powered Chat (OpenRouter)

**Folder:** `taraz-site-v17-chat`

### Added — real AI replies in the chat
- `chat.js` now calls **OpenRouter** (`https://openrouter.ai/api/v1/chat/completions`) instead of canned keyword replies
- **Model fallback chain** (free tier rate limits are common, so we try in order):
  1. `google/gemma-4-31b-it:free` — best Persian quality
  2. `nvidia/nemotron-3-super-120b-a12b:free` — backup if Gemma is rate-limited (429) or times out
  3. If all models fail → falls back to the old rule-based canned replies, so the chat never breaks
- **45s timeout per model** via `AbortController`, then auto-advances to the next model
- **System prompt** (top of `chat.js`, `SYSTEM_PROMPT`): Taraz's lead-qualification flow — listen → diagnose the visitor's process → propose a tailored AI/automation solution → collect name/company/contact at the end for specialist follow-up; reply in the visitor's language, short answers (2–5 sentences), never invent prices, 30-min discovery call for estimates, email `hello@taraz.studio`
- **Context**: last 20 messages of the conversation (from `localStorage`) are sent to the model, so it remembers earlier topics; greeting message updated to "AI virtual assistant"
- API key is stored client-side in `chat.js` (`OPENROUTER_KEY` — demo-grade security; key gets exposed in DevTools)

### Technical
- `node --check` passes
- NOTE: DeepSeek free models no longer exist on OpenRouter, and the account's privacy settings (ZDR) also blocked paid DeepSeek — switched to the free Gemma/Nemotron chain (verified live via API)

---

## v17 — Live Chat (Page + Floating Button)

**Folder:** `taraz-site-v17-chat`

### Added — `chat.html` (new page)
- Full chat page: header/drawer/footer consistent with the rest of the site, Persian RTL by default, theme toggle works
- **Chat window**: agent header (gradient avatar, "Taraz Support", pulsing green Online dot), scrollable message area, quick-question chips, input + send button (Enter works, form submit)
- **Instant auto-replies** (`assets/js/chat.js`):
  - Rule-based keyword engine (EN + FA): human/agent, demo, pricing, services, contact, hours, thanks, greeting — plus a fallback that promises a specialist callback
  - Typing indicator (3 bouncing dots) + 0.9–1.6s randomized delay for a natural feel
  - Time stamps on every message (localized `fa-IR`/`en-US` with Persian digits)
- **Quick-chips** — 4 one-click questions that send themselves ("Pricing", "Services", "Book a demo", "Talk to a person" / فارسی), re-rendered live on language switch (MutationObserver on `lang`)
- **History** — conversation persists in `localStorage` (`taraz-chat-v1`), survives refresh; clear button in the chat header
- **Transcript** — mail button exports the whole conversation via `mailto:` (email constant at the top of `chat.js`, currently `hello@taraz.studio`)

### Added — floating chat button (corner of every page)
- `.chat-float` — 56px gradient circle pinned to the corner (`inset-inline-end`: bottom-right in LTR, bottom-left in RTL), with pulsing green online dot; links to `chat.html`; included on index, services, and chat pages
- Bilingual static `aria-label` (no `data-i18n` — `applyLang` would wipe the inline SVG)

### Added — navigation + i18n
- `nav.chat` key (Chat / گفتگو) added to header nav and mobile drawer on all three pages (also footer nav on the new page)
- New i18n keys: `chat.page.eyebrow/title/subtitle`, `chat.agent`, `chat.online`, `chat.placeholder` (EN + FA)
- **Bugfix**: `applyLang` overwrote the document title on non-home pages (hero title key check) → now only sets the title if `[data-i18n="hero.title"]` exists

### Technical
- `chat.js` is a standalone IIFE — guards everything (no-op when `#chatBody`/`#chatForm` are missing), safe on every page
- CSS: `.chat-card` (min(640px, 70vh)), `.chat-msg--bot|user` bubbles (theme-aware surfaces, user bubble = accent gradient + white text), `.chat-typing` animation, `.chat-chip`, `.chat-form`/`.chat-input`, `.chat-float`; mobile sizing (440px+ on small screens) + reduced-motion support
- All chat text on theme backgrounds (vars) — readable in dark and light

---

## v16 — Text Readability on Images & Banners (Both Themes)

**Folder:** `taraz-site-v16-text-contrast`

### Audited — every text-on-image surface (dark + light themes)
- Banner content (eyebrow, h2, lede, metrics, CTA) over the slideshow photos
- Hero floating chips over the hero slideshow photos
- Lightbox caption over the dark photo backdrop
- Work-card images (no text on them — text sits below the image on card background, verified OK)
- services.html (no image-based hero/banner — text sits on page background, verified OK)

### Fixed — banner overlay rebuilt for guaranteed readability
- Old single `135deg` gradient dipped to only 14–25% darkness at the 45% mark (exactly where text can sit) and ignored RTL
- New **layered, direction-aware scrim** in both themes:
  - Horizontal layer: text side is dark (78–80% at inline-start, ~34–38% at 42%, image breathes past 68%), **flips automatically for RTL** via `[dir="rtl"]` overrides (dark on the right for Persian)
  - Vertical layer: uniform top-to-bottom darkening (24–30% → 12–16% → 22–26%)
  - Radial accent glow at the bottom corner for the premium look (mirrored in RTL)
- Light theme now uses the same dark scrim (72%/34%...), so white banner text is readable in both themes regardless of which photo is showing

### Fixed — text color bumps on the banner
- `.banner-content .lede`: 0.75 → 0.88 white
- `.banner-metric-label`: 0.6 → 0.78 white (12px labels were too faint)
- h2 stays #FFFFFF; gradient metric numbers end at #C7D2FE (bright) — both contrast fine on the new scrim

### Fixed — lightbox caption (dark-on-dark bug in light theme)
- Lightbox backdrop is a fixed dark overlay (`rgba(4,4,8,0.88)`) in both themes, but the caption used `--color-text-secondary` — dark gray in light theme → unreadable
- Caption now fixed `rgba(243,244,246,0.85)` — readable in both themes

### Verified OK (no change needed)
- Hero chips: fixed `#F3F4F6` label on dark glass (from v13) — works over photos in both themes
- Hero dots: dark glass pill with white dots — fine in both themes
- Trust bar / contact / footer / services page: all text sits on theme backgrounds using contrast-checked variables (v13 fixes)

---

## v15 — Persian + Light Theme by Default

**Folder:** `taraz-site-v15-fa-light-default`

### Changed — Default language: Persian
- `<html lang="fa" dir="rtl">` on both `index.html` and `services.html` — the site now opens in Persian/RTL by default (English via the EN toggle)
- `state.lang` defaults to `'fa'` in `main.js`; `boot()` applies language from the markup (`applyLang(document.documentElement.lang === 'en' ? 'en' : 'fa')`)
- Static lang-toggle buttons now read **EN** (target language) with "Switch to English" aria-labels
- Meta descriptions translated to Persian (index + services)

### Changed — Default theme: light
- `<html data-theme="light">` on both pages — no flash of dark theme on first paint (CSS light variables apply immediately)
- `initTheme()` fallback no longer follows the OS preference: no stored preference → **light**; a stored choice (`localStorage.theme`) is still respected
- Static theme-toggle buttons say "Switch to dark mode"; the moon icon shows by default (CSS already swaps icons per theme)
- No-JS visitors now get Persian RTL + light layout

### Unchanged
- Slideshows/counters read `document.documentElement.lang` live → hero/banner slide labels and animations already switch correctly
- All v13/v14 contrast fixes (banner overlay, chips, muted text) already handle light-as-default

---

## v14 — Banner Slideshow (Mid-Page Impact Section)

**Folder:** `taraz-site-v14-banner-slideshow`

### Added — Banner slideshow
- The mid-page banner (previously a single static image) is now a **3-image auto-rotating slideshow** (every 6.5s):
  1. Workspace / desk setup (`photo-1504384308090-c894fdcc538d`) — previous image
  2. Analytics dashboard screens (`photo-1551288049-bebda4e38f71`)
  3. Team collaboration (`photo-1522071820081-009f0129c71c`)
- Each slide has its own `srcset`/`sizes` (800/1400/1920w) and `loading="lazy"`; slides are decorative (`alt=""` — all text lives in `.banner-content`)
- **Effects:**
  - **Ken Burns zoom** — slow cinematic rise+zoom (translateY 2.2% → 0, scale 1.06 → 1.16 over 11s)
  - **Crossfade with directional reveal** — outgoing slide fades out over 1.4s while settling its zoom
  - **Progress bar** — thin 3px accent-gradient bar at the very bottom of the banner fills over 6.5s in sync with the timer (glow shadow, RTL-aware origin), restarts on every slide change
- Slideshow **pauses on hover** (progress bar freezes) and resumes on mouseleave; pauses when the tab is hidden
- `prefers-reduced-motion`: no auto-advance, no Ken Burns, progress bar hidden — first slide shown statically

### Technical
- **`initBannerSlides()`** in `effects.js` — same timer/goTo pattern as the hero slideshow; progress restart via class toggle + reflow (`void progress.offsetWidth`), `is-paused`/`is-running` state classes
- **CSS** — `.banner-slides`/`.banner-slide` stack, `bannerKenBurns`/`bannerProgress` keyframes, `.banner-progress` (z-index 2 above overlay, below content); `.parallax` and `img-load` removed from the banner so scroll-parallax/opacity rules can't fight the slideshow transforms
- Stacking: banner-bg (z0) > slides (auto) < overlay (z1) < progress (z2) < banner-content (z2)

---

## v13 — Hero Slideshow + Theme Contrast Fixes

**Folder:** `taraz-site-v13-hero-slideshow`

### Added — Hero slideshow
- Hero visual is now a **3-image auto-rotating slideshow** (every 6s), crossfading with a slow **Ken Burns zoom** (scale 1.04 → 1.16 over 9s):
  1. Global data network / AI intelligence (`photo-1451187580459-43490279c0fa`) — preloaded, `fetchpriority="high"`
  2. Circuit board / edge hardware (`photo-1518770660439-4636190af475`)
  3. Production code on screen (`photo-1555066931-4365d14bab8c`)
- Each slide has its own `srcset`/`sizes` (640/900/1200w) + descriptive `alt`
- **Navigation dots** — glassy pill centered at the bottom; active dot expands to a 22px accent-gradient bar with glow; dots are clickable and re-sync the auto-timer
- Slideshow **pauses on hover** (so tilt/chips stay visible) and resumes on mouseleave; also pauses when the tab is hidden
- Full support for `prefers-reduced-motion`: no auto-advance, no Ken Burns (first slide shown statically, dots still work)

### Technical
- **`initHeroSlides()`** in `effects.js` — `goTo()` crossfade via `.is-active`/`.is-out` classes (`.is-out` keeps the zoom-out smooth with a 1.2s transform transition), dot `aria-selected`/`aria-label` (localized "Slide N of M" / «اسلاید N از M» with Persian digits, read from `document.documentElement.lang`), interval timer management
- **CSS** — `.hero-slides`/`.hero-slide` stack (z-index 1, overlay raised to 2, chips/ripple stay on 3–4), `.hero-dots`/`.hero-dot`, `heroKenBurns` keyframes; old single-image `.hero-visual img` rules replaced; blur-up rules re-scoped to `.banner-bg` only (slides handle their own opacity)
- Hover zoom replaced with a brightness/saturation lift (`filter`) on the active slide so it can't conflict with the Ken Burns transform

### Fixed — Font/theme contrast (dark + light)
- **Banner text was invisible in light mode**: white heading/lede/metrics sat on a ~85% white overlay → light-mode overlay now darkened (`rgba(8,8,12,0.62)` gradient) so white text stays readable on the photo in both themes
- **Hero chips unreadable in light mode**: label used `--color-text-primary` (dark in light theme) on dark glass → fixed to `#F3F4F6` (dark glass is used in both themes)
- **`--color-text-muted` contrast**: dark theme `#6B7280` → `#7C8698` (better on `#08080C`); light theme `#9CA3AF` → `#6B7280` (~4.5:1 on `#F9FAFB`)
- **`.btn-secondary:hover`** used an invisible white border in light mode → now `var(--color-accent-light)` (visible in both themes)
- Light-mode hero overlay softened (0.5 → 0.35 white) so slideshow photos stay rich

---

## v12 — Hero Visual Redesign (Premium Image + Interactive Effects)

**Folder:** `taraz-site-v12-hero-visual`

### Changed
- **Hero image** — replaced office photo with a premium "global data network / AI intelligence" visual (`photo-1451187580459-43490279c0fa`), updated `srcset`/`sizes`/`preload` accordingly

### Added — Hover (mouseenter) effects
- **3D tilt** — hero card follows the cursor (`rotateX`/`rotateY`, max ±8°, `perspective(1000px)`), with a snappy 0.12s follow while moving and smooth 0.55s settle on release
- **Glare sweep** — a light beam sweeps across the image on hover (`::before` + `heroGlare` keyframes)
- **Image zoom** — image scales to 1.08 with a deep 3-layer accent glow shadow + gradient border on the card
- **Floating chips** — two glassmorphism badges slide in on hover (staggered):
  - Top-left: ⚡ "Deployed in Production" (`hero.chip1` i18n key, EN + FA)
  - Bottom-right: pulsing green dot "Live Monitoring" (`hero.chip2` i18n key, EN + FA)
  - Glass background with `backdrop-filter: blur(12px)`, accent border, RTL-safe `inset-inline-*` positioning

### Added — mouseleave effect
- **Sonar ripple** — a glowing ring burst emanates from the center of the image (`::after` + `heroRipple` keyframes, scales 0 → 4.2 with fade)
- **Smooth reset** — card tilts back to flat with a 0.55s eased transition, chips fade out, glow fades

### Technical
- **`initHeroVisual()`** in `effects.js` — rAF-throttled `mousemove` tilt, `mouseenter`/`mouseleave` class + inline transform management (inline styles avoid conflict with `.reveal-right` transform), fully disabled under `prefers-reduced-motion`
- **CSS** — `.is-hover` / `.is-leaving` state classes, `.hero-chip--tl` / `.hero-chip--br`, `chipPulse` keyframes; specificity fix so blur-up reveal doesn't cancel the hover zoom (`.hero-visual.is-hover img.img-load`)

---

## v11 — Image Optimization & UX Polish

**Folder:** `taraz-site-v11-image-ux`

### Added
- **`effects.js`** — new UX/effects module (loaded on both pages):
  - **Blur-up image reveal** — `.img-load` images fade in from blur+scale on load (skipped for parallax images)
  - **Scroll progress bar** — 2px gradient bar at the top of the viewport tracking scroll position
  - **Back-to-top button** — fixed circular button appears after 600px of scroll, smooth scrolls up
  - **Header auto-hide** — header slides away on scroll-down, returns on scroll-up
  - **Animated counters** — trust-bar and banner metrics count up when scrolled into view (easing, ~1.4s), re-arms after language switch via `MutationObserver`, supports Persian digits (۰-۹/٠-٩)
  - **Image lightbox** — click any work image to open a full-size preview (w=1600) with caption, backdrop blur, focus trap, Escape/click-to-close
- **Scroll progress bar element** — `<div class="scroll-progress">` on both pages
- **Back-to-top + lightbox markup** — appended at end of body on both pages

### Changed
- **Hero image** — responsive `srcset` (640/900/1200w) + `sizes`, `fetchpriority="high"`, `decoding="async"`, `<link rel="preload">` with `imagesrcset`
- **Work images** — responsive `srcset` (480/800/1200w) + `sizes="33vw"`, new unique image for card 2 (removed duplicate of service icon photo), wrapped in accessible `<button class="work-media">` for lightbox + `cursor:zoom-in`
- **Banner image** — responsive `srcset` (800/1400/1920w) + `sizes="100vw"`, `decoding="async"`
- **All Unsplash URLs** — now include `auto=format&fit=crop` for optimized delivery
- **Service visuals** — replaced tiny 48px photo thumbnails with 4 crisp inline SVG icons (compass, workflow nodes, dashboard, code brackets); 52px container with gradient background, accent glow, hover lift
- **Counter markup** — `data-count` + `data-suffix` attributes on trust-bar `<em>` and banner metric numbers (also embedded in i18n strings so counters survive language switching)
- **Card hover glow** — process/service/work cards get gradient border + soft glow shadow on hover (adjusted for light theme)
- **Contact form** — larger inputs (15px/16px padding), focus ring glow, bigger submit button
- **CSS** — `.img-load` blur-up styles, `.scroll-progress`, `.back-to-top`, `.site-header.is-hidden`, lightbox styles, RTL-aware `inset-inline-end` positioning

### Fixed
- **Persian counter digits** — `toLatinDigits()` normalizes Arabic-Indic numerals before parsing so counters animate in both languages

---

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
