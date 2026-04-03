import { Shield, FileText, Phone, MapPin, Clock } from 'lucide-react';


const InformationPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-24 px-4 sm:px-6">
      {/* Главный контейнер (Отцентрован) */}
      <div className="max-w-4xl mx-auto text-center">
        
        {/* РАЗДЕЛ 1: Политика конфиденциальности */}
        <section className="mb-24 px-2">
          <Shield className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h1 className="text-3xl md:text-5xl font-serif mb-8 text-amber-500 uppercase tracking-widest break-words leading-tight">
            Политика конфиденциальности
          </h1>
          
          <div className="space-y-8 text-slate-300 leading-relaxed text-lg">
            <p>
              <span className="font-bold text-white block mb-2 uppercase text-sm tracking-widest">1.1. Общие положения</span>
              Настоящая политика определяет порядок обработки персональных данных пользователей на сайте Gennady Service. Мы стремимся к максимальной прозрачности и защите вашей приватности в соответствии с международными стандартами обработки данных.
            </p>
            <p>
              <span className="font-bold text-white block mb-2 uppercase text-sm tracking-widest">1.2. Какие данные мы собираем</span>
              Мы сохраняем ваше имя, контактный номер телефона и модель часов для предварительной оценки сложности работ. Технические данные (IP-адрес, тип браузера) могут фиксироваться Vercel и Supabase для обеспечения стабильности работы сервиса.
            </p>
            <p>
              <span className="font-bold text-white block mb-2 uppercase text-sm tracking-widest">1.3. Цели и безопасность</span>
              Данные используются исключительно для связи и технического сопровождения ремонта. Мы применяем Row Level Security (RLS) в Supabase, что гарантирует: ваши данные недоступны посторонним лицам.
            </p>
          </div>
        </section>

        <hr className="border-slate-800 mb-24" />

        {/* РАЗДЕЛ 2: Условия сервиса */}
        <section className="mb-24">
          <FileText className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif mb-8 text-amber-500 uppercase tracking-widest">
            Условия сервиса
          </h2>
          
          <div className="space-y-8 text-slate-300 leading-relaxed text-lg">
            <p>
              <span className="font-bold text-white block mb-2 uppercase text-sm tracking-widest">2.1. Прием и диагностика</span>
              Любая оценка стоимости на сайте является ориентировочной. Окончательная цена формируется только после полной диагностики механизма в нашей мастерской в Киеве. Стандартный срок репассажа составляет от 3 до 14 рабочих дней.
            </p>
            <p>
              <span className="font-bold text-white block mb-2 uppercase text-sm tracking-widest">2.2. Гарантийные обязательства</span>
              Мы предоставляем полную гарантию на точность хода и герметичность корпуса сроком от 12 до 24 месяцев. В работе используются только оригинальные комплектующие или высококачественные аналоги по согласованию с клиентом.
            </p>
          </div>
        </section>

        <hr className="border-slate-800 mb-24" />

        {/* РАЗДЕЛ 3: Контакты */}
        <section>
          <h2 className="text-3xl md:text-5xl font-serif mb-12 text-amber-500 uppercase tracking-widest">
            Контакты
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-300">
            <div className="space-y-4">
              <MapPin className="w-8 h-8 text-amber-600 mx-auto" />
              <p className="font-bold text-white uppercase text-xs tracking-widest">Адрес</p>
              <p>Полтавский Шлях, <br /> Харьков, Украина, 31 офисный центр, офис 311</p>
            </div>
            <div className="space-y-4">
              <Phone className="w-8 h-8 text-amber-600 mx-auto" />
              <p className="font-bold text-white uppercase text-xs tracking-widest">Связь</p>
              <p>+380 (97) 075-40-94</p>
              <p>+380 (95) 739-86-14</p>
              <p>watchrepair.requests@gmail.com</p>
            </div>
            <div className="space-y-4">
              <Clock className="w-8 h-8 text-amber-600 mx-auto" />
              <p className="font-bold text-white uppercase text-xs tracking-widest">График</p>
              <p>Пн-Сб: 12:00 – 18:00</p>
              <p>Вс: Выходной</p>
            </div>
          </div>

          <div className="mt-20 p-8 border border-slate-800 bg-slate-900/30">
            <p className="italic text-slate-400">
              Мастерская Gennady Service оборудована швейцарскими приборами Witschi и Bergeon, что позволяет нам работать с часами любого класса сложности.
            </p>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default InformationPage;