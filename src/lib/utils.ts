import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookie } from "cookies-next";
import axios from "axios";

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
    return cookies?.data?.decodedToken;
  } else {
    return null;
  }
};