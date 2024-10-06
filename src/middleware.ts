import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./services/authApi";

// Routes that unauthenticated users can access
const AuthRoutes = ["/login", "/register"];

// Role-based route permissions
const roleBasedRoutes = {
  user: [/^\/profile/],
  admin: [/^\/admin/],
};

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const user = await getCurrentUser();

  // If user is not logged in
  if (!user?.role) {
    // Allow access to login and register pages
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect to login with a redirect URL
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url),
      );
    }
  }

  // Role-based access control
  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const allowedRoutes = roleBasedRoutes[user?.role as Role];

    // Check if user is allowed to access the current route
    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next(); // Allow access
    }
  }

  // Redirect to the homepage if the user doesn't have permission
  return NextResponse.redirect(new URL("/", request.url));
}

// Matching paths for the middleware to apply on
export const config = {
  matcher: ["/profile", "/profile/:page*", "/admin", "/premium-contents"],
};
