import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const selectshopId = searchParams.get("selectshopId") ?? undefined;

  try {
    const reviews = await prisma.review.findMany({
      where: { selectshopId },
    });

    return NextResponse.json(reviews);
  } catch (error: unknown) {
    console.log(error);
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const {
      selectshopId,
      region,
      reviewImages,
      description,
      advantages,
      disAdvantages,
      tags,
      userId,
    } = body;

    const review = await prisma.review.create({
      data: {
        selectshopId,
        region,
        reviewImages,
        description,
        advantages,
        disAdvantages,
        tags,
        userId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const {
      id,
      selectshopId,
      region,
      reviewImages,
      description,
      advantages,
      disAdvantages,
      tags,
      userId,
    } = body;
    const updateReview = await prisma.review.update({
      where: { id },
      data: {
        selectshopId,
        region,
        reviewImages,
        description,
        advantages,
        disAdvantages,
        tags,
        userId,
      },
    });
    return NextResponse.json(updateReview);
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const selectshopId = searchParams.get("selectshopId") ?? undefined;
  const userId = searchParams.get("userId") ?? undefined;

  const review = await prisma.review.findFirst({
    where: {
      selectshopId,
      userId,
    },
  });

  if (review) {
    await prisma.review.delete({
      where: {
        id: review.id,
      },
    });
  }
  return new Response("Review deleted", { status: 200 });
};
