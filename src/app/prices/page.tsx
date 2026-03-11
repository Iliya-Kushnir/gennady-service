"use client";
import { PRICES, PRICELIST } from '@/lib/constants';
import { Download, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from  'jspdf-autotable';
import { font } from '@/lib/fonts';
import Link from 'next/link';

const PriceListPage = () => {
  const categories = Array.from(new Set(PRICELIST.map(p => p.category)));



const handleDownloadPDF = () => {
    console.log("Генерация PDF...");
    const doc = new jsPDF();
    
    // 1. Внедряем шрифт Roboto (или тот, что в файле fonts.ts)
    // Предполагаем, что в @/lib/fonts переменная 'font' — это Base64 строка
    doc.addFileToVFS("CustomFont.ttf", font); 
    doc.addFont("CustomFont.ttf", "CustomFont", "normal");
    
    // 2. Устанавливаем шрифт для всего документа (заголовка)
    doc.setFont("CustomFont");
    doc.setFontSize(20);
    doc.text("Прайс-лист - Ремонт часов", 14, 22);
    
    const tableColumn = ["Категория", "Услуга", "Цена"];
    const tableRows: string[][] = PRICELIST.map(item => [
      item.category,
      item.name,
      item.price
    ]);
  
    // 3. Генерация таблицы
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: { 
        fontSize: 10,
        font: "CustomFont", // Шрифт для тела таблицы
      },
      headStyles: { 
        fillColor: [71, 85, 105],
        textColor: [255, 255, 255],
        fontStyle: 'normal', // Для кириллических шрифтов лучше 'normal', если нет Bold версии
        font: "CustomFont"   // ЯВНО указываем шрифт для ШАПКИ
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
    });

    // ИСПРАВЛЕНИЕ ТУТ: Убираем второй аргумент 'font'
    doc.save("price-list.pdf"); 
  };

  return (
    <div className="bg-slate-950 py-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-sm font-bold text-amber-500 uppercase tracking-[0.3em] mb-4">Стоимость услуг</h1>
            <h2 className="text-5xl font-serif text-white">Прозрачный прайс-лист</h2>
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest bg-slate-900 border border-slate-800 px-6 py-3 rounded-sm hover:bg-slate-800 transition-all"
          >
            <Download size={16} /> Скачать PDF
          </button>
        </div>

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-6 border-b border-slate-800 pb-4">
                {category}
              </h3>
              <div className="space-y-1">
                {PRICELIST.filter(p => p.category === category).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-slate-900 group hover:bg-slate-900/30 px-4 transition-all -mx-4">
                    <span className="text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
                    <div className="flex-grow mx-4 border-b border-dotted border-slate-800"></div>
                    <span className="text-white font-bold whitespace-nowrap">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900/50 p-8 rounded-sm border border-slate-800 flex items-start gap-4">
          <AlertCircle className="text-amber-500 shrink-0 mt-1" />
          <div className="text-sm text-slate-400 space-y-2">
            <p><strong>Примечание:</strong> Итоговая стоимость ремонта определяется мастером после проведения детальной диагностики.</p>
            <p>Стоимость запчастей оплачивается отдельно согласно актуальному прайс-листу производителя на момент заказа.</p>
            <p>На ремонт сложных усложнений (репетиры, вечные календари) действует индивидуальное ценообразование.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-6">Не нашли нужную услугу в списке?</p>
          <Link 
            href="/#contacts" 
            className="inline-block bg-white text-slate-950 px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-amber-600 hover:text-white transition-all"
          >
            Получить консультацию
          </Link>
        </div>
      </div>
    </div>
  );
};


export default PriceListPage;
