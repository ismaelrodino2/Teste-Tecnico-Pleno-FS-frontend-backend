import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookie } from "cookies-next";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

export function getOtherId(id: string, combinedId: string) {
  const ids = combinedId.split("--");
  return ids[0] === id ? ids[1] : ids[0];
}

export const Cookies = async () => {
  const cookie = getCookie("supabase-auth", {}); // => 'value'
  if (typeof cookie == "string" && cookie) {
    const cookies: any = await axios.get("/api/token", {
      headers: {
        Authorization: JSON.parse(cookie).token,
      },
    });
    return cookies?.data?.encodedToken;
  } else {
    return null;
  }
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}