"use client";
import { PRICELIST } from '@/lib/constants';
import { Download, AlertCircle, Clock } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { font } from '@/lib/fonts';
import Link from 'next/link';

const PriceListPage = () => {
  const categories = Array.from(new Set(PRICELIST.map(p => p.category)));

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("CustomFont.ttf", font); 
    doc.addFont("CustomFont.ttf", "CustomFont", "normal");
    
    doc.setFont("CustomFont");
    doc.setFontSize(20);
    doc.text("Прайс-лист Gennady Service", 14, 22);
    
    // Добавили колонку Срок в PDF
    const tableColumn = ["Услуга", "Цена", "Срок"];
    const tableRows = PRICELIST.map(item => [
      item.name,
      item.price,
      item.duration || "-"
    ]);
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: { font: "CustomFont", fontSize: 10 },
      headStyles: { fillColor: [180, 130, 0], font: "CustomFont" }, // Янтарный цвет шапки
    });

    doc.save("gennady-service-prices.pdf"); 
  };

  return (
    <div className="bg-slate-950 py-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-sm font-bold text-amber-500 uppercase tracking-[0.3em] mb-4">Service & Prices</h1>
            <h2 className="text-5xl font-serif text-white uppercase tracking-tighter">Прайс-лист</h2>
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest bg-amber-600 px-8 py-4 rounded-sm hover:bg-amber-700 transition-all shadow-lg shadow-amber-900/20"
          >
            <Download size={14} /> Скачать PDF
          </button>
        </div>

        {/* Таблица услуг */}
        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category} className="bg-slate-900/20 rounded-lg overflow-hidden border border-slate-800/50">
              <h3 className="bg-slate-900/80 px-6 py-4 text-amber-500 font-black uppercase tracking-widest text-[11px] border-b border-slate-800">
                {category}
              </h3>
              
              {/* Шапка таблицы как на скрине */}
              <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-slate-800/30 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                <div className="col-span-7">Услуга</div>
                <div className="col-span-3 text-center">Цена</div>
                <div className="col-span-2 text-right">Срок</div>
              </div>

              <div className="divide-y divide-slate-800/50">
                {PRICELIST.filter(p => p.category === category).map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 items-center px-6 py-5 group hover:bg-slate-800/40 transition-all">
                    <div className="col-span-1 md:col-span-7">
                      <span className="text-slate-200 font-medium group-hover:text-amber-500 transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <div className="col-span-1 md:col-span-3 text-left md:text-center mt-2 md:mt-0">
                      <span className="text-white font-mono text-sm bg-slate-950 px-3 py-1 rounded border border-slate-800">
                        {item.price}
                      </span>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-left md:text-right mt-2 md:mt-0">
                      <span className="text-slate-500 text-xs flex items-center justify-end gap-2 italic">
                        <Clock size={12} className="text-slate-700" /> {item.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-16 bg-amber-600/5 p-8 rounded-sm border border-amber-600/20 flex items-start gap-4">
          <AlertCircle className="text-amber-500 shrink-0 mt-1" />
          <div className="text-[12px] text-slate-400 leading-relaxed uppercase tracking-wide">
            <p className="mb-2"><strong className="text-amber-500">Важно:</strong> Итоговая стоимость определяется после диагностики.</p>
            <p>Запчасти оплачиваются отдельно. На сложные калибры действует индивидуальный тариф.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/#contacts" 
            className="inline-block bg-white text-slate-950 px-12 py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-600 hover:text-white transition-all shadow-xl"
          >
            Записаться на ремонт
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PriceListPage;