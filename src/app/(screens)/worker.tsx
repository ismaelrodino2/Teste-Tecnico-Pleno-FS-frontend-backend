import { useGetSessionServerSide } from "@/hooks/use-get-session-server";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import WorkerScreen from "./worker.client";

// async function getData(sessionId: string) {
//   const existingMessages = await prisma.notification.findMany({
//     where: {
//       workerId: sessionId,
//     },
//   }); //one chatroom for each adm
//   return existingMessages;
// }

async function getAdms() {
  const existingMessages = await prisma.user.findMany({
    where: {
      accountType: "adm",
    },
  }); //one chatroom for each adm
  return existingMessages;
}

async function getNotifications(sessionId: string) {
  const existingMessages = await prisma.order.findMany({
    where: {
      author: {
        workerId: sessionId,
      },
    },
    include: {
      author: true,
    },
  }); //one chatroom for each adm
  return existingMessages;
}

export async function Worker() {
  const session = await useGetSessionServerSide();

  if (!session) {
    notFound();
  }

  // const data = await getData(session?.id);
  const orders = await getNotifications(session?.id);

  const adms = await getAdms();

  

  return (
    <div>      
      <WorkerScreen adms={adms} orders={orders} />
    </div>
  );
}
