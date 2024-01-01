import { useGetSessionServerSide } from "@/hooks/use-get-session-server";
import { Adm } from "./(screens)/adm";
import prisma from "@/lib/db";
import { Worker } from "./(screens)/worker";
import Link from "next/link";

export default async function Home() {
  //we need to keep in the same url for the 'chatRoomId'
  return (
    <div>
      BEM VINDO <Link href="/dashboard">Ir para Dashboard</Link>
    </div>
  );
}
