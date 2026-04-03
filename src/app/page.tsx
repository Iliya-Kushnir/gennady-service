"use client";
import Image from "next/image";
import Link from "next/link";
import ApplicationForm from "@/components/ApplicationForm/AppplicationForm";
import { Settings, Sparkles, Clock, Hammer, ArrowRight, Truck, MapPin } from 'lucide-react';
import { SERVICES, PORTFOLIO, REASONS } from "@/lib/constants";
import { supabase } from "@/lib/supabase"
import { useEffect } from "react";

const IconMap: any = {
  Settings,
  Sparkles,
  Clock,
  Hammer,
};

export default function Home() {

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('orders').select('id').limit(1);
        
        if (error) {
          console.error('❌ Ошибка Supabase:', error);
        } else {
          console.log('✅ Подключено успешно:', data);
        }
      } catch (err) {
        console.error('🌐 Сетевая ошибка (проверь AdBlock/VPN):', err);
      }
    };
  
    checkConnection();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 bg-amber-600/20 text-amber-500 rounded-sm text-xs font-bold uppercase tracking-widest mb-6 border border-amber-600/30">
              Элитная мастерская • Работаем по всей Украине
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight break-words">
              Ремонт швейцарских, японских, немецких и <span className="text-amber-500">советских часов</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-4 max-w-xl leading-relaxed">
              Профессиональное обслуживание механизмов любой сложности с сохранением оригинального качества и гарантии.
            </p>

            {/* Акцент на типах часов */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 text-amber-500/90 text-sm font-bold uppercase tracking-widest">
              <span>Напольные</span>
              <span className="text-slate-700">•</span>
              <span>Настольные</span>
              <span className="text-slate-700">•</span>
              <span>Настенные</span>
              <span className="text-slate-700">•</span>
              <span>Карманные</span>
            </div>

            {/* Акцент на доставке по Украине */}
            <div className="flex items-center gap-3 text-slate-100 bg-white/5 border border-white/10 w-fit px-4 py-2 rounded-sm mb-10">
              <Truck size={20} className="text-amber-500" />
              <span className="text-sm font-medium">Принимаем заказы со всей Украины по почте</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contacts" className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-all text-center">
                Записаться на диагностику
              </a>
              <Link href="/prices" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-all text-center border border-white/20">
                Смотреть цены
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-[10px] text-white uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-10 bg-white"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-900" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-[0.3em] mb-4">Наши услуги</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Комплексный сервис</h3>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => {
              const IconComp = IconMap[service.icon];
              return (
                <Link href={`/services/${service.id}`} key={service.id} className="group relative bg-slate-800 border border-slate-700 p-8 rounded-sm hover:border-amber-600/50 transition-all hover:-translate-y-2 cursor-pointer">
                  <div className="mb-6 inline-block p-4 bg-slate-900 rounded-sm text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <IconComp size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">{service.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-xs font-bold text-amber-500 uppercase tracking-widest group-hover:gap-3 transition-all">
                    Подробнее <ArrowRight size={14} className="ml-2" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Highlight */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-[0.3em] mb-4">Наши работы</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white">Кейсы восстановления</h3>
            </div>
            <Link href="/portfolio" className="text-sm font-bold text-amber-500 uppercase tracking-widest border-b border-amber-500 pb-1 hover:text-white hover:border-white transition-all">
              Смотреть всё портфолио
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {PORTFOLIO.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden group">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image width={1000} height={1000} src={item.afterImage} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" alt={item.watchModel} />
                    <div className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] font-bold uppercase px-2 py-1">После ремонта</div>
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <span className="text-amber-500 text-xs font-bold uppercase mb-2">Swiss Excellence</span>
                    <h4 className="text-2xl font-serif text-white mb-4">{item.watchModel}</h4>
                    <p className="text-slate-400 text-sm mb-6">{item.description}</p>
                    <ul className="space-y-2 mb-8">
                      {item.details.slice(0, 2).map((detail, idx) => (
                        <li key={idx} className="text-xs text-slate-500 flex items-center gap-2">
                          <div className="w-1 h-1 bg-amber-600 rounded-full"></div> {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {REASONS.map((reason, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-6">{reason.icon}</div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wide">{reason.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-slate-950" id="contacts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-sm overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 p-8 md:p-16">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-8">Записаться на диагностику</h3>
                  <ApplicationForm />
            </div>
            <div className="lg:w-1/2 relative bg-slate-800 p-8 md:p-16 flex flex-col justify-center">
               <div className="absolute inset-0 opacity-10">
                 <Image width={1200} height={800} alt="" src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
               </div>
               <div className="relative z-10 space-y-10">
                 <div>
                   <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                     <Truck size={14} /> Заказы по всей Украине
                   </h4>
                   <p className="text-xl text-white font-serif mb-2 leading-tight">
                     Принимаем часы на ремонт через <span className="text-amber-500">Новую Почту</span>
                   </p>
                   <p className="text-sm text-slate-400 mb-6 italic">Безопасная пересылка с полной страховкой содержимого.</p>
                   
                   <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                     <MapPin size={14} /> Наш адрес
                   </h4>
                   <p className="text-xl text-white font-serif leading-relaxed">Полтавский Шлях, Харьков, Украина, 31 офисный центр, офис 311</p>
                 </div>
                 <div>
                   <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">Свяжитесь с нами</h4>
                   <div className="flex flex-col">
                    <p className="text-2xl text-white font-serif">+380 (97) 075-40-94</p>
                    <p className="text-2xl text-white font-serif">+380 (95) 739-86-14</p>
                   </div>
                   <p className="text-slate-400 mt-2">watchrepair.requests@gmail.com</p>
                 </div>
                 <div>
                   <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">Режим работы</h4>
                   <p className="text-lg text-white">Пн – Пт: 12:00 – 18:00</p>
                   <p className="text-lg text-white">Сб: 11:00 – 17:00</p>
                   <p className="text-slate-400 mt-2">Вс: Выходной</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}