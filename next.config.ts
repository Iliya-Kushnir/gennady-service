import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        
        hostname: 'trribrzcwiqaqpbglpft.supabase.co', // Твой хост из ошибки
        port: '',
        pathname: '/storage/v1/object/public/**', // Путь к твоим картинкам
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
