'use client';

import { useRouter } from "next/navigation";
import { useState, ReactElement } from "react";
import { LoaderCircle } from "lucide-react";
import { signup, SignupResponse } from "../_action/signup";

export default function SignupForm(): ReactElement {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const dni = formData.get('dni') as string;
        const born = formData.get('born') as string;
        const residence = formData.get('residence') as string;
        const phone = Number(formData.get('phone') as string);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        const result: SignupResponse = await signup({ firstName, lastName, dni, born, residence, phone, email, password });
        setIsPending(false);

        if (result?.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || "Signup failed");
        }
    }

    return (
        <div className='relative overflow-hidden w-full h-screen '>
            <div className='hidden lg:block absolute -top-[36.5rem] lg:-top-[12rem] left-1/2 lg:-left-[12rem] -translate-x-1/2 lg:translate-x-0  w-[50rem] lg:w-[25rem] h-[40rem] lg:h-[25rem] bg-[#89ccc5]  rounded-full'></div>
            <div className='hidden lg:block absolute -bottom-[12rem] -right-[12rem] w-[25rem] h-[25rem] bg-[#89ccc5] rounded-full'></div>
            <div>
                <div className='lg:flex items-center justify-around h-screen w-full'>
                    <div className='flex justify-center items-center lg:w-5/12 '>
                        <img src="../logo.svg" alt="logo" className='w-[25vw] lg:w-[20vw] lg:translate-x-12 mt-8 lg:mt-0' />
                    </div>
                    <div className='lg:mt-0 px-8 pt-8 lg:pt-0 lg:w-7/12 lg:pr-[14rem]'>
                        <h2 className='text-3xl font-bold mb-8 text-zinc-700 text-center'>Formulario de <span className='text-[#89ccc5] '>registro</span></h2>
                        <form className="items-center space-y-2" onSubmit={handleSubmit}>
                            <input type="text" placeholder='Nombre/s' name="firstName" id="firstName" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            <input type="text" placeholder='Apellido/s' name="lastName" id="lastName" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            <div className="flex gap-2">
                                <input type="text" placeholder='No. de Identidad Persona' name="dni" id="dni" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                                <input type="date" name="born" id="born" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            </div>
                            <input type="text" placeholder='Dirección de Residence' name="residence" id="residence" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            <input type="number" placeholder='No. de Contacto' name="phone" id="phone" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            <input type="email" placeholder='Correo' name="email" id="email" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            <input type="password" placeholder='Contraseña' name="password" id="password" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />
                            <input type="password" placeholder='Repetir contraseña' name="confirmPassword" id="confirmPassword" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#89ccc5]' />

                            <div className='flex flex-col items-center space-y-2'>
                                <button
                                    type='submit'
                                    className='flex justify-center gap-3 w-full bg-[#89ccc5] text-white py-2 rounded-md hover:bg-[#78b2a8] duration-300 transition'>
                                    {isPending ?
                                        <div className='flex items-center gap-3 transition-opacity duration-300 opacity-100'>
                                            <LoaderCircle className='animate-spin' size={24} /> Creando cuenta
                                        </div>
                                        :
                                        <div className='transition-opacity duration-300 opacity-100'>
                                            Crear cuenta
                                        </div>
                                    }
                                </button>
                            </div>
                            <button type='button' onClick={() => { router.push('/login'); }} className='w-full bg-[#89ccc5] text-white py-2 rounded-md hover:bg-[#78b2a8] transition duration-300'>Iniciar sesión</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}