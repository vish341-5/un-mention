import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isLandingRoute = createRouteMatcher(["/landing"]);
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isLandingRoute(request)) {
    const { userId } = await auth();

    if (userId) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return;
  }

  if (isAuthRoute(request)) {
    return;
  }

  if (request.nextUrl.pathname === "/") {
    await auth.protect({
      unauthenticatedUrl: new URL("/landing", request.url).toString(),
    });
    return;
  }

  await auth.protect({
    unauthenticatedUrl: new URL("/sign-in", request.url).toString(),
  });
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
  ],
};
