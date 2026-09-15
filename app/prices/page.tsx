import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "코스별 요금 및 프로그램 안내 | 서라운드테라피 100% 정직한 정찰제",
  description: "서울·경기·인천 지역 서라운드테라피 전용 프라이빗 힐링 케어 요금표. 맞춤형 스웨디시, 아로마 테라피 가격과 안심 예약 가이드를 제공합니다.",
  keywords: [
    "홈케어요금",
    "프라이빗테라피가격",
    "방문스웨디시비용",
    "아로마마사지가격",
    "방문바디케어요금",
    "안심예약",
    "서라운드테라피가격표"
  ],
  alternates: {
    canonical: "https://surround-therapy.netlify.app/prices",
  },
  openGraph: {
    title: "코스별 요금 안내 | 서라운드테라피(Surround Therapy) 투명한 정찰제",
    description: "편안하고 안전한 프라이빗 힐링! 맞춤 코스별 요금을 투명하게 비교해 보세요.",
    url: "https://surround-therapy.netlify.app/prices",
    siteName: "서라운드테라피(Surround Therapy)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "서라운드테라피 코스별 가격 안내",
      },
    ],
  },
};

const priceList = [
  {
    title: "베이직 건식 릴렉싱",
    duration: "60분 / 90분 / 120분",
    price: "60,000원부터~",
    desc: "굳은 근육을 부드럽게 이완시켜주는 전신 스트레칭 및 밸런스 회복 프로그램",
    badge: "베스트셀러",
    highlight: false,
  },
  {
    title: "시그니처 아로마 테라피",
    duration: "60분 / 90분 / 120분",
    price: "70,000원부터~",
    desc: "천연 에센셜 오일을 사용하여 전신의 피로를 녹이고 림프 순환을 돕는 감성 테라피",
    badge: "인기 코스",
    highlight: false,
  },
  {
    title: "프리미엄 스웨디시 테라피",
    duration: "60분 / 90분 / 120분",
    price: "90,000원부터~",
    desc: "스트레스 완화와 독소 배출에 탁월한 최고급 VVIP 부드러운 전신 밀착 케어",
    badge: "서라운드테라피 강력추천",
    highlight: true,
  },
  {
    title: "스페셜 VVIP 하이엔드 케어",
    duration: "60분 / 90분 / 120분",
    price: "150,000원부터~",
    desc: "최상급 전문 테라피스트가 1:1로 밀착 관리하는 럭셔리 전신 피로 회복 마스터 코스",
    badge: "프라이빗 VIP",
    highlight: false,
  },
];

export default function PricesPage() {
  return (
    <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen py-10 px-4 font-sans selection:bg-pink-400 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3 bg-white/85 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-sm">
          <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-600 text-xs font-black tracking-widest uppercase">
            SURROUND THERAPY PRICE GUIDE
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
            서라운드테라피 프라이빗 테라피 요금 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            모든 제휴점은 투명하고 정직한 정찰제를 원칙으로 운영되며, 편안하고 안전한 휴식 환경을 제공합니다.
          </p>
        </section>

        {/* 안심 보증 배너 */}
        <section className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl shrink-0">
            🛡️
          </div>
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-pink-50">
              안심 보장 · 편안하고 안전한 맞춤 웰니스
            </h2>
            <p className="text-xs text-pink-100/90 leading-relaxed">
              서라운드테라피를 통해 매칭되는 모든 서비스는 숙련된 테라피스트가 직접 방문하여 품격 있는 힐링을 선사합니다.
            </p>
          </div>
        </section>

        {/* 코스별 가격 카드 리스트 */}
        <section className="space-y-4">
          {priceList.map((item, idx) => (
            <div 
              key={idx} 
              className={`bg-white border rounded-2xl p-5 md:p-6 transition-all shadow-sm group relative ${
                item.highlight 
                  ? "border-pink-400 shadow-[0_10px_25px_rgba(255,107,129,0.15)] bg-gradient-to-b from-white to-pink-50/30" 
                  : "border-pink-100 hover:border-pink-300"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                      item.highlight 
                        ? "bg-pink-500 text-white border-pink-400" 
                        : "bg-pink-50 text-pink-600 border-pink-200"
                    }`}>
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      ⏱️ {item.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base md:text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between border-t border-pink-50 md:border-0 pt-3 md:pt-0">
                  <span className="text-pink-600 font-black text-lg md:text-xl tracking-tight">
                    {item.price}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    (VAT 포함 / 정찰제)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 하단 이용 가이드 및 주의사항 */}
        <section className="bg-white border border-pink-200 p-6 rounded-3xl space-y-3 text-xs text-gray-500 leading-relaxed shadow-sm">
          <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
            <span>📌</span> 이용 요금 및 예약 안내 사항
          </h4>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>서울, 경기, 인천 전 지역 거점 기준 투명한 정찰제로 이용하실 수 있습니다.</li>
            <li>심야 시간대 및 일부 외곽 지역의 경우 원활한 매칭을 위해 사전 조율이 진행될 수 있습니다.</li>
            <li>건전하고 편안한 휴식 문화를 위해 매너있는 이용을 부탁드립니다.</li>
          </ul>
        </section>

        {/* 빠른 상담 및 예약 연결 */}
        <section className="text-center pt-2 space-y-4">
          <a 
            href="tel:0507-1280-3344"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-md transition-all transform active:scale-95"
          >
            📞 실시간 코스 및 비용 상담하기
          </a>

          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-pink-600 transition-colors font-semibold"
            >
              ← 서라운드테라피 메인 홈으로 돌아가기
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}