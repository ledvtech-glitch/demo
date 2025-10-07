# MegaMart Monorepo

Client: React (Vite) + TypeScript + Tailwind + React Router

Server: Node.js + Express + TypeScript + Mongoose (MongoDB)

## Structure

```
/client
  package.json, tsconfig.json, vite.config.ts, index.html
  /src
    main.tsx, App.tsx
    /routes: Home.tsx, Category.tsx, Product.tsx, Cart.tsx, Checkout.tsx, Account.tsx, Admin.tsx, Vendor.tsx
    /components: Header.tsx, Footer.tsx, CartDrawer.tsx
    /store: auth.ts, cart.ts, ui.ts
    /lib: api.ts
    /styles: globals.css
  tailwind.config.ts, postcss.config.js
  .env.example

/server
  package.json, tsconfig.json
  /src
    server.ts
    config/db.ts
    models/.gitkeep
    routes/.gitkeep
    controllers/.gitkeep
    middlewares/.gitkeep
    utils/.gitkeep
  .env.example

/.github/workflows/ci.yml
package.json (root)
pnpm-workspace.yaml
```

## Prerequisites
- Node.js 18+ (recommended 20)
- pnpm 9+
- MongoDB running locally (optional for now)

## Install

```bash
pnpm install
```

## Development

- Start client (Vite on 5173):

```bash
pnpm dev:client
```

- Start server (Express on 5000):

```bash
pnpm dev:server
```

- Start both concurrently:

```bash
pnpm dev
```

Client expects `VITE_API_BASE` (see `client/.env.example`). Server uses `PORT`, `MONGODB_URI`, `JWT_SECRET` (see `server/.env.example`).

## Build

```bash
pnpm -r build
```

## Lint & Format

```bash
pnpm --filter client lint
pnpm --filter server lint
pnpm --filter client format
pnpm --filter server format
```

## Health Check

Server exposes `/health` returning `{ ok: true }`.

## Notes

- No business logic yet. This is scaffolding only.
- Tailwind is configured via `globals.css`, `tailwind.config.ts`, and `postcss.config.js`.
- Axios instance is in `client/src/lib/api.ts` using `VITE_API_BASE`.
