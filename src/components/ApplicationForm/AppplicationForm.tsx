"use client";
import { useState, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { createOrder } from "@/server/CreateOrder";
import { Upload, X } from "lucide-react";

type ApplicationFormData = {
    name: string;
    phone: string;
    modelOfWatch: string;
    problemDescription: string;
    file?: File | null;
}

const ApplicationForm = () => {
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<ApplicationFormData>();

    const { mutate, isPending } = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            alert("Заявка принята!");
            setFilePreview(null);
            reset();
        },
        onError: (error: any) => alert(`Ошибка: ${error.message}`)
    });

    // Логика Drag and Drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setValue("file", file);
            setFilePreview(URL.createObjectURL(file));
        }
    }, [setValue]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    const onSubmit: SubmitHandler<ApplicationFormData> = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("modelOfWatch", data.modelOfWatch);
        formData.append("problemDescription", data.problemDescription);
        if (data.file) formData.append("file", data.file);

        mutate(formData as any); // Отправляем как FormData
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Ваше имя</label>
                    <input {...register("name", { required: true })} className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600" />
                </div>
                <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Телефон</label>
                    <input {...register("phone", { required: true })} className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600" />
                </div>
            </div>

            {/* Зона Drag and Drop */}
            <div 
                {...getRootProps()} 
                className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'}`}
            >
                <input {...getInputProps()} />
                {filePreview ? (
                    <div className="relative inline-block">
                        <img src={filePreview} alt="Preview" className="h-32 w-32 object-cover rounded border border-slate-700" />
                        <button type="button" onClick={(e) => { e.stopPropagation(); setFilePreview(null); setValue("file", null); }} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"><X size={12} /></button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <Upload className="text-slate-500" />
                        <p className="text-xs text-slate-400 uppercase tracking-widest">Перетащите фото часов или кликните</p>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Модель часов</label>
                <input {...register("modelOfWatch", { required: true })} className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600" />
            </div>

            <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Описание проблемы</label>
                <textarea {...register("problemDescription", { required: true })} rows={4} className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-amber-600"></textarea>
            </div>

            <button type="submit" disabled={isPending} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 font-bold uppercase tracking-widest transition-all disabled:opacity-50">
                {isPending ? "Отправляем..." : "Отправить заявку"}
            </button>
        </form>
    );
};

export default ApplicationForm;