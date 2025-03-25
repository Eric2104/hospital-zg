"use client"
import { useRouter } from 'next/navigation';
import React, { ReactElement, useState } from 'react'
import { login, LoginResponse } from '../_actions/login';
import { LoaderCircle } from 'lucide-react';
import Toast from '../../_components/toast';

export default function LoginForm(): ReactElement {

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const result: LoginResponse = await login({ email, password });
        setIsPending(false);

        if (result?.success) {
            router.push('/dashboard');
        } else {
            setError('Valide la información ingresada');
        }
    }

    return (
        <div className='relative overflow-hidden w-full h-screen'>
            <div className='absolute -top-[36rem] lg:-top-[12rem] left-1/2 lg:-left-[12rem] -translate-x-1/2 lg:translate-x-0  w-[50rem] lg:w-[25rem] h-[40rem] lg:h-[25rem] bg-[#89ccc5]  rounded-full'></div>
            <div className='hidden lg:block absolute -bottom-[12rem] -right-[12rem] w-[25rem] h-[25rem] bg-[#89ccc5] rounded-full'></div>
            <div>
                <div className='lg:flex items-center justify-around h-screen w-full'>
                    <div className='flex justify-center items-center'>
                        <img src="../logo.svg" alt="logo" className='w-[40vw] lg:w-[20vw] mt-20 lg:mt-0' />
                    </div>
                    <div className='mt-10 lg:mt-0 px-8 py-10'>
                        <h2 className='text-3xl font-bold mb-6 text-zinc-700 text-center'>Formulario de <span className='text-[#89ccc5] '>inicio de sesión</span></h2>
                        <form onSubmit={handleSubmit} className=" items-center space-y-4">
                            <input type="email" placeholder='Correo' name="email" id="email" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            <input type="password" placeholder='Contraseña' name="password" id="password" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            <div className='flex flex-col items-center space-y-2'>
                                <button
                                    type='submit'
                                    className='flex justify-center gap-3 w-full bg-[#89ccc5] text-white py-2 rounded-md hover:bg-[#78b2a8] duration-300 transition'>
                                    {isPending ?
                                        <div className='flex items-center gap-3 transition-opacity duration-300 opacity-100'>
                                            <LoaderCircle className='animate-spin' size={24} /> Iniciando sesión
                                        </div>
                                        :
                                        <div className='transition-opacity duration-300 opacity-100'>
                                            Iniciar sesión
                                        </div>
                                    }
                                </button>
                                <a href="#" className='text-sm text-[#89ccc5] hover:underline'>¿Olvidaste tu contraseña?</a>
                            </div>
                            <button type='button' onClick={() => { router.push('/signup'); }} className='w-full bg-[#89ccc5] text-white py-2 rounded-md hover:bg-[#78b2a8] transition duration-300'>Crear cuenta</button>
                        </form>
                    </div>
                </div>
            </div>
            {error && <Toast titulo='Error' mensaje={error} tipo='error' />}
        </div>
    )
}