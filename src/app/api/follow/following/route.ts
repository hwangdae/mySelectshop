import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const followingId = searchParams.get("followingId") ?? undefined;

  if (!followingId) {
    return NextResponse.json({ error: "Missing followingId" }, { status: 400 });
  }

  try {
    const following = await prisma.follow.findMany({
      where: { followingId },
    });

    return NextResponse.json(following);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};