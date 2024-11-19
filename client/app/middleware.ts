import { NextResponse } from "next/server";
import { NextRequest, NextFetchEvent } from "next/server";
// we are not exporting by default
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  
  const token = req ? req.cookies.get('token')?.value : null;
  const profile = await fetch('/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.ok ? res.json() : null);
  // if profile exists you want to continue. Also
  // maybe user sends request for log-in, and if a user wants to login, obviously it has no token
  const { pathname } = req.nextUrl;
  if (
    // whatever your api route for login is
    pathname.includes("/api/login") || profile 
  ) {
    return NextResponse.next();
  }

  
  if (!profile && pathname !== "/login") {
    // since you want to redirect the user to "/"
    return NextResponse.redirect("/");
  }
}