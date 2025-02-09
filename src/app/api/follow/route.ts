import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const session = await getCurrentUser();
    const userId = session?.id;

    const followingList = await prisma.follow.findMany({
      where: { followerId: userId },
      include: { following: true },
    });

    return NextResponse.json(followingList);
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (request: Request) => {
  try {
    const session = await getCurrentUser();
    if (!session) return alert("세션이 만료 되었습니다.");

    const followingId = await request.json();
    const followerId = session.id;

    const existingFollow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });
    if (existingFollow) {
      await prisma.follow.delete({
        where: { followerId_followingId: { followerId, followingId } },
      });
      return NextResponse.json({ message: "Unfollowed" });
    } else {
      await prisma.follow.create({
        data: { followerId, followingId },
      });
      return NextResponse.json({ message: "Followed" });
    }
  } catch (error) {
    console.log(error);
  }
};
