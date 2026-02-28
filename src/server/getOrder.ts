"use server";
import { supabase } from "@/lib/supabase";

export const getOrderById = async (orderId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) throw new Error("Заказ не найден");
  return data;
};