import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const bestReviewers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        reviews: true,
      },
      orderBy: {
        reviews: { _count: "desc" },
      },
      take: 10,
    });
    return NextResponse.json(bestReviewers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
