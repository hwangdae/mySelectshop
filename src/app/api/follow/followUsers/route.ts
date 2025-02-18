import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const followingId = searchParams.get("followingId") ?? undefined;
  const followerId = searchParams.get("followerId") ?? undefined;

  if (followingId) {
    const followerList = await prisma.follow.findMany({
      where: { followingId },
      select: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(followerList.map(f => f.follower));
  } else {
    const followingList = await prisma.follow.findMany({
      where: { followerId },
      select: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(followingList.map(f => f.following));
  }
};
