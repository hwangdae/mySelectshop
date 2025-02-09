import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? undefined;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return NextResponse.json(user);
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const { email, password, name } = body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "이미 가입된 이메일입니다." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      image: "/images/basicUserImage.png",
      hashedPassword,
    },
  });
  return NextResponse.json(user);
};


