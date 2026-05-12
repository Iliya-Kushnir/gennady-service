import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цены на ремонт часов в Харькове | Прайс-лист Gennady Service",
  description: "Узнайте актуальную стоимость ремонта, репассажа, полировки и замены батареек. Прозрачные цены на обслуживание швейцарских, японских и советских часов.",
  keywords: [
    "цены ремонт часов Харьков", 
    "стоимость полировки часов", 
    "репассаж цена", 
    "замена стекла в часах Харьков цена", 
    "замена батарейки в часах стоимость",
    "прайс лист ремонт часов"
  ],
  openGraph: {
    title: "Прайс-лист на ремонт часов | Gennady Service",
    description: "Честные и прозрачные цены на ремонт часов любой сложности в Харькове. Посмотрите наш прайс онлайн.",
    type: "website",
    locale: "ru_UA",
    // url: "https://gennady-service.vercel.app/pricing", // Раскомментируйте и вставьте ваш URL
  }
};

export default function PriceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}