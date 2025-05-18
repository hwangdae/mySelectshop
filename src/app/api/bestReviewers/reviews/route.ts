import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? undefined;
  const region = searchParams.get("region") ?? undefined;
  const pageParam = parseInt(searchParams.get("pageParam") || "1");
  const pageSize = 6;

  try {
    const [reviews, totalCount] = await Promise.all([
      prisma.review.findMany({
        where: { userId, region },
        skip: pageSize * (pageParam - 1),
        take: pageSize,
      }),
      prisma.review.count({
        where: { userId },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      reviews,
      page: pageParam,
      total_pages: totalPages,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
};
