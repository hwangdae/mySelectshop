import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const followingId = searchParams.get("followingId") ?? undefined;
  const followerId = searchParams.get("followerId") ?? undefined;

  if (followingId) {
    const followerList = await prisma.follow.findMany({
      where: { followingId },
    });
    return NextResponse.json(followerList);
  } else {
    const followingList = await prisma.follow.findMany({
      where: { followerId },
    });
    return NextResponse.json(followingList);
  }
};