import { NextResponse, NextRequest } from "next/server"
import { isLoggedIn } from "@/api-calls"

export async function middleware(request: NextRequest) {
  const loggedIn = await isLoggedIn()

  if (loggedIn) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/login", request.url))
}

export const config = {
  matcher: "/",
}
