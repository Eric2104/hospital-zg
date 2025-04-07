import { BriefcaseBusiness, CircleDollarSign, MapPin, Pin } from "lucide-react";
import { getSpecialtyDoctor } from "../../../_actions/getSpecialtyDoctor";
import Link from "next/link";

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

interface DoctorSpecialty {
    docs: Doctor[];
}

const Page = async ({ params }: { params: { idSpecialty: string, idDoc: string } }) => {

    const { idSpecialty, idDoc } = await params;
    const doctorSpecialty: DoctorSpecialty = await getSpecialtyDoctor({ idSpecialty, idDoc });

    return (
        <div className="w-[96vw] mx-auto px-2 my-2">
            <h2 className="text-2xl text-stone-700 font-semibold py-2">Especialistas en <span className="text-[#89ccc5]">{doctorSpecialty.docs[0].specialty.name}</span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-2">
                <div className="relative flex items-center lg:order-2">
                    <div className="relative w-4/6 pl-2 mx-auto">
                        {/* Contenedor de la imagen */}
                        <div className="relative w-full h-[250px] lg:h-[60vh]  p-4 rounded-lg">
                            <img
                                src={`${doctorSpecialty.docs[0].image.url}`}
                                alt={doctorSpecialty.docs[0].image.string}
                                className="object-cover w-3/4 h-full mx-auto rounded object-top "
                            />
                            {/* Texto sobre la imagen */}
                            <div className="absolute z-20 top-1/3 -left-14 transform -translate-y-1/2 px-4 py-2 bg-opacity-60 bg-[#ffffff] rounded-lg shadow-lg">
                                <p className="font-semibold text-lg lg:text-2xl text-stone-700">{doctorSpecialty.docs[0].name}</p>
                                <p className="lg:text-lg text-stone-600">{doctorSpecialty.docs[0].specialty.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:order-1 lg:pt-[2rem]">
                    <div className="rounded-lg shadow-lg bg-[#89ccc5] px-6 py-4 text-stone-600 lg:h-4/5">
                        <h2 className="text-2xl lg:text-3xl text-center pb-3 font-bold text-stone-800">Información del doctor</h2>
                        <div className="flex gap-5 items-center mb-3">
                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness className="w-6 h-6 lg:w-10 lg:h-10 text-stone-700" />
                                <p className="font-medium text-lg lg:text-xl text-stone-700">{doctorSpecialty.docs[0].schedule[0]}</p>
                            </div>
                            <p className="font-semibold text-lg lg:text-xl text-stone-700">{doctorSpecialty.docs[0].workingHours}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-6 h-6 lg:w-10 lg:h-10 text-stone-700" />
                            <p className="font-medium text-lg lg:text-xl text-stone-700">{doctorSpecialty.docs[0].ubication}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <CircleDollarSign className="w-6 h-6 lg:w-10 lg:h-10 text-stone-700" />
                            <p className="font-medium text-lg lg:text-xl text-stone-700">${doctorSpecialty.docs[0].price}</p>
                        </div>
                        <div className="mb-3">
                            <p className="text-sm lg:text-base text-stone-600">{doctorSpecialty.docs[0].description}</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Link
                            href={`/appointment/${idDoc}`}
                            className="block lg:w-[16rem] lg:mx-auto text-center bg-[#77b3ad] text-stone-100 font-semibold py-3 px-6 rounded-lg hover:bg-[#68a69d] transition-colors"
                        >
                            Reservar
                        </Link>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Page;