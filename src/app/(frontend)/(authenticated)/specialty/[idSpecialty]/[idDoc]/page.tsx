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
                <div className="flex items-center lg:order-2">
                    <div className="relative w-1/2 pl-2 ">
                        <div className="absolute z-10 top-1/2 -translate-y-8  ">
                            <p className="font-semibold text-4xl">Dr. <span className="text-stone-700">{doctorSpecialty.docs[0].name}</span></p>
                            <p className="text-stone-700">{doctorSpecialty.docs[0].specialty.name}</p>
                        </div>
                    </div>
                    <div className="w-1/2 lg:w-full h-[250px] lg:h-[60vh] overflow-hidden p-4 rounded-lg">
                        <img src={`${doctorSpecialty.docs[0].image.url}`} alt={doctorSpecialty.docs[0].image.string} className="object-scale-down w-full h-fullp-4" />
                    </div>
                </div>
                <div className="lg:order-1 lg:pt-[2rem]">
                    <div className="rounded-lg shadow-lg bg-[#89ccc5] px-6 py-3 text-stone-600 lg:h-2/3">
                        <h2 className="text-xl lg:text-2xl text-center pb-2 font-bold">Informacion del doctor</h2>
                        <div className="flex gap-5 items-center mb-2">
                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness className="w-5 h-5 lg:w-8 lg:h-8" />
                                <p className="font-medium text-lg">{doctorSpecialty.docs[0].schedule[0]}</p>
                            </div>
                            <p className="font-semibold text-lg">{doctorSpecialty.docs[0].workingHours}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5 lg:w-8 lg:h-8" />
                            <p className="font-medium">{doctorSpecialty.docs[0].ubication}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <CircleDollarSign className="w-5 h-5 lg:w-8 lg:h-8" />
                            <p className="font-medium">${doctorSpecialty.docs[0].price}</p>
                        </div>
                        <div className="mb-2">
                            <p className="text-sm">{doctorSpecialty.docs[0].description}</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Link
                            href={`/appointment/${idDoc}`}
                            className="block lg:w-[15rem] lg:mx-auto text-center bg-[#89ccc5] text-stone-600 font-semibold py-2 px-4 rounded-lg hover:bg-[#77b3ad] transition-colors"
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