"use server";

import { supabase } from "@/lib/supabase";

// 1. Вспомогательная функция (оставляем её вне основного экшена)
async function sendSmsNotification(phone: string, orderId: string, name: string) {
    const apiKey = process.env.NEXT_PUBLIC_ALPHASMS_API_KEY;
    let cleanPhone = phone.replace(/\D/g, ''); 
    if (cleanPhone.length === 10) cleanPhone = `38${cleanPhone}`;

    const shortId = orderId.slice(0, 8).toUpperCase();

    try {
        const response = await fetch('https://alphasms.ua/api/json.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auth: apiKey,
                data: [
                    {
                        type: "sms",
                        id: Math.floor(Math.random() * 100000), // Случайное число для ID сообщения
                        phone: cleanPhone,                      // ТУТ БЫЛА ОШИБКА (нужно именно 'phone')
                        sms_signature: "SMSTest",                // Твоя подпись из кабинета
                        sms_message: `Gennady Service: Привет, ${name}! Заказ №${shortId} принят.`
                    }
                ]
            }),
        });

        console.log("Ответ от TurboSMS:", JSON.stringify(response, null, 2));

        const result = await response.json();
        console.log("AlphaSMS Response:", result.data);
        
        return result;
    } catch (e) {
        console.error("SMS Error:", e);
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

