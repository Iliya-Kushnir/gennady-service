"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, updateOrderStatus } from "@/server/AdminActions"; // Импорты твоих функций
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"; // Твои Shadcn компоненты
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const queryClient = useQueryClient();

  // 1. Загрузка данных
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

  if (isLoading) return <div className="p-10 text-white animate-pulse">Загрузка базы данных...</div>;

  return (
    <div className="min-h-screen bg-[#020817] p-8 text-slate-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Шапка админки */}
        <div className="flex justify-between items-end border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Gennady <span className="text-amber-600">Admin</span></h1>
            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest">Управление заказами мастерской</p>
          </div>
          <Button variant="outline" className="border-slate-700 hover:bg-red-900/20 hover:text-red-500">Выйти</Button>
        </div>

        {/* Таблица Shadcn */}
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
                  <td className="p-4 text-xs text-slate-500 font-mono">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium">{order.client_name}</td>
                  <td className="p-4 text-slate-400">{order.watch_model}</td>
                  <td className="p-4">
                    {/* Твой Badge из Shadcn */}
                    <Badge className={`${
                      order.status === 'new' ? 'bg-amber-600' : 
                      order.status === 'in_progress' ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    {/* Твой Select из Shadcn для управления статусом */}
                    <Select 
                      onValueChange={(value) => statusMutation.mutate({ id: order.id, status: value })}
                      defaultValue={order.status}
                    >
                      <SelectTrigger className="w-[140px] h-8 bg-slate-950 border-slate-700 text-[10px] uppercase">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-slate-700 text-white">
                        <SelectItem value="new">Новый</SelectItem>
                        <SelectItem value="in_progress">В работе</SelectItem>
                        <SelectItem value="ready">Готов</SelectItem>
                        <SelectItem value="completed">Выдан</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}