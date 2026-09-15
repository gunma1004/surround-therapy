import type { Metadata } from "next";
import MainClientUI from "./MainClientUI";

export const metadata: Metadata = {
  title: "서라운드테라피 | 서울·경기·인천·충청 프리미엄 힐링 테라피 플랫폼",
  description: "서울, 경기, 인천, 천안, 아산, 대전, 청주 전 지역 신속한 안내 및 편안한 휴식을 제공하는 서라운드테라피 프리미엄 힐링 테라피 플랫폼입니다.",
  keywords: [
    "서라운드테라피",
    "SurroundTherapy",
    "힐링테라피",
    "스웨디시",
    "아로마테라피",
    "서울테라피",
    "경기테라피",
    "천안테라피",
    "대전테라피",
    "맞춤케어"
  ],
  alternates: {
    canonical: "https://surround-therapy.netlify.app",
  },
  openGraph: {
    title: "서라운드테라피 - 수도권 및 중부권 프리미엄 힐링 테라피",
    description: "내 주변 검증된 프라이빗 힐링 테라피 샵 총집합! 아로마, 스웨디시 맞춤 휴식을 만나보세요.",
    url: "https://surround-therapy.netlify.app",
    siteName: "서라운드테라피(Surround Therapy)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "서라운드테라피 - 프리미엄 힐링 & 프라이빗 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "서라운드테라피 | 프리미엄 힐링 테라피 플랫폼",
    description: "서울·경기·인천·충청 검증된 프라이빗 테라피 제휴 정보 및 프리미엄 힐링 가이드",
    images: ["/og-main.png"],
  },
};

export default function Page() {
  return <MainClientUI />;
}