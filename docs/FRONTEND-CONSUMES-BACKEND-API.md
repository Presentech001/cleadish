# How the frontend consumes the backend API

The frontend never talks to Supabase for auth. All auth goes to **your backend** via a single client module. This doc shows **where** that happens and **which backend endpoints** are used.

---

## 1. Single entry point: `lib/auth-api.ts`

Every call from the frontend to the backend auth API goes through **`lib/auth-api.ts`**. That file:

- Reads the backend base URL from **`NEXT_PUBLIC_API_URL`** (e.g. `http://127.0.0.1:3001`).
- Sends requests to `{NEXT_PUBLIC_API_URL}/api/auth/...`.
- Stores the JWT in `localStorage` under the key `tridish_auth_token` and sends it as `Authorization: Bearer <token>` on protected calls.

So: **to point the frontend at the backend**, set in the **frontend** repo (e.g. `.env.local`):

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
```

---

## 2. What `lib/auth-api.ts` exposes

| Function           | Backend endpoint        | When it’s used (see below) |
|--------------------|-------------------------|----------------------------|
| `login(email, password)`     | `POST /api/auth/login`   | Login page form submit |
| `signUp(email, password)`    | `POST /api/auth/signup`  | Signup page form submit |
| `getCurrentUser()`           | `GET /api/auth/me`       | Dashboard layout, dashboard page, profile page, header |
| `updatePassword(password)`   | `PATCH /api/auth/me`     | Profile page (change password) |
| `logout()`                   | `POST /api/auth/logout`  | Nav “Sign out”, header “Sign out” |

All of these build the URL as `getApiUrl() + path` (e.g. `getApiUrl() + "/api/auth/login"`), and `getApiUrl()` returns `process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001"`.

---

## 3. Where each function is used in the app

If the app is already using `lib/auth-api.ts` (and not Supabase), the mapping is as follows. If some screens still use Supabase, switch them to these.

| Screen / component        | File path                         | Auth API usage |
|---------------------------|-----------------------------------|----------------|
| **Login**                 | `app/page.tsx`                    | `login(email, password)` on form submit → then redirect to `/dashboard`. |
| **Sign up**               | `app/signup/page.tsx`             | `signUp(email, password)` on form submit. |
| **Dashboard layout**      | `app/dashboard/layout.tsx`        | `getCurrentUser()` to decide if the user is logged in; if not (and no bypass), redirect to `/`. |
| **Dashboard home**       | `app/dashboard/page.tsx`          | `getCurrentUser()` to show current user in the UI. |
| **Profile**               | `app/dashboard/profile/page.tsx`  | `getCurrentUser()` on load; `updatePassword(newPassword)` on “Update password” submit. |
| **Dashboard nav**         | `components/dashboard/nav.tsx`     | `logout()` on “Sign out” click → then redirect to `/`. |
| **Dashboard header**      | `components/dashboard/header.tsx`  | `getCurrentUser()` to show user in the header; `logout()` on “Sign out” in dropdown. |

So:

- **Login page** → `login()` → `POST /api/auth/login`
- **Signup page** → `signUp()` → `POST /api/auth/signup`
- **Dashboard layout** → `getCurrentUser()` → `GET /api/auth/me`
- **Dashboard page** → `getCurrentUser()` → `GET /api/auth/me`
- **Profile page** → `getCurrentUser()` + `updatePassword()` → `GET /api/auth/me`, `PATCH /api/auth/me`
- **Nav + header** → `logout()` and `getCurrentUser()` → `POST /api/auth/logout`, `GET /api/auth/me`

---

## 4. Flow in one sentence

The frontend uses **only** `lib/auth-api.ts` to talk to the backend; that module uses **only** `NEXT_PUBLIC_API_URL` to know where the backend is; the pages and components above call the functions in the table, which in turn call the listed backend endpoints.
