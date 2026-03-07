/**
 * Auth API client — talks to the separate backend API instead of Supabase.
 */

const AUTH_TOKEN_KEY = "tridish_auth_token";

function getApiUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function clearToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export interface ApiUser {
  id: string;
  email: string;
  created_at?: string;
}

export interface AuthResponse {
  user: ApiUser;
  session?: { access_token: string; expires_in: number };
}

export interface MeResponse {
  user: ApiUser;
}

async function request<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {}
): Promise<{ data?: T; error?: string }> {
  const { token, ...init } = options;
  const url = `${getApiUrl()}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init.headers as Record<string, string>) || {}),
  };
  const t = token !== undefined ? token : getToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;
  try {
    const res = await fetch(url, { ...init, headers });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { error: (body as { error?: string }).error || res.statusText || "Request failed" };
    }
    return { data: body as T };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Network error" };
  }
}

/** Sign in with email and password */
export async function login(email: string, password: string): Promise<{ data?: AuthResponse; error?: string }> {
  const result = await request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    token: null,
  });
  if (result.data?.session?.access_token) {
    setToken(result.data.session.access_token);
  }
  return result;
}

/** Sign up with email and password */
export async function signUp(email: string, password: string): Promise<{ data?: AuthResponse; error?: string }> {
  const result = await request<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    token: null,
  });
  if (result.data?.session?.access_token) {
    setToken(result.data.session.access_token);
  }
  return result;
}

/** Sign out and clear token */
export async function logout(): Promise<{ error?: string }> {
  await request("/api/auth/logout", { method: "POST" });
  clearToken();
  return {};
}

/** Get current user (requires token). Returns { user } or { user: null, error } to mimic Supabase shape. */
export async function getCurrentUser(): Promise<{
  data: { user: ApiUser | null };
  error?: string;
}> {
  const result = await request<MeResponse>("/api/auth/me");
  if (result.error) {
    clearToken();
    return { data: { user: null }, error: result.error };
  }
  return {
    data: { user: result.data?.user ?? null },
  };
}

/** Update current user password */
export async function updatePassword(password: string): Promise<{ error?: string }> {
  const result = await request<MeResponse>("/api/auth/me", {
    method: "PATCH",
    body: JSON.stringify({ password }),
  });
  return result.error ? { error: result.error } : {};
}
