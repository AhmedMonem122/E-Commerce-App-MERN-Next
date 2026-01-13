import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiServer from "@/app/lib/apiServer.server";
import axios from "axios";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  let user = null;
  try {
    const api = await apiServer();
    const res = await api.get("/users/me"); // adjust if your endpoint differs
    user = res.data?.data?.user ?? null;
  } catch (axiosError) {
    if (axios.isAxiosError(axiosError)) {
      // not authenticated or error -> user stays null
      user = null;
    }
  }

  const loginUrl = new URL("/login", request.url);
  if (!token && !user) {
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user?.role === "admin" && request.nextUrl.pathname.startsWith("/user")) {
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  } else if (
    user?.role === "user" &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/profile", "/admin/:path*", "/user/:path*"],
};
