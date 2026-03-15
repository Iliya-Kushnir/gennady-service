"use server";

import { createClient } from "@/utils/supabase/server"; // Используем серверный клиент

export const getOrderById = async (orderId: string) => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) {
    console.error("Ошибка при поиске заказа:", error.message);
    return null; // Возвращаем null, чтобы обработать это в UI
  }
  
  return data;
};