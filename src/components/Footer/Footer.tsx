import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Clock, Github } from "lucide-react";

const Footer = () => (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex flex-col mb-6">
              <span className="text-2xl font-serif font-bold tracking-widest text-white uppercase leading-none">ChronoMaster</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-semibold">Elite Service</span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6">
              Профессиональное обслуживание швейцарских часов премиум-класса. Возвращаем точность и блеск вашим любимым механизмам с 2004 года.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all">
                <Instagram color="white" size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all">
                <Facebook color="white" size={18} />
              </Link>
              <Link className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 transition-all" href="https://github.com/Iliya-Kushnir">
                <Github color="white" size={18} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Навигация</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link href="/" className="hover:text-amber-500">Услуги</Link></li>
              <li><Link href="/portfolio" className="hover:text-amber-500">Портфолио</Link></li>
              <li><Link href="/prices" className="hover:text-amber-500">Прайс-лист</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-500">Контакты</Link></li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Контакты</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-amber-500 w-5 h-5 shrink-0" />
                <span>Полтавский Шлях, <br />Харьков, Украина, 31 офисный центр, офис 311</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-amber-500 w-5 h-5 shrink-0" />
                <span>+380 (97) 075-40-94</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-amber-500 w-5 h-5 shrink-0" />
                <span>Пн-Сб: 10:00 – 19:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
          <p>© {new Date().getFullYear()} ChronoMaster Elite. Все права защищены.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-amber-500">Политика конфиденциальности</Link>
            <Link href="/privacy" className="hover:text-amber-500">Условия сервиса</Link>
          </div>
        </div>
      </div>
    </footer>
  );

  export default Footer;   