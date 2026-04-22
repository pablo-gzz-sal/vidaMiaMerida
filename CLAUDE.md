# Current target business

This repository is now actively implemented for **Coffee St Fitz Mérida** based on public references and the Google Maps location shared by the user.
The current implementation focus is a single Mérida location concept, not the previous La Leña demo.
GSAP remains part of the motion architecture and should continue to drive hero motion, reveal-on-scroll patterns, and tasteful interaction polish.

---

# CLAUDE.md

## Project brief

This project is a reusable premium restaurant website starter built with **Angular 20**, **Tailwind CSS 4**, and **GSAP**. It is designed as a productized frontend foundation that can be customized and sold to local businesses in Mérida, Yucatán, starting with restaurants but intentionally extensible to bars, cafés, and adjacent hospitality concepts.

The current showcase concept is **La Leña**, a dark, premium, fire-led Yucatecan restaurant demo used to validate the starter architecture.

### Primary business goals
- Ship impressive demo concepts quickly for local business pitches
- Reuse the same frontend architecture across multiple clients
- Reduce rebuild work by keeping branding/content/config decoupled from layout and components
- Support premium visual presentation without sacrificing conversion
- Stay frontend-only for now, with mocked reservation flows and WhatsApp-first conversion

### Product constraints
- Angular 20
- Tailwind CSS 4
- GSAP for motion
- Frontend only
- No CMS yet
- No backend yet
- No real reservation engine yet
- No SSR requirement right now, but architecture should not block SSR later

---

## Product vision

This starter is not a one-off mockup. It is a **config-driven premium website system** that should let us:
- clone a proven architecture,
- swap business identity and content,
- tune layout and section composition,
- keep motion tasteful and reusable,
- and produce a sales-ready concept fast.

The intended customer is a local business owner who currently depends on Instagram, Facebook, WhatsApp, TripAdvisor, or walk-in traffic and lacks a polished conversion-oriented website.

The intended website visitor is a mobile-first diner or local customer trying to answer questions quickly:
- What is this place?
- Is it worth visiting?
- What does it look like?
- What kind of food/drinks does it serve?
- Where is it?
- How do I reserve or contact them right now?

The site should persuade both:
- **owners**, by making the brand feel elevated and commercially credible,
- **customers**, by reducing friction to reservation or visit intent.

---

## Architecture decisions

## Stack
- **Angular 20** standalone architecture
- **Tailwind CSS 4** via **PostCSS** plugin, not the browser CDN
- **GSAP** loaded lazily in the browser through a service
- **TypeScript-first config model** as the single source of truth

## Why Angular standalone
- Reduces NgModule overhead
- Improves feature isolation
- Makes section-level reuse cleaner
- Better fit for productized component inventory
- Easy lazy-loading for routes and future feature slices

## Why Tailwind 4 with PostCSS
- Matches modern Tailwind architecture
- Keeps build-time CSS processing instead of runtime browser transforms
- Better for production builds, maintainability, and future CI/CD
- Lets design tokens live in CSS while still benefiting from utility-first composition

## Why config-driven architecture
Business identity must not live inside components. All business-specific content should come from config so we can:
- duplicate a starter for a new business,
- swap branding/content without touching layout code,
- keep reusable UI inventory stable,
- and later evolve toward external JSON, API, or CMS-backed content.

## Why GSAP through a service
- Keeps animation logic centralized
- Prevents repeated import boilerplate in each component
- Enables lazy browser-only loading
- Preserves a path to SSR if adopted later
- Makes motion patterns reusable instead of handcrafted per section

---

## Reusable product principles

These are non-negotiable rules for this starter:

1. **Config first**  
   Content, branding, CTAs, menu data, testimonials, and reservation settings must come from config.

2. **Components are generic by default**  
   Components should render hospitality content, not encode one brand’s story directly.

3. **Brand tokens are separate from content**  
   Fonts, colors, surfaces, shadows, radius, and motion tuning should be themeable independently of text/images.

4. **Layout is composable**  
   Sections should be reorderable and optional.

5. **Motion is systemized**  
   Prefer reusable reveal patterns, image reveals, hero entrances, and tasteful hover interactions over bespoke animation chaos.

6. **Conversion is always visible**  
   Reservation, WhatsApp, hours, and location must remain easy to reach, especially on mobile.

7. **Premium means restraint**  
   Avoid template-looking gradients, generic feature grids, loud glassmorphism, and over-animated interfaces.

8. **Mobile-first, always**  
   The project is primarily judged by how fast and clear it feels on a phone.

---

## Brand concept: La Leña

### Direction
A dark, fire-led, premium Yucatecan restaurant identity.

### Mood keywords
- ember
- ritual
- intimate
- refined
- rooted
- local
- nocturnal
- sensual
- high-trust

### Visual strategy
- Dark charcoal surfaces
- Amber/gold primary accent
- Terracotta secondary action color
- Editorial serif display typography
- Clean sans body typography
- Warm, moody photography
- Restrained premium UI, not luxury cliché

### UX strategy
- Show atmosphere immediately
- Make dishes visually persuasive
- Use testimonials as trust multipliers
- Surface map/hours near the bottom but not buried
- Keep WhatsApp and reservation CTAs persistent enough to feel useful, not pushy

---

## Information architecture

### Routes
- `/` — homepage / landing page
- `/menu` — full menu exploration
- `/nosotros` — about/concept route (currently powered by concept section component)
- `/contacto` — contact and conversion route

### Homepage section order
1. Hero
2. Concept / about
3. Menu highlights
4. Promotions
5. Gallery
6. Testimonials / social proof
7. Location / hours / map
8. Footer

### Homepage purpose
The homepage is a sales and conversion page. It should answer:
- why this place matters,
- what the experience feels like,
- what the food looks like,
- why it is credible,
- and how to reserve now.

### Secondary pages
- `/menu`: deeper menu browsing and category navigation
- `/contacto`: WhatsApp, reservation, email/contact options
- `/nosotros`: lightweight concept route; later can become richer story page

---

## Angular app architecture

```text
src/
  app/
    core/
      animations/
      config/
      services/
    shared/
      components/
    features/
      home/
        sections/
      menu/
      contact/
```

### Layer responsibilities

#### `core/config`
Holds the business schema and concrete business config. This is the single source of truth layer.

#### `core/services`
Reusable application services:
- config access
- reservation state
- future theme switching
- future analytics hooks
- future SEO/meta service

#### `core/animations`
Central GSAP integration. Reusable patterns like:
- hero entrance
- reveal on scroll
- image reveal
- parallax
- count-up

#### `shared/components`
Cross-route UI primitives and app shell pieces:
- nav
- footer
- sticky CTA
- WhatsApp FAB
- reservation modal

#### `features/home/sections`
Composable homepage sections. Each section should stay isolated and easy to reorder or remove.

#### `features/menu`
Full menu exploration page.

#### `features/contact`
Contact-first route.

### Routing strategy
Use lazy-loaded standalone routes. This keeps the app scalable as more pages are added and reduces initial bundle size.

---

## Config model

The current implementation uses a strongly typed `BusinessConfig` model with dedicated subtypes for:
- brand tokens
- hero
- CTA settings
- menu categories
- menu items
- promotions
- gallery
- testimonials
- FAQs
- reservation config
- WhatsApp config
- location
- social links
- SEO metadata

### Rule
No section should require hardcoded business content inside the component if that data can reasonably live in config.

### Future evolution path
1. Current state: static TS config object
2. Next: load JSON files per client
3. Then: load from API or headless CMS
4. Later: create admin/editor tooling around the same schema

---

## Tailwind strategy

### Current implementation
- Tailwind 4 imported in `src/styles.css`
- Theme tokens defined with `@theme`
- Build pipeline uses `@tailwindcss/postcss`
- Utility and component layering done inside CSS

### Rules
- Use semantic CSS variables for brand, surfaces, text, spacing, radius, and shadows
- Do not scatter raw hex values across components
- Prefer utility composition for layout and simple styling
- Keep reusable custom component classes for high-frequency patterns like buttons, badges, cards, inputs, nav links

### Design token groups
- colors
- typography
- spacing
- radius
- shadow
- content widths
- transitions

### Theme handling
Dark-first right now. Future extension should allow per-client light or dark default via config and HTML data attributes.

---

## GSAP strategy

### Motion goals
Motion must feel premium, cinematic, and helpful — never noisy.

### Reusable patterns implemented/planned
- hero stagger entrance
- fade-up reveal on scroll
- clip-path image reveal
- hero background parallax
- sticky CTA entrance
- gallery lightbox appearance
- future hover image zoom and section dividers

### Motion rules
- Never animate layout in a way that causes content instability
- Keep durations between 0.4s and 1.1s for most reveals
- Use ease curves that feel smooth and deliberate
- Respect reduced motion globally
- Reserve theatrical motion for hero and rare moments

---

## UX and conversion strategy

### Core conversion paths
1. Sticky reservation CTA
2. Floating WhatsApp button
3. Reservation CTA in hero
4. Reservation CTA in footer
5. Map and hours near decision point

### WhatsApp-first behavior
For local business sales, WhatsApp is often a higher-conversion action than form submission. The UI should treat it as first-class rather than secondary.

### Reservation strategy
Current flow is frontend-only and mocked, but the architecture already supports a future switch from:
- `mock`
- to `whatsapp`
- to real booking integration

### Mobile-first expectations
- large tap targets
- low-friction access to hours and directions
- sticky conversion affordances
- minimal form burden
- clear content order

---

## Mocked reservation flow

### Current behavior
- User opens reservation modal
- Fills name, phone, date, time, guests, optional notes
- App generates WhatsApp-style reservation preview
- In `mock` mode, a success state is shown
- User can then open the generated message in WhatsApp

### Future replacement path
Replace `ReservationService.submit()` branching logic to:
- directly open WhatsApp deep links, or
- call an external booking provider API, or
- open a real reservation widget

Do not rewrite the modal UI unless the booking provider demands it.

---

## Reusable component inventory

### Implemented
- `NavComponent`
- `FooterComponent`
- `ReservationModalComponent`
- `StickyCTAComponent`
- `WhatsappButtonComponent`
- `HeroComponent`
- `ConceptComponent`
- `MenuHighlightsComponent`
- `PromotionsComponent`
- `GalleryComponent`
- `TestimonialsComponent`
- `LocationComponent`

### Recommended next shared components
- `SectionHeaderComponent`
- `ButtonComponent` wrapper if variant sprawl increases
- `BadgeComponent`
- `MenuItemRowComponent`
- `SocialLinksComponent`
- `BusinessHoursComponent`
- `MapCardComponent`
- `FaqAccordionComponent`
- `PromoCardComponent`
- `GalleryLightboxComponent`

---

## Known implementation notes

### Important correction
The project must use **Tailwind via PostCSS**, not the Tailwind browser runtime. This repository now follows the PostCSS path.

### Current caveats
- Some demo imagery is hardcoded to remote image URLs for presentation purposes
- `/nosotros` currently reuses the concept section component directly; it should become a richer standalone page later
- Some content is still demo-specific in templates and should be moved deeper into config if this starter is commercialized further
- Reservation service currently instantiates config service directly in one place; refactor to `inject()` for consistency if expanding service complexity

---

## Coding rules for future work

1. Prefer standalone components
2. Keep components small and route/section focused
3. Use signals/computed for local reactive state where possible
4. Avoid business literals in reusable components
5. Keep animations in the GSAP service when they repeat
6. Use `inject()` over constructor DI for consistency
7. Preserve semantic HTML and keyboard accessibility
8. Do not introduce a backend dependency into UI flows unless explicitly planned
9. Do not let the design drift toward generic SaaS aesthetics
10. Keep every new section sellable in a client demo

---

## Implementation roadmap

### Phase 1 — foundation
- Finalize Tailwind/PostCSS pipeline
- Stabilize base theme tokens
- Verify Angular build passes
- Fix any template/type issues

### Phase 2 — reusable shell
- Lock nav, footer, buttons, modal, sticky CTAs
- Add shared section header primitive
- Normalize button/card variants

### Phase 3 — content system hardening
- Move remaining hardcoded strings/images into config
- Add optional section toggles
- Add per-business theme presets
- Add route metadata and richer SEO support

### Phase 4 — premium polish
- Improve gallery motion and lightbox
- Add menu microinteractions
- Add better transitions between routes
- Add lightweight loading/skeleton states

### Phase 5 — commercial packaging
- Create alternate demo configs: café, bar, brunch concept
- Add starter documentation and setup guide
- Add screenshot generation flow
- Create a repeatable “pitch build” process per client

---

## Best next implementation step

After architecture approval, the best next step is:

1. **Make the current build compile cleanly**
2. **Refactor remaining demo literals into config**
3. **Package this as the first reusable baseline**
4. **Create a second business config** to validate real reusability

The fastest way to prove this starter is genuinely reusable is not adding more effects — it is swapping the brand and content for a second concept with minimal code changes.

---

## Immediate next tasks
- Build and fix compile errors
- Verify Tailwind classes/tokens resolve correctly
- Ensure all standalone imports are valid
- Audit for missing pipes/imports in templates
- Replace any broken remote image assumptions
- Create a second config variant after first build passes



## Multi-client config cleanup
- Core reusable schema remains in `src/app/core/config/business.config.ts`.
- Shared starter defaults now live in `src/app/core/config/presets/default-restaurant.preset.ts`.
- Brand-specific content for this showcase now lives in `src/app/core/config/clients/coffee-st-fitz.config.ts`.
- `demo.config.ts` is now only a compatibility shim and should be phased out in favor of direct client config imports.
- Next reusable step: support config selection via route param, environment, or bootstrap provider.
