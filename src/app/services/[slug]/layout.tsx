import { SERVICES } from "@/lib/constants";
import { Metadata } from "next";

// Добавляем async и Promise для параметров
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  
  // ОБЯЗАТЕЛЬНО ждем разрешения промиса
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const service = SERVICES.find((s) => s.id === slug);
  
  return {
    title: service ? `${service.title} — Ремонт часов в Харькове` : "Услуга не найдена",
    description: service 
      ? `${service.description} Профессиональный сервис Gennady Service в Харькове.` 
      : "Услуги ремонта часов в Харькове.",
  };
}

export default async function ServiceLayout({ 
  children,
  params
}: { 
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return <>{children}</>;
}