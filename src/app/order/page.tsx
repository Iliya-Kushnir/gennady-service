"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Phone, Clock, CheckCircle2, AlertCircle, Loader2, Watch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/server/getOrder"; // Путь к твоему экшену

const OrderPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: order, isLoading, refetch, isFetched } = useQuery({
    queryKey: ["client-order", searchQuery],
    queryFn: () => getOrderById(searchQuery),
    enabled: false, // Запрос только по нажатию кнопки
    retry: false,
  });

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-slate-300 pt-[100px] pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
            Gennady Service
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter">
            Статус <span className="text-amber-600">Заказа</span>
          </h1>
          
          {/* Поиск */}
          <div className="relative max-w-md mx-auto group">
            <input 
              className="w-full bg-slate-900/50 border border-slate-800 rounded-none py-4 px-6 focus:outline-none focus:border-amber-600 transition-all text-white placeholder:text-slate-700 font-mono"
              type="text" 
              placeholder="ВСТАВЬТЕ НОМЕР ЗАКАЗА"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              disabled={isLoading}
              className="absolute right-2 top-2 bg-amber-600 hover:bg-amber-700 p-2 rounded-none transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin text-white w-6 h-6" /> : <Search className="text-white w-6 h-6" />}
            </button>
          </div>
          
          {isFetched && !order && (
            <p className="text-red-500 text-[10px] mt-4 uppercase font-black tracking-widest animate-pulse">
              Заказ не найден. Проверьте ID.
            </p>
          )}
        </div>

        {/* Результат */}
        {order ? (
          <div className="bg-slate-900/20 border border-slate-800 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Изображение */}
            <div className="relative h-72 w-full bg-slate-950/50">
              {order.image_url ? (
                <Image
                  src={order.image_url}
                  alt={order.watch_model}
                  fill
                  className="object-contain p-4" // object-contain лучше для фото часов
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-800">
                   <Watch size={48} className="mb-2 opacity-20" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Фото в процессе загрузки</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020817] to-transparent" />
              <div className="absolute bottom-6 left-8">
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1 block">
                  ID: {order.id.slice(0, 8)}...
                </span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{order.watch_model}</h2>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-800 pb-2">Детали ремонта</h4>
                  <p className="text-sm leading-relaxed text-slate-300 italic">
                    "{order.description || "Мастер проводит диагностику..."}"
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-800 pb-2">Состояние</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${
                        order.status === 'new' ? 'bg-amber-500' : 
                        order.status === 'in_progress' ? 'bg-blue-500' : 'bg-emerald-500'
                      }`} />
                      
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 font-bold">Текущий статус</p>
                        <p className="text-white font-black uppercase text-xs tracking-tighter">
                          {order.status === 'new' ? 'Принят на диагностику' : 
                           order.status === 'in_progress' ? 'В процессе ремонта' : 
                           order.status === 'ready' ? 'Готов к выдаче' : 'Выдан клиенту'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Clock className="text-amber-500 w-5 h-5" />
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 font-bold">Зарегистрирован</p>
                        <p className="text-white font-mono text-xs">{new Date(order.created_at).toLocaleDateString('ru-RU')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопки связи */}
              <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+380970754094"
                  className="flex-1 bg-white text-black hover:bg-amber-600 hover:text-white text-center py-4 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={14} />
                  Позвонить мастеру
                </a>
              </div>
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="border border-slate-800 bg-slate-900/10 p-16 text-center group">
              <Watch className="mx-auto mb-4 text-slate-800 group-hover:text-amber-600/20 transition-colors" size={40} />
              <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em] font-bold">
                Ожидание ввода номера...
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OrderPage;