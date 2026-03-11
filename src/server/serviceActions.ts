"use server";
import { supabase } from "@/lib/supabase";

export const getServiceBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw new Error("Услуга не найдена");
  return data;
};