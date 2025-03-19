import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { id: followerId } = body;

    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const followingId = session.id;

    const existingFollow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: { followerId_followingId: { followerId, followingId } },
      });
      return NextResponse.json({ status: 200 });
    } else {
      const follow = await prisma.follow.create({
        data: { followerId, followingId },
      });
      return NextResponse.json(follow);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
