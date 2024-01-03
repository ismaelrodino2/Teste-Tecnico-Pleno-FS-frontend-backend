import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { corsHeaders } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { v4: uuidv4 } = require("uuid");

  const body = await req.json();
  const uniqueId = uuidv4();

  try {
    pusherServer.trigger("dashboard", "incoming-notification", {
      id: uniqueId,
      admId: body.admId,
      workerId: body.workerId,
      confirmation: false,
    });

    const notification = await prisma.notification.create({
      data: {
        id: uniqueId,
        admId: body.admId,
        workerId: body.workerId,
      },
    });
    return Response.json(
      { notification },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    return Response.json(
      { notification: null },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  console.log("asdasdada body", body);

  try {
    const notification = await prisma.notification.update({
      where: {
        id: body.id,
      },
      data: {
        confirmation: body.confirmation,
      },
    });
    return Response.json(
      { notification },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    console.log( err);
    return Response.json(
      { Notification },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
