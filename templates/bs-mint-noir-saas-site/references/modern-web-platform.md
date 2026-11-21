# Modern Web Platform Engineering Standards

Apply these native HTML, CSS, and DOM platform primitives whenever building or adapting pages with this Skill. They preserve visual craft while eliminating fragile JavaScript workarounds, layout shifts, and cross-device regressions.

## 1. Dynamic Viewports, Container Queries, and Intrinsic Sizing

- **Viewport units**: Pair legacy `100vh` fallbacks with dynamic or small viewport units (`min-height: 100vh; min-height: 100svh;` on hero stages to prevent mobile URL-bar jump; `height: 100vh; height: 100dvh;` on full-height drawers and shells).
- **Container queries**: Scope reusable card grids, bento cells, and split modules with `container-type: inline-size` on dedicated grid wrappers (never on `<body>` or ancestors of `position: fixed` overlays, because size containment creates a fixed-positioning containing block) and adapt internal card layouts with `@container (min-width: ...)`.
- **Subgrid alignment**: Use `grid-template-rows: subgrid` on multi-column cards whose headers, body copy, and footer CTAs must align horizontally across neighbours.
- **Intrinsic control sizing**: Use `min-block-size` and padding rather than fixed `height` on text buttons, pills, and badges so 200% OS/browser text zoom never clips labels. Keep interactive hit targets at least `44px` on coarse pointers (`@media (pointer: coarse)`) and `24px` minimum on fine pointers.
- **Flex and Grid overflow safety**: Add `min-inline-size: 0` on flex/grid children holding long headings, URLs, or code strings.

## 2. Color Scheme, Perceptual Color, and Native UI Theming

- **Color scheme declaration**: Always declare `<meta name="color-scheme" content="light">`, `"dark"`, or `"light dark"` in `<head>` and matching `color-scheme` on `:root` (and theme selectors) so native form controls, date pickers, scrollbars, and initial page paint match the surface without a white flash.
- **Dual-theme tokens**: When supporting both light and dark modes, prefer `light-dark(var(--light), var(--dark))` alongside `color-scheme: light dark`, and derive hover/border tints with `color-mix(in oklch, currentColor 12%, transparent)` or `oklch()` tokens for perceptually uniform contrast.
- **Standard scrollbars**: Pair any WebKit scrollbar rules with standard `scrollbar-width: thin` and `scrollbar-color: <thumb> transparent` inside `@supports (scrollbar-color: auto)`.

## 3. Native Overlays, Disclosures, and Searchable Tabs

- **Modal dialogs**: Build modal lightboxes, booking sheets, and confirmation modals with native `<dialog>` opened via `.showModal()`. Do not add redundant `role="dialog"` or `aria-modal="true"`. Prevent background scroll chaining with `dialog:modal { overscroll-behavior: contain; } dialog::backdrop { overscroll-behavior: contain; }` instead of toggling `document.body.style.overflow = 'hidden'` (which causes scrollbar-gutter layout shift).
- **Non-modal popovers**: Use native `popover="auto"` with `popovertarget` for lightweight menus, filter trays, and tooltips, animated smoothly via `@starting-style` and `transition-behavior: allow-discrete`.
- **Accordions and FAQs**: Prefer `<details>` and `<summary>` (never place `<h1>`-`<h6>` inside `<summary>`; style the summary label directly). Animate height cleanly under `@supports (interpolate-size: allow-keywords)` using `:root { interpolate-size: allow-keywords; }` instead of `max-height: 999px` transition hacks.
- **In-page findable tabs**: Where practical, mark inactive tab panels with `hidden="until-found"` and listen for the `beforematch` event so browser Find-in-Page (`Ctrl+F` / `Cmd+F`) reveals matching tab content automatically.

## 4. Typography, Compositor Motion, and Rendering Performance

- **Balanced wrapping and zoom-safe fluid type**: Apply `text-wrap: balance` to display headings (`h1`-`h3`) and `text-wrap: pretty` to body paragraphs and captions. Always combine `rem` with viewport units inside `clamp(1.75rem, 1.2rem + 2.4vw, 3.5rem)` — never bare `vw` font sizes that ignore browser zoom.
- **Scroll-driven and compositor-only animations**: Animate `transform`, `opacity`, `filter`, or `clip-path` only. Prefer CSS Scroll-Driven Animations (`animation-timeline: scroll()` or `view()`) wrapped in `@supports (animation-timeline: view())` over main-thread `scroll` listeners; when JS scroll listeners are unavoidable, mark them `{ passive: true }` and avoid layout reads per frame.
- **Reduced motion**: Gate spatial movement and parallax behind `@media (prefers-reduced-motion: reduce)` while keeping content 100% visible (never leave reveal targets at `opacity: 0`).
- **LCP and below-fold rendering**: Set `fetchpriority="high"` and explicit `width`/`height` on the primary above-the-fold hero image (never `loading="lazy"` on LCP media); use `loading="lazy"` and `decoding="async"` below the fold, and consider `content-visibility: auto` with `contain-intrinsic-size` on heavy off-screen sections.

## 5. Forms, IME Input Safety, and Input Modality Parity

- **CJK IME composition guard**: Every `keydown` handler that submits or filters on `Enter` MUST guard against active input-method composition (`if (event.isComposing || event.keyCode === 229) return;`) so Chinese, Japanese, and Korean users confirming candidate words never trigger premature submission.
- **Post-interaction validation**: Style invalid inputs with `:user-invalid` (with explicit error text linked via `aria-describedby` and `aria-live="polite"`) rather than raw `:invalid`, which flags untouched required fields before the user types.
- **Hover and keyboard parity**: Never trap actions behind `:hover` alone; pair hover reveals with `:focus-within` and `@media (hover: none)` visibility, and maintain a clear `:focus-visible` ring (`>= 3:1` contrast) on every interactive control.

## Framework and SSR Adaptation Rules

When porting or integrating into React, Next.js, Vue, Nuxt, Svelte, or Astro:

- **Newly shipped HTML attributes in TypeScript JSX**: Spread or type-narrow newer standard attributes (`{...({ popover: 'auto', closedby: 'any' } as Record<string, unknown>)}` in React TSX, or `[attr.popover]` in template bindings) instead of dropping native platform features or mutating global `@types/react` declarations.
- **Imperative top-layer APIs**: Invoke `dialogRef.current?.showModal()` and `dialogRef.current?.close()` through component refs inside event handlers or client effects, and sync component state on the native `close` event so Escape dismissals stay consistent.
- **Per-instance IDs under SSR**: Generate unique IDs with framework primitives (`useId()` in React/Vue) for `popovertarget`, `aria-controls`, and CSS Anchor Positioning custom idents (`--anchor-${id}`) so multiple rendered instances never collide during hydration.
- **Scoped CSS compilers**: Keep `:root` custom properties and `@starting-style` rules in unscoped/global style blocks when a component compiler (such as Vue `<style scoped>` or CSS Modules) would rewrite or strip top-level at-rules.
- **SSR globals**: Guard `window`, `document`, `HTMLElement`, and `matchMedia` checks inside client lifecycle hooks so server rendering remains deterministic.
