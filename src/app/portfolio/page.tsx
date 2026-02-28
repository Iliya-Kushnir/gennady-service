import React from 'react';
import { PORTFOLIO } from '@/lib/constants';

const PortfolioPage = () => {
  return (
    <div className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-24">
          <h1 className="text-sm font-bold text-amber-500 uppercase tracking-[0.3em] mb-4">Наш опыт</h1>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8">Искусство возрождения времени</h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            За 20 лет через руки наших мастеров прошли тысячи уникальных механизмов. Мы специализируемся на ремонте сложнейших швейцарских часов, возвращая им первозданную точность и эстетическое совершенство.
          </p>
        </div>

        <div className="space-y-32">
          {PORTFOLIO.map((item, idx) => (
            <div key={item.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16`}>
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                   <img src={item.beforeImage} className="w-full aspect-square object-cover rounded-sm border border-slate-800" alt="Before" />
                   <div className="absolute top-4 left-4 bg-slate-950/80 text-white text-[10px] uppercase font-bold px-2 py-1">До ремонта</div>
                </div>
                <div className="relative group">
                   <img src={item.afterImage} className="w-full aspect-square object-cover rounded-sm border border-slate-800" alt="After" />
                   <div className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] uppercase font-bold px-2 py-1">После ремонта</div>
                </div>
              </div>
              
              <div className="lg:w-1/3 flex flex-col justify-center">
                <span className="text-amber-500 text-xs font-bold uppercase mb-4 tracking-widest">Кейс #{item.id}</span>
                <h3 className="text-4xl font-serif text-white mb-6">{item.watchModel}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">{item.description}</p>
                <div className="space-y-4">
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Выполненные работы:</h4>
                  <ul className="space-y-3">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-slate-500 text-sm flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full shrink-0 mt-1.5"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-32 pt-24 border-t border-slate-900">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif text-white mb-4">Фото из мастерской</h3>
            <p className="text-slate-500 uppercase tracking-widest text-xs">Процесс создания совершенства</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="aspect-square bg-slate-900 overflow-hidden group">
                <img 
                  src={`https://picsum.photos/600/600?random=${n}`} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                  alt="Workshop" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
