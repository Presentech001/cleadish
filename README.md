# Tridish App

Next.js frontend and NestJS backend. They run as **two separate processes**: start the backend first, then the frontend. The frontend talks to the backend via `NEXT_PUBLIC_API_URL`.

---

## How to run (order matters)

### 1. Start the backend

```bash
cd backend-nest
pnpm install
pnpm run start:dev
```

Wait until you see something like: **NestJS backend running at http://127.0.0.1:3001**

### 2. Start the frontend

In a **new terminal**, from the project root:

```bash
pnpm install
pnpm next dev --hostname 127.0.0.1
```

Open **http://127.0.0.1:3000** (or the port Next.js prints) in your browser.

### 3. Connect them

In the project root, create or edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
```

Restart the Next.js dev server after changing this so the frontend uses the backend URL.

---

## Backend (NestJS)

**Location:** `backend-nest/`  
**Port:** 3001 (or `PORT` env)  
**Role:** Auth API (login, signup, current user, logout). No Supabase; uses JWT and in-memory user store.

**Swagger:** With the backend running, open **http://127.0.0.1:3001/api** for interactive API docs and testing (try endpoints, set Bearer token after login).

### How to run the backend

| Command            | Description                    |
|--------------------|--------------------------------|
| `pnpm run start:dev` | Dev server with watch (recommended) |
| `pnpm run build`     | Compile to `dist/`            |
| `pnpm run start`      | Run compiled app (after build) |

All commands are run from **inside** `backend-nest/`.

### Backend structure

```
backend-nest/
├── src/
│   ├── main.ts                 # Bootstrap: CORS, listen on port
│   ├── app.module.ts           # Root module, imports AuthModule
│   └── auth/
│       ├── auth.module.ts      # Auth: JWT config, controller, service, strategy
│       ├── auth.controller.ts  # Routes: POST signup/login/logout, GET/PATCH me
│       ├── auth.service.ts     # In-memory users, password hash, JWT sign
│       ├── jwt.strategy.ts     # Passport JWT: validate token, attach user to request
│       ├── jwt-auth.guard.ts   # Guard for protected routes (GET/PATCH me)
│       └── dto/
│           ├── login.dto.ts
│           ├── signup.dto.ts
│           └── update-password.dto.ts
├── package.json
├── tsconfig.json
└── nest-cli.json
```

- **`main.ts`** – Creates the Nest app, enables CORS, listens on `PORT` or 3001.
- **`app.module.ts`** – Imports `AuthModule` only (no other feature modules yet).
- **`auth/`** – Auth feature:
  - **Controller** – Handles `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `PATCH /api/auth/me`.
  - **Service** – Stores users in memory, hashes passwords, issues JWTs. Replace with a DB (e.g. TypeORM + PostgreSQL) for production.
  - **JWT strategy + guard** – Validate `Authorization: Bearer <token>` and set `req.user` on protected routes.

---

## Frontend (Next.js)

**Location:** Project root (where this README is)  
**Port:** 3000 by default (Next may pick another if 3000 is in use)  
**Role:** Login, signup, dashboard, profile, settings. Calls the backend for all auth via `lib/auth-api.ts`.

### How to run the frontend

| Command                                  | Description              |
|------------------------------------------|--------------------------|
| `pnpm run dev`                           | Next dev server          |
| `pnpm next dev --hostname 127.0.0.1`     | Dev server bound to localhost (avoids some host issues) |
| `pnpm run build`                         | Production build         |
| `pnpm run start`                         | Run production build     |

All commands are run from the **project root** (parent of `backend-nest/`).

### Frontend structure

```
(app root)
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                 # Login page (/)
│   ├── globals.css
│   ├── signup/
│   │   └── page.tsx             # Sign up (/signup)
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts         # OAuth callback (optional; used if you add OAuth later)
│   └── dashboard/
│       ├── layout.tsx           # Protects dashboard: requires auth or NEXT_PUBLIC_BYPASS_AUTH
│       ├── page.tsx             # Dashboard home (/dashboard)
│       ├── profile/
│       │   └── page.tsx         # Profile / change password (/dashboard/profile)
│       └── settings/
│           └── page.tsx         # Settings (/dashboard/settings)
├── components/
│   ├── ui/                      # Reusable UI (buttons, cards, dialogs, etc.)
│   └── dashboard/               # Dashboard-specific (nav, header, balance, transactions, transfer modal)
├── lib/
│   └── auth-api.ts              # Backend API client: login, signUp, logout, getCurrentUser, updatePassword
├── .env.local                   # NEXT_PUBLIC_API_URL, NEXT_PUBLIC_BYPASS_AUTH
├── package.json
└── README.md                    # This file
```

- **`app/`** – Routes and layouts. `dashboard/layout.tsx` checks auth (or bypass when `NEXT_PUBLIC_BYPASS_AUTH=true`).
- **`components/`** – `ui/` = shared primitives; `dashboard/` = sidebar, header, balance card, transaction list, transfer modal.
- **`lib/auth-api.ts`** – Single place that talks to the backend: reads `NEXT_PUBLIC_API_URL`, stores JWT in `localStorage`, sends `Authorization: Bearer` on protected calls.

---

## Summary

| Part      | Directory     | Run from        | Default URL              |
|-----------|---------------|-----------------|--------------------------|
| Backend   | `backend-nest/` | `backend-nest/` | http://127.0.0.1:3001    |
| Frontend  | Project root  | Project root    | http://127.0.0.1:3000    |

Set **`NEXT_PUBLIC_API_URL=http://127.0.0.1:3001`** in `.env.local` so the frontend uses the backend.

**Docs:**
- **`docs/BACKEND-ENV.md`** — Backend env (database, JWT, CORS, etc.); backend is separate and config lives in `backend-nest/.env`.
- **`docs/FRONTEND-CONSUMES-BACKEND-API.md`** — Where and how the frontend calls the backend (single client in `lib/auth-api.ts`, and which pages/components use it).
- **`docs/BACKEND-AND-FRONTEND-FLOW.md`** — Auth flow and API contract.
