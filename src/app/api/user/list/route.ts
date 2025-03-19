import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const userList = await prisma.user.findMany();
  return NextResponse.json(userList);
};
