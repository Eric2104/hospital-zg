'use client'

import Link from "next/link";
import { getDoctorAppointment } from "../../_actions/getDoctorAppointment";
import { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { appoiment } from "./_actions/appoiment";
import { useStore } from "zustand";
import useUserStore from "@/store/userStore";



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

interface DoctorAppointment {
    docs: Doctor[];
}

const Page = () => {

    const { idDoc } = useParams();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [docInfo, setDocInfo] = useState<DoctorAppointment | null>(null);
    const { user } = useUserStore()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const schedule = formData.get('schedule') as string;
        const time = formData.get('time') as string;

        console.log(name, schedule, time);


        const result = await appoiment({ schedule, time, idCustomer: user.id, idDoctor: String(idDoc) });
        setIsPending(false);

        if (result?.success) {
            router.push('/dashboard');
        } else {
            setError('Valide la información ingresada');
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (typeof idDoc === 'string') {
                const data = await getDoctorAppointment({ idDoc });
                setDocInfo(data);
            } else {
                console.error('Invalid idDoc:', idDoc);
            }
        }
        fetchData();
    }, [idDoc]);



    return (
        <div className="w-[96vw] mx-auto px-2 my-2">
            <h2 className="text-2xl text-stone-700 font-semibold py-2">Especialistas en <span className="text-[#89ccc5]">{docInfo ? docInfo.docs[0].specialty.name : "Cargando..."}</span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-2">
                <div className="flex items-center lg:order-2">
                    <div className="relative w-1/2 pl-2 ">
                        <div className="absolute z-10 top-1/2 -translate-y-8  ">
                            <p className="font-semibold text-4xl">Dr. <span className="text-stone-700">{docInfo ? docInfo.docs[0].name : "Cargando..."}</span></p>
                            <p className="text-stone-700">{docInfo ? docInfo.docs[0].specialty.name : "Cargando..."}</p>
                        </div>
                    </div>
                    <div className="w-1/2 lg:w-full h-[250px] lg:h-[60vh] overflow-hidden rounded-lg">
                        <img src={`${docInfo?.docs[0].image.url}`} alt={docInfo?.docs[0].image.string} className="object-scale-down w-full h-fullp-4" />
                    </div>
                </div>
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
                                    value={user.firstName + " " + user.lastName}
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
                                    {docInfo && (
                                        docInfo.docs[0].schedule.map((item: string, index: number) => (
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
            </div>
        </div>
    );
}

export default Page;