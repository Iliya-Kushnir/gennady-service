import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gennady-service.vercel.app'; // Замени на свой домен

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/prices`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/portfolio`, lastModified: new Date() },
    { url: `${baseUrl}/order`, lastModified: new Date() },
  ];
}