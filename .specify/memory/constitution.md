<!--
Sync Impact Report
- Version change: template (0.0.0) -> 1.0.0 (Initial Constitution Draft)
- Modified principles: Replaced template placeholders with 6 SkillryViet core principles
- Added sections: Technology Stack & Runtime Constraints; Delivery Phases & Quality Gates; Governance
- Removed sections: None
- Follow-up TODOs:
  - TODO(BRAND_PALETTE_HEX): Confirm exact Emerald/Teal + Gold Hex codes from Design System options before locking Phase 0.
  - TODO(FIRST_TEMPLATES): Confirm Template #1 (Web) and Template #2 (Slide) subjects after reviewing inspiration references.
-->
# SkillryViet Constitution

## Core Principles

### I. Source Asset Protection (NON-NEGOTIABLE)
Raw `SKILL.md` prompts, internal `references/`, and downloadable `.zip` template packages MUST NEVER be placed in public static asset folders or exposed via unauthenticated URLs. Every download or agent-install payload MUST pass server-side session verification, entitlement checks, and abuse/rate limits via signed URLs or controlled server streams. In Phase 1, downloading free templates MUST require authenticated Email or Google (Gmail) login via Better Auth.

### II. Sandboxed Live Preview Isolation (NON-NEGOTIABLE)
Every live template preview (`demo.html` for Web and HTML Slide decks) MUST render inside a strictly constrained `<iframe sandbox="...">` attribute (without combining `allow-same-origin` and `allow-scripts` on the main app origin) and SHOULD be served from an isolated preview origin in production. Unsanitized third-party or template scripts MUST NOT be able to read main-app cookies, session tokens, or DOM state.

### III. Bilingual-First Architecture (`vi` Default + `en`)
All platform UI copy MUST route through the internationalization system with Vietnamese (`vi`) as the default locale and English (`en`) fully supported from day one. Database schemas and seed models MUST store localized fields (`title_vi`/`title_en`, `summary_vi`/`summary_en`, install guides, and FAQ structures) natively rather than bolting translation on later.

### IV. Layered Entitlements & Extensibility
Data access, authentication, and authorization (`entitlements`) MUST be decoupled behind server-side service/domain layers rather than embedded inside UI components. Database tables MUST reserve clean extension points (`orders`, `entitlements`, `skill_versions`, `download_events`) so Phase 2 VietQR payment gateways (PayOS / SePay), international checkouts, and CLI/MCP install endpoints can be attached without rewriting Phase 1 features.

### V. Lean Spec-Kit & SOP Discipline (NON-NEGOTIABLE)
Core platform features MUST proceed sequentially through Spec-Kit (`constitution.md` $\rightarrow$ `spec.md` $\rightarrow$ `plan.md` $\rightarrow$ `tasks.md`) with explicit founder approval before implementation code is written. Individual templates MUST strictly pass the 6-step process and 3 Quality Gates in `SOP-TAO-TEMPLATE-SKILL.md` (Design Plan + Vietnamese Font Check $\rightarrow$ `demo.html` + Mobile 375px critique $\rightarrow$ separated `data.schema.json` $\rightarrow$ style-locked `SKILL.md` $\rightarrow$ single-file offline export $\rightarrow$ Blind Replay Test). AI agents MUST NOT alter scope, substitute technologies, or skip gates without approval.

### VI. Vietnamese Craft & Anti-AI-Slop Standards
All Web and Slide templates MUST support crisp Vietnamese diacritics (tested explicitly with `"Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ"`), enforce WCAG AA contrast ($\ge 4.5:1$ body text), and avoid generic AI-slop aesthetics. Web skills default to a self-contained offline-capable HTML output; Slide skills default to 16:9 HTML decks editable in the browser with a clean export path to editable `.pptx` / PDF.

## Technology Stack & Runtime Constraints

- **Workspace & Brand (Provisional):** `skillry-template-studio` / brand `skillryviet`; brand palette direction is professional **Emerald/Teal + Gold** (`TODO(BRAND_PALETTE_HEX)` pending founder's final Hex selection).
- **Web Platform Stack:** TanStack Start (`@tanstack/react-start` + Vite 8 + React 19 + TypeScript `strict: true`), Tailwind CSS v4 + `shadcn/ui` + Lucide/Tabler icons, `@inlang/paraglide-js` (`vi`/`en` i18n).
- **Auth & Security:** Better Auth (Email login + Google OAuth + `tanstackStartCookies()`), Cloudflare Turnstile for abuse protection, `zod` schema validation.
- **Database, Storage & Edge Runtime:** Drizzle ORM + Cloudflare D1 (SQLite) + Cloudflare R2 (private `.zip` & isolated preview media) deployed on Cloudflare Workers via `@cloudflare/vite-plugin` and `wrangler`.
- **Template & Slide Tooling:** Pure HTML5/CSS3/JS + `vite-plugin-singlefile` (offline Web bundle), `pptxgenjs` (editable `.pptx` export for HTML Slide decks), `@vibe-agent-toolkit/agent-skills` + `skills` CLI (packaging/validation), Playwright + FFmpeg (visual inspection & preview capture).
- **Quality & CI/CD:** Biome (lint/format), Vitest (unit/integration), Playwright (E2E + 375px/1280px visual verification), GitHub Actions CI.

## Delivery Phases & Quality Gates

- **Phase 0 (Current — Foundation & Direction Lock):** Git initialization, Spec-Kit setup (`specify init --here --integration agy`), lock `constitution.md`, approve Design System tokens and Phase 1 Data Model.
- **Phase 1 (Template-First Sequential Production):** Build and verify templates **one at a time** (1 Web Template Skill, then 1 Slide Template Skill) through all 6 SOP steps and 3 Quality Gates inside `templates/` and `skills/`.
- **Phase 2 (Core Showcase Platform):** Build bilingual storefront (`/`, `/skills`, `/skills/[slug]` with sandboxed Desktop/Mobile live demo iframe, `/learn`).
- **Phase 3 (Auth, Secure Storage & MVP Catalog):** Integrate Better Auth (Email + Google/Gmail), Cloudflare R2 private ZIP downloads, Request-a-Skill form, and populate 5–10 curated skills.
- **Phase 4 (Automated Verification & Launch):** Vitest + Playwright suite, SEO i18n, GitHub Actions CI/CD, and Cloudflare Workers production deployment.

## Governance

- This constitution supersedes ad-hoc design or coding decisions across the repository.
- Amendments require founder review and approval, a semantic version bump (`MAJOR.MINOR.PATCH`), and an updated `Last Amended` date.
- Every `plan.md` and implementation PR/commit MUST verify compliance against Principles I–VI, especially Source Asset Protection, Iframe Sandboxing, and Bilingual Schema Parity.

**Version**: 1.0.0 | **Ratified**: 2026-11-20 | **Last Amended**: 2026-11-20
