import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

const shopData = {
  "golden-therapy": { name: "한국골든테라피", phone: "0507-1280-3360", image: "/shop1.jpg", desc: "골든 품격의 감성 릴렉싱! 전문 관리사와 프리미엄 힐러진이 선사하는 맞춤형 바디 마사지.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "miin-therapy": { name: "한국미인테라피", phone: "0507-1280-3201", image: "/shop2.jpg", desc: "천연 오일과 전문 테라피스트의 섬세한 터치로 지친 일상의 피로를 말끔히 풀어주는 마사지.", supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan", "daejeon", "cheongju"] },
  "night-therapy": { name: "오늘밤테라피", phone: "0507-1280-3199", image: "/shop5.jpg", desc: "편안한 휴식과 안심 힐링! 수도권 전지역 신속한 방문으로 지친 일상의 피로를 회복하는 마사지.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "juju-therapy": { name: "주주테라피", phone: "0507-1280-3197", image: "/shop3.jpg", desc: "철저한 위생 관리와 프라이빗 힐링 바디케어 마사지 서비스로 높은 만족도를 선사합니다.", supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan"] },
  "queens-home-therapy": { name: "퀸즈홈테라피", phone: "0507-1280-3296", image: "/shop4.jpg", desc: "여왕처럼 누리는 VIP 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 마사지 프로그램.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "s-slim-therapy": { name: "S슬림테라피", phone: "0507-1280-3358", image: "/shop1.jpg", desc: "충청 및 중부 주요 권역을 아우르는 체계적이고 전문적인 S슬림 홈케어 마사지 프로그램.", supportedRegions: ["daejeon", "cheongju", "cheonan", "asan"] }
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
  const resolvedParams = await params;
  const region = resolvedParams?.region || "";
  const district = decodeURIComponent(resolvedParams?.district || "");
  const dong = decodeURIComponent(resolvedParams?.dong || "");
  const regionName = getRegionName(region);
  const fullTitle = `${regionName} ${district} ${dong}`;

  // 🌟 20개 고유 패턴 생성 (출장 완전 배제, 마사지 필수 포함)
  const charSum = fullTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 20;

  const titleVariants = [
    `${fullTitle} 프리미엄 힐링 테라피 및 마사지 안내 - 서라운드테라피`,
    `${fullTitle} 맞춤형 웰니스 바디케어 마사지 서비스 · 서라운드테라피`,
    `${fullTitle} 편안한 휴식을 위한 힐링 마사지 가이드 | 서라운드테라피`,
    `서라운드테라피 | ${fullTitle} 전문 제휴 마사지 샵 안내`,
    `${fullTitle} 일상 속 피로 회복을 위한 릴렉싱 마사지 케어`,
    `${fullTitle} 프라이빗 맞춤형 웰니스 마사지 프로그램`,
    `${fullTitle} 신속하고 편안한 방문 힐링 마사지 케어`,
    `엄선된 제휴 네트워크 | ${fullTitle} 마사지 테라피 안내`,
    `${fullTitle} 몸과 마음의 안정을 찾는 힐링 마사지 스페이스`,
    `${fullTitle} 프리미엄 바디 릴렉싱 제휴 마사지 서비스`,
    `${fullTitle} 정통 아로마 & 스웨디시 마사지 가이드 - 서라운드테라피`,
    `${fullTitle} 전문 관리사의 1:1 맞춤형 마사지 프로그램`,
    `${fullTitle} 쾌적하고 안락한 바디케어 마사지 제휴처`,
    `서라운드테라피 추천 | ${fullTitle} 감성 마사지 힐링 스팟`,
    `${fullTitle} 지친 몸을 깨우는 리프레시 마사지 테라피`,
    `${fullTitle} 투명하고 정직한 정찰제 마사지 코스 안내`,
    `${fullTitle} 힐링과 여유를 선물하는 프라이빗 마사지 공간`,
    `${fullTitle} 몸의 긴장을 풀어주는 전문 바디 마사지 케어`,
    `${fullTitle} 일상 탈출을 위한 스페셜 마사지 웰니스 프로그램`,
    `${fullTitle} 신뢰할 수 있는 제휴 샵 맞춤형 마사지 정보`
  ];

  const descriptionVariants = [
    `${fullTitle} 지역 검증된 프리미엄 힐링 마사지 가이드. 편안하고 신속한 제휴 서비스로 일상의 마사지 피로를 풀어보세요.`,
    `${fullTitle} 맞춤형 웰니스 케어 마사지 플랫폼. 전문적인 바디케어 프로그램과 신속한 제휴 서비스를 안내해 드립니다.`,
    `지친 일상에 편안한 휴식을 선사하는 ${fullTitle} 프리미엄 힐링 테라피 및 마사지 네트워크입니다.`,
    `${fullTitle} 제휴 마사지 샵 실시간 안내 및 예약 가이드. 몸과 마음의 마사지 피로를 부드럽게 케어해 드립니다.`,
    `투명하고 정직한 운영으로 신뢰를 더하는 ${fullTitle} 프리미엄 테라피 및 마사지 안내 플랫폼입니다.`,
    `엄선된 전문 관리사의 손길로 ${fullTitle} 지역에서 누리는 품격 있는 마사지 힐링 타임.`,
    `편안한 공간과 신속한 방문 서비스로 ${fullTitle} 주민분들께 최상의 마사지 휴식을 제안합니다.`,
    `${fullTitle} 지역별 신속한 제휴 매칭 및 체계적인 피로 회복 마사지 프로그램을 만나보세요.`,
    `일상의 긴장을 편안하게 풀어주는 ${fullTitle} 맞춤형 웰니스 바디케어 마사지 가이드.`,
    `${fullTitle} 서라운드테라피가 엄선한 프리미엄 제휴점 안내 및 마사지 힐링 서비스.`,
    `소중한 나를 위한 특별한 휴식, ${fullTitle}에서 만나는 전문 마사지 테라피와 힐링 프로그램.`,
    `정성 어린 손길로 전신에 활력을 불어넣어 주는 ${fullTitle} 맞춤형 바디 마사지 제휴 안내.`,
    `안락한 환경에서 품격 있는 케어를 제공하는 ${fullTitle} 프리미엄 마사지 스팟 가이드.`,
    `일상의 스트레스를 말끔히 씻어내 주는 ${fullTitle} 힐링 테라피 및 마사지 서비스 네트워크.`,
    `체계적인 바디 밸런스 케어로 건강한 활력을 되찾아주는 ${fullTitle} 마사지 정보 플랫폼.`,
    `깊은 안정감과 부드러운 이완을 선사하는 ${fullTitle} 맞춤형 마사지 프로그램 안내.`,
    `신속하고 정확한 매칭 시스템을 통해 ${fullTitle} 주민분들께 만족도 높은 마사지를 제안합니다.`,
    `엄격하게 선별된 제휴 샵의 다채로운 마사지 코스와 정찰제 요금 정보를 확인해 보세요.`,
    `몸과 마음의 긴장을 부드럽게 완화해 주는 ${fullTitle} 프리미엄 마사지 테라피 가이드.`,
    `언제나 편안하고 쾌적한 휴식을 보장하는 ${fullTitle} 맞춤형 웰니스 마사지 제휴 센터.`
  ];

  const pageTitle = titleVariants[variantIndex];
  const pageDescription = descriptionVariants[variantIndex];

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: `https://surround-therapy.netlify.app/${region}/${resolvedParams.district}/${resolvedParams.dong}` },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://surround-therapy.netlify.app/${region}/${resolvedParams.district}/${resolvedParams.dong}`,
      siteName: "서라운드테라피(Surround Therapy)",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function DongDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const region = resolvedParams?.region || "";
  const rawDistrict = resolvedParams?.district || "";
  const district = decodeURIComponent(rawDistrict);
  const rawDong = resolvedParams?.dong || "";
  const dong = decodeURIComponent(rawDong);
  
  const regionName = getRegionName(region);
  const fullTitle = `${regionName} ${district} ${dong}`;

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
    <div className="bg-[#fff5f7] text-[#2f3542] min-h-screen flex flex-col font-sans selection:bg-pink-400 selection:text-white pb-20">
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        <section className="relative rounded-3xl overflow-hidden border border-pink-300 shadow-sm bg-gradient-to-b from-white to-[#fff0f3]">
          <img src="/banner.jpg" alt={fullTitle} className="w-full h-56 md:h-72 object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-pink-600 text-xs font-black tracking-widest uppercase mb-1">LOCAL HEALING GUIDE</span>
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">{fullTitle} 힐링 테라피 및 마사지 안내</h1>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-pink-600 font-bold tracking-widest uppercase">RECOMMENDED PARTNERS</p>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mt-1">{fullTitle} 추천 제휴업체 (총 {localShops.length}곳)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localShops.map((lShop) => (
              <div key={lShop.id} className="bg-white border border-pink-200 hover:border-pink-400 rounded-2xl p-4 flex gap-4 items-center shadow-md transition-all group relative">
                <Link href={`/${region}/${rawDistrict}/${rawDong}/SHOP/${lShop.slug}`} className="absolute inset-0 z-10" aria-label={lShop.name} />
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
          <Link href={`/${region}/${rawDistrict}`} className="text-xs text-gray-500 hover:text-pink-600 transition-colors font-semibold">
            ← {district} 메인 페이지로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}