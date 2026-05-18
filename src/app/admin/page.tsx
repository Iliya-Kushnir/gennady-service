"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, updateOrderStatus } from "@/server/AdminActions"; 
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Eye, Phone, Calendar, Watch, User, LogOut, 
  TrendingUp, Clock, CheckCircle2, AlertCircle, Banknote 
} from "lucide-react";
import { logoutUser } from "@/server/authActions";
import { useRouter } from "next/navigation";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie 
} from 'recharts';

export default function AdminPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });


const statusMutation = useMutation({
  
    mutationFn: ({ id, status, price }: { id: string; status?: string; price?: string | number }) => 
      updateOrderStatus(id, { status, price }), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#020817] text-amber-500 uppercase tracking-widest animate-pulse font-black">
        Загрузка базы данных...
      </div>
    );
  }


  const stats = {
    new: orders?.filter((o: any) => o.status === 'new').length || 0,
    inProgress: orders?.filter((o: any) => o.status === 'in_progress').length || 0,
    ready: orders?.filter((o: any) => o.status === 'ready').length || 0,
    revenue: orders?.reduce((acc: number, o: any) => acc + (Number(o.price) || 0), 0) || 0,
  };

  const chartData = orders?.slice(0, 7).map((o: any) => ({
    name: new Date(o.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
    income: Number(o.price) || 0,
  })).reverse();


  const pieData = [
    { name: 'Новые', value: stats.new, color: '#d97706' },
    { name: 'В работе', value: stats.inProgress, color: '#2563eb' },
    { name: 'Готовы', value: stats.ready, color: '#059669' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-amber-600';
      case 'in_progress': return 'bg-blue-600';
      case 'ready': return 'bg-emerald-600';
      case 'completed': return 'bg-slate-700';
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] pt-[100px] p-4 md:p-8 text-slate-50 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Шапка админки */}
        <div className="flex justify-between items-end border-b mt-[100px] border-slate-800 pb-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Gennady <span className="text-amber-600">Admin</span>
            </h1>
            <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Management Dashboard
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="bg-white text-black border-white hover:bg-red-500 hover:text-white hover:border-red-500 text-xs font-bold uppercase transition-all px-6"
          >
            <LogOut size={14} className="mr-2" /> Выйти
          </Button>
        </div>

        {/* --- ВИДЖЕТЫ СТАТИСТИКИ --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Новые заявки" value={stats.new} icon={<AlertCircle className="text-amber-500" />} />
          <StatCard title="В ремонте" value={stats.inProgress} icon={<Clock className="text-blue-500" />} />
          <StatCard title="Ожидают выдачи" value={stats.ready} icon={<CheckCircle2 className="text-emerald-500" />} />
          <StatCard title="Общая выручка" value={`${stats.revenue} ₴`} icon={<Banknote className="text-white" />} isHighlight />
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="bg-slate-900 border border-slate-800 mb-6 p-1">
            <TabsTrigger value="orders" className="data-[state=active]:bg-amber-600 uppercase text-[11px] font-bold px-6 text-white">Список заказов</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 uppercase text-[11px] font-bold px-6 text-white">Аналитика</TabsTrigger>
          </TabsList>

          {/* ВКЛАДКА: ТАБЛИЦА ЗАКАЗОВ */}
          <TabsContent value="orders" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 backdrop-blur-md overflow-hidden shadow-2xl">
              <Table>
                <TableHeader className="bg-slate-950/80">
                  <TableRow className="hover:bg-transparent border-slate-800">
                    <TableHead className="w-[120px] text-[10px] uppercase font-black text-slate-400">Дата</TableHead>
                    <TableHead className="text-[10px] uppercase font-black text-slate-400">Клиент</TableHead>
                    <TableHead className="text-[10px] uppercase font-black text-slate-400">Модель</TableHead>
                    <TableHead className="text-[10px] uppercase font-black text-slate-400 text-center">Статус</TableHead>
                    <TableHead className="text-right text-[10px] uppercase font-black text-slate-400">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order: any) => (
                    <TableRow key={order.id} className="border-slate-800 hover:bg-slate-800/40 transition-colors">
                      <TableCell className="p-4 text-xs text-slate-500 font-mono">
                        {new Date(order.created_at).toLocaleDateString('ru-RU')}
                      </TableCell>
                      <TableCell className="p-4 font-mono text-xs text-amber-500">
                        <div className="flex items-center gap-2">
                            <input 
                            type="number"
                            defaultValue={order.price || 0}
                            onBlur={(e) => {
                               
                                const newPrice = e.target.value;
                                statusMutation.mutate({ id: order.id, price: newPrice }); 
                            }}
                            className="bg-transparent border-b border-transparent hover:border-slate-700 focus:border-amber-600 focus:outline-none w-16 transition-all"
                            />
                            <span>₴</span>
                        </div>
                        </TableCell>
                      <TableCell className="p-4 font-bold text-slate-200">
                        <div className="flex flex-col">
                          {order.client_name}
                          <span className="text-[10px] font-normal text-amber-500/70">{order.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-sm text-slate-300">{order.watch_model}</TableCell>
                      <TableCell className="p-4 text-center">
                        <Badge className={`${getStatusColor(order.status)} text-[9px] px-2 py-0.5 uppercase border-none`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           {/* Кнопка глаз (детали) остается как была */}
                          <Select 
                            key={`${order.id}-${order.status}`}
                            onValueChange={(value) => statusMutation.mutate({ id: order.id, status: value })}
                            defaultValue={order.status}
                          >
                            <SelectTrigger className="w-[120px] h-8 bg-slate-950 border-slate-700 text-[10px] uppercase font-bold">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 text-white font-sans uppercase text-[10px]">
                              <SelectItem value="new">Новый</SelectItem>
                              <SelectItem value="in_progress">В работе</SelectItem>
                              <SelectItem value="ready">Готов</SelectItem>
                              <SelectItem value="completed">Выдан</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ВКЛАДКА: АНАЛИТИКА (ГРАФИКИ) */}
          <TabsContent value="analytics" className="animate-in zoom-in-95 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Большой график доходов */}
              <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-6 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Динамика выручки</h3>
                  <TrendingUp className="text-emerald-500" size={20} />
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}₴`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020817', border: '1px solid #1e293b', fontSize: '10px' }}
                        itemStyle={{ color: '#fbbf24' }}
                      />
                      <Area type="monotone" dataKey="income" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Круговая диаграмма статусов */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Заказы по статусам</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020817', border: '1px solid #1e293b', fontSize: '10px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-[10px] uppercase font-bold">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </span>
                      <span className="text-slate-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


function StatCard({ title, value, icon, isHighlight = false }: any) {
  return (
    <div className={`p-6 rounded-xl border transition-all hover:scale-[1.02] duration-300 ${
      isHighlight ? 'bg-amber-600 border-amber-500 shadow-lg shadow-amber-900/20' : 'bg-slate-900/50 border-slate-800'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] uppercase font-black tracking-[0.2em] ${isHighlight ? 'text-amber-100' : 'text-slate-500'}`}>
          {title}
        </span>
        <div className={`p-2 rounded-lg ${isHighlight ? 'bg-amber-500' : 'bg-slate-950'}`}>
          {icon}
        </div>
      </div>
      <div className={`text-3xl font-black tracking-tighter ${isHighlight ? 'text-white' : 'text-slate-100'}`}>
        {value}
      </div>
    </div>
  );
}