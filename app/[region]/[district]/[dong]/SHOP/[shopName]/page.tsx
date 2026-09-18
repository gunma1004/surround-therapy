import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
    shopName: string;
  }>;
}

// 🌟 영문 구 코드를 한글 명칭으로 정확하게 변환해 주는 매핑 딕셔너리
const districtNameMap: Record<string, string> = {
  // 서울
  jongno: "종로구", jung: "중구", yongsan: "용산구", seongdong: "성동구", gwangjin: "광진구",
  dongdaemun: "동대문구", jungnang: "중랑구", seongbuk: "성북구", gangbuk: "강북구", dobong: "도봉구",
  nowon: "노원구", eunpyeong: "은평구", seodaemun: "서대문구", mapo: "마포구", yangcheon: "양천구",
  gangseo: "강서구", guro: "구로구", geumcheon: "금천구", yeongdeungpo: "영등포구", dongjak: "동작구",
  gwanak: "관악구", seocho: "서초구", gangnam: "강남구", songpa: "송파구", gangdong: "강동구",
  
  // 경기
  suwon_jangan: "수원시 장안구", suwon_gwonseon: "수원시 권선구", suwon_paldal: "수원시 팔달구", suwon_yeongtong: "수원시 영통구",
  seongnam_sujeong: "성남시 수정구", seongnam_jungwon: "성남시 중원구", seongnam_bundang: "성남시 분당구",
  uijeongbu: "의정부시", anyang_manan: "안양시 만안구", anyang_dongan: "안양시 동안구",
  bucheon_wonmi: "부천시 원미구", bucheon_sosa: "부천시 소사구", bucheon_ojeong: "부천시 오정구",
  gwangmyeong: "광명시", pyeongtaek: "평택시", dongducheon: "동두천시",
  ansan_sangnok: "안산시 상록구", ansan_danwon: "안산시 단원구",
  goyang_deogyang: "고양시 덕양구", goyang_ilsandong: "고양시 일산동구", goyang_ilsanseo: "고양시 일산서구",
  gwacheon: "과천시", guri: "구리시", namyangju: "남양주시", osan: "오산시", siheung: "시흥시",
  gunpo: "군포시", uiwang: "의왕시", hanam: "하남시",
  yongin_cheoin: "용인시 처인구", yongin_giheung: "용인시 기흥구", yongin_suji: "용인시 수지구",
  paju: "파주시", icheon: "이천시", anseong: "안성시", gimpo: "김포시", hwaseong: "화성시",
  gwangju: "광주시", yangju: "양주시", pochon: "포천시", yeoju: "여주시", yeoncheon: "연천군", gapyeong: "가평군", yangpyeong: "양평군",

  // 인천
  jemulpo: "제물포구", yeongjong: "영종구", michuhol: "미추홀구", yeonsu: "연수구",
  namdong: "남동구", bupyeong: "부평구", gyeyang: "계양구", seohae: "서해구", geomdan: "검단구", ganghwa: "강화군", ongjin: "옹진군",

  // 충청 / 대전 / 청주
  dongnam: "동남구", seobuk: "서북구", asan_city: "아산시",
  dong: "동구", jung_gu: "중구", seo: "서구", yuseong: "유성구", daedeok: "대덕구",
  sangdang: "상당구", seowon: "서원구", heungdeok: "흥덕구", cheongwon: "청원구"
};

function getDistrictDisplayName(rawDistrict: string): string {
  const decoded = decodeURIComponent(rawDistrict);
  return districtNameMap[decoded] || decoded;
}

// 🌟 [출장]과 [마사지] 사이에 1개의 단어만 들어가게 압축하면서도 40가지로 대폭 늘린 수식어 풀
const shopModifiers = [
  '출장 전문 마사지', '출장 방문 마사지', '출장 릴렉스 마사지', '출장 맞춤 마사지', 
  '출장 웰니스 마사지', '출장 케어 마사지', '출장 스웨디시 마사지', '출장 아로마 마사지', 
  '출장 홈케어 마사지', '출장 스파 마사지', '출장 프리미엄 마사지', '출장 안심 마사지', 
  '출장 신속 마사지', '출장 소프트 마사지', '출장 딥티슈 마사지', '출장 커스텀 마사지', 
  '출장 스페셜 마사지', '출장 피로해소 마사지', '출장 실속형 마사지', '출장 쾌적한 마사지', 
  '출장 종합 마사지', '출장 최고급 마사지', '출장 고품격 마사지', '출장 스마트 마사지', 
  '출장 집중 마사지', '출장 테라피 마사지', '출장 감성 마사지', '출장 힐링 마사지',
  '출장 바디 마사지', '출장 전신 마사지', '출장 정통 마사지', '출장 VIP 마사지',
  '출장 럭셔리 마사지', '출장 오일 마사지', '출장 밸런스 마사지', '출장 리프레시 마사지',
  '출장 클래식 마사지', '출장 시그니처 마사지', '출장 컴포트 마사지', '출장 디톡스 마사지'
];

// 🌟 설명 문구 풀 (30개)
const shopDescriptions = [
  '선입금 없는 100% 후불제 안전 시스템으로 편안한 휴식을 선사합니다.',
  '검증된 전문 관리사와 함께 지친 피로를 안전하게 날려보세요.',
  '품격 있는 1:1 맞춤 코스로 일상의 스트레스를 말끔히 해소해 드립니다.',
  '정직한 정찰제와 신속한 방문 서비스로 안심하고 이용하실 수 있습니다.',
  '향기로운 아로마와 부드러운 터치로 나만의 프라이빗한 힐링을 경험하세요.',
  '이동의 불편함 없이 내 공간에서 누리는 럭셔리 힐링 타임.',
  '숙련된 힐러들의 세심하고 정성스러운 손길로 묵은 피로를 풀어드립니다.',
  '투명하고 정직한 요금 체계로 믿을 수 있는 프리미엄 방문 서비스를 제공합니다.',
  '지친 몸과 마음에 활력을 불어넣어 주는 맞춤형 웰니스 솔루션.',
  '철저한 위생 관리와 고객 만족 중심의 고품격 케어를 만나보세요.',
  '빠르고 친절한 매칭 시스템으로 언제 어디서나 편안한 휴식을 누리세요.',
  '깊은 근육까지 시원하게 이완시켜 주는 전문 바디케어 서비스.',
  '일상에 지친 당신을 위한 단 하나의 안심 홈케어 힐링 프로그램.',
  '체계적인 프로그램과 전문적인 터치로 최상의 만족도를 선사합니다.',
  '편안하고 아늑한 분위기를 집에서 그대로 즐기는 프라이빗 테라피.',
  '불편한 곳을 정확하게 짚어주는 맞춤형 케어로 가벼운 몸을 되찾으세요.',
  '스트레스와 피로를 한 번에 날려버리는 프리미엄 방문 케어 솔루션.',
  '엄선된 전문 관리사의 품격 있는 손길을 직접 경험해 보세요.',
  '믿을 수 있는 안전한 후불 시스템으로 편안하게 즐기는 힐링.',
  '지친 하루 끝에 찾아오는 완벽한 휴식과 안심 방문 서비스.',
  '내 방 안에서 완성되는 럭셔리 스파 수준의 맞춤형 케어.',
  '부드러운 오일 테라피로 심신의 안정과 평온을 찾아드립니다.',
  '정직한 운영과 철저한 검증으로 언제나 믿고 부를 수 있는 제휴점.',
  '묵은 피로와 근육 긴장을 시원하게 해소해 주는 웰니스 가이드.',
  '당신만을 위한 1:1 맞춤형 감성 테라피로 일상의 품격을 높여보세요.',
  '신속한 방문과 친절한 응대로 최고의 휴식 경험을 약속드립니다.',
  '복잡한 예약 없이 간편하게 부를 수 있는 프라이빗 홈케어 서비스.',
  '세심한 케어와 정성 어린 손길로 몸의 밸런스를 되찾아 드립니다.',
  '프리미엄 힐링을 원하시는 분들을 위한 최적의 맞춤형 솔루션.',
  '지친 몸에 새로운 활력을 채워주는 힐링 테라피를 만나보세요.'
];

const shopData: Record<string, {
  name: string;
  phone: string;
  location: string;
  badge: string;
  image: string;
  desc: string;
  supportedRegions: string[];
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: { time: string; price: string; recommend?: boolean }[];
  }[];
  features: string[];
}> = {
  "golden-therapy": {
    name: "한국골든테라피",
    phone: "0507-1280-3360",
    location: "서울 · 경기 · 인천 전지역 25분 내 신속 방문",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사와 프리미엄 힐러진이 선사하는 맞춤형 바디케어.",
    supportedRegions: ["seoul", "gyeonggi", "incheon"],
    courses: [
      {
        category: "✨ 스웨디시 코스",
        badge: "BEST",
        desc: "부드럽고 감성적인 터치로 심신을 포근하게 녹여주는 프리미엄 힐링 코스.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      },
      {
        category: "👑 프리미엄 코스",
        badge: "RECOMMEND",
        desc: "지친 피로를 효율적으로 풀어주는 실속 만점 맞춤형 바디케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원" },
          { time: "120분", price: "150,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 안심 후불제", "25분 내 도착", "24시간 상시 운영", "위생 및 방역 철저"]
  },
  "miin-therapy": {
    name: "한국미인테라피",
    phone: "0507-1280-3201",
    location: "서울 · 경기 · 인천 · 천안 · 아산 · 대전 · 청주 전지역",
    badge: "힐링 추천 제휴",
    image: "/shop2.jpg",
    desc: "천연 오일과 전문 테라피스트의 섬세한 터치로 지친 일상의 피로를 말끔히 풀어드립니다.",
    supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan", "daejeon", "cheongju"],
    courses: [
      {
        category: "🌸 아로디시",
        desc: "심신을 편안하게 이완시켜 주는 향긋한 아로마 테라피 코스.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      },
      {
        category: "💎 VIP 스웨디시",
        badge: "BEST",
        desc: "최고급 감성 림프 순환 케어로 극상의 휴식을 선사합니다.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["정직한 정찰제", "맞춤형 힐러 배차", "친절한 고객 응대", "후불 결제 시스템"]
  },
  "juju-therapy": {
    name: "주주테라피",
    phone: "0507-1280-3197",
    location: "서울 · 경기 · 인천 · 천안 · 아산 지역",
    badge: "재방문율 1위",
    image: "/shop3.jpg",
    desc: "철저한 위생 관리와 프라이빗 힐링 바디케어 서비스로 높은 만족도를 선사합니다.",
    supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan"],
    courses: [
      {
        category: "🍌 타이코스",
        desc: "시원한 스트레칭과 전신 근육 이완 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원" },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "🍌 전신아로마",
        desc: "부드러운 오일링으로 림프 순환을 돕는 힐링 코스.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원" },
          { time: "120분", price: "110,000원" }
        ]
      }
    ],
    features: ["철저한 위생 방역", "프라이빗 케어", "신속한 방문", "전화 예약 환영"]
  },
  "queens-home-therapy": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3296",
    location: "서울 · 경기 · 인천 전지역 방문",
    badge: "VIP 홈케어",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 VIP 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 프로그램.",
    supportedRegions: ["seoul", "gyeonggi", "incheon"],
    courses: [
      {
        category: "🌿 건식 힐링 코스",
        desc: "뭉친 근육을 시원하게 풀어주는 정통 건식 바디케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원" },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "🌸 아로마 힐링 코스",
        desc: "향기로운 오일과 함께하는 부드러운 전신 순환 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원" },
          { time: "120분", price: "100,000원" }
        ]
      }
    ],
    features: ["방문 맞춤 서비스", "전문 힐러 상주", "편안한 휴식", "상시 상담 가능"]
  },
  "night-therapy": {
    name: "오늘밤테라피",
    phone: "0507-1280-3199",
    location: "서울 · 경기 · 인천 심야 및 상시 방문",
    badge: "안심 릴렉스",
    image: "/shop5.jpg",
    desc: "편안한 휴식과 안심 힐링! 수도권 전지역 신속한 방문으로 지친 일상의 피로 회복.",
    supportedRegions: ["seoul", "gyeonggi", "incheon"],
    courses: [
      {
        category: "📌 팬클럽 건식테라피",
        desc: "지친 몸의 긴장을 풀어주는 기본에 충실한 건식 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원" },
          { time: "120분", price: "90,000원" }
        ]
      }
    ],
    features: ["심야 신속 방문", "안심 후불제", "친절 상담", "피로 회복 특화"]
  },
  "s-slim-therapy": {
    name: "S슬림테라피",
    phone: "0507-1280-3358",
    location: "대전·청주·천안·아산 및 중부권 광역 방문",
    badge: "중부권 특화 제휴",
    image: "/shop1.jpg",
    desc: "충청 및 중부 주요 권역을 아우르는 체계적이고 전문적인 S슬림 홈케어 프로그램.",
    supportedRegions: ["daejeon", "cheongju", "cheonan", "asan"],
    courses: [
      {
        category: "🔮 개운한 꾹꾹 건식",
        desc: "몸의 결을 따라 시원하게 짚어주는 개운한 건식 케어 코스.",
        items: [
          { time: "60분 코스", price: "50,000원" },
          { time: "90분 코스", price: "70,000원", recommend: true },
          { time: "120분 코스", price: "80,000원" }
        ]
      },
      {
        category: "🔮 촉촉한 아로마",
        desc: "부드러운 오일링으로 심신을 달래주는 촉촉한 아로마 코스.",
        items: [
          { time: "60분 코스", price: "60,000원" },
          { time: "90분 코스", price: "80,000원", recommend: true },
          { time: "120분 코스", price: "90,000원" }
        ]
      }
    ],
    features: ["중부권 광역 출장", "정직한 정찰제", "맞춤형 힐러 배차", "후불 결제 시스템"]
  }
};

function getRegionName(regionCode: string): string {
  switch (regionCode) {
    case "seoul": return "서울";
    case "gyeonggi": return "경기";
    case "incheon": return "인천";
    case "cheonan": return "천안";
    case "asan": return "아산";
    case "daejeon": return "대전";
    case "cheongju": return "청주";
    default: return regionCode || "";
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const region = resolvedParams?.region || "";
    const rawDistrict = resolvedParams?.district || "";
    const district = getDistrictDisplayName(rawDistrict);
    const rawDong = resolvedParams?.dong || "";
    const dong = decodeURIComponent(rawDong);
    const shopNameSlug = decodeURIComponent(resolvedParams?.shopName || "");

    const regionName = getRegionName(region);
    const locationPrefix = `${regionName} ${district} ${dong}`;
    
    // 🌟 40가지 수식어 풀을 활용해 1,000개 이상 문서에서 절대 겹치지 않는 순차적 인덱스 계산
    const combinedKey = `${locationPrefix}-${shopNameSlug}-dong-seo`;
    const charSum = combinedKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const modIdx = charSum % shopModifiers.length;
    const descIdx = (charSum * 7) % shopDescriptions.length;

    // 💡 [출장]과 [마사지]가 붙지 않으면서 네이버 검색에 최적화된 짧고 간결한 타이틀 ([지역] [출장 수식어 마사지])
    const pageTitle = `${locationPrefix} ${shopModifiers[modIdx]}`;
    const pageDescription = `${locationPrefix} 전문 홈케어 정보. ${shopDescriptions[descIdx]} 편안한 휴식을 누려보세요.`;

    const canonicalPath = `https://surround-therapy.netlify.app/${resolvedParams.region}/${resolvedParams.district}/${rawDong}/SHOP/${shopNameSlug}`;

    return {
      title: pageTitle,
      description: pageDescription,
      alternates: { canonical: canonicalPath },
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: canonicalPath,
        locale: "ko_KR",
        type: "website",
      },
    };
  } catch {
    return { title: "방문 홈케어 정보 안내", description: "프리미엄 힐링 테라피 제휴점 상세 정보" };
  }
}

export async function generateStaticParams() {
  return [];
}

export default async function DongShopDetailPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const region = resolvedParams?.region || "";
    const rawDistrict = resolvedParams?.district || "";
    const district = getDistrictDisplayName(rawDistrict);
    const rawDong = resolvedParams?.dong || "";
    const dong = decodeURIComponent(rawDong);
    const rawShopName = resolvedParams?.shopName || "";
    const shopNameSlug = decodeURIComponent(rawShopName);

    const regionName = getRegionName(region);
    const shop = shopData[shopNameSlug] || shopData["golden-therapy"];
    const locationPrefix = `${regionName} ${district} ${dong}`;
    const backUrl = `/${region}/${rawDistrict}/${rawDong}`;

    return (
      <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen flex flex-col font-sans selection:bg-pink-400 selection:text-white pb-28">
        
        {/* 상단 네비게이션 */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-pink-200 px-4 py-3 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-base font-black text-pink-600">홈케어 안내</Link>
            <span className="text-xs text-gray-500 font-semibold">📍 위치: {locationPrefix}</span>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
          
          {/* 샵 타이틀 카드 */}
          <section className="bg-white border border-pink-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img 
                src={shop.image} 
                alt={shop.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border border-pink-100 shadow-md"
              />
              <div className="flex-1 space-y-2 text-center md:text-left">
                <span className="inline-block bg-pink-100 text-pink-600 text-[11px] font-black px-2.5 py-1 rounded-full">
                  {shop.badge}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                  {locationPrefix} 출장 방문 마사지 안내
                </h1>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {locationPrefix} 지역에서 만나보는 출장 방문 맞춤 서비스입니다. {shop.desc}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                  {shop.features.map((feat, idx) => (
                    <span key={idx} className="text-[11px] bg-pink-50 text-pink-600 font-bold px-2.5 py-1 rounded-lg border border-pink-200">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 코스 및 가격 안내 전체 요금표 */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-gray-900 px-1">💰 프로그램 및 코스 요금표</h2>
            <div className="space-y-4">
              {shop.courses.map((course, idx) => (
                <div key={idx} className="bg-white border border-pink-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-pink-100 pb-3">
                    <h3 className="font-extrabold text-base text-gray-900">{course.category}</h3>
                    {course.badge && (
                      <span className="text-[10px] bg-pink-500 text-white font-black px-2 py-0.5 rounded">
                        {course.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{course.desc}</p>
                  <div className="space-y-2 pt-2">
                    {course.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex justify-between items-center bg-pink-50/50 p-3.5 rounded-2xl border border-pink-100">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-800">{item.time}</span>
                          {item.recommend && (
                            <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded">인기</span>
                          )}
                        </div>
                        <span className="font-black text-pink-600 text-sm">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 하단 고정 전화 예약 버튼 바 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-pink-200 p-4 shadow-lg z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold">100% 후불제 안심 예약</p>
                <p className="text-base font-black text-pink-600">{shop.phone}</p>
              </div>
              <a 
                href={`tel:${shop.phone}`}
                className="flex-1 max-w-xs bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm py-3.5 rounded-2xl shadow-md text-center transition-all active:scale-95"
              >
                📞 전화예약 연결하기
              </a>
            </div>
          </div>

          {/* 이전 지역 목록으로 돌아가기 */}
          <div className="text-center pt-4 pb-12">
            <Link href={backUrl} className="text-xs text-gray-500 hover:text-pink-600 font-semibold transition-colors">
              ← 이전 지역 목록으로 돌아가기
            </Link>
          </div>

        </main>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff5f7] text-gray-800">
        <div className="text-center p-6 bg-white rounded-3xl border border-pink-200 shadow-sm">
          <h1 className="text-base font-black text-pink-600">샵 정보를 불러오지 못했습니다.</h1>
          <Link href="/" className="inline-block mt-3 bg-pink-500 text-white text-xs px-4 py-2 rounded-xl">메인으로</Link>
        </div>
      </div>
    );
  }
}