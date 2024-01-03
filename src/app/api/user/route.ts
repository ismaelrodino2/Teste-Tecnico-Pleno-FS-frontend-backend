import prisma from "@/lib/db";
import { corsHeaders } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.url ? new URL(req.url) : new URL("");

  const email: string = searchParams.get("email")!;
  const accountType: string = searchParams.get("accountType")!;



  try {
    if (email) {
      const user = await prisma.user.findFirst({
        where: { email },
      });
      return NextResponse.json(
        { user },
        {
          headers: corsHeaders,
        }
      );
    }

    if (accountType) {
      const users = await prisma.user.findMany({
        where: { accountType },
      });
      return NextResponse.json(
        { users },
        {
          headers: corsHeaders,
        }
      );
    }
  } catch (err) {
    return Response.json({ name: null });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("aaaaa", body);

  try {
    const user = await prisma.user.create({
      data: {
        id: body.id,
        email: body.email,
        accountType: body.accountType,
      },
    });
    return NextResponse.json({ user }, {
      headers: corsHeaders,
    });
  } catch (err) {
    return  Response.json({ user: null });
  } finally {
    await prisma.$disconnect();
  }
}

