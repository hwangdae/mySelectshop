import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request) => {
  const body = await request.json();
  const { id, image, name } = body;

  const updateProfile = await prisma.user.update({
    where: { id },
    data: { name, image },
  });

  return NextResponse.json(updateProfile);
};
