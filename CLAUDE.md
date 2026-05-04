# APPNAME

## Platform: FreeAppStore (Connected App)
- Hosted on Cloudflare Pages (static SPA only)
- Backend: Firebase (shared with Pro version on ProAppStore)
- ONE environment only (production). No dev/staging. Fix forward, no rollbacks.
- Push to `main` auto-deploys to production via CF Pages
- Domain: APPNAME.freeappstore.online

## Architecture
This is a CONNECTED app — the free and pro versions share the same Firebase backend.
- Free version: limited features (browse, basic interactions)
- Pro version: full features (create, collaborate, AI, cloud sync)
- Feature gating: Firestore security rules enforce access based on user plan (free/pro)
- Firebase config: set via VITE_FIREBASE_* env vars (or .env.production file)

## Tech Stack
- TypeScript, React 19, Vite 6, Tailwind CSS 4.1, pnpm
- Firebase (Auth, Firestore, Storage)
- react-router-dom for routing

## Brand Guidelines
- Fonts: Manrope (body) + Fraunces (display)
- Follow CSS variables in index.css for colors
- Sidebar on desktop (17rem), bottom dock on mobile
- Dark mode via prefers-color-scheme (no toggle)

## Development
- `pnpm dev` — start dev server (works without Firebase in mock mode)
- `pnpm build` — production build
- `pnpm typecheck` — verify types
- Copy .env.example to .env.production and fill Firebase values for prod builds

## Rules
- No analytics, no tracking beyond Firebase Auth
- Free features must work without Pro subscription
- App must gracefully handle no-auth state (browsing without sign-in)
- Include "Part of FreeAppStore" link
- MIT license
