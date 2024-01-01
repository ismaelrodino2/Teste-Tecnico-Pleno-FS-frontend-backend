import { useGetSessionServerSide } from "@/hooks/use-get-session-server";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Notifications } from "../(components)/notifications";

async function getNotifications(sessionId: string) {
  const existingMessages = await prisma.notification.findMany({
    where: {
      admId: sessionId,
    },

  }); //one chatroom for each adm
  return existingMessages;
}

async function getUsers() {
  const users = await prisma.user.findMany(); //one chatroom for each adm
  return users;
}

export async function Adm() {
  const session = await useGetSessionServerSide();

  if (!session) {
    notFound();
  }

  const data = await getNotifications(session?.id);

  const users = await getUsers();

  return (
    <div>
      <Notifications initialNotifications={data} users={users} />
      {JSON.stringify(data)}
    </div>
  );
}
