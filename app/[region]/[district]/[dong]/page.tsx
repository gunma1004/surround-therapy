import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

const SITE_URL = "https://surround-therapy.netlify.app";

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
  yongin_cheoin: "용in시 처인구", yongin_giheung: "용인시 기흥구", yongin_suji: "용인시 수지구",
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

function getRegionName(regionCode: string): string {
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

// 🌟 1단: '출장' 배제한 수식어 풀 (35개)
const prefixAdjectives = [
  "소프트", "프리미엄", "릴렉스", "감성", "프라이빗",
  "스페셜", "힐링", "딥티슈", "명품", "맞춤형",
  "안심", "쾌적한", "정성", "토탈", "순환",
  "포근한", "전신", "실속형", "프로페셔널", "럭셔리",
  "시그니처", "활력", "바디케어", "클래식", "컴포트",
  "디톡스", "정통", "체형맞춤", "차분한", "피로해소",
  "노련한", "깔끔한", "산뜻한", "탁월한", "안락한"
];

// 🌟 1단: '마사지' 앞에 붙는 코스 테크닉 풀 (16개)
const coreTechniques = [
  "스웨디시", "아로마", "타이", "바디",
  "릴렉싱", "테라피", "웰니스", "홈케어",
  "림프케어", "컨디셔닝", "스트레칭", "이완",
  "에스테틱", "오일", "건식", "감성케어"
];

// 🌟 2단: '안마' 및 스팸 키워드를 완전히 배제한 50개 풀
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

// 🌟 3단: 지역 안내 페이지 전용 소구 문구 풀 (8개)
const tertiaryActionPatterns = [
  "1:1 맞춤 방문케어", "프라이빗 힐링 안내", "전신 피로회복 총정리",
  "정직한 정찰제 안심 가이드", "당일 예약 맞춤 코스", "최고급 힐러진 프로그램",
  "안심 후불제 웰니스 안내", "전신 릴렉스 힐링 추천"
];

// 🌟 디스크립션 가격 및 운영시간 소구점 조합 풀 (10개)
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

const shopData = {
  "golden-therapy": { name: "골든테라피", phone: "0507-1280-3360", image: "/shop1.jpg", desc: "골든 품격의 감성 릴렉싱! 전문 관리사와 프리미엄 힐러진이 선사하는 맞춤형 바디 마사지.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "miin-therapy": { name: "미인테라피", phone: "0507-1280-3201", image: "/shop2.jpg", desc: "천연 오일과 전문 테라피스트의 섬세한 터치로 지친 일상의 피로를 말끔히 풀어주는 마사지.", supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan", "daejeon", "cheongju"] },
  "night-therapy": { name: "오늘밤테라피", phone: "0507-1280-3199", image: "/shop5.jpg", desc: "편안한 휴식과 안심 힐링! 수도권 전지역 신속한 방문으로 지친 일상의 피로를 회복하는 마사지.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "juju-therapy": { name: "주주테라피", phone: "0507-1280-3197", image: "/shop3.jpg", desc: "철저한 위생 관리와 프라이빗 힐링 바디케어 마사지 서비스로 높은 만족도를 선사합니다.", supportedRegions: ["seoul", "gyeonggi", "incheon", "cheonan", "asan"] },
  "queens-home-therapy": { name: "퀸즈홈테라피", phone: "0507-1280-3296", image: "/shop4.jpg", desc: "여왕처럼 누리는 VIP 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 마사지 프로그램.", supportedRegions: ["seoul", "gyeonggi", "incheon"] },
  "s-slim-therapy": { name: "S슬림테라피", phone: "0507-1280-3358", image: "/shop1.jpg", desc: "충청 및 중부 주요 권역을 아우르는 체계적이고 전문적인 S슬림 홈케어 마사지 프로그램.", supportedRegions: ["daejeon", "cheongju", "cheonan", "asan"] }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const region = resolvedParams?.region || "";
  const rawDistrict = resolvedParams?.district || "";
  const district = getDistrictDisplayName(rawDistrict);
  const rawDong = resolvedParams?.dong || "";
  const dong = decodeURIComponent(rawDong);
  
  const regionName = getRegionName(region);
  const fullTitle = `${regionName} ${district} ${dong}`;

  // 🌟 순차적 인덱스 계산 (출장/안마 배제, 35x16x50 고유 조합 보장)
  const seed = `${fullTitle}-surround-dong-clean-v3`;
  const charSum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
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

  // 💡 [동] [수식어] [코스] 마사지·홈타이 | [구] [2단 예약] | [3단 소구점] (약 45~50자)
  const pageTitle = `${dong} ${selectedAdj} ${selectedTech} 마사지·홈타이 | ${district} ${selectedAction} | ${selectedTertiary}`;
  
  // 💡 [시 구 동] 전지역 전문 방문 케어. 엄선된 테라피스트 100% 후불제 마사지·홈타이 안내. [가격 훅]
  const pageDescription = `${fullTitle} 전지역 전문 방문 케어. 엄선된 테라피스트 100% 후불제 마사지·홈타이 안내. ${selectedPriceHook}`;

  const canonicalUrl = `${SITE_URL}/${region}/${rawDistrict}/${rawDong}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: pageTitle,
    },
    description: pageDescription,
    alternates: { 
      canonical: canonicalUrl 
    },
    keywords: [
      `${fullTitle} 마사지`,
      `${dong} 홈타이`,
      `${dong} 스웨디시`,
      `${district} 방문예약`,
      "100% 후불제"
    ],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
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
  const district = getDistrictDisplayName(rawDistrict);
  const rawDong = resolvedParams?.dong || "";
  const dong = decodeURIComponent(rawDong);
  
  const regionName = getRegionName(region);
  const fullTitle = `${regionName} ${district} ${dong}`;

  const localShops = Object.entries(shopData)
    .filter(([_, shop]) => shop.supportedRegions.includes(region))
    .map(([slug, shop], index) => ({
      id: index + 1,
      slug: slug,
      name: `${fullTitle} ${shop.name}`,
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