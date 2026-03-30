import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gennady Service — Ремонт швейцарских часов в Харькове",
    template: "%s | Gennady Service Харьков"
  },
  description: "Профессиональный ремонт, репассаж и полировка швейцарских часов в Харькове. Сертифицированный мастер, гарантия и оригинальные запчасти.",
  keywords: ["ремонт часов Харьков", "швейцарские часы Харьков", "мастерская часов Харьков", "Rolex Харьков", "репассаж часов"],
  authors: [{ name: "Gennady" }],
  creator: "Gennady Service",
  
  
  // Настройки для соцсетей (Open Graph)
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://gennady-service.vercel.app",
    title: "Gennady Service — Ремонт элитных часов",
    description: "Вернем вашим часам идеальный ход и блеск. Проверьте статус заказа онлайн!",
    siteName: "Gennady Service",
    images: [
      {
        url: "/og-image.jpg", // Сделай красивую картинку 1200x630
        width: 1200,
        height: 630,
        alt: "Gennady Service Workshop",
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
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Header />
            {children}
            <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WatchRepairService", // Специальный тип для ремонта часов
      "name": "Gennady Service",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Харьков",
        "addressRegion": "Харьковская область",
        "addressCountry": "UA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "50.0011", // Замени на точные координаты мастерской
        "longitude": "36.2344"
      },
      "url": "https://gennady-service.vercel.app",
      "telephone": "+380XXXXXXXXX",
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
