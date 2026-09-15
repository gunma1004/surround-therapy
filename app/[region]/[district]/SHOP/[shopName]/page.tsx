import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    shopName: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

// 🌟 제휴샵 전체 데이터 (S슬림테라피 상세 코스 및 요금표 포함)
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
    image: "/shop6.jpg",
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
      },
      {
        category: "🔮 스페셜 코스",
        badge: "SPECIAL",
        desc: "아로마와 타이, 발관리가 조합된 알찬 복합 맞춤 프로그램.",
        items: [
          { time: "120분 (아로마 60 + 타이 60)", price: "90,000원" },
          { time: "150분 (아로마 60 + 타이 60 + 발 30)", price: "120,000원", recommend: true },
          { time: "180분 (아로마 60 + 타이 60 + 발 60)", price: "150,000원" }
        ]
      },
      {
        category: "🔮 힐링 코스",
        badge: "POPULAR",
        desc: "일상의 지친 피로를 깊이 있게 풀어주는 프리미엄 힐링 코스.",
        items: [
          { time: "60분 코스", price: "90,000원" },
          { time: "90분 코스", price: "100,000원" },
          { time: "120분 코스", price: "120,000원", recommend: true },
          { time: "150분 코스", price: "150,000원" }
        ]
      },
      {
        category: "🔮 VIP 스웨디시",
        badge: "BEST",
        desc: "최상급 테라피로 누리는 럭셔리 감성 스웨디시 관리.",
        items: [
          { time: "60분 코스", price: "100,000원" },
          { time: "90분 코스", price: "120,000원" },
          { time: "120분 코스", price: "150,000원", recommend: true }
        ]
      }
    ],
    features: ["중부권 광역 출장", "정직한 정찰제", "맞춤형 힐러 배차", "후불 결제 시스템"]
  }
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { district, shopName } = resolvedParams;
  const searchDong = resolvedSearchParams.dong;
  
  const decodedDistrict = decodeURIComponent(district);
  const decodedDong = searchDong ? decodeURIComponent(searchDong) : "";
  const decodedShopSlug = decodeURIComponent(shopName);

  const shop = shopData[decodedShopSlug] || { name: "서라운드테라피 제휴점", phone: "0507-1280-3344" };
  const locationPrefix = decodedDong ? `${decodedDistrict} ${decodedDong}` : decodedDistrict;
  
  const charSum = (locationPrefix + shop.name + "surround_therapy_bypass_mix").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 30;

  // 🌟 스팸 회피형 타이틀 패턴 ("출장"과 "마사지" 분리)
  const titleVariants = [
    `${locationPrefix} 출장 전문 힐링 마사지 - ${shop.name} | 서라운드테라피`,
    `${locationPrefix} 출장 방문 릴렉스 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 프라이빗 맞춤 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 웰니스 바디 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 케어 전신 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 스웨디시 감성 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 아로마 오일 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 홈케어 맞춤 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 럭셔리 스파 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 감성 테라피 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 정통 바디 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 1:1 커스텀 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 안심 힐링 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 프리미엄 제휴 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 소프트 릴렉싱 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 신속 방문 스웨디시 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 전문 웰니스 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 딥티슈 바디 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 커스텀 아로마 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 VIP 힐링 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 스페셜 맞춤 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 안심 홈케어 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 프리미엄 릴렉스 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 피로해소 전신 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 맞춤형 스웨디시 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 힐링 가이드 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 실속형 바디 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 쾌적한 방문 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 종합 웰니스 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 최고급 감성 마사지 · ${shop.name}`
  ];

  // 🌟 스팸 회피형 메타 디스크립션 패턴
  const descriptionVariants = [
    `${locationPrefix} 출장 전문 힐링 마사지 제휴처 ${shop.name}. 선입금 없는 100% 후불제 안전 시스템으로 편안한 휴식을 선사합니다.`,
    `${locationPrefix} 출장 방문 릴렉스 마사지 서비스 안내. ${shop.name}에서 검증된 전문 관리사와 함께 지친 피로를 날려보세요.`,
    `${locationPrefix} 출장 프라이빗 맞춤 마사지 솔루션. ${shop.name}의 품격 있는 1:1 커스텀 코스를 지금 바로 만나보세요.`,
    `${locationPrefix} 출장 웰니스 바디 마사지 전문점 ${shop.name}. 신속한 방문과 정직한 정찰제로 안심하고 이용하실 수 있습니다.`,
    `${locationPrefix} 출장 케어 전신 마사지 안내. ${shop.name}에서 제공하는 프라이빗 프로그램으로 일상의 스트레스를 해소하세요.`,
    `${locationPrefix} 출장 스웨디시 힐링 마사지 제휴점 ${shop.name}. 향기로운 아로마와 부드러운 터치로 최고의 휴식을 경험하세요.`,
    `${locationPrefix} 출장 아로마 오일 마사지 전문 ${shop.name}. 숙련된 관리사의 품격 있는 바디케어 서비스를 제공합니다.`,
    `${locationPrefix} 출장 홈케어 맞춤 마사지 안내. ${shop.name}와 함께 편안한 공간에서 힐링 타임을 누려보세요.`,
    `${locationPrefix} 출장 럭셔리 스파 마사지 제휴샵 ${shop.name}. 철저한 위생 관리와 고객 만족 중심의 맞춤형 케어.`,
    `${locationPrefix} 출장 감성 테라피 마사지 전문 ${shop.name}. 몸과 마음의 피로를 편안하게 채워드립니다.`,
    `${locationPrefix} 출장 정통 바디 마사지 안내. ${shop.name}에서 신속하고 안전한 방문 서비스를 받아보세요.`,
    `${locationPrefix} 출장 1:1 커스텀 마사지 제휴처 ${shop.name}. 정직한 후불제 시스템으로 믿을 수 있는 웰니스 케어.`,
    `${locationPrefix} 출장 안심 힐링 마사지 서비스 ${shop.name}. 지친 몸에 활력을 불어넣어 주는 프리미엄 솔루션.`,
    `${locationPrefix} 출장 프리미엄 케어 마사지 전문 ${shop.name}. 뭉친 근육을 시원하게 풀어주는 커스텀 프로그램을 만나보세요.`,
    `${locationPrefix} 출장 소프트 릴렉싱 마사지 가이드 ${shop.name}. 편안하고 안심할 수 있는 방문 바디케어 서비스.`,
    `${locationPrefix} 출장 신속 방문 스웨디시 마사지 제휴점 ${shop.name}. 전문 힐러들의 손길로 완벽한 피로 회복을 선사합니다.`,
    `${locationPrefix} 출장 전문 웰니스 마사지 안내 ${shop.name}. 이동의 불편함 없이 내 공간에서 누리는 럭셔리 힐링.`,
    `${locationPrefix} 출장 딥티슈 바디 마사지 전문 ${shop.name}. 부드러운 오일 케어로 심신의 안정을 찾아드립니다.`,
    `${locationPrefix} 출장 커스텀 아로마 마사지 제휴샵 ${shop.name}. 투명하고 정직한 요금으로 품격 있는 케어를 제공합니다.`,
    `${locationPrefix} 출장 VIP 힐링 마사지 ${shop.name}. 고객 맞춤형 힐링 프로그램으로 최상의 만족도를 드립니다.`,
    `${locationPrefix} 출장 스페셜 맞춤 마사지 ${shop.name}. 최고급 퀄리티의 마사지로 일상의 품격을 높여보세요.`,
    `${locationPrefix} 출장 안심 홈케어 마사지 제휴점 ${shop.name}. 지친 일상 끝에 찾아오는 완벽한 휴식의 시간.`,
    `${locationPrefix} 출장 프리미엄 릴렉스 마사지 서비스 ${shop.name}. 철저한 검증을 거친 제휴점의 안전한 방문 케어.`,
    `${locationPrefix} 출장 피로해소 전신 마사지 ${shop.name}. 세심하고 정성스러운 터치로 묵은 피로를 해소하세요.`,
    `${locationPrefix} 출장 맞춤형 스웨디시 마사지 안내 ${shop.name}. 편안하고 아늑한 힐링 테라피를 지금 경험해 보세요.`,
    `${locationPrefix} 출장 힐링 테라피 마사지 제휴처 ${shop.name}. 빠르고 친절한 매칭으로 만족도를 더했습니다.`,
    `${locationPrefix} 출장 실속형 바디 마사지 솔루션 ${shop.name}. 체계적인 마사지 프로그램으로 활력을 되찾으세요.`,
    `${locationPrefix} 출장 쾌적한 방문 마사지 ${shop.name}. 깊은 근육까지 시원하게 이완시켜 주는 프리미엄 케어.`,
    `${locationPrefix} 출장 종합 웰니스 마사지 제휴샵 ${shop.name}. 정성과 실력을 갖춘 전문 관리사의 방문 서비스.`,
    `${locationPrefix} 출장 최고급 감성 마사지 ${shop.name}. 몸과 마음의 균형을 되찾아주는 안심 웰니스 솔루션.`
  ];

  const pageTitle = titleVariants[variantIndex];
  const pageDescription = descriptionVariants[variantIndex];

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `https://surround-therapy.netlify.app/${resolvedParams.region}/${encodeURIComponent(district)}/SHOP/${shopName}${decodedDong ? `?dong=${encodeURIComponent(decodedDong)}` : ""}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://surround-therapy.netlify.app/${resolvedParams.region}/${encodeURIComponent(district)}/SHOP/${shopName}${decodedDong ? `?dong=${encodeURIComponent(decodedDong)}` : ""}`,
      siteName: "서라운드테라피(Surround Therapy)",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function ShopDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { region, district, shopName } = resolvedParams;
  const searchDong = resolvedSearchParams.dong;
  
  const decodedDistrict = decodeURIComponent(district);
  const decodedDong = searchDong ? decodeURIComponent(searchDong) : "";
  const decodedShopSlug = decodeURIComponent(shopName);

  const shop = shopData[decodedShopSlug] || shopData["golden-therapy"];
  const locationPrefix = decodedDong ? `${decodedDistrict} ${decodedDong}` : decodedDistrict;

  return (
    <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen flex flex-col font-sans selection:bg-pink-400 selection:text-white pb-28">
      
      {/* 상단 네비게이션 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-pink-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-base font-black text-pink-600">서라운드테라피</Link>
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
                {locationPrefix} 출장 전문 힐링 마사지 - {shop.name}
              </h1>
              <p className="text-xs text-gray-500 leading-relaxed">
                {locationPrefix} 지역에서 만나보는 출장 방문 맞춤 제휴 서비스입니다. {shop.desc}
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

        {/* 코스 및 가격 안내 (S슬림 포함) */}
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

        {/* 전화 예약 버튼 바 */}
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
          <Link href={`/${region}/${encodeURIComponent(district)}${decodedDong ? `?dong=${encodeURIComponent(decodedDong)}` : ""}`} className="text-xs text-gray-500 hover:text-pink-600 font-semibold transition-colors">
            ← 이전 지역 목록으로 돌아가기
          </Link>
        </div>

      </main>
    </div>
  );
}