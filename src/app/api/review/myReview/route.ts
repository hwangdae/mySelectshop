import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const selectshopId = searchParams.get("selectshopId") ?? undefined;
  const userId = searchParams.get("userId") ?? undefined;
  try {
    const myReview = await prisma.review.findFirst({
      where: {
        selectshopId,
        userId,
      },
    });
    return NextResponse.json(myReview);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
};
