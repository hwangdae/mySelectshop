import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");

  if (!region) {
    return NextResponse.json(
      { error: "Missing region" },
      { status: 400 }
    );
  }

  try {
    // region 기준으로 리뷰 groupBy
    const grouped = await prisma.review.groupBy({
      by: ["userId"],
      where: { region },
      _count: {
        userId: true,
      },
      orderBy: {
        _count: {
          userId: "desc",
        },
      },
      take: 10,
    });

    if (grouped.length === 0) {
      return NextResponse.json([]);
    }

    // 유저 정보 가져오기
    const users = await prisma.user.findMany({
      where: {
        id: { in: grouped.map((g) => g.userId) },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    // 리뷰 개수 매핑
    const result = grouped.map((g) => {
      const user = users.find((u) => u.id === g.userId);

      return {
        id: user?.id,
        name: user?.name,
        image: user?.image,
        reviewCount: g._count.userId,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
};