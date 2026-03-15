"use server";

import { createClient } from "@/utils/supabase/server"; // Импорт нового клиента

export const loginUser = async (data: any) => {
    const { username, password } = data;
    const supabase = await createClient(); // Создаем клиент прямо здесь

    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: username.trim(),
        password: password,
    });

    if (error) {
        console.error("Ошибка при входе:", error);
        throw new Error(error.message);
    }

    return authData;
}


import { redirect } from "next/navigation";

export const logoutUser = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login"); // После выхода перекидываем на страницу логина
};