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

// Role type based on the role-based routes
type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch the current user details
  const user = await getCurrentUser();

  // If the user is not logged in
  if (!user?.role) {
    // Allow access to login and register pages
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect to login with the redirect URL
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // Check for role-based access control
  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const allowedRoutes = roleBasedRoutes[user.role as Role];

    // Allow the user if they are permitted to access this route
    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Special case for accessing premium contents
  if (pathname === "/premium-contents") {
    // Check if the user is verified to access premium content
    if (user?.isVerified) {
      return NextResponse.next(); // Allow access
    } else {
      // Redirect to a page indicating verification is required
      return NextResponse.redirect(
        new URL("/profile", request.url)
      );
    }
  }

  // Redirect to homepage if the user doesn't have permission
  return NextResponse.redirect(new URL("/", request.url));
}

// Matching paths for the middleware to apply on
export const config = {
  matcher: ["/profile", "/profile/:page*", "/admin", "/premium-contents"],
};
