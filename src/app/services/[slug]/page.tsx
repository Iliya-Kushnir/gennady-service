"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import { SERVICES } from '@/lib/constants'; // Путь к твоему файлу с массивом

export default function ServicePage() {
  const { slug } = useParams();

  // Ищем услугу в массиве по id (который у тебя в массиве заменяет slug)
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    return (
      <div className="py-20 text-center text-white bg-slate-950 min-h-screen">
        Услуга не найдена
      </div>
    );
  }

  return (
    <div className="bg-slate-950 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-amber-500 mb-8 transition-colors">
          <ChevronLeft size={20} /> <span className="text-sm uppercase font-bold tracking-widest ml-1">Назад</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <div className="sticky top-32">
              <h1 className="text-5xl md:text-6xl font-serif text-white mb-8">{service.title}</h1>
              <div className="prose prose-invert prose-lg text-slate-300 mb-12">
                <p>{service.fullDescription}</p>
                <p className="mt-6">
                  Мы работаем по стандартам Swiss Service Institute. В нашем распоряжении передовое оборудование для точной настройки механизмов любой сложности, от базовых ETA до уникальных мануфактурных калибров с турбийонами и вечными календарями.
                </p>
              </div>

                <div className="bg-slate-900 border border-slate-800 p-8 rounded-sm">
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Почему у нас?</h4>
                <ul className="space-y-4">
                    {/* Теперь данные тянутся из объекта услуги */}
                    {service.features?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="text-amber-500 w-5 h-5 shrink-0" />
                        <span>{item}</span>
                    </li>
                    ))}
                    
                    {/* Если вдруг массива features нет, можно оставить запасной вариант */}
                    {!service.features && (
                    <li className="flex items-start gap-3 text-slate-400">
                        <CheckCircle2 className="text-amber-500 w-5 h-5 shrink-0" />
                        <span>Гарантия на работы от 12 до 24 месяцев</span>
                    </li>
                    )}
                </ul>
                </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-12">
            <div className="aspect-[4/5] bg-slate-900 rounded-sm overflow-hidden border border-slate-800">
              <img src={service.image} className="w-full h-full object-cover grayscale-[0.2]" alt={service.title} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 p-8 border-l-4 border-amber-600">
                <span className="text-xs uppercase font-bold text-slate-500 block mb-2 tracking-widest">Стоимость</span>
                <p className="text-3xl text-white font-serif">{service.price}</p>
              </div>
              <div className="bg-slate-900/50 p-8 border-l-4 border-amber-600">
                <span className="text-xs uppercase font-bold text-slate-500 block mb-2 tracking-widest">Срок работ</span>
                <p className="text-3xl text-white font-serif">{service.duration}</p>
              </div>
            </div>

            <div className="bg-slate-900 p-12 text-center border border-slate-800">
              <h4 className="text-2xl font-serif text-white mb-6">Записаться на этот сервис</h4>
              <p className="text-slate-400 mb-8">Оставьте заявку и наш менеджер перезвонит вам в течение 15 минут для консультации.</p>
              <Link href="/#contacts"  className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-sm font-bold uppercase tracking-widest transition-all">
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}