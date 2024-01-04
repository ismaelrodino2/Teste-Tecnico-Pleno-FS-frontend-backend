import { prismaMock } from "@/lib/singleton";
import { GET } from "./route";
import { NextRequest } from "next/server";
import { User } from "@prisma/client";

describe("Tests for user", () => {
  const user = {
    id: "c1997ad9-2ae4-46ef-8da4-a893f703c7d8",
    accountType: "adm",
    email: "hello@prisma.io",
    createdAt: new Date("2023-12-31 04:42:27.311"),
    updatedAt: new Date("2023-12-31 04:42:27.311"),
  };

  test("should get user by email ", async () => {
    prismaMock.user.findFirst.mockResolvedValue(user);

    const request = new NextRequest(
      "http://localhost:3000/api/user?email=hello%40prisma.io"
    );

    // Chamar a função GET com o objeto NextRequest modificado
    const result = await GET(request);

    const json = await result?.json();

    const userWithDate = {
      ...json.user,
      createdAt: new Date(json.user.createdAt),
      updatedAt: new Date(json.user.updatedAt),
    };

    expect(userWithDate).toEqual(user);
  });

  test("should get users by accountType", async () => {
    const users = [user];

    prismaMock.user.findMany.mockResolvedValue(users);

    const request = new NextRequest(
      "http://localhost:3000/api/user?accountType=adm"
    );

    const result = await GET(request);

    const json: User[] = (await result?.json()).users;

    const usersWithDate = json.map((el) => ({
      ...el,
      createdAt: new Date(el.createdAt),
      updatedAt: new Date(el.updatedAt),
    }));

    expect(usersWithDate).toEqual(users);
  });
});
