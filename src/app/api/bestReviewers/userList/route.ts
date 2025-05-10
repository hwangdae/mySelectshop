import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z.object({
  selectshopIds: z.array(z.string()),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { selectshopIds } = BodySchema.parse(body);

    const users = await prisma.user.findMany({
      where: {
        reviews: {
          some: {
            selectshopId: {
              in: selectshopIds,
            },
          },
        },
      },
      orderBy: {
        reviews: {
          _count: "desc",
        },
      },
      take: 10,
      select: {
        id: true,
        name: true,
        image: true,
        reviews: {
          where: {
            selectshopId: {
              in: selectshopIds,
            },
          },
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("[BEST_REVIEWERS]", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
};
