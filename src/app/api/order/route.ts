import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
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

  // {
  //   id: '...',
  //   items: ['item1', 'item2', 'item3'], // Exemplo de array de strings
  //   address: '...',
  //   clientName: '...',
  //   notificationId: '...',
  //   author: {
  //     id: '...',
  //     confirmation: true, // Exemplo de propriedade booleana
  //     workerId: '...',
  //     admId: '...',
  //     createdAt: '...', // Exemplo de data e hora
  //     // ... outras propriedades do modelo User
  //   },
  // },

  console.log("bodyy", body);
  try {
    const order = await prisma.order.create({
      data: {
        clientName: body.clientName,
        items: body.items,
        address: body.address,
        notificationId: body.notificationId,
      },
    });
    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err) {
    console.log("err123", err);
    return new Response(JSON.stringify({ order: null }), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
