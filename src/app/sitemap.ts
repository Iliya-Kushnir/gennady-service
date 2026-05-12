import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://watch-repair.com.ua';

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/prices`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/order`, lastModified: new Date(), priority: 0.6 },
  ];
}