# Codegarden

> Coding for teens. That doesn't feel like school.

Your kid builds a game, a Discord bot, or a mod — guided by an AI tutor that speaks their language.

## Stack

- **Next.js 15** · App Router
- **TypeScript** (strict mode)
- **Tailwind v4** (`@tailwindcss/postcss`, CSS-first, no config file)
- `next/font/google` for Inter
- `pnpm` lockfile committed

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to Vercel — Next.js is auto-detected, zero config required.

No environment variables needed. The waitlist API URL is public and hardcoded in `app/api/waitlist/route.ts`.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (ported from `index.html`) with waitlist form |
| `/try` | Pick a game (Pong or Snake), read a 10-line annotated snippet, hit Run to render a canvas placeholder |
| `/api/waitlist` | `POST { email }` → forwards to the waitlist API with `product: "codegarden"` |

## Status

**v0 skeleton.** Landing page live with interactive demo widget and functional waitlist. The `/try` canvas renders a static placeholder shape — no real game loop yet.
