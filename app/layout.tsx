import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://surround-therapy.netlify.app"),
  title: {
    default: "서라운드테라피 - 프리미엄 힐링 & 제휴 할인 예약 플랫폼",
    template: "%s | 서라운드테라피",
  },
  description: "서울·수도권 및 충청 전 지역 신속 방문과 편안한 휴식을 선사하는 프리미엄 테라피 가이드입니다.",
  keywords: [
    "서라운드테라피",
    "프라이빗 테라피",
    "힐링 스파",
    "아로마 테라피",
    "스웨디시",
    "릴렉싱 마사지",
    "건전 테라피",
  ],
  alternates: {
    canonical: "https://surround-therapy.netlify.app",
  },
  openGraph: {
    title: "서라운드테라피 - 프리미엄 힐링 & 제휴 할인 예약",
    description: "엄선된 프라이빗 테라피 샵 정보와 특별 혜택을 지금 확인해 보세요.",
    url: "https://surround-therapy.netlify.app",
    siteName: "서라운드테라피",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "서라운드테라피 - 프리미엄 힐링 테라피",
      },
    ],
  },
  other: {
    "naver-site-verification": "2477dd8f0743b51b99854c3256a7522a8e0269fd",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#fff5f7] text-[#2f3542] antialiased selection:bg-pink-400 selection:text-white">
        {children}
      </body>
    </html>
  );
}