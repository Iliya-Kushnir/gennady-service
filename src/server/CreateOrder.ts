"use server";

import { supabase } from "@/lib/supabase";

export const createOrder = async (formData: FormData) => {
    // 1. Извлекаем данные из FormData
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const modelOfWatch = formData.get("modelOfWatch") as string;
    const problemDescription = formData.get("problemDescription") as string;
    const file = formData.get("file") as File | null;

    let imageUrl = null;

    // 2. Если файл есть, загружаем его в Storage
    if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('order-photos') // Твой бакет из SQL запроса
            .upload(filePath, file);

        if (uploadError) throw new Error("Ошибка загрузки фото: " + uploadError.message);

        // Получаем публичную ссылку
        const { data: { publicUrl } } = supabase.storage
            .from('order-photos')
            .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
    }

    // 3. Создаем запись в таблице
    const { data: newOrder, error } = await supabase
        .from('orders')
        .insert([
            {
                client_name: name,
                phone: phone,
                watch_model: modelOfWatch,
                description: problemDescription,
                image_url: imageUrl, // Ссылка на фото
            }
        ])
        .select()
        .single();

    if (error) throw new Error(error.message);

    return newOrder;
}