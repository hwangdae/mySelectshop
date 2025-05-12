import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") ?? undefined;
  try {
    const bestReviewers = await prisma.user.findMany({
      where: {
        reviews: {
          some: { region },
        },
      },
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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
