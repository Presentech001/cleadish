# How the frontend and backend work together

## Overview

You have a **separate backend** (NestJS in `backend-nest/` or Express in `backend/`) that the frontend calls for auth. The frontend does **not** use Supabase; it uses `lib/auth-api.ts`, which sends HTTP requests to whatever URL you set in **`NEXT_PUBLIC_API_URL`**.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  BROWSER (Next.js frontend)                                              │
│  - Login page, Dashboard, Profile, etc.                                  │
│  - Uses lib/auth-api.ts → fetch(NEXT_PUBLIC_API_URL + /api/auth/...)     │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                    HTTP (fetch) with JSON + Bearer token
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  BACKEND API (NestJS in backend-nest/ or Express in backend/)            │
│  Runs on its own port (e.g. 3001). Implements:                          │
│  - POST /api/auth/signup   → create user, return JWT                     │
│  - POST /api/auth/login    → validate credentials, return JWT             │
│  - GET  /api/auth/me       → return current user (needs Bearer token)    │
│  - PATCH /api/auth/me      → update password (needs Bearer token)        │
│  - POST /api/auth/logout   → optional server-side logout                 │
└─────────────────────────────────────────────────────────────────────────┘
```

## Step-by-step flow

### 1. Frontend knows where the backend is

- The frontend reads the backend base URL from **`NEXT_PUBLIC_API_URL`** (e.g. in `.env.local`).
- Example: `NEXT_PUBLIC_API_URL=http://127.0.0.1:3001`
- If you don’t set it, `lib/auth-api.ts` defaults to `http://127.0.0.1:4000` (Express) or whatever you run NestJS on.

### 2. User logs in (or signs up)

- User enters email/password on the **login** (or signup) page.
- Frontend calls:
  - **Login:** `login(email, password)` → `POST {API_URL}/api/auth/login` with `{ email, password }`.
  - **Signup:** `signUp(email, password)` → `POST {API_URL}/api/auth/signup` with `{ email, password }`.
- Backend checks credentials (or creates user), then returns something like:
  ```json
  { "user": { "id": "...", "email": "..." }, "session": { "access_token": "JWT...", "expires_in": 604800 } }
  ```
- Frontend stores `access_token` in **localStorage** (key: `tridish_auth_token`) and redirects to `/dashboard`.

### 3. Authenticated requests (dashboard, profile, etc.)

- For pages that need “current user”, the frontend calls `getCurrentUser()` from `lib/auth-api.ts`.
- That does **`GET {API_URL}/api/auth/me`** with header **`Authorization: Bearer <token>`**.
- Backend validates the JWT and returns `{ user: { id, email } }`.
- If the token is missing or invalid, backend returns 401 and the frontend clears the token and (e.g. in the dashboard layout) redirects to `/`.

### 4. Logout

- User clicks “Sign out”.
- Frontend calls `logout()` → **`POST {API_URL}/api/auth/logout`** with `Authorization: Bearer <token>`, then **removes the token from localStorage** and redirects to `/`.

---

## What you need to “pass the backend into the frontend”

1. **Run the NestJS (or Express) backend** on some URL, e.g. `http://127.0.0.1:3001`.
2. **Point the frontend at that URL** by setting in the Next.js app (e.g. `.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
   ```
3. **Restart the Next.js dev server** after changing env so it picks up `NEXT_PUBLIC_API_URL`.

The frontend does not care whether the backend is Express or NestJS as long as the **routes and JSON shapes** match what `lib/auth-api.ts` expects (see “API contract” below).

---

## API contract (what the backend must implement)

| Method | Path               | Body / Headers        | Response (success) |
|--------|--------------------|------------------------|---------------------|
| POST   | /api/auth/signup   | `{ email, password }`  | `201` → `{ user: { id, email, created_at? }, session: { access_token, expires_in } }` |
| POST   | /api/auth/login    | `{ email, password }`  | `200` → same shape as above |
| GET    | /api/auth/me       | `Authorization: Bearer <token>` | `200` → `{ user: { id, email } }` |
| PATCH  | /api/auth/me       | `Authorization: Bearer <token>`, `{ password }` | `200` → `{ user: { id, email } }` |
| POST   | /api/auth/logout   | `Authorization: Bearer <token>` (optional) | `200` → any JSON |

Errors: respond with appropriate status (e.g. 400, 401) and a body that may include `{ error: "message" }`. The frontend uses `error` when present.

---

## Summary

- **Frontend**: Next.js app using `lib/auth-api.ts` for all auth (login, signup, getCurrentUser, updatePassword, logout). It only needs **one thing from you**: the backend base URL via **`NEXT_PUBLIC_API_URL`**.
- **Backend**: Separate process (NestJS or Express) that implements the routes above and returns JWTs; frontend sends the JWT in `Authorization: Bearer ...` for protected routes.
- **“Pass into the frontend”** = set `NEXT_PUBLIC_API_URL` to your NestJS backend URL and restart Next.js.
