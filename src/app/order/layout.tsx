import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Узнать статус ремонта часов онлайн | Gennady Service Харьков",
  description: "Проверьте готовность ваших часов прямо на сайте. Введите номер заказа и узнайте этап работ: диагностика, ремонт или ожидание выдачи.",
  keywords: [
    "статус ремонта часов онлайн", 
    "проверить готовность заказа часов Харьков", 
    "узнать статус ремонта часов",
    "Gennady Service проверка заказа"
  ],
  openGraph: {
    title: "Проверка статуса ремонта часов онлайн | Gennady Service",
    description: "Онлайн-трекинг вашего заказа. Узнайте, на каком этапе находится восстановление ваших часов прямо сейчас.",
    type: "website",
    locale: "ru_UA",
  }
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}