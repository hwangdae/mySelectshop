import { prisma } from "@/lib/prisma";
import { TNewReview } from "@/shared/types";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  // placeIds는 ?placeIds=1,2,3 이런 식으로 받는다고 가정
  const placeIdsParam = searchParams.get("placeIds");
  const userId = searchParams.get("userId");

  if (!placeIdsParam || !userId) {
    return NextResponse.json(
      { error: "placeIds and userId are required" },
      { status: 400 }
    );
  }

  const placeIds = placeIdsParam.split(",");

  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId,
        selectshopId: {
          in: placeIds,
        },
      },
      select: {
        selectshopId: true,
      },
    });

    // 방문한 매장 ID만 내려줌
    return NextResponse.json(
      reviews.map((review:TNewReview) => review.selectshopId)
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
};