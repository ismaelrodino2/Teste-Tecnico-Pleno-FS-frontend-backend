import { useGetSessionServerSide } from "@/hooks/use-get-session-server";
import { Adm } from "./(screens)/adm";
import prisma from "@/lib/db";
import { Worker } from "./(screens)/worker";
import Link from "next/link";

export default async function Home() {
  //we need to keep in the same url for the 'chatRoomId'
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">BEM-VINDO</h1>
        <p className="text-gray-600 mb-8">Explore mais em nosso Dashboard.</p>
        <Link href="/dashboard">
          <p className="bg-primaryBlue text-white py-2 px-4 rounded-full hover:bg-deepBlue transition duration-300">
            Ir para o Dashboard
          </p>
        </Link>
      </div>
    </div>
  );
}
