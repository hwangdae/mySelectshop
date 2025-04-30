import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mySelectshop",
  description: "내 주변의 쇼핑몰을 탐색하고 리뷰를 남겨보세요",
  keywords: [
    "주변 쇼핑몰 찾기",
    "쇼핑몰 후기",
    "쇼핑 리뷰 플랫폼",
    "위치 기반 리뷰",
    "여행",
    "기록",
  ],
  icons:{
    icon:"/images/Favicon.svg"
  }
};

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services,clusterer&autoload=false`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansKr.className}>
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={KAKAO_SDK_URL}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
