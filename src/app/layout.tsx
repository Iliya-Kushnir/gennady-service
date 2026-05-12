import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"], // Обязательно добавляем кириллицу для правильного отображения шрифта
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  // Расширяем Title: охватываем и Харьков, и все типы часов
  title: {
    default: "Ремонт часов в Харькове — Швейцарские, советские, наручные | Gennady Service",
    template: "%s | Gennady Service Харьков"
  },
  // Делаем Description привлекательным для всех клиентов
  description: "Профессиональный ремонт всех видов часов в Харькове: швейцарские, японские, советские, механические и кварцевые. Репассаж, полировка, гарантия мастера.",
  
  // Максимально расширяем семантическое ядро (ключевые слова)
  keywords: [
    "ремонт часов Харьков", 
    "мастерская часов Харьков", 
    "ремонт швейцарских часов Харьков", 
    "ремонт советских часов Харьков",
    "ремонт механических часов",
    "ремонт кварцевых часов",
    "замена батарейки в часах Харьков",
    "замена стекла в часах",
    "Rolex Харьков", 
    "репассаж часов"
  ],
  authors: [{ name: "Gennady" }],
  creator: "Gennady Service",
  
  // Указываем канонический URL для избежания дублей страниц
  alternates: {
    canonical: "https://gennady-service.vercel.app",
  },
  
  // Настройки для соцсетей (Open Graph)
  openGraph: {
    type: "website",
    locale: "ru_UA", // Правильнее указать русский язык для Украины
    url: "https://gennady-service.vercel.app",
    title: "Gennady Service — Профессиональный ремонт часов в Харькове",
    description: "Ремонт любых часов: от советской классики до швейцарских хронографов. Вернем вашим часам идеальный ход! Проверьте статус заказа онлайн.",
    siteName: "Gennady Service",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Мастерская по ремонту часов Gennady Service в Харькове",
      },
    ],
  },

  // Иконки
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // МЕНЯЕМ lang="en" на lang="ru" (или "uk", если сайт на украинском)
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Header />
            {children}
            {/* Улучшенная микроразметка для локального бизнеса */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "LocalBusiness", // Правильный тип
                  "name": "Gennady Service - Ремонт часов",
                  "image": "https://gennady-service.vercel.app/og-image.jpg",
                  "description": "Профессиональная мастерская по ремонту швейцарских, советских и японских часов в Харькове.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Харьков",
                    "addressRegion": "Харьковская область",
                    "addressCountry": "UA"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "50.0011", // Замените на ваши
                    "longitude": "36.2344"
                  },
                  "url": "https://gennady-service.vercel.app",
                  "telephone": "+380XXXXXXXXX", // Обязательно укажите телефон
                  "priceRange": "$$", // Подсказывает Google, что это коммерческая услуга
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      "opens": "10:00",
                      "closes": "18:00"
                    }
                  ]
                }),
              }}
            />
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}