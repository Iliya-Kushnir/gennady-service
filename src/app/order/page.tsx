import Image from "next/image";
import { Search, Phone, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const OrderPage = () => {
  // В будущем сюда добавишь логику получения данных из Supabase
  const order = {
    id: "3492",
    status: "В работе",
    model: "Rolex Submariner Date",
    description: "Полный репассаж механизма, замена анкерного колеса и полировка корпуса.",
    estimatedDate: "24.03.2026",
    image: "/images/order.png" // Используй одно из сгенерированных фото
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Секция поиска */}
        <div className="text-center mb-16">
          <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Проверка статуса
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
            Отследить заказ
          </h1>
          <div className="relative max-w-md mx-auto">
            <input 
              className="w-full bg-slate-900 border border-slate-800 rounded-sm py-4 px-6 focus:outline-none focus:border-amber-600 transition-all text-white placeholder:text-slate-600"
              type="text" 
              placeholder="Введите номер заказа (например, 3492)"
            />
            <button className="absolute right-2 top-2 bg-amber-600 hover:bg-amber-700 p-2 rounded-sm transition-colors">
              <Search className="text-white w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Карточка заказа (появляется после поиска) */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-sm overflow-hidden backdrop-blur-sm">
          <div className="relative h-64 w-full">
            <Image
              src={order.image}
              alt={order.model}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <span className="bg-amber-600 text-white text-[10px] font-bold uppercase px-3 py-1 tracking-widest mb-2 inline-block">
                Заказ №{order.id}
              </span>
              <h2 className="text-2xl font-serif font-bold text-white">{order.model}</h2>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Детали обслуживания</h4>
                <p className="text-sm leading-relaxed text-slate-400">
                  {order.description}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-amber-500 w-5 h-5" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 leading-none">Статус</p>
                    <p className="text-white font-semibold">{order.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-amber-500 w-5 h-5" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 leading-none">Ожидаемая готовность</p>
                    <p className="text-white font-semibold">{order.estimatedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row gap-4">
              <a 
                href={`tel:+380970754094`}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-center py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Phone size={14} className="text-amber-500" />
                Связаться с мастером
              </a>
              <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-all">
                Печать квитанции
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-xs flex items-center justify-center gap-2">
          <AlertCircle size={14} />
          При возникновении вопросов, пожалуйста, укажите номер заказа.
        </p>
      </div>
    </div>
  );
};

export default OrderPage;