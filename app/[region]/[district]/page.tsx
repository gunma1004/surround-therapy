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

// 🌟 1. 대규모 SEO 조합 키워드 풀 (출장 완전 배제, 마사지 포함)
const modifiers = [
  '전문 힐링', '방문 릴렉스', '프라이빗 맞춤', '웰니스 바디', '케어 전신',
  '스웨디시 감성', '아로마 오일', '홈케어 맞춤', '럭셔리 스파', 'VIP 프리미엄',
  '안심 맞춤', '신속 방문', '소프트 릴렉싱', '딥티슈 바디', '커스텀 아로마',
  '스페셜 힐링', '피로해소 전신', '맞춤형 스웨디시', '힐링 가이드', '실속형 바디',
  '쾌적한 방문', '종합 웰니스', '최고급 감성', '프리미엄 홈케어', '전문 바디케어',
  '맞춤 테라피', '럭셔리 힐링', '1:1 프라이빗', '정통 스웨디시', '스페셜 아로마',
  '시원한', '편안한 릴렉스', '힐링 테라피스트', '전문 웰니스', '감성 스웨디시',
  '프리미엄 바디', '맞춤형 힐링', '신속한 홈케어', '고품격', '럭셔리 릴렉스',
  '프라이빗 힐링', '안심 방문', '전문 아로마', '스웨디시 테라피', '딥티슈 힐링',
  '맞춤형 케어', '피로회복 바디', '웰니스 스파', '커스텀', 'VIP 릴렉스',
  '스페셜 케어', '홈케어 힐링', '프리미엄 아로마', '정통 테라피', '감성',
  '쾌적한 힐링', '종합 테라피', '최고급 바디', '전문 릴렉싱', '맞춤 스웨디시',
  '럭셔리 테라피', '1:1 커스텀', '스웨디시 힐링', '아로마 릴렉스', '딥티슈',
  '맞춤형 테라피', '피로해소 힐링', '웰니스 테라피', '커스텀 릴렉스', 'VIP',
  '스페셜 테라피', '홈케어 바디', '프리미엄 테라피', '정통 힐링', '감성 릴렉스',
  '쾌적한 테라피', '종합 바디', '최고급 테라피', '전문 힐링케어', '맞춤 바디케어',
  '럭셔리', '프라이빗 테라피', '스웨디시', '아로마 테라피', '딥티슈 테라피',
  '맞춤형', '피로회복 테라피', '웰니스', '커스텀 테라피', 'VIP 힐링',
  '스페셜 바디', '홈케어 테라피', '프리미엄', '정통 바디', '감성 테라피',
  '쾌적한', '종합 힐링', '최고급 릴렉스', '전문 커스텀', '맞춤 프리미엄'
];

const serviceTypes = [
  '마사지', '힐링 마사지', '아로마 마사지', '스웨디시 마사지', '전신 마사지',
  '바디 마사지', '맞춤 마사지', '프라이빗 마사지', '홈케어 마사지', '스파 마사지',
  '감성 마사지', '정통 마사지', '커스텀 마사지', '안심 마사지', '프리미엄 마사지',
  '릴렉싱 마사지', '웰니스 마사지', '딥티슈 마사지', 'VIP 마사지', '스페셜 마사지',
  '실속형 마사지', '종합 마사지', '최고급 마사지', '전문 마사지', '방문 마사지',
  '소프트 마사지', '오일 마사지', '케어 마사지', '토탈 마사지', '집중 마사지',
  '릴렉스 마사지', '테라피 마사지', '바디케어 마사지', '맞춤형 마사지', '고품격 마사지',
  '시원한 마사지', '피로회복 마사지', '근육이완 마사지', '밸런스 마사지', '활력 마사지',
  '부드러운 마사지', '향기 마사지', '스마트 마사지', '디톡스 마사지', '리프레시 마사지',
  '맞춤바디 마사지', '프라임 마사지', '로얄 마사지', '클래식 마사지', '시그니처 마사지',
  '오리지널 마사지', '익스클루시브 마사지', '럭셔리 마사지', '하이엔드 마사지', '컴포트 마사지',
  '스위트 마사지', '이지 마사지', '딥릴렉스 마사지', '밸류 마사지', '토탈바디 마사지'
];

const descriptions = [
  '선입금 없는 100% 후불제 안전 시스템으로 편안한 휴식을 선사합니다.',
  '검증된 전문 관리사와 함께 지친 피로를 안전하게 날려보세요.',
  '품격 있는 1:1 커스텀 코스로 일상의 스트레스를 말끔히 해소해 드립니다.',
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
  '지친 하루 끝에 찾아오는 완벽한 휴식과 안심 방문 서비스.'
];

const shopData: Record<string, {
  name: string;
  phone: string;
  image: string;
  desc: string;
  supportedRegions: string[];
}> = {
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
  try {
    const resolvedParams = await params;
    const region = resolvedParams?.region || "";
    const rawDistrict = resolvedParams?.district || "";
    const district = getDistrictDisplayName(rawDistrict);
    const regionName = getRegionName(region);
    
    const fullLocation = `${regionName} ${district}`;

    // 🌟 2. 해시 기반 고유 인덱스 추출 (조합 경우의 수 수천 가지 보장)
    const seed = `${fullLocation}-surround-therapy-mix`;
    const charSum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const modIdx = charSum % modifiers.length;
    const srvIdx = (charSum * 3) % serviceTypes.length;
    const descIdx = (charSum * 7) % descriptions.length;

    const pageTitle = `${fullLocation} ${modifiers[modIdx]} ${serviceTypes[srvIdx]} - 서라운드테라피`;
    const pageDescription = `${fullLocation} ${modifiers[modIdx]} ${serviceTypes[srvIdx]}. ${descriptions[descIdx]}`;

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
    return { title: "서라운드테라피", description: "프리미엄 힐링 테라피 및 마사지 안내" };
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