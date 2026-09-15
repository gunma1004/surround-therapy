import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "주변 제휴명소 & 맛집·숙소 안내 | 서라운드테라피",
  description: "서울·경기·인천 힐링 명소와 검증된 맛집, 편안한 휴식 공간 가이드! 서라운드테라피 프라이빗 케어와 함께 즐기는 수도권 추천 스팟 정보를 확인하세요.",
  keywords: [
    "서라운드테라피제휴명소",
    "서울맛집숙소",
    "경기힐링스팟",
    "인천휴식공간",
    "테라피연계숙소",
    "웰니스푸드"
  ],
  alternates: {
    canonical: "https://surround-therapy.netlify.app/places",
  },
  openGraph: {
    title: "주변 제휴명소 & 맛집·숙소 안내 | 서라운드테라피",
    description: "프라이빗 테라피와 함께 즐기는 서울·경기·인천 핫플레이스! 검증된 맛집과 편안한 휴식처를 한눈에 만나보세요.",
    url: "https://surround-therapy.netlify.app/places",
    siteName: "서라운드테라피(Surround Therapy)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "서라운드테라피 주변 제휴명소 안내",
      },
    ],
  },
};

const placeCategories = [
  {
    category: "☕ 릴렉싱 라운지 & 디저트",
    tag: "RELAX & CAFE",
    items: [
      {
        name: "시크릿 가든 티하우스",
        region: "서울 종로 / 중구",
        desc: "바쁜 일상 속 프라이빗한 정원에서 즐기는 프리미엄 블렌딩 티와 수제 디저트",
        badge: "서라운드테라피 전용 혜택",
      },
      {
        name: "선셋 뷰 오션 라운지",
        region: "인천 송도 / 영종",
        desc: "통창 너머로 붉게 물드는 노을을 감상하며 즐기는 스페셜티 커피와 완벽한 휴식",
        badge: "무료 주차 지원",
      },
    ],
  },
  {
    category: "🥢 프라이빗 파인다이닝",
    tag: "PRIVATE DINING",
    items: [
      {
        name: "자연 담은 제철 오마카세",
        region: "서울 강남 / 청담",
        desc: "신선한 식재료 본연의 맛을 살려 테라피 전후 몸과 마음의 기력을 보충해 주는 코스 요리",
        badge: "룸 예약 우선",
      },
      {
        name: "비건 & 클린 이팅 레스토랑",
        region: "경기 판교 / 분당",
        desc: "속을 편안하게 달래주는 글루텐프리 및 저염식 웰빙 요리의 정수를 맛볼 수 있는 곳",
        badge: "비건 옵션 제공",
      },
    ],
  },
  {
    category: "🛌 힐링 호캉스 & 감성 숙소",
    tag: "PREMIUM STAY",
    items: [
      {
        name: "어반 럭셔리 스파 호텔",
        region: "서울 여의도 / 마포",
        desc: "최고급 침구류와 넓은 공간을 갖춰 홈케어 테라피를 받기에 최적화된 도심 속 안식처",
        badge: "VIP 룸 업그레이드",
      },
      {
        name: "히노끼 탕 & 숲속 풀빌라",
        region: "경기 가평 / 양평",
        desc: "자연 속 맑은 공기와 편백나무 향을 맡으며 외부 방해 없이 온전한 쉼을 경험하는 독채 숙소",
        badge: "프라이빗 완벽 보장",
      },
    ],
  },
];

export default function PlacesPage() {
  return (
    <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen py-10 px-4 font-sans selection:bg-pink-400 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3 bg-white/85 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-sm">
          <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-600 text-xs font-black tracking-widest uppercase">
            HEALING & HOT PLACES
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
            주변 제휴명소 & 맛집·휴식 명소
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            서울·경기·인천 지역의 테라피 바디케어와 함께 즐기기 좋은 검증된 맛집, 웰니스 카페, 숙소 가이드입니다.
          </p>
        </section>

        {/* 메인 안내 배너 */}
        <section className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white p-5 md:p-6 rounded-3xl text-center space-y-2 shadow-lg">
          <p className="text-xs md:text-sm font-bold text-pink-100">
            ✨ 서라운드테라피 파트너와 함께하는 품격 있는 휴식 플랜
          </p>
          <p className="text-[11px] md:text-xs text-pink-100/90">
            서라운드테라피는 이용자분들의 건강한 힐링 라이프스타일을 위해 수도권 거점별 명소를 엄선하여 주기적으로 업데이트하고 있습니다.
          </p>
        </section>

        {/* 카테고리별 명소 리스트 */}
        <div className="space-y-8">
          {placeCategories.map((cat, idx) => (
            <section key={idx} className="space-y-4">
              <div className="flex items-center justify-between border-b border-pink-200 pb-2">
                <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
                  {cat.category}
                </h2>
                <span className="text-[10px] text-pink-600 font-bold tracking-wider">
                  {cat.tag}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="bg-white border border-pink-200 hover:border-pink-400 rounded-2xl p-5 space-y-2.5 transition-all shadow-sm group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-black text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        📍 {item.region}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-gray-900 group-hover:text-pink-600 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 하단 제휴 문의 안내 */}
        <section className="bg-white border border-pink-200 p-6 rounded-3xl text-center space-y-3 shadow-sm">
          <h3 className="text-base font-black text-gray-900">
            🤝 서라운드테라피 제휴 명소 등록 및 입점 안내
          </h3>
          <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
            서울·경기·인천 지역의 웰니스 매장, 맛집, 숙박 업주분들의 제휴 신청을 받고 있습니다.
          </p>
          <div>
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow transition-all transform active:scale-95"
            >
              📞 명소 제휴 문의하기 (0507-1280-3344)
            </a>
          </div>
        </section>

        {/* 홈으로 돌아가기 버튼 */}
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