"use server";
import { supabase } from "@/lib/supabase";

export const getServiceBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single(); // Нам нужна только одна запись

  if (error) {
    console.error("Ошибка при получении услуги:", error.message);
    return null;
  }
  return data;
};