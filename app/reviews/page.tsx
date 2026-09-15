import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "리얼 생생후기 | 평점 4.9 만족도 1위 프라이빗 힐링 케어 - 모먼트레스트",
  description: "서울·경기·인천 모먼트레스트 실제 이용 고객님들의 100% 솔직한 방문 홈케어 후기! 안심 리뷰와 압도적인 만족도를 직접 확인하세요.",
  keywords: [
    "모먼트레스트후기",
    "방문홈케어리뷰",
    "프라이빗테라피후기",
    "스웨디시찐후기",
    "서울방문케어후기",
    "경기프리미엄테라피리뷰"
  ],
  alternates: {
    canonical: "https://momentrest.netlify.app/reviews",
  },
  openGraph: {
    title: "리얼 생생후기 | 모먼트레스트(MomentRest) 검증된 100% 솔직 리뷰",
    description: "편안하고 안전한 웰니스 테라피! 서울·경기·인천 고객님들이 직접 작성한 생생한 방문 피로회복 후기를 만나보세요.",
    url: "https://momentrest.netlify.app/reviews",
    siteName: "모먼트레스트(MomentRest)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "모먼트레스트 실제 고객 생생후기",
      },
    ],
  },
};

const reviewStats = {
  average: "4.95",
  totalReviews: "1,530+",
  recommendRate: "99.1%",
};

const reviews = [
  {
    name: "서울 서초구 직장인",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "프리미엄 딥티슈 90분",
    badge: "단골 예약",
    text: "늦게까지 야근하고 피곤해서 프라이빗 테라피 신청했는데 신속하게 방문해 주셨네요. 뭉친 승모근 완벽하게 풀고 푹 잤습니다. 다음에도 무조건 여기 예약입니다!",
  },
  {
    name: "경기 용인시 수지구 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "VVIP 하이엔드 케어 120분",
    badge: "베스트 리뷰",
    text: "투명하고 정직한 정찰제로 운영되어 안심하고 이용할 수 있었습니다. 실력도 엄청 좋으시고 친절하셔서 대만족이에요.",
  },
  {
    name: "인천 남동구 구월동 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "시그니처 아로마 90분",
    badge: "인증 완료",
    text: "집에서 편안하게 방문 스웨디시 테라피를 받을 수 있어서 너무 편해요. 따뜻한 오일로 관리받으니까 붓기도 싹 빠지고 힐링 제대로 했습니다.",
  },
  {
    name: "서울 영등포구 여의도 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "베이직 건식 케어 60분",
    badge: "첫 이용",
    text: "운동하고 나서 어깨랑 허리가 뻐근했는데, 맞춤 홈케어 받고 싹 날아갔습니다. 시간 약속도 잘 지키시고 압도 딱 적당해서 좋았어요.",
  },
  {
    name: "경기 화성시 동탄 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "프리미엄 스웨디시 60분",
    badge: "재방문 100%",
    text: "모먼트레스트 처음 써보는데 상담도 엄청 빠르고 배차도 신속해서 놀랐습니다. 편안한 휴식 환경 덕분에 주변 지인들한테도 엄청 추천하고 있어요.",
  },
];

export default function ReviewsPage() {
  return (
    <main className="bg-[#fff5f7] text-[#2f3542] min-h-screen py-10 px-4 font-sans selection:bg-pink-400 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3 bg-white/85 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-sm">
          <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-600 text-xs font-black tracking-widest uppercase">
            MOMENTREST REAL REVIEWS
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
            모먼트레스트 프라이빗 케어 리얼 후기
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            서울·경기·인천 전지역에서 모먼트레스트 파트너 서비스를 직접 경험하신 고객님들의 100% 솔직한 생생 후기입니다.
          </p>
        </section>

        {/* 만족도 통계 요약 카드 */}
        <section className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white p-6 rounded-3xl grid grid-cols-3 gap-2 text-center shadow-lg">
          <div className="space-y-1">
            <span className="text-[11px] text-pink-100 font-semibold block">평균 고객 평점</span>
            <span className="text-xl md:text-2xl font-black text-white">★ {reviewStats.average}</span>
          </div>
          <div className="space-y-1 border-x border-white/20">
            <span className="text-[11px] text-pink-100 font-semibold block">누적 안심 리뷰</span>
            <span className="text-xl md:text-2xl font-black text-white">{reviewStats.totalReviews}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-pink-100 font-semibold block">지인 추천율</span>
            <span className="text-xl md:text-2xl font-black text-pink-100">{reviewStats.recommendRate}</span>
          </div>
        </section>

        {/* 리뷰 카드 리스트 */}
        <section className="space-y-4">
          {reviews.map((rev, idx) => (
            <article 
              key={idx} 
              className="bg-white border border-pink-200 hover:border-pink-400 p-5 md:p-6 rounded-2xl space-y-3 transition-all shadow-sm group"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600 font-black text-sm tracking-wide">
                      {rev.rate}
                    </span>
                    <span className="text-[10px] bg-pink-50 text-pink-600 px-2 py-0.5 rounded-md border border-pink-200 font-bold">
                      {rev.badge}
                    </span>
                  </div>
                  <h2 className="text-xs text-gray-800 font-bold">
                    {rev.name}
                  </h2>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[11px] text-gray-400 font-medium block">
                    {rev.date}
                  </span>
                  <span className="text-[10px] text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-200 font-medium inline-block">
                    {rev.course}
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-600 leading-relaxed pt-1 border-t border-pink-100">
                &quot;{rev.text}&quot;
              </p>
            </article>
          ))}
        </section>

        {/* 안심 예약 보증 배너 */}
        <section className="bg-white border border-pink-200 p-6 rounded-3xl text-center space-y-3 shadow-sm">
          <h2 className="text-base font-black text-gray-900">
            🛡️ 편안하고 안전한 맞춤 웰니스 시스템 운영
          </h2>
          <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
            모먼트레스트는 검증된 테라피스트의 품격 있는 방문 케어를 통해 언제나 만족스러운 휴식을 선사합니다.
          </p>
          <div>
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs px-6 py-3 rounded-xl shadow transition-all transform active:scale-95 w-full md:w-auto"
            >
              📞 지금 바로 실시간 힐링 예약하기
            </a>
          </div>
        </section>

        {/* 홈으로 돌아가기 버튼 */}
        <div className="text-center pt-2">
          <Link 
            href="/"
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-pink-600 transition-colors font-semibold"
          >
            ← 모먼트레스트 메인 홈으로 이동하기
          </Link>
        </div>

      </div>
    </main>
  );
}