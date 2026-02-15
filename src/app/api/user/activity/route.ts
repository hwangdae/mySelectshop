import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const [reviewCount, followerCount, followingCount] = await Promise.all([
    prisma.review.count({ where: { userId } }),
    prisma.follow.count({ where: { followingId: userId } }),
    prisma.follow.count({ where: { followerId: userId } }),
  ]);

  return NextResponse.json({
    reviewCount,
    followerCount,
    followingCount,
  });
};