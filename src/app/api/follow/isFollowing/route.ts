import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const followerId = searchParams.get("followerId") ?? undefined;
  const followingId = searchParams.get("followingId") ?? undefined;
  
  try {
    const isFollowing = await prisma.follow.findFirst({
      where: { followerId, followingId },
    });

    return NextResponse.json(isFollowing);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
