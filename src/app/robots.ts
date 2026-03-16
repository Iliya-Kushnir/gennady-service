import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login'], // Скрываем админку от поисковиков
    },
    sitemap: 'https://gennady-service.vercel.app/sitemap.xml', // Замени на свой домен
  };
}