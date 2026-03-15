"use server";
import { supabase } from "@/lib/supabase";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Получить все заказы
export const getAllOrders = async () => {
  const supabase = await createClient(); // Используем серверный клиент для надежности
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

// Обновить статус заказа
export async function updateOrderStatus(id: string, updates: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('orders')
    .update(updates) // Передаем объект с изменениями (status или price)
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  return data;
}