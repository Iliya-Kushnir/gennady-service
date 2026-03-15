"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import { loginUser } from "@/server/authActions";
import { useRouter } from "next/navigation";


type LoginFormData = {
    username: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormData>();

    const { mutate, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: async (serverData) => {
            // ОБЯЗАТЕЛЬНО: заставляем Next.js перечитать куки
            router.refresh(); 
            reset(); // Сбрасываем форму после успешного входа
            
            setTimeout(() => {
                router.push("/admin");
            }, 100);
        },
        onError: (error: any) => {
            alert(`Ошибка: ${error.message}`);
        }
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        console.log("Form Data:", data);
        mutate(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Ваш Логин</label>
                    <input 
                        {...register("username", { required: true, minLength: 2 })} 
                        type="text" 
                        disabled={isPending}
                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors" 
                        placeholder="Константин" 
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">Пожалуйста, введите ваше имя (минимум 2 символа).</p>}
                </div>

                <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Ваш Пароль</label>
                    <input 
                        {...register("password", { required: true, minLength: 2 })} 
                        type="password" // Изменили на password
                        disabled={isPending}
                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors" 
                        placeholder="••••••••" 
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">Введите пароль.</p>}
                </div>

                <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 font-bold uppercase tracking-widest transition-all">
                    {isPending ? "Входим..." : "Войти"} 
                </button>
            </div>
        </form>
    );
}

export default LoginForm;