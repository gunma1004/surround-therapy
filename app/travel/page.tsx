import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "수도권 힐링 여행지 안내 | 서울·경기·인천 추천 명소 - 서라운드테라피",
  description: "서울·경기·인천 서라운드테라피 추천 수도권 힐링 여행지! 도심 숲길, 호수 드라이브, 오션뷰 일몰 명소와 여행 후 피로를 푸는 프라이빗 홈케어 팁을 확인하세요.",
  keywords: [
    "서라운드테라피여행가이드",
    "수도권힐링여행",
    "서울야경명소",
    "경기드라이브코스",
    "인천오션뷰",
    "힐링스팟",
    "여행피로회복"
  ],
  alternates: {
    canonical: "https://surround-therapy.netlify.app/travel",
  },
  openGraph: {
    title: "수도권 힐링 여행지 안내 | 서라운드테라피(Surround Therapy) 추천 명소",
    description: "피로를 비워내는 서울·경기·인천 시그니처 힐링 여행 코스! 맑은 자연과 함께하는 웰니스 라이프를 만나보세요.",
    url: "https://surround-therapy.netlify.app/travel",
    siteName: "서라운드테라피(Surround Therapy)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "서라운드테라피 수도권 힐링 여행지 안내",
      },
    ],
  },
};

const travelSpots = [
  {
    region: "서울 코스",
    tag: "CITY & NIGHT VIEW",
    title: "남산 소나무 숲길 & 한강 야경 드라이브",
    desc: "도심 속 울창한 숲 산책로를 걸으며 맑은 공기를 마시고, 탁 트인 한강 야경을 감상하며 하루의 복잡한 생각을 비워낼 수 있는 도심 힐링 코스입니다.",
    spots: ["남산 둘레길", "반포 한강공원", "북악스카이웨이"],
    tip: "산책 후 뭉친 다리 근육은 가벼운 스트레칭이나 프라이빗 테라피로 풀어주면 좋습니다."
  },
  {
    region: "경기 코스",
    tag: "NATURE & FOREST",
    title: "가평 잣나무 숲 & 양평 두물머리 물안개길",
    desc: "피톤치드 가득한 잣나무 숲길에서 산림욕을 즐기고, 고즈넉한 강변을 따라 드라이브하며 지친 몸과 마음에 깊은 휴식을 선물하는 자연 코스입니다.",
    spots: ["아침고요수목원", "양평 두물머리", "포천 국립수목원"],
    tip: "장거리 운전 후에는 굳은 척추와 허리를 이완시키는 맞춤형 방문 테라피가 효과적입니다."
  },
  {
    region: "인천 코스",
    tag: "OCEAN & SUNSET",
    title: "영종도 해변 도로 & 송도 센트럴파크",
    desc: "서해의 붉은 노을을 바라보며 시원한 바닷바람을 맞을 수 있는 오션 드라이브 코스로, 이국적인 송도 수변 공원에서 여유로운 야간 산책을 즐기기 좋습니다.",
    spots: ["을왕리 해변", "송도 센트럴파크", "월미도 달빛로드"],
    tip: "바닷바람으로 건조해진 피부에는 천연 아로마 오일 테라피를 추천합니다."
  },
  {
    region: "경기 남부 코스",
    tag: "LAKE & PARK",
    title: "광교 호수공원 & 수원 화성 성곽길",
    desc: "화려한 수변 야경과 성곽 산책로가 조화롭게 어우러진 명소로, 조용하고 편안한 분위기 속에서 사색과 릴렉스를 누릴 수 있는 주말 추천 코스입니다.",
    spots: ["광교 호수공원", "수원 화성행궁", "의왕 백운호수"],
    tip: "산책을 마친 뒤 익숙한 공간에서 받는 홈케어로 완벽한 마무리가 가능합니다."
  }
];

export default function TravelPage() {
  return (
    <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen py-10 px-4 font-sans selection:bg-pink-400 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3 bg-white/85 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-sm">
          <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-600 text-xs font-black tracking-widest uppercase">
            LOCAL HEALING TRAVEL
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
            수도권 힐링 여행지 & 드라이브 명소
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            복잡한 일상에서 벗어나 맑은 자연과 야경을 즐기며 온전한 쉼을 누릴 수 있는 서울·경기·인천 추천 코스입니다.
          </p>
        </section>

        {/* 힐링 여행 가이드 카드 그리드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelSpots.map((spot, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-pink-200 hover:border-pink-400 p-6 rounded-3xl space-y-4 transition-all shadow-sm group relative overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-xl border border-pink-200">
                  📍 {spot.region}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider">
                  {spot.tag}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">
                  {spot.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {spot.desc}
                </p>
              </div>

              {/* 주요 스팟 태그 */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {spot.spots.map((item, itemIdx) => (
                  <span 
                    key={itemIdx}
                    className="text-[11px] bg-pink-50 text-gray-600 px-2.5 py-1 rounded-lg border border-pink-200 font-medium"
                  >
                    #{item}
                  </span>
                ))}
              </div>

              {/* 서라운드테라피 웰니스 팁 */}
              <div className="bg-pink-50/50 p-3.5 rounded-2xl border border-pink-100 text-[11px] text-gray-600 leading-relaxed">
                <strong className="text-pink-600 font-bold">🌿 서라운드테라피 릴렉스 팁:</strong> {spot.tip}
              </div>
            </div>
          ))}
        </section>

        {/* 여행 후 피로회복 연계 CTA 배너 */}
        <section className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white p-6 md:p-8 rounded-3xl text-center space-y-4 shadow-lg">
          <div className="space-y-1">
            <h3 className="text-base md:text-xl font-black text-white">
              🚗 즐거운 드라이브 후 지친 몸, 편안한 공간에서 풀어보세요
            </h3>
            <p className="text-xs text-pink-100 max-w-md mx-auto leading-relaxed">
              수도권 전지역 신속한 방문 매칭! 투명하고 정직한 정찰제로 나만의 아늑한 공간에서 1:1 맞춤 피로회복을 누리실 수 있습니다.
            </p>
          </div>
          <div>
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-2 bg-white text-pink-600 hover:bg-pink-50 font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all transform active:scale-95"
            >
              📞 서라운드테라피 실시간 방문 케어 예약하기
            </a>
          </div>
        </section>

        {/* 메인으로 돌아가기 버튼 */}
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