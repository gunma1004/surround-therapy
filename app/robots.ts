import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 🌟 서라운드테라피 공식 도메인 주소로 적용
  const baseUrl = 'https://surround-therapy.netlify.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}