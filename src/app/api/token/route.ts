import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { corsHeaders } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const authorization = headers().get("Authorization");

  // const bearerToken = req.headers["Authorization"] as string;
  const token = authorization?.split(" ")[1];

  try {
    const { payload } = await jwtVerify(
      token!,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!)
    );
    // return NextResponse.json({ foo: "bar" }, { headers: corsHeaders });

    return NextResponse.json(
      { decodedToken: payload },
      {
        headers: corsHeaders,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { decodedToken: null },
      {
        headers: corsHeaders,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { info } = body;
  try {
    const token = await new SignJWT(info)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!));
    return NextResponse.json(
      { encodedToken: token },
      {
        headers: corsHeaders,
      }
    );
  } catch (err) {
    return Response.json({ encodedToken: null });
  } finally {
    await prisma.$disconnect();
  }
}
