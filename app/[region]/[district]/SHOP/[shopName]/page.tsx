import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong?: string;
    shopName: string;
  }>;
}

const SITE_URL = "https://surround-therapy.netlify.app";

// 영문 구 코드를 한글 명칭으로 변환해 주는 매핑 딕셔너리
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

  // 천안 / 아산 / 대전 / 청주
  dongnam: "동남구", seobuk: "서북구", asan_city: "아산시",
  dong: "동구", jung_gu: "중구", seo: "서구", yuseong: "유성구", daedeok: "대덕구",
  sangdang: "상당구", seowon: "서원구", heungdeok: "흥덕구", cheongwon: "청원구"
};

// 🛠️ 이중 디코딩 방어 함수
function safeDecode(str?: string): string {
  if (!str) return "";
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

function getDistrictDisplayName(rawDistrict?: string): string {
  const decoded = safeDecode(rawDistrict);
  return districtNameMap[decoded] || decoded;
}

function getRegionName(regionCode?: string): string {
  switch (regionCode?.toLowerCase()) {
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

function parseLocationText(region?: string, district?: string, dong?: string): string {
  const regionName = getRegionName(region);
  const districtName = getDistrictDisplayName(district);
  const dongName = safeDecode(dong);
  return dongName ? `${regionName} ${districtName} ${dongName}`.trim() : `${regionName} ${districtName}`.trim();
}

// 🌟 1. '출장' 뒤에 붙는 완충 수식어 풀 (35개)
const prefixAdjectives = [
  "소프트", "프리미엄", "릴렉스", "감성", "프라이빗",
  "스페셜", "힐링", "딥티슈", "명품", "맞춤형",
  "안심", "쾌적한", "정성", "토탈", "순환",
  "포근한", "전신", "실속형", "프로페셔널", "럭셔리",
  "시그니처", "활력", "바디케어", "클래식", "컴포트",
  "디톡스", "정통", "체형맞춤", "차분한", "피로해소",
  "노련한", "깔끔한", "산뜻한", "탁월한", "안락한"
];

// 🌟 2. '마사지' 바로 앞에 붙는 코스 테크닉 풀 (16개)
const coreTechniques = [
  "스웨디시", "아로마", "타이", "바디",
  "릴렉싱", "테라피", "웰니스", "홈케어",
  "림프케어", "컨디셔닝", "스트레칭", "이완",
  "에스테틱", "오일", "건식", "감성케어"
];

// 🌟 3. 2단: '안마' 및 스팸 키워드를 완전히 배제한 50개 풀
const secondaryActions = [
  "전지역 실시간 방문예약", "테라피 코스 예약", "힐링 테라피 추천예약", "바디케어 코스예약",
  "웰니스 케어 방문안내", "구·동 전지역 방문안내", "스웨디시 통합예약", "안심 방문케어 안내",
  "맞춤 테라피 예약", "전신 릴렉스 케어예약", "홈케어 실시간 빠른예약", "힐링 바디 프로그램",
  "전문 테라피 1:1 예약", "바디 관리 코스안내", "프리미엄 테라피 예약", "쾌적한 방문케어 접수",
  "야간 힐링 실시간예약", "명품 에스테틱 코스안내", "감성 테라피 예약", "당일 1:1 방문예약",
  "정찰제 테라피 예약안내", "후불제 안심 코스접수", "전신 릴렉싱 케어안내", "전문 힐러진 추천예약",
  "피로회복 웰니스 예약", "토탈 바디케어 방문예약", "심야 힐링 방문안내", "스파 테라피 코스예약",
  "1:1 프라이빗 케어예약", "순환 림프 테라피안내", "체형맞춤 케어 코스예약", "아로마 바디 방문예약",
  "정통 테라피 실시간예약", "VIP 힐링 코스접수", "안심방문 테라피 예약", "바디 밸런스 케어안내",
  "도심 속 힐링 방문안내", "프라이빗 테라피 예약", "신속 홈케어 방문예약", "동네 안심 테라피안내",
  "우리동네 힐링케어 예약", "실속 바디 프로그램안내", "클래식 테라피 예약", "집중 이완 케어예약",
  "데일리 리프레시 방문접수", "맞춤형 바디케어 예약", "디톡스 테라피 코스예약", "럭셔리 힐링 방문안내",
  "대표 에스테틱 프로그램예약", "온전한 휴식 힐링안내"
];

// 🌟 4. 3단: 상호명/도메인 대신 배치하는 순수 소구 키워드 풀 (8개)
const tertiaryActionPatterns = [
  "1:1 맞춤 방문케어", "프라이빗 힐링 안내", "전신 피로회복 총정리",
  "정직한 정찰제 안심 가이드", "당일 예약 맞춤 코스", "최고급 힐러진 프로그램",
  "안심 후불제 웰니스 안내", "전신 릴렉스 힐링 추천"
];

// 🌟 5. 디스크립션 가격 및 운영시간 소구점 조합 풀 (10개)
const priceHooks = [
  "건식 7만원부터 저녁 7시~새벽 5시 심야할증 없이 운영합니다.",
  "타이 6만원부터 저녁 7시~새벽 5시 추가할증 없이 방문합니다.",
  "스웨디시 8만원부터 저녁 7시~새벽 5시 동일한 정찰제로 운영합니다.",
  "아로마 7만원부터 저녁 7시~새벽 5시 야간할증 없이 신속 방문합니다.",
  "기본 코스 6만원부터 저녁 7시~새벽 5시 심야 추가요금 없이 진행합니다.",
  "건식 7만원부터 저녁 7시~새벽 5시 100% 현장 후불제로 운영합니다.",
  "전신 릴렉스 7만원부터 저녁 7시~새벽 5시 심야할증 0원으로 방문합니다.",
  "힐링 코스 8만원부터 저녁 7시~새벽 5시 야간 추가금 없이 이용 가능합니다.",
  "맞춤 코스 7만원부터 저녁 7시~새벽 5시 변동 없는 정찰 요금으로 운영합니다.",
  "스페셜 코스 9만원부터 저녁 7시~새벽 5시 심야할증 없는 후불제로 찾아갑니다."
];

// 제휴샵 데이터
const shopData: Record<string, {
  name: string;
  cleanName: string;
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
    cleanName: "골든테라피",
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
    cleanName: "미인테라피",
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
    cleanName: "주주테라피",
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
    cleanName: "퀸즈홈테라피",
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
    cleanName: "오늘밤테라피",
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
    cleanName: "S슬림테라피",
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
    features: ["중부권 광역 방문", "정직한 정찰제", "맞춤형 힐러 배차", "후불 결제 시스템"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const region = resolvedParams?.region || "";
    const rawDistrict = resolvedParams?.district || "";
    const district = getDistrictDisplayName(rawDistrict);
    const dong = safeDecode(resolvedParams?.dong);
    const rawShopName = resolvedParams?.shopName || "";
    const shopNameSlug = safeDecode(rawShopName);
    const shop = shopData[shopNameSlug] || shopData["golden-therapy"];

    const regionName = getRegionName(region);
    const locationPrefix = parseLocationText(region, rawDistrict, dong);
    const targetDistrict = dong ? `${district} ${dong}` : district;
    
    // 🌟 순차적 인덱스 계산 (지역, 샵슬러그, 35x16x50 대규모 조합 해시)
    const combinedKey = `${locationPrefix}-${shopNameSlug}-pure-district-shop-v4`;
    const charSum = combinedKey.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const adjIdx = charSum % prefixAdjectives.length;
    const techIdx = (charSum * 3) % coreTechniques.length;
    const actionIdx = (charSum * 5) % secondaryActions.length;
    const tertiaryIdx = (charSum * 7) % tertiaryActionPatterns.length;
    const priceIdx = (charSum * 11) % priceHooks.length;

    const selectedAdj = prefixAdjectives[adjIdx];
    const selectedTech = coreTechniques[techIdx];
    const selectedAction = secondaryActions[actionIdx];
    const selectedTertiary = tertiaryActionPatterns[tertiaryIdx];
    const selectedPriceHook = priceHooks[priceIdx];

    // 💡 [강서구 출장 소프트 스웨디시 마사지·홈타이 | 서울 전지역 실시간 방문예약 | 1:1 맞춤 방문케어] (약 45~50자)
    // 브랜드명 완전 배제 + '출장'과 '마사지' 완충 단어 2개 삽입
    const pageTitle = `${targetDistrict} 출장 ${selectedAdj} ${selectedTech} 마사지·홈타이 | ${regionName} ${selectedAction} | ${selectedTertiary}`;
    
    // 💡 디스크립션에서도 '출장'과 '마사지' 분리 배치 + 운영시간/심야할증 훅 적용
    const pageDescription = `${locationPrefix} 출장 방문 케어. 전문 관리사 100% 후불제 마사지·홈타이 안내. ${selectedPriceHook}`;

    const canonicalPath = dong 
      ? `${SITE_URL}/${region}/${rawDistrict}/${resolvedParams?.dong}/SHOP/${shopNameSlug}`
      : `${SITE_URL}/${region}/${rawDistrict}/SHOP/${shopNameSlug}`;

    return {
      metadataBase: new URL(SITE_URL),
      title: {
        absolute: pageTitle,
      },
      description: pageDescription,
      alternates: { canonical: canonicalPath },
      keywords: [
        `${locationPrefix} 마사지`,
        `${targetDistrict} 출장`,
        `${targetDistrict} 홈타이`,
        `${targetDistrict} 스웨디시`,
        `${regionName} 방문예약`,
        "100% 후불제"
      ],
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: canonicalPath,
        locale: "ko_KR",
        type: "article",
      },
    };
  } catch {
    return { title: "방문 홈케어 정보 안내", description: "프리미엄 힐링 테라피 제휴점 상세 정보" };
  }
}

export async function generateStaticParams() {
  return [];
}

export default async function ShopDetailPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const region = resolvedParams?.region || "";
    const rawDistrict = resolvedParams?.district || "";
    const district = getDistrictDisplayName(rawDistrict);
    const rawDong = resolvedParams?.dong || "";
    const dong = safeDecode(rawDong);
    const rawShopName = resolvedParams?.shopName || "";
    const shopNameSlug = safeDecode(rawShopName);

    const regionName = getRegionName(region);
    const shop = shopData[shopNameSlug] || shopData["golden-therapy"];
    const locationPrefix = parseLocationText(region, rawDistrict, dong);
    const backUrl = dong ? `/${region}/${rawDistrict}/${rawDong}` : `/${region}/${rawDistrict}`;

    return (
      <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen flex flex-col font-sans selection:bg-pink-400 selection:text-white pb-28">
        
        {/* 상단 네비게이션 */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-pink-200 px-4 py-3 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-base font-black text-pink-600">방문 홈케어 가이드</Link>
            <span className="text-xs text-gray-500 font-semibold">📍 위치: {locationPrefix}</span>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
          
          {/* 샵 타이틀 카드 */}
          <section className="bg-white border border-pink-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img 
                src={shop.image} 
                alt={`${locationPrefix} 방문 웰니스 케어 - ${shop.cleanName}`} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border border-pink-100 shadow-md"
              />
              <div className="flex-1 space-y-2 text-center md:text-left">
                <span className="inline-block bg-pink-100 text-pink-600 text-[11px] font-black px-2.5 py-1 rounded-full">
                  {shop.badge}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                  {locationPrefix} 바디 힐링 안내 - <span className="text-pink-600">{shop.cleanName}</span>
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