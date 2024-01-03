import { User } from "@prisma/client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const useGetSessionServerSide = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("supabase-auth");

  if (!token) {
    return null;
  }

  try {
    const latToken = JSON.parse(token?.value)?.token;

    if (!latToken) {
      return null;
    }

    const { payload } = await jwtVerify(
      latToken,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!)
    );

    return payload.user as User;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};
