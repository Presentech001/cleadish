# Fix CORS on Render (cleadish-api)

If you see:

```
Origin http://localhost:3001 is not allowed by Access-Control-Allow-Origin
```

the API on Render is rejecting requests from your local frontend because that origin is not in the allowed list.

## Fix

1. Open [Render Dashboard](https://dashboard.render.com) → your **cleadish-api** service.
2. Go to **Environment**.
3. Add (or edit) this variable:

   **Key:** `CORS_ORIGINS`  
   **Value:**  
   `http://localhost:3000,http://localhost:3001,http://localhost:3002,http://127.0.0.1:3000,http://127.0.0.1:3001,http://127.0.0.1:3002`

4. Save. Render will redeploy the service so the new value is used.
5. After the deploy finishes, try logging in again from your local app.

## When you deploy the frontend

Add your production frontend URL to `CORS_ORIGINS` as well, for example:

`http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001,https://your-app.onrender.com`

(comma-separated, no spaces after commas).
