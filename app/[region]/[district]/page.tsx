import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

function ClientTextMixerInline({ locationText }: { locationText: string }) {
  return (
    <div className="bg-white border border-pink-200 rounded-2xl p-4 text-center shadow-sm">
      <p className="text-xs text-gray-600">
        ✨ <strong className="text-pink-600">{locationText}</strong> 지역 검증된 프리미엄 힐링 가이드와 신속한 제휴 서비스를 만나보세요.
      </p>
    </div>
  );
}

const shopData: Record<string, {
  name: string;
  phone: string;
  location: string;
  badge: string;
  image: string;
  desc: string;
  supportedRegions: string[];
  features: string[];
}> = {
  "golden-therapy": {
    name: "한국골든테라피",
    phone: "0507-1280-3360",
    location: "서울 · 경기 · 인천 전지역 신속 방문",
    badge: "단독 특가 제휴",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사와 프리미엄 힐러진이 선사하는 맞춤형 바디케어.",
    supportedRegions: ["seoul", "gyeonggi", "incheon"],
    features: ["100% 안심 후불제", "25분 내 도착", "24시간 상시 운영"]
  },
  "miin-therapy": {
    name: "한국미인테라피",
    phone: "0507-1280-3201",
    location: "서울 · 경기 · 인천 · 천안 · 아산 · 대전 · 청주 전지역",
    badge: "힐링 추천 제휴",
    image: "/shop2.jpg",
    desc: "천연 오일과 전문 테라피스트의 섬세한 터치로 지친 일상의 피로를 말끔히 풀어드립니다.",
    supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan", "daejeon", "cheongju"],
    features: ["정직한 정찰제", "맞춤형 힐러 배차", "친절한 고객 응대"]
  },
  "night-therapy": {
    name: "오늘밤테라피",
    phone: "0507-1280-3199",
    location: "서울 · 경기 · 인천 심야 및 상시 방문",
    badge: "안심 릴렉스",
    image: "/shop5.jpg",
    desc: "편안한 휴식과 안심 힐링! 수도권 전지역 신속한 방문으로 지친 일상의 피로 회복.",
    supportedRegions: ["seoul", "gyeonggi", "incheon"],
    features: ["심야 신속 방문", "안심 후불제", "친절 상담"]
  },
  "juju-therapy": {
    name: "주주테라피",
    phone: "0507-1280-3197",
    location: "서울 · 경기 · 인천 · 천안 · 아산 지역",
    badge: "재방문율 1위",
    image: "/shop3.jpg",
    desc: "철저한 위생 관리와 프라이빗 힐링 바디케어 서비스로 높은 만족도를 선사합니다.",
    supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan"],
    features: ["철저한 위생 방역", "프라이빗 케어", "신속한 방문"]
  },
  "queens-home-therapy": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3296",
    location: "서울 · 경기 · 인천 전지역 방문",
    badge: "VIP 홈케어",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 VIP 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 프로그램.",
    supportedRegions: ["seoul", "gyeonggi", "incheon"],
    features: ["방문 맞춤 서비스", "전문 힐러 상주", "편안한 휴식"]
  },
  "s-slim-therapy": {
    name: "S슬림테라피",
    phone: "0507-1280-3358",
    location: "대전·청주·천안·아산 및 중부권 광역 방문",
    badge: "중부권 특화 제휴",
    image: "/shop1.jpg",
    desc: "충청 및 중부 주요 권역을 아우르는 체계적이고 전문적인 슬림 릴렉싱 케어.",
    supportedRegions: ["daejeon", "cheongju", "cheonan", "asan"],
    features: ["광역 출장 케어", "맞춤형 슬림 림프 관리", "철저한 프라이버시 보장"]
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

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    
    const region = resolvedParams?.region || "";
    const district = resolvedParams?.district || "";
    const dongName = resolvedSearchParams?.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
    
    let districtName = "";
    try {
      districtName = decodeURIComponent(district);
    } catch {
      districtName = district;
    }

    const regionName = getRegionName(region);
    const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;
    const fullLocationKeyword = `${regionName} ${simpleLocation}`.trim();

    return {
      title: `${fullLocationKeyword} 프리미엄 힐링 테라피 안내 - 서라운드테라피`,
      description: `${fullLocationKeyword} 프리미엄 힐링 테라피 안내. 편안하고 신속한 제휴 샵 방문 서비스를 서라운드테라피에서 확인하세요.`,
      keywords: [`${fullLocationKeyword} 힐링 테라피`, "서라운드테라피"],
      alternates: {
        canonical: `https://surround-therapy.netlify.app/${region}/${district}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
      },
      openGraph: {
        title: `${fullLocationKeyword} 프리미엄 힐링 테라피 안내 - 서라운드테라피`,
        description: `${fullLocationKeyword} 프리미엄 힐링 테라피 안내.`,
        url: `https://surround-therapy.netlify.app/${region}/${district}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
        siteName: "서라운드테라피(Surround Therapy)",
        locale: "ko_KR",
        type: "website",
      },
    };
  } catch {
    return {
      title: "프리미엄 힐링 테라피 안내 - 서라운드테라피",
      description: "서라운드테라피 지역별 제휴 샵 안내 서비스",
    };
  }
}

export async function generateStaticParams() {
  return [];
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
  try {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const region = resolvedParams?.region || "";
    const district = resolvedParams?.district || "";
    const dongName = resolvedSearchParams?.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
    
    let districtName = "";
    try {
      districtName = decodeURIComponent(district);
    } catch {
      districtName = district;
    }

    const regionName = getRegionName(region);
    const fullTitle = dongName ? `${regionName} ${districtName} ${dongName}` : `${regionName} ${districtName}`;

    const localShops = Object.entries(shopData)
      .filter(([_, shop]) => shop.supportedRegions.includes(region))
      .map(([slug, shop], index) => ({
        id: index + 1,
        slug: slug,
        name: `✨ ${fullTitle} ${shop.name}`,
        desc: shop.desc,
        phone: shop.phone,
        price: "60,000원부터~",
        image: shop.image
      }));

    return (
      <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen flex flex-col font-sans selection:bg-pink-400 selection:text-white">
        <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
          <section className="relative rounded-3xl overflow-hidden border border-pink-300 shadow-[0_10px_40px_rgba(255,107,129,0.15)] bg-gradient-to-b from-white to-[#fff0f3]">
            <img src="/banner.jpg" alt={`${fullTitle} 테라피`} className="w-full h-56 md:h-72 object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent flex flex-col justify-end p-6 md:p-8">
              <span className="text-pink-600 text-xs font-black tracking-widest uppercase mb-1">LOCAL HEALING GUIDE</span>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">{fullTitle} 힐링 테라피 안내</h1>
            </div>
          </section>

          <ClientTextMixerInline locationText={fullTitle} />

          <section className="space-y-6">
            <div className="text-center">
              <p className="text-xs text-pink-600 font-bold tracking-widest uppercase">RECOMMENDED PARTNERS</p>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 mt-1">{fullTitle} 추천 제휴업체 (총 {localShops.length}곳)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localShops.map((lShop) => (
                <div key={lShop.id} className="bg-white border border-pink-200 hover:border-pink-400 rounded-2xl p-4 flex gap-4 items-center shadow-md transition-all group relative">
                  <Link 
                    href={`/${region}/${district}/SHOP/${lShop.slug}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`} 
                    className="absolute inset-0 z-10" 
                    aria-label={lShop.name} 
                  />
                  <img src={lShop.image} alt={lShop.name} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-pink-100" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-sm md:text-base text-gray-900 truncate group-hover:text-pink-600">{lShop.name}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{lShop.desc}</p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-xs font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">{lShop.price}</span>
                      <a href={`tel:${lShop.phone}`} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs px-3.5 py-1.5 rounded-xl shadow relative z-20">전화예약</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center pt-2">
            <Link href={`/${region}`} className="text-xs text-gray-500 hover:text-pink-600 transition-colors font-semibold">
              ← 상위 지역 메인으로 돌아가기
            </Link>
          </div>
        </main>
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff5f7] text-gray-800">
        <div className="text-center space-y-3 p-6 bg-white rounded-3xl border border-pink-200 shadow-sm">
          <h1 className="text-lg font-black text-pink-600">페이지를 불러오는 중 문제가 발생했습니다.</h1>
          <p className="text-xs text-gray-500">잠시 후 다시 시도해 주시거나 메인 페이지를 이용해 주세요.</p>
          <div>
            <Link href="/" className="inline-block mt-2 bg-pink-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl">
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }
}