import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Статус заказа онлайн | Gennady Service Харьков",
  description: "Введите номер вашего заказа, чтобы узнать на каком этапе находится ремонт ваших часов в нашей мастерской.",
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}