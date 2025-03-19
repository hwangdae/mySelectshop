import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const followerId = searchParams.get("followerId") ?? undefined;

  if (!followerId) {
    return NextResponse.json({ error: "Missing followerId" }, { status: 400 });
  }

  try {
    const followers = await prisma.follow.findMany({
      where: { followerId },
    });

    return NextResponse.json(followers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
