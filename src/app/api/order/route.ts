import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { corsHeaders } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { v4: uuidv4 } = require("uuid");

  const uniqueId = uuidv4();
  const body = await req.json();

  pusherServer.trigger("dashboard", "incoming-order", {
    id: uniqueId,
    clientName: body.clientName,
    items: body.items,
    address: body.address,
    notificationId: body.notificationId,
  });

  try {
    const order = await prisma.order.create({
      data: {
        clientName: body.clientName,
        items: body.items,
        address: body.address,
        notificationId: body.notificationId,
      },
    });

    return Response.json(
      { order },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    console.log( err);
    return Response.json(
      { order: null },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.url ? new URL(req.url) : new URL("");

  const workerId = searchParams.get("workerId");

  if (!workerId) {
    return new Response("Error: no workerId.", {
      status: 500,
    });
  }


  try {
    const orders = await prisma.order.findMany({
      where: {
        author: {
          workerId: workerId,
        },
      },
      include: {
        author: true,
      },
    });
    return Response.json(
      { orders },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    console.log( err);
    return Response.json(
      { orders: null },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
