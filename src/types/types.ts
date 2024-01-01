import { Prisma } from "@prisma/client";

export type Chat = {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: Date; 
};

export type UserSession = {
  name: string;
  email: string;
  id: string;
  username: string;
  accountType: string;
};

