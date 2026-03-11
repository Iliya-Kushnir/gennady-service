"use client";

import { useEffect } from 'react';
import { getServiceBySlug } from '@/server/getServices'; // Проверь путь к файлу!

export default function ServicePage() {
    useEffect(() => {
        const checkData = async () => {
            const data = await getServiceBySlug("repassage");
            console.log("=== ДАННЫЕ ИЗ SUPABASE ===");
            console.table(data); // Выведет красивую таблицу в консоль
            console.log("==========================");
        };
        checkData();
    }, []);

    return (
        <div className="p-10 text-white">
            <h1>Проверка данных...</h1>
            <p>Открой консоль (F12 - Console), чтобы увидеть список услуг.</p>
        </div>
    );
}