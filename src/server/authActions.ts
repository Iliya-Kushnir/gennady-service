"use server";

import { supabase } from "@/lib/supabase";

export const loginUser = async (data: any) => {
    const { username, password } = data;
    const {data: authData, error} = await supabase.auth.signInWithPassword({
        email: username.trim(),
        password: password,
    });

    if (error) {
        console.error("Ошибка при входе:", error);
        throw new Error(error.message);
    }

    return authData;
}