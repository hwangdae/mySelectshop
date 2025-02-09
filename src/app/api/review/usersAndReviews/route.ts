import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const bestReviewers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        _count: {
          select: { reviews: true },
        },
      },
      orderBy: {
        reviews: { _count: "desc" },
      },
      take: 10,
    });
    return NextResponse.json(bestReviewers);
  } catch (error) {
    console.log(error);
  }
};
