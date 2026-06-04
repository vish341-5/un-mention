import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/library/:path*",
    "/book/:path*",
    "/history/:path*",
    "/insights/:path*",
    "/actions/:path*",
    "/read/:path*",
  ],
};
