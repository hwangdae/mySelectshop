import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const users = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          messages: {
            include: {
              sender: true,
              receiver: true,
            },
            orderBy: {
              createAt: "asc",
            },
          },
          users: true,
        },
      },
    },
  });
  return NextResponse.json(users);
};
