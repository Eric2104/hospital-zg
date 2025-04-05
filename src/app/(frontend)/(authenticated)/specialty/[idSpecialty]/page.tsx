import Link from "next/link";
import { getSpecialtiesDoctors } from "../../_actions/getSpecialtiesDoctors";
import Carousel from "../../_components/carousel";
import Image from "next/image";
import DoctorSeacher from "../../_components/doctorSeacher";
import { Frown } from "lucide-react";


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
}

interface DoctorSpecialty {
    docs: Doctor[];
}



const Page = async ({ params }: { params: { idSpecialty: string } }) => {

    const { idSpecialty } = await params;
    const doctorSpecialty: DoctorSpecialty = await getSpecialtiesDoctors({ idSpecialty });

    return (
        <div className="w-[96vw] mx-auto px-2 my-2">
            <h2 className="text-xl text-stone-700 font-semibold py-2">Especialistas en <span className="text-[#89ccc5]">{idSpecialty}</span></h2>
            <div className="py-2 lg:hidden">
                <DoctorSeacher />
            </div>
            <div className="hidden lg:block m-0 p-0">
                {(doctorSpecialty.docs.length !== 0) ? (
                    <Carousel infiniteProp={true} slideToShowProp={4} slidesToScrollProp={4} >
                        {
                            doctorSpecialty.docs.map((doctor: Doctor) => (
                                <div key={`carousel-specialty-${doctor.id}`} className=" w-full h-full">
                                    <div className="w-10/12 bg-[#cce7e4] mx-auto rounded-xl p-2">
                                        <div className="w-[16rem] h-[14rem] overflow-hidden rounded-lg mx-auto mt-2">
                                            <img
                                                src={doctor.image.url}
                                                alt="Doctor Image"
                                                className="object-fill w-full"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center px-2 py-2">
                                            <p className="text-lg font-semibold text-stone-800">Dr. {doctor.name}</p>
                                            <p className="text-sm text-stone-700">Horario: Lunes a Viernes</p>
                                            <p className="text-sm text-stone-700">Hora: 10:30 AM</p>
                                            <p className="text-sm text-stone-700">Costo: $50.00</p>
                                            <Link href={`/specialty/${idSpecialty}/${doctor.id}`}
                                                className="mt-1 px-4 py-2 bg-[#46b9ac] text-white font-medium rounded-lg hover:bg-[#005f56] transition duration-300"
                                            >
                                                Reservar Cita
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>)
                    : (
                        <div className="flex justify-center items-center gap-x-4 mt-8">
                            <p className="text-stone-400 text-4xl text-center  ">No hay especialistas de esta rama</p>
                            <Frown className="text-stone-400 text-4xl text-center  " />
                        </div>
                    )
                }
            </div>
            <div className="lg:hidden h-[70vh] overflow-y-auto scrollbar-hide">
                {doctorSpecialty.docs.length !== 0 ? (
                    doctorSpecialty.docs.map((doctor: Doctor) => (
                        <div key={`doctor-specialty-${doctor.id}`} className="flex bg-[#cce7e4] rounded-lg px-2 py-4 my-2">
                            <div className="w-[8rem] h-[8rem] overflow-hidden m-2 rounded-lg">
                                <img
                                    src={doctor.image.url}
                                    alt="Doctor Image"
                                    className="object-fill w-full"
                                />
                            </div>
                            <div className="flex flex-col justify-center ml-4">
                                <p className="text-lg font-semibold text-stone-800">Dr. {doctor.name}</p>
                                <p className="text-sm text-stone-700">Horario: Lunes a Viernes</p>
                                <p className="text-sm text-stone-700">Hora: 10:30 AM</p>
                                <p className="text-sm text-stone-700">Costo: $50.00</p>
                                <Link href={`/specialty/${idSpecialty}/${doctor.id}`}
                                    className="mt-1 px-4 py-2 bg-[#46b9ac] text-white font-medium rounded-lg hover:bg-[#005f56] transition duration-300"
                                >
                                    Reservar Cita
                                </Link>
                            </div>
                        </div>
                    ))
                )
                    :
                    <div className="flex justify-center text-2xl items-center gap-x-4 mt-8">
                        <p className="text-stone-400  text-center  ">No hay especialistas de esta rama <Frown size={32} /></p>

                    </div>
                }
            </div>
        </div>
    );
}

export default Page;