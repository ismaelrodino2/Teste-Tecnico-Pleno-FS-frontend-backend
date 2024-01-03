import { useGetSessionServerSide } from "@/hooks/use-get-session-server";
import prisma from '@/lib/db'
import { Adm } from "../(screens)/adm";
import { Worker } from "../(screens)/worker";



export default async function Dashboard() {
  const session = await useGetSessionServerSide();
  return (
    <div>
      {session?.accountType === "adm" ? <Adm /> : <Worker />}
    </div>
  );
}
