import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define pages that don't require authentication
  const publicPages = ["/", "/auth"];
  const isPublicPage = publicPages.some((page) => path === page);

  // In a real app, we would check for a session or token here
  // For this demo, we'll just redirect authenticated paths to simulate auth

  // This is a very simplified example, in a real app you'd check for auth tokens
  const isAuthenticated = request.cookies.has("auth");

  // If the path requires authentication and the user is not authenticated,
  // redirect to the login page
  if (!isPublicPage && !isAuthenticated) {
    // This check is just for demo purposes, since the UI works without auth redirects
    // In a real app, you would uncomment this line
    // return NextResponse.redirect(new URL('/auth?mode=login', request.url));
  }

  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
