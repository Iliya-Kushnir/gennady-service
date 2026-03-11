import React from 'react';
import { PORTFOLIO } from '@/lib/constants';
import PortfolioItem from '@/components/PortfolioItem/PortfolioItem'; // Импортируем созданный компонент

const PortfolioPage = () => {
  return (
    <div className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок страницы */}
        <div className="max-w-3xl mb-24">
          <h1 className="text-sm font-bold text-amber-500 uppercase tracking-[0.3em] mb-4">Наш опыт</h1>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8">Искусство возрождения времени</h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            За 20 лет через руки наших мастеров прошли тысячи уникальных механизмов. Мы специализируемся на ремонте сложнейших швейцарских часов, возвращая им первозданную точность и эстетическое совершенство.
          </p>
        </div>

        {/* Список кейсов */}
        <div className="space-y-32">
          {PORTFOLIO.map((item, idx) => (
            <PortfolioItem 
              key={item.id}
              id={item.id}
              watchModel={item.watchModel}
              description={item.description}
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              details={item.details}
              isReversed={idx % 2 !== 0} // Чередуем сторону отображения
            />
          ))}
        </div>

        {/* Gallery Grid (без изменений) */}
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