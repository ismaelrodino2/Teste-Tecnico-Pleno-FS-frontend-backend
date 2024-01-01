import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const supabaseCookie = request.cookies.get("supabase-auth");
  let token;
  let user;
  console.log('supabaseCookie', supabaseCookie)
  if (supabaseCookie) {
    token = JSON.parse(supabaseCookie?.value!)?.token;
    console.log('token', token)

    user = await jwtVerify(
      token!,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!)
    );
    console.log('user', user)

  }

  if (!user?.payload) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
