import { useGetSessionServerSide } from "@/hooks/use-get-session-server";
import prisma from '@/lib/db'
import { Adm } from "../(screens)/adm";
import { Worker } from "../(screens)/worker";



export default async function Dashboard() {
  //we need to keep in the same url for the 'chatRoomId'
  const session = await useGetSessionServerSide();
  console.log("asdasdasdasd", session);
  return (
    <div>
      {session?.accountType === "adm" ? <Adm /> : <Worker />}
    </div>
  );
}
