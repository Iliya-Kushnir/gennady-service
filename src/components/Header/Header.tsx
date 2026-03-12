"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgb(2_6_23/0.8)] backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-widest text-white uppercase leading-none">ChronoMaster</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-semibold">Elite Service</span>
            </Link>
            
            <nav className="hidden md:flex space-x-10">
              <Link href="/" className="text-sm font-medium text-white hover:text-amber-500 transition-colors">Главная</Link>
              <Link href="/portfolio" className="text-sm font-medium text-white hover:text-amber-500 transition-colors">Портфолио</Link>
              <Link href="/prices" className="text-sm font-medium text-white hover:text-amber-500 transition-colors">Прайс-лист</Link>
              <Link href="/order" className="text-sm font-medium text-white hover:text-amber-500 transition-colors">Проверка Статуса</Link>
            </nav>
  
            <div className="hidden md:flex items-center">
              <Link href="/#contacts" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-sm text-sm font-semibold transition-all shadow-lg shadow-amber-900/20">
                Записаться
              </Link>
            </div>
  
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-4 text-base font-medium border-b border-slate-800">Главная</Link>
              <Link href="/portfolio" className="block px-3 py-4 text-base font-medium border-b border-slate-800">Портфолио</Link>
              <Link href="/prices" className="block px-3 py-4 text-base font-medium border-b border-slate-800">Прайс-лист</Link>
              <Link href="/#contacts" className="block px-3 py-4 text-base font-medium text-amber-500">Записаться</Link>
            </div>
          </div>
        )}
      </header>
    );
  };

  export default Header;