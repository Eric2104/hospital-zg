'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appoiment } from "../_actions/appoiment";


interface Doctor {
    description?: any | string;
    featured: boolean;
    id: string;
    image?: any | {
        alt: string;
        id: string;
        url: string;
    };
    name: string;
    specialty: any | {
        name: string;
    }
    schedule: any | string[];
    workingHours: any | string[];
    price: any | Number;
    ubication: any | string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

const FormAppoinment = ({ doctorData, userData }: { doctorData: Doctor, userData: User }) => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const schedule = formData.get('schedule') as string;
        const time = formData.get('time') as string;
        const reason = formData.get('razon') as string;

        console.log(name, schedule, time, reason);


        const result = await appoiment({ schedule, time, idCustomer: userData.id, idDoctor: String(doctorData.id), reason });
        setIsPending(false);

        if (result?.success) {
            router.push('/dashboard');
        } else {
            setError('Valide la información ingresada');
        }
    }

    return (
        <div className="lg:order-1">
            <h2 className="hidden lg:block text-xl lg:text-2xl text-center lg:pb-4 font-semibold">
                Agendar <span className="text-[#89ccc5]">Cita</span>
            </h2>
            <div className="rounded-lg px-8 py-6 text-stone-600 lg:h-2/3 lg:mt-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.firstName + " " + userData.lastName}
                            readOnly
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-stone-100 text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#77b3ad]"
                        />
                    </div>
                    <div>
                        <label htmlFor="schedule" className="block text-sm font-medium text-stone-700">
                            Horario
                        </label>
                        <select
                            id="schedule"
                            name="schedule"
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-stone-100 text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#77b3ad]"
                        >
                            <option value="">Seleccionar Horario</option>
                            {doctorData && (
                                doctorData.schedule.map((item: string, index: number) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-stone-700">
                            Hora
                        </label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-stone-100 text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#77b3ad]"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                            Razón de la cita
                        </label>
                        <input
                            type="text"
                            id="razon"
                            name="razon"
                            placeholder="Consulta"
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-stone-100 text-stone-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#77b3ad]"
                        />
                    </div>
                    <div className="mt-2 lg:mt-4">
                        <button
                            type="submit"
                            className="w-full block lg:w-[15rem] lg:mx-auto text-center bg-[#89ccc5] text-stone-600 font-semibold py-3 px-6 rounded-lg hover:bg-[#77b3ad] transition-colors"
                        >
                            Reservar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormAppoinment;