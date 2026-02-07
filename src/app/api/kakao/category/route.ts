import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") ?? "1";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { message: "query, x, y는 필수입니다" },
      { status: 400 },
    );
  }

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json` +
      `?query=의류판매` +
      `&x=${lng}` +
      `&y=${lat}` +
      `&radius=1000` +
      `&sort=distance` +
      `&page=${page}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APP_REST_API_KEY}`,
      },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
};