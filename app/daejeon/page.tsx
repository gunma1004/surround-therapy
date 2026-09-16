import type { Metadata } from "next";
import Link from "next/link";

const daejeonShops = [
  { 
    id: 1, 
    slug: "miin-therapy", 
    name: "🌸 한국미인테라피", 
    desc: "둔산동, 유성, 대전 전지역 품격 있는 프라이빗 스웨디시 및 천연 아로마 케어", 
    phone: "0507-1280-3201", 
    price: "70,000원부터~", 
    image: "/shop2.jpg", 
    badge: "추천" 
  },
  { 
    id: 2, 
    slug: "s-slim-therapy", 
    name: "🔮 S슬림테라피", 
    desc: "대전·청주 중부권 광역 출장! 체계적이고 전문적인 슬림 릴렉싱 케어", 
    phone: "0507-1280-3358", 
    price: "50,000원부터~", 
    image: "/shop1.jpg", 
    badge: "특화" 
  }
];

export const metadata: Metadata = {
  title: "대전광역시 프리미엄 마사지 테라피 가이드 | 서라운드테라피",
  description: "둔산동, 유성구, 서구, 중구 등 대전 전지역 신속한 방문과 편안한 휴식을 제공하는 서라운드테라피 제휴점 정보입니다.",
  keywords: ["대전마사지테라피", "대전스웨디시", "둔산동유성홈케어", "서라운드테라피대전"],
  alternates: { canonical: "https://surround-therapy.netlify.app/daejeon" },
  openGraph: {
    title: "대전광역시 프리미엄 마사지 테라피 제휴샵 | 서라운드테라피",
    description: "대전광역시 전지역 실시간 방문 제휴 샵 안내. 편안한 휴식과 마사지를 누려보세요.",
    url: "https://surround-therapy.netlify.app/daejeon",
    siteName: "서라운드테라피(Surround Therapy)",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/og-main.png", width: 1200, height: 630, alt: "서라운드테라피 대전 제휴" }],
  },
};

export default function DaejeonMainPage() {
  return (
    <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen py-10 px-4 font-sans selection:bg-pink-400 selection:text-white pb-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <section className="text-center space-y-3 bg-white/85 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-sm">
          <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-600 text-xs font-black tracking-widest uppercase">
            DAEJEON INTEGRATED CARE
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
            대전광역시 프리미엄 힐링 테라피 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            대전 둔산동과 유성을 비롯한 전역에서 만나보는 품격 있는 1:1 맞춤형 웰니스 테라피 제휴점 리스트입니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-black text-gray-800 px-1">📍 대전 지역 입점 검증 제휴점</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {daejeonShops.map((shop) => (
              <div 
                key={shop.id}
                className="bg-white border border-pink-200 hover:border-pink-400 rounded-2xl p-4 flex gap-4 items-center shadow-md transition-all relative overflow-hidden group"
              >
                <Link href={`/daejeon/서구/SHOP/${shop.slug}`} className="absolute inset-0 z-10" aria-label={`${shop.name} 상세페이지 보기`} />
                <div className="relative overflow-hidden rounded-xl border border-pink-100 shrink-0">
                  <img src={shop.image} alt={shop.name} className="w-20 h-20 md:w-24 md:h-24 object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm md:text-base text-gray-900 truncate group-hover:text-pink-600 transition-colors">
                      {shop.name}
                    </h3>
                    <span className="text-[10px] bg-pink-500 text-white font-black px-1.5 py-0.5 rounded">
                      {shop.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                    {shop.desc}
                  </p>
                  <div className="pt-1.5 flex items-center justify-between">
                    <span className="text-xs font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                      {shop.price}
                    </span>
                    <a href={`tel:${shop.phone}`} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs px-3.5 py-1.5 rounded-xl shadow relative z-20">
                      전화예약 📞
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white p-6 md:p-8 rounded-3xl text-center space-y-4 shadow-lg">
          <h3 className="text-base md:text-xl font-black">
            🛡️ 대전 전지역 편안하고 안전한 프리미엄 웰니스 케어
          </h3>
          <p className="text-xs text-pink-100 max-w-md mx-auto leading-relaxed">
            서라운드테라피는 투명하고 정직한 운영을 지향하며, 대전 전역에 신속하고 편안한 힐링 서비스를 제공합니다.
          </p>
          <div>
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-2 bg-white text-pink-600 hover:bg-pink-50 font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all"
            >
              📞 대전 제휴점 통합 실시간 예약
            </a>
          </div>
        </section>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-gray-500 hover:text-pink-600 transition-colors font-semibold">
            ← 서라운드테라피 메인 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}