import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты и условия сервиса | Gennady Service Харьков",
  description: "Адрес мастерской в Харькове, режим работы, политика конфиденциальности и гарантийные обязательства по ремонту часов.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}