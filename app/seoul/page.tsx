import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서울 프리미엄 힐링 테라피 & 마사지 추천 | 서라운드테라피",
  description: "서울 전지역(강남, 서초, 송파, 마포 등) 프리미엄 힐링 테라피, 스웨디시, 아로마 가이드. 편안하고 안심할 수 있는 제휴처를 만나보세요.",
  keywords: [
    "서울힐링테라피",
    "서울프라이빗테라피",
    "서울마사지",
    "서울스웨디시테라피",
    "서울아로마테라피",
    "서라운드테라피서울"
  ],
  alternates: {
    canonical: "https://surround-therapy.netlify.app/seoul",
  },
  openGraph: {
    title: "서울 힐링 테라피 & 마사지 추천 | 서라운드테라피",
    description: "서울 전지역 신속한 방문과 편안한 휴식! 안심하고 이용할 수 있는 프리미엄 바디케어 서비스를 경험하세요.",
    url: "https://surround-therapy.netlify.app/seoul",
    siteName: "서라운드테라피(Surround Therapy)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "서울 힐링 테라피 - 서라운드테라피",
      },
    ],
  },
};

interface Shop {
  id: number;
  slug: string;
  name: string;
  desc: string;
  phone: string;
  price: string;
  image: string;
}

// 🌟 서울 지역 지원 샵 데이터 및 공식 고유 번호 매칭
const seoulShops: Shop[] = [
  {
    id: 1,
    slug: "golden-therapy",
    name: "✨ 서울 강남·서초 한국골든테라피",
    desc: "VIP 골든 릴렉싱 & 딥티슈 피로회복! 베테랑 테라피스트의 품격 있는 1:1 맞춤 테라피 케어",
    phone: "0507-1280-3360",
    price: "80,000원부터~",
    image: "/shop1.jpg"
  },
  {
    id: 2,
    slug: "miin-therapy",
    name: "🌸 서울 마포·용산 한국미인테라피",
    desc: "최고급 천연 오일을 활용한 감성 스웨디시 & 아로마 전신 림프 순환 맞춤 프로그램",
    phone: "0507-1280-3201",
    price: "70,000원부터~",
    image: "/shop2.jpg"
  },
  {
    id: 3,
    slug: "juju-therapy",
    name: "💎 서울 송파·강동 주주테라피",
    desc: "재방문율 1위 만족도! 철저한 위생 관리와 프라이빗 힐링 바디케어 서비스",
    phone: "0507-1280-3197",
    price: "60,000원부터~",
    image: "/shop3.jpg"
  },
  {
    id: 4,
    slug: "queens-home-therapy",
    name: "👑 서울 영등포·여의도 퀸즈홈테라피",
    desc: "여왕처럼 누리는 VIP 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 프로그램",
    phone: "0507-1280-3296",
    price: "60,000원부터~",
    image: "/shop4.jpg"
  },
  {
    id: 5,
    slug: "night-therapy",
    name: "🌙 서울 전지역 오늘밤테라피",
    desc: "편안한 휴식과 안심 힐링! 서울 전지역 신속한 방문으로 지친 일상의 피로 회복",
    phone: "0507-1280-3199",
    price: "60,000원부터~",
    image: "/shop5.jpg"
  }
];

export default function SeoulPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "서울 힐링 테라피 & 마사지 안내 - 서라운드테라피",
    "description": "서울 지역 프라이빗 테라피 및 힐링 바디케어 제휴업체 정보 제공",
    "url": "https://surround-therapy.netlify.app/seoul",
    "telephone": "0507-1280-3344",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "서울특별시",
      "addressCountry": "KR"
    }
  };

  return (
    <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen flex flex-col font-sans selection:bg-pink-400 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        <section className="relative rounded-3xl overflow-hidden border border-pink-300 shadow-[0_10px_40px_rgba(255,107,129,0.15)] bg-gradient-to-b from-white to-[#fff0f3]">
          <img 
            src="/banner.jpg" 
            alt="서울 프라이빗 테라피 및 바디케어 안내" 
            className="w-full h-56 md:h-72 object-cover filter brightness-[0.85] opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-pink-600 text-xs font-black tracking-widest uppercase mb-1">
              SEOUL · LOCAL HEALING GUIDE
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight drop-shadow-sm">
              서울 힐링 테라피 & 홈케어 안내
            </h1>
            <p className="text-xs md:text-sm text-gray-600 mt-2 max-w-xl leading-relaxed">
              서울 고객님을 위한 맞춤형 웰니스 테라피 가이드입니다. 검증된 코스와 편안한 휴식 환경을 확인해 보세요.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-pink-600 font-bold tracking-widest uppercase">SEOUL RECOMMENDED PARTNERS</p>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mt-1">
              서울 추천 제휴업체 (총 5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seoulShops.map((lShop: Shop) => (
              <div key={lShop.id} className="bg-white border border-pink-200 hover:border-pink-400 rounded-2xl p-4 flex gap-4 items-center shadow-md transition-all group relative">
                {/* 🌟 서울 지역 SHOP 통합 경로 연결 */}
                <Link href={`/seoul/강남구/SHOP/${lShop.slug}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
                <img 
                  src={lShop.image} 
                  alt={lShop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-pink-100 group-hover:scale-105 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-gray-900 truncate group-hover:text-pink-600 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">{lShop.price}</span>
                    <a 
                      href={`tel:${lShop.phone}`} 
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all transform active:scale-95 relative z-20"
                    >
                      전화예약
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center pt-4">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-pink-600 transition-colors font-semibold">
            ← 서라운드테라피 메인 홈으로 돌아가기
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-pink-200 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-gray-600 font-bold">서라운드테라피(Surround Therapy)는 건전하고 안전한 프리미엄 홈케어 & 힐링 테라피 정보 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-400">COPYRIGHT &copy; SurroundTherapy ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}