import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login'],
    },
    // Указываем именно основной домен
    sitemap: 'https://watch-repair.com.ua/sitemap.xml',
  };
}