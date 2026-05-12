import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты, адрес и гарантия | Мастерская часов Gennady Service Харьков",
  description: "Где починить часы в Харькове? Точный адрес мастерской, телефон мастера, режим работы и официальная гарантия на все виды ремонта.",
  keywords: [
    "адрес ремонт часов Харьков", 
    "телефон мастера по часам Харьков", 
    "где починить часы в Харькове",
    "гарантия на ремонт часов", 
    "ремонт часов центр Харьков"
  ],
  openGraph: {
    title: "Контакты мастерской Gennady Service в Харькове",
    description: "Свяжитесь с нами для бесплатной консультации. Узнайте график работы, адрес и условия гарантийного обслуживания часов.",
    type: "website",
    locale: "ru_UA",
  }
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}