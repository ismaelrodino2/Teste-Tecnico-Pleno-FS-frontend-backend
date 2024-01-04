import { prismaMock } from "@/lib/singleton";
import { GET, POST } from "./route";
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

    const result = await GET(request);

    const json: User = (await result?.json()).user;

    const userWithDate = {
      ...json,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
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

  test("should create users", async () => {
    prismaMock.user.create.mockResolvedValue(user);

    const request = new NextRequest("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        accountType: user.accountType,
      }),
    });

    const result = await POST(request);

    const json: User = (await result?.json()).user;

    const userWithDate = {
      ...json,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    };

    expect(userWithDate).toEqual(user);
  });
});
