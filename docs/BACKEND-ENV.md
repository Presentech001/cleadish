# Backend environment and configuration

The backend is **fully separate** from the frontend. It has its own codebase (`backend-nest/`), its own dependencies, and its own environment variables. You run it as a standalone process and connect the frontend to it via `NEXT_PUBLIC_API_URL`.

---

## Where backend config lives

| Item        | Location |
|------------|----------|
| Env file   | **`backend-nest/.env`** (create from `.env.example`) |
| Example    | **`backend-nest/.env.example`** (copy to `.env` and fill in) |
| Loaded by  | `ConfigModule` from `@nestjs/config` (loads `.env` and `.env.local` from `backend-nest/`) |

Never put backend secrets in the frontend repo or in `NEXT_PUBLIC_*` variables.

---

## Environment variables (backend)

| Variable         | Required | Description |
|------------------|----------|-------------|
| `PORT`           | No       | Server port. Default: `3001`. |
| `NODE_ENV`       | No       | `development` or `production`. |
| `JWT_SECRET`     | Yes*     | Secret used to sign/verify JWTs. Use a long random string in production. Default in dev: fallback in code (not safe for prod). |
| `DATABASE_URL`   | No       | For future use when you add a DB (e.g. TypeORM/Prisma). Example: `postgresql://user:pass@localhost:5432/tridish`. |
| `MONGODB_URI`    | Yes*     | MongoDB connection string. Example: `mongodb://localhost:27017/tridish`. Used by the auth user store. |
| `CORS_ORIGINS`   | No       | Comma-separated list of allowed origins. **Required on Render** when frontend runs on localhost. Example: `http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001`. |
| `SWAGGER_ENABLED`| No       | Set to `false` to disable Swagger in production. Default: enabled. |

\* In production you must set `JWT_SECRET` in `.env`; do not rely on the in-code default.

---

## Database (MongoDB)

The auth user store uses **MongoDB** via `MONGODB_URI`. Set it in **`backend-nest/.env`** (see `.env.example`). Example: `mongodb://localhost:27017/tridish`. Ensure MongoDB is running before starting the backend.

The backend does not read the frontend’s `.env` or `NEXT_PUBLIC_*` variables. Database and API keys live only in **`backend-nest/.env`**.

---

## Quick setup

```bash
cd backend-nest
cp .env.example .env
# Edit .env: set JWT_SECRET and MONGODB_URI
pnpm install
pnpm run start:dev
```

The server will read `.env` and listen on `PORT` (default 3001).
