// components/SupabaseCheck.tsx
"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SupabaseCheck() {
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('orders').select('id').limit(1);
        if (error) console.error('❌ Ошибка Supabase:', error);
      } catch (err) {
        console.error('🌐 Сетевая ошибка:', err);
      }
    };
    checkConnection();
  }, []);

  return null; // Компонент ничего не рисует, только выполняет логику
}