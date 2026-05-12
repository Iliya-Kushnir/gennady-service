import { SERVICES } from "@/lib/constants";
import { Metadata } from "next";
import React from "react";

// Динамическая генерация метаданных
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = SERVICES.find((s) => s.id === slug);
  
  if (!service) {
    return {
      title: "Услуга не найдена | Gennady Service",
      description: "К сожалению, запрашиваемая услуга не найдена. Вернитесь на главную страницу.",
    };
  }

  return {
    // Делаем title максимально кликабельным
    title: `${service.title} в Харькове — Цена, сроки, гарантия | Gennady Service`,
    description: `${service.description} Профессионально обслуживаем механические и кварцевые часы. Оригинальные запчасти, мастерская в Харькове.`,
    keywords: [
      `${service.title.toLowerCase()} Харьков`, 
      "ремонт часов Харьков", 
      "мастер по часам", 
      service.title.toLowerCase()
    ],
    openGraph: {
      title: `${service.title} | Gennady Service Харьков`,
      description: service.description,
      images: [{ url: service.image || "/og-image.jpg", width: 1200, height: 630 }],
      type: "article",
      locale: "ru_UA",
    },
  };
}

// Layout с добавлением Schema.org для конкретной услуги
export default async function ServiceLayout({ 
  children,
  params
}: { 
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = SERVICES.find((s) => s.id === slug);

  return (
    <>
      {children}
      {service && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": service.title,
              "provider": {
                "@type": "LocalBusiness",
                "name": "Gennady Service"
              },
              "areaServed": {
                "@type": "City",
                "name": "Харьков"
              },
              "description": service.description,
              "offers": {
                "@type": "Offer",
                "price": service.price.replace(/[^0-9]/g, '') || "500", // Извлекаем только цифры из цены
                "priceCurrency": "UAH"
              }
            }),
          }}
        />
      )}
    </>
  );
}