import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
}

// 🌟 영문 구 코드를 한글 명칭으로 변환해 주는 매핑 딕셔너리
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

function getDistrictDisplayName(rawDistrict: string): string {
  const decoded = decodeURIComponent(rawDistrict);
  return districtNameMap[decoded] || decoded;
}

const shopData: Record<string, {
  name: string;
  phone: string;
  image: string;
  desc: string;
  supportedRegions: string[];
}> = {
  "golden-therapy": { name: "한국골든테라피", phone: "0507-1280-3360", image: "/shop1.jpg", desc: "골든 품격의 감성 릴렉싱! 전문 관리사와 프리미엄 힐러진이 선사하는 맞춤형 바디케어.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "miin-therapy": { name: "한국미인테라피", phone: "0507-1280-3201", image: "/shop2.jpg", desc: "천연 오일과 전문 테라피스트의 섬세한 터치로 지친 일상의 피로를 말끔히 풀어드립니다.", supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan", "daejeon", "cheongju"] },
  "night-therapy": { name: "오늘밤테라피", phone: "0507-1280-3199", image: "/shop5.jpg", desc: "편안한 휴식과 안심 힐링! 수도권 전지역 신속한 방문으로 지친 일상의 피로 회복.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "juju-therapy": { name: "주주테라피", phone: "0507-1280-3197", image: "/shop3.jpg", desc: "철저한 위생 관리와 프라이빗 힐링 바디케어 서비스로 높은 만족도를 선사합니다.", supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan"] },
  "queens-home-therapy": { name: "퀸즈홈테라피", phone: "0507-1280-3296", image: "/shop4.jpg", desc: "여왕처럼 누리는 VIP 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 프로그램.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "s-slim-therapy": { name: "S슬림테라피", phone: "0507-1280-3358", image: "/shop1.jpg", desc: "충청 및 중부 주요 권역을 아우르는 체계적이고 전문적인 S슬림 홈케어 프로그램.", supportedRegions: ["daejeon", "cheongju", "cheonan", "asan"] }
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
    const regionName = getRegionName(region);
    
    const fullLocation = `${regionName} ${district}`;

    // 스팸 키워드 없는 자연스러운 10가지 랜덤 순환 패턴
    const charSum = fullLocation.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variantIndex = charSum % 10;

    const titleVariants = [
      `${fullLocation} 프리미엄 힐링 테라피 안내 - 서라운드테라피`,
      `${fullLocation} 맞춤형 웰니스 바디케어 서비스`,
      `${fullLocation} 편안한 휴식을 위한 힐링 가이드`,
      `서라운드테라피 | ${fullLocation} 전문 제휴 샵 안내`,
      `${fullLocation} 일상 속 피로 회복을 위한 릴렉싱 케어`,
      `${fullLocation} 프라이빗 맞춤형 웰니스 프로그램`,
      `${fullLocation} 신속하고 편안한 방문 힐링 케어`,
      `엄선된 제휴 네트워크 | ${fullLocation} 테라피 안내`,
      `${fullLocation} 몸과 마음의 안정을 찾는 힐링 스페이스`,
      `${fullLocation} 프리미엄 바디 릴렉싱 제휴 서비스`
    ];

    const descriptionVariants = [
      `${fullLocation} 지역 검증된 프리미엄 힐링 테라피 가이드. 편안하고 신속한 제휴 서비스로 일상의 피로를 풀어보세요.`,
      `${fullLocation} 맞춤형 웰니스 케어 플랫폼. 전문적인 바디케어 프로그램과 신속한 제휴 서비스를 안내해 드립니다.`,
      `지친 일상에 편안한 휴식을 선사하는 ${fullLocation} 프리미엄 힐링 테라피 네트워크입니다.`,
      `${fullLocation} 제휴 샵 실시간 안내 및 예약 가이드. 몸과 마음의 피로를 부드럽게 케어해 드립니다.`,
      `투명하고 정직한 운영으로 신뢰를 더하는 ${fullLocation} 프리미엄 테라피 안내 플랫폼입니다.`,
      `엄선된 전문 관리사의 손길로 ${fullLocation} 지역에서 누리는 품격 있는 힐링 타임.`,
      `편안한 공간과 신속한 방문 서비스로 ${fullLocation} 주민분들께 최상의 휴식을 제안합니다.`,
      `${fullLocation} 지역별 신속한 제휴 매칭 및 체계적인 피로 회복 프로그램을 만나보세요.`,
      `일상의 긴장을 편안하게 풀어주는 ${fullLocation} 맞춤형 웰니스 바디케어 가이드.`,
      `${fullLocation} 서라운드테라피가 엄선한 프리미엄 제휴점 안내 및 힐링 서비스.`
    ];

    const pageTitle = titleVariants[variantIndex];
    const pageDescription = descriptionVariants[variantIndex];

    return {
      title: pageTitle,
      description: pageDescription,
      alternates: {
        canonical: `https://surround-therapy.netlify.app/${region}/${rawDistrict}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `https://surround-therapy.netlify.app/${region}/${rawDistrict}`,
        siteName: "서라운드테라피(Surround Therapy)",
        locale: "ko_KR",
        type: "website",
      },
    };
  } catch {
    return { title: "서라운드테라피", description: "프리미엄 힐링 테라피 안내" };
  }
}

export async function generateStaticParams() {
  return [];
}

export default async function DistrictDetailPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const region = resolvedParams?.region || "";
    const rawDistrict = resolvedParams?.district || "";
    const district = getDistrictDisplayName(rawDistrict);
    
    const regionName = getRegionName(region);
    const fullTitle = `${regionName} ${district}`;

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
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">{fullTitle} 힐링 테라피 안내</h1>
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
                  <Link 
                    href={`/${region}/${rawDistrict}/SHOP/${lShop.slug}`} 
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
        <div className="text-center p-6 bg-white rounded-3xl border border-pink-200 shadow-sm">
          <h1 className="text-base font-black text-pink-600">페이지를 불러오지 못했습니다.</h1>
          <Link href="/" className="inline-block mt-3 bg-pink-500 text-white text-xs px-4 py-2 rounded-xl">메인으로</Link>
        </div>
      </div>
    );
  }
}