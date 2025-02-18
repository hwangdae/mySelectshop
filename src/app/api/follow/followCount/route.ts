import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const followerId = searchParams.get("followerId") ?? undefined;
  const followingId = searchParams.get("followingId") ?? undefined;
  try {
    if (followerId) {
      const followerCount = await prisma.follow.findMany({
        where: { followerId },
      });
      return NextResponse.json(followerCount);
    } else {
      const follwingCount = await prisma.follow.findMany({
        where: { followingId },
      });
      return NextResponse.json(follwingCount);
    }
  } catch (error) {
    console.log(error);
  }
};
