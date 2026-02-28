
import React from 'react';
import { Settings, Shield, Award, Sparkles, Clock, Hammer } from 'lucide-react';
import { Service, PortfolioCase, PriceItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'repassage',
    title: 'Репассаж',
    description: 'Полная переборка, очистка и смазка механизма.',
    fullDescription: 'Репассаж — это полное техническое обслуживание часового механизма. Мы полностью разбираем механизм, промываем каждую деталь в ультразвуковой ванне с использованием специализированных растворов, заменяем изношенные элементы и заново смазываем высококачественными маслами Moebius.',
    price: 'от 5,000 ₴',
    icon: 'Settings',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'polishing',
    title: 'Полировка корпуса',
    description: 'Восстановление заводского блеска и геометрии.',
    fullDescription: 'Профессиональная полировка и сатинирование корпуса и браслета. Мы возвращаем часам их первозданный вид, аккуратно убирая царапины и забоины, при этом максимально сохраняя заводские грани и геометрию.',
    price: 'от 3,500 ₴',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'parts',
    title: 'Замена деталей',
    description: 'Использование только оригинальных комплектующих.',
    fullDescription: 'Мы имеем прямой доступ к оригинальным запчастям ведущих швейцарских мануфактур: Rolex, Omega, Patek Philippe, Audemars Piguet и др. Замена стекла, заводной головки, прокладок или элементов хода производится с полным соблюдением технологических карт производителя.',
    price: 'от 1,500 ₴',
    icon: 'Hammer',
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'diagnostics',
    title: 'Диагностика',
    description: 'Проверка точности хода и герметичности.',
    fullDescription: 'Комплексная проверка часов на приборе Witschi для анализа амплитуды, выкачки и точности хода в разных положениях. Также проводится тест на водонепроницаемость (сухой и мокрый тесты).',
    price: 'Бесплатно',
    icon: 'Clock',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
  }
];

export const PORTFOLIO: PortfolioCase[] = [
  {
    id: '1',
    watchModel: 'Rolex Submariner Date',
    description: 'Восстановление после попадания влаги и полировка.',
    beforeImage: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800',
    details: ['Полная разборка механизма Caliber 3135', 'Замена анкерного колеса', 'Восстановление герметичности', 'Лазерная наплавка и полировка корпуса']
  },
  {
    id: '2',
    watchModel: 'Omega Speedmaster Professional',
    description: 'Репассаж хронографа с ручным заводом.',
    beforeImage: 'https://images.unsplash.com/photo-1508685096489-7a669f1bd462?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    details: ['Чистка системы хронографа', 'Регулировка точности до +2 сек/сут', 'Замена хезалитового стекла']
  }
];

export const PRICES: PriceItem[] = [
  { category: 'Техническое обслуживание (Репассаж)', name: 'Кварцевые часы (3 стрелки)', price: '2,500 ₴' },
  { category: 'Техническое обслуживание (Репассаж)', name: 'Механические (без усложнений)', price: '5,000 ₴' },
  { category: 'Техническое обслуживание (Репассаж)', name: 'Механические (Хронограф)', price: '8,500 ₴' },
  { category: 'Внешние работы', name: 'Полировка корпуса (сталь)', price: '3,500 ₴' },
  { category: 'Внешние работы', name: 'Полировка браслета (сталь)', price: '2,500 ₴' },
  { category: 'Внешние работы', name: 'Замена батарейки (со швейцарским элементом)', price: '800 ₴' },
  { category: 'Прочее', name: 'Проверка на герметичность', price: '500 ₴' },
  { category: 'Прочее', name: 'Укорачивание браслета', price: '400 ₴' },
];

export const REASONS = [
  { icon: <Award className="w-10 h-10 text-amber-500" />, title: '20 лет опыта', text: 'Наши мастера обучались в Швейцарии на фабриках ведущих брендов.' },
  { icon: <Shield className="w-10 h-10 text-amber-500" />, title: 'Гарантия 2 года', text: 'Мы предоставляем официальную гарантию на все виды работ и запчастей.' },
  { icon: <Settings className="w-10 h-10 text-amber-500" />, title: 'Оригинальные детали', text: 'Никаких копий. Только сертифицированные комплектующие.' },
  { icon: <Sparkles className="w-10 h-10 text-amber-500" />, title: 'Swiss Quality', text: 'Используем оборудование Witschi, Bergeon и Elma.' },
];
