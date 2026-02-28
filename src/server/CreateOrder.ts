"use server";

import { supabase } from "@/lib/supabase";

export const createOrder = async (data: any) => {
    // 1. Сопоставляем данные из формы с именами колонок в твоем SQL
    const { name, phone, modelOfWatch, problemDescription } = data;

    const { data: newOrder, error } = await supabase
        .from('orders') // Название таблицы
        .insert([
            {
                client_name: name,
                phone: phone,
                watch_model: modelOfWatch,
                description: problemDescription,
                // user_id и status подставятся сами (из DEFAULT в SQL)
            }
        ])
        .select()
        .single();

        if (error) {
            // Supabase возвращает разные коды ошибок (например, '23505' для уникальности)
            if (error.code === '42501') {
                throw new Error("У вас нет прав на создание заказа (проверьте RLS)");
            }
            throw new Error(error.message || "Неизвестная ошибка сервера");
        }

    return newOrder; // Возвращаем созданный объект на фронтенд
}