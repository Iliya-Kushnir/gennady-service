"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import { createOrder } from "@/server/CreateOrder";

type ApplicationFormData = {
    name: string;
    phone: string;
    modelOfWatch: string;
    problemDescription: string;
}

const ApplicationForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset,
    } = useForm<ApplicationFormData>();

    const { mutate, isPending } = useMutation({
        mutationFn: createOrder, // Передаем функцию как есть
        onSuccess: (serverData) => {
            console.log("Успех! Данные от сервера:", serverData);
            alert("Заявка принята!");
            reset();
        },
        onError: (error: any) => {
            alert(`Ошибка: ${error.message}`);
        }
    });

    const onSubmit: SubmitHandler<ApplicationFormData> = (data) => {
        console.log("Form Data:", data);
        mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Ваше имя</label>
                    <input 
                        {...register("name", { required: true, minLength: 2 })} 
                        type="text" 
                        disabled={isPending}
                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors" 
                        placeholder="Константин" 
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">Пожалуйста, введите ваше имя (минимум 2 символа).</p>}
                </div>
                <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Телефон</label>
                    <input 
                        {...register("phone", { required: true, pattern: /^\+380\d{9}$/ })} 
                        type="tel" 
                        disabled={isPending}
                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors" 
                        placeholder="+380" 
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">Пожалуйста, введите корректный номер телефона в формате +380XXXXXXXXX.</p>}
                </div>
            </div>
            <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Модель часов</label>
                <input 
                    {...register("modelOfWatch", { required: true, minLength: 3 })} 
                    type="text" 
                    disabled={isPending}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors" 
                    placeholder="Rolex Daytona 116500LN" 
                />
                {errors.modelOfWatch && <p className="text-red-500 text-xs mt-1">Пожалуйста, введите модель часов (минимум 3 символа).</p>}
            </div>
            <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Описание проблемы</label>
                <textarea 
                    {...register("problemDescription", { required: true, minLength: 10 })} 
                    rows={4} 
                    disabled={isPending}
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors" 
                    placeholder="Часы отстают на 30 секунд в сутки..."
                ></textarea>
                {errors.problemDescription && <p className="text-red-500 text-xs mt-1">Пожалуйста, опишите проблему (минимум 10 символов).</p>}
            </div>
            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 font-bold uppercase tracking-widest transition-all">
                {isPending ? "Отправляем..." : "Отправить заявку"}
            </button>
        </form>
    );
};

export default ApplicationForm;