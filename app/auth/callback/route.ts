import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const error_description = requestUrl.searchParams.get("error_description")

  // Handle error cases
  if (error) {
    console.error("Auth error:", error, error_description)
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error_description || "Authentication error")}`, requestUrl.origin),
    )
  }

  // Handle successful auth
  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Session error:", error.message)
        return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(error.message)}`, requestUrl.origin))
      }

      // Successful verification and session creation
      return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
    } catch (err) {
      console.error("Unexpected error:", err)
      return NextResponse.redirect(new URL("/?error=An unexpected error occurred", requestUrl.origin))
    }
  }

  // No code provided, redirect to home
  return NextResponse.redirect(new URL("/", requestUrl.origin))
}

