import React from 'react';

// Описываем интерфейс данных (можно вынести в отдельный файл types.ts)
interface PortfolioItemProps {
  id: string | number;
  watchModel: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  details: string[];
  isReversed?: boolean; // Для чередования сторон (картинка слева/справа)
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  id,
  watchModel,
  description,
  beforeImage,
  afterImage,
  details,
  isReversed = false,
}) => {
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16`}>
      {/* Сетка с изображениями До/После */}
      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <img 
            src={beforeImage} 
            className="w-full aspect-square object-cover rounded-sm border border-slate-800" 
            alt={`${watchModel} - До ремонта`} 
          />
          <div className="absolute top-4 left-4 bg-slate-950/80 text-white text-[10px] uppercase font-bold px-2 py-1">
            До ремонта
          </div>
        </div>
        <div className="relative group">
          <img 
            src={afterImage} 
            className="w-full aspect-square object-cover rounded-sm border border-slate-800" 
            alt={`${watchModel} - После ремонта`} 
          />
          <div className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] uppercase font-bold px-2 py-1">
            После ремонта
          </div>
        </div>
      </div>

      {/* Текстовый контент */}
      <div className="lg:w-1/3 flex flex-col justify-center">
        <span className="text-amber-500 text-xs font-bold uppercase mb-4 tracking-widest">
          Кейс #{id}
        </span>
        <h3 className="text-4xl font-serif text-white mb-6">
          {watchModel}
        </h3>
        <p className="text-slate-400 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-2">
            Выполненные работы:
          </h4>
          <ul className="space-y-3">
            {details.map((detail, dIdx) => (
              <li key={dIdx} className="text-slate-500 text-sm flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full shrink-0 mt-1.5"></div>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;