import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Прайс-лист на ремонт часов в Харькове | Gennady Service",
  description: "Актуальные цены на замену батареек, репассаж, полировку и ремонт швейцарских часов. Скачайте полный прайс-лист в PDF.",
};

export default function PriceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}