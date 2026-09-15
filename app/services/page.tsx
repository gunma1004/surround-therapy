import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 코스 안내 | 프라이빗 테라피 & 프리미엄 홈케어 - 서라운드테라피",
  description: "서울·경기·인천 서라운드테라피 방문 홈케어 서비스 안내! 베이직 건식, 시그니처 아로마, 프리미엄 스웨디시 및 1:1 맞춤 VIP 코스를 지금 확인하세요.",
  keywords: [
    "서라운드테라피서비스",
    "맞춤테라피코스",
    "아로마홈케어프로그램",
    "프라이빗스웨디시",
    "방문홈케어추천",
    "프리미엄바디케어",
    "1대1맞춤테라피"
  ],
  alternates: {
    canonical: "https://surround-therapy.netlify.app/services",
  },
  openGraph: {
    title: "서비스 코스 안내 | 서라운드테라피(Surround Therapy) 맞춤 프라이빗 테라피",
    description: "컨디션과 취향에 맞춘 최상의 힐링 프로그램! 테라피, 아로마, 스웨디시 프리미엄 바디케어를 편안하게 만나보세요.",
    url: "https://surround-therapy.netlify.app/services",
    siteName: "서라운드테라피(Surround Therapy)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "서라운드테라피 서비스 코스 안내",
      },
    ],
  },
};

const serviceList = [
  {
    num: "01",
    title: "베이직 건식 릴렉싱 케어",
    sub: "TRADITIONAL RELAX CARE",
    desc: "누적된 피로와 경직된 근육을 체계적인 스트레칭 기법으로 시원하게 이완시켜주는 정통 릴렉싱 바디케어입니다.",
    tags: ["전신 근육 이완", "스트레칭", "컨디션 회복"],
    recommend: "목, 어깨 뭉침이 심하고 개운한 스트레칭이 필요하신 분",
  },
  {
    num: "02",
    title: "시그니처 아로마 테라피",
    sub: "ORGANIC AROMA THERAPY",
    desc: "최상급 천연 에센셜 오일을 사용하여 전신의 림프 순환을 돕고, 스트레스로 지친 심신에 깊은 안정을 선사합니다.",
    tags: ["천연 오일 보습", "림프 순환", "스트레스 케어"],
    recommend: "부드러운 압을 선호하며 감성적인 힐링을 원하시는 분",
  },
  {
    num: "03",
    title: "프리미엄 감성 스웨디시",
    sub: "LUXURY SWEDISH SPA",
    desc: "섬세하고 부드러운 터치로 체내 노폐물 배출을 유도하며, 완벽한 신체 밸런스와 활력을 되찾아주는 VVIP 코스입니다.",
    tags: ["감성 테라피", "노폐물 배출", "VVIP 케어"],
    recommend: "수면 부족이나 만성 피로로 인해 깊은 릴렉싱이 필요하신 분",
  },
  {
    num: "04",
    title: "하이엔드 1:1 맞춤 스페셜",
    sub: "SIGNATURE 1:1 CUSTOM CARE",
    desc: "서라운드테라피 최상위 테라피스트가 고객님의 컨디션을 정밀하게 파악하여, 건식과 아로마를 결합한 완벽한 1:1 솔루션을 제공합니다.",
    tags: ["1:1 집중 관리", "하이브리드 케어", "최상위 만족도"],
    recommend: "나만을 위한 특별한 맞춤형 프라이빗 케어를 경험하고 싶으신 분",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen py-10 px-4 font-sans selection:bg-pink-400 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3 bg-white/85 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-sm">
          <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-600 text-xs font-black tracking-widest uppercase">
            PREMIUM CARE SERVICE
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
            서라운드테라피 프라이빗 테라피 코스 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            고객님의 현재 컨디션과 취향을 고려하여 최상의 휴식을 선사하는 맞춤형 웰니스 프로그램입니다.
          </p>
        </section>

        {/* 서비스 4대 핵심 가치 배너 */}
        <section className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white p-6 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-lg">
          <div className="space-y-1">
            <span className="text-xl">⏱️</span>
            <h4 className="text-xs font-bold text-white">신속한 방문 매칭</h4>
            <p className="text-[10px] text-pink-100">수도권 거점 신속 도착</p>
          </div>
          <div className="space-y-1 border-l border-white/20">
            <span className="text-xl">🛡️</span>
            <h4 className="text-xs font-bold text-white">정직한 정찰제</h4>
            <p className="text-[10px] text-pink-100">투명하고 안전한 운영</p>
          </div>
          <div className="space-y-1 border-l border-white/20">
            <span className="text-xl">🌿</span>
            <h4 className="text-xs font-bold text-white">유기농 프리미엄 오일</h4>
            <p className="text-[10px] text-pink-100">피부에 안전한 천연 성분</p>
          </div>
          <div className="space-y-1 border-l border-white/20">
            <span className="text-xl">👑</span>
            <h4 className="text-xs font-bold text-white">베테랑 테라피스트</h4>
            <p className="text-[10px] text-pink-100">엄격한 검증을 통과한 매니저</p>
          </div>
        </section>

        {/* 서비스 카드 그리드 (2x2) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceList.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-pink-200 hover:border-pink-400 p-6 rounded-3xl space-y-4 transition-all shadow-sm group relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <span className="text-pink-600 font-black text-2xl tracking-tighter">
                  {service.num}
                </span>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider bg-pink-50 px-2.5 py-1 rounded-md border border-pink-200">
                  {service.sub}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* 태그 영역 */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {service.tags.map((tag, tagIdx) => (
                  <span 
                    key={tagIdx} 
                    className="text-[11px] bg-pink-50 text-pink-600 px-2.5 py-0.5 rounded-lg border border-pink-200 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 추천 대상 박스 */}
              <div className="bg-pink-50/50 p-3 rounded-xl border border-pink-100 text-[11px] text-gray-600">
                <strong className="text-pink-600 font-bold">💡 추천 대상:</strong> {service.recommend}
              </div>
            </div>
          ))}
        </section>

        {/* 하단 CTA 박스 */}
        <section className="bg-white border border-pink-200 p-6 md:p-8 rounded-3xl text-center space-y-3 shadow-sm">
          <h3 className="text-base md:text-lg font-black text-gray-900">
            어떤 코스를 선택해야 할지 고민되시나요?
          </h3>
          <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
            서라운드테라피 전문 상담원이 고객님의 뭉친 부위와 피로도에 딱 맞는 최적의 프로그램을 친절하게 추천해 드립니다.
          </p>
          <div className="pt-1">
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs px-6 py-3 rounded-xl shadow transition-all transform active:scale-95"
            >
              📞 1:1 맞춤 코스 실시간 상담하기
            </a>
          </div>
        </section>

        {/* 홈으로 돌아가기 */}
        <div className="text-center pt-2">
          <Link 
            href="/"
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-pink-600 transition-colors font-semibold"
          >
            ← 서라운드테라피 메인 홈으로 이동하기
          </Link>
        </div>

      </div>
    </div>
  );
}