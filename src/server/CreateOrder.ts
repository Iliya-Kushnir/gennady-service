"use server";

import { supabase } from "@/lib/supabase";

// 1. Вспомогательная функция (оставляем её вне основного экшена)
async function sendSmsNotification(phone: string, orderId: string, name: string) {
    // Получаем ключ напрямую (убедись, что сервер был перезапущен после добавления в .env.local)
    const apiKey = process.env.ALPHASMS_API_KEY; 

    if (!apiKey) {
        console.error("КРИТИЧЕСКАЯ ОШИБКА: Ключ API не найден в переменных окружения!");
        return;
    }

    // Очищаем телефон и добавляем 38, если ввели 10 цифр
    let cleanPhone = phone.replace(/\D/g, ''); 
    if (cleanPhone.length === 10) cleanPhone = `38${cleanPhone}`;


    try {
        const response = await fetch('https://alphasms.ua/api/json.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auth: apiKey, // Передаем просто строкой!
                data: [
                    {
                        type: "sms",
                        id: Date.now(), // Уникальный ID из времени (лучше, чем рандом)
                        phone: Number(cleanPhone), // AlphaSMS любит, когда телефон числом
                        sms_signature: "SMARTTEST",  // ВАЖНО: это имя должно быть одобрено в кабинете!
                        sms_message: `Gennady Service: Привет, ${name}! Заказ №${orderId} принят.`
                    }
                ]
            }),
        });

        const result = await response.json();
        
        // Логируем полный ответ, чтобы точно видеть, что происходит
        console.log("FULL ALPHASMS RESPONSE:", JSON.stringify(result, null, 2));
        
        return result;
    } catch (e) {
        console.error("SMS Network Error:", e);
    }
}

export const createOrder = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const modelOfWatch = formData.get("modelOfWatch") as string;
    const problemDescription = formData.get("problemDescription") as string;
    const file = formData.get("file") as File | null;

    let imageUrl = null;

    if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('order-photos')
            .upload(filePath, file);

        if (uploadError) throw new Error("Ошибка загрузки фото: " + uploadError.message);

        const { data: { publicUrl } } = supabase.storage
            .from('order-photos')
            .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
    }

    // Создаем запись в таблице
    const { data: newOrder, error } = await supabase
        .from('orders')
        .insert([
            {
                client_name: name,
                phone: phone,
                watch_model: modelOfWatch,
                description: problemDescription,
                image_url: imageUrl,
            }
        ])
        .select()
        .single();

    if (error) throw new Error(error.message);

    // --- ВОТ ТУТ МЫ ВЫЗЫВАЕМ SMS ---
    // Если заказ создался успешно, отправляем сообщение
    if (newOrder) {
        // Мы не используем await, чтобы не заставлять юзера ждать отправки SMS
        // Но если хочешь дождаться, можно добавить await
        sendSmsNotification(phone, newOrder.id.toString(), name);
    }

    return newOrder;
}

