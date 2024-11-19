import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const access_token = request.cookies.get('access_token')?.value;
  
  if (!access_token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the access token exists and is valid
    if (access_token) {
      return NextResponse.next();
    }
    
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url)); 
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login (login page)
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
