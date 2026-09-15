export interface ShopInfo {
  name: string;
  phone: string;
  location: string;
  badge: string;
  image: string;
  desc: string;
  supportedRegions: string[]; // 🌟 이 샵이 나오는 지역 코드들
  features: string[];
}

export const shopData: Record<string, ShopInfo> = {
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