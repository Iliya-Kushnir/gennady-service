"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, updateOrderStatus } from "@/server/AdminActions"; // Добавь экшен для кейсов
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Установи: npx shadcn@latest add tabs
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Твой Dialog

export default function AdminPage() {
  const queryClient = useQueryClient();

  /* БЛОК АВТОРИЗАЦИИ (ЗАКОММЕНТИРОВАНО)
    Здесь будет проверка сессии Supabase в будущем.
    
    const { data: session } = useSession(); 
    if (!session) return <Redirect to="/login" />;
  */

  // 1. Загрузка данных заказов
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });

  // 2. Мутация для смены статуса
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  if (isLoading) return <div className="p-10 text-white animate-pulse bg-[#020817] min-h-screen">Загрузка базы данных...</div>;

  return (
    <div className="min-h-screen bg-[#020817] p-8 text-slate-50 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Шапка админки */}
        <div className="flex justify-between items-end border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Gennady <span className="text-amber-600">Admin</span>
            </h1>
            <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest">
              Mode: <span className="text-emerald-500">Development (Open Access)</span>
            </p>
          </div>
          {/* Пока просто кнопка без логики */}
          <Button variant="outline" className="border-slate-700 hover:bg-red-900/20 hover:text-red-500 text-xs uppercase">
            Выйти
          </Button>
        </div>

        {/* Вкладки: Заказы / Управление контентом */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="bg-slate-900 border border-slate-800 mb-4">
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="cases">Кейсы ремонта</TabsTrigger>
          </TabsList>

          {/* КОНТЕНТ: ЗАКАЗЫ */}
          <TabsContent value="orders">
            <div className="rounded-md border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <Table>
                <TableHeader className="bg-slate-950/50">
                  <TableRow className="hover:bg-transparent border-slate-800">
                    <TableHead className="w-[120px] text-[10px] uppercase font-bold">Дата</TableHead>
                    <TableHead className="text-[10px] uppercase font-bold">Клиент</TableHead>
                    <TableHead className="text-[10px] uppercase font-bold">Модель часов</TableHead>
                    <TableHead className="text-[10px] uppercase font-bold">Статус</TableHead>
                    <TableHead className="text-right text-[10px] uppercase font-bold">Действие</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order: any) => (
                    <TableRow key={order.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                      <TableCell className="p-4 text-xs text-slate-500 font-mono">
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="p-4 font-medium">{order.client_name}</TableCell>
                      <TableCell className="p-4 text-slate-400">{order.watch_model}</TableCell>
                      <TableCell className="p-4">
                        <Badge className={`${
                          order.status === 'new' ? 'bg-amber-600' : 
                          order.status === 'in_progress' ? 'bg-blue-600' : 'bg-emerald-600'
                        } text-[10px] px-2 py-0.5 uppercase`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4 text-right text-black">
                        <Select 
                          onValueChange={(value) => statusMutation.mutate({ id: order.id, status: value })}
                          defaultValue={order.status}
                        >
                          <SelectTrigger className="w-[140px] h-8 bg-slate-950 border-slate-700 text-[10px] uppercase text-white">
                            <SelectValue placeholder="Статус" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-950 border-slate-700 text-white">
                            <SelectItem value="new">Новый</SelectItem>
                            <SelectItem value="in_progress">В работе</SelectItem>
                            <SelectItem value="ready">Готов</SelectItem>
                            <SelectItem value="completed">Выдан</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* КОНТЕНТ: КЕЙСЫ (ПОРТФОЛИО) */}
          <TabsContent value="cases">
            <div className="bg-slate-900/50 border border-slate-800 rounded-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold uppercase tracking-tight">Добавить пример работы</h3>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white uppercase text-xs font-bold">
                      + Новый кейс
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-950 border-slate-800 text-white">
                    <DialogHeader>
                      <DialogTitle className="uppercase tracking-tighter">Данные ремонта</DialogTitle>
                    </DialogHeader>
                    {/* Форма управления сайтом */}
                    <form className="space-y-4 pt-4" action={async (formData) => {
                      // Тут будет вызов createRepairCase(formData)
                      console.log("Добавление кейса...");
                    }}>
                      <Input name="title" placeholder="Название часов" className="bg-slate-900 border-slate-700" />
                      <textarea 
                        name="description"
                        className="w-full h-24 bg-slate-900 border border-slate-700 rounded-md p-2 text-sm" 
                        placeholder="Что было сделано?"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase text-slate-500 font-bold">Фото ДО</p>
                          <Input name="image_before" type="file" className="bg-slate-900 border-slate-700 text-[10px]" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase text-slate-500 font-bold">Фото ПОСЛЕ</p>
                          <Input name="image_after" type="file" className="bg-slate-900 border-slate-700 text-[10px]" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 uppercase font-bold">
                        Сохранить на сайте
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-slate-500 text-sm italic">Здесь можно будет редактировать уже созданные кейсы.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}