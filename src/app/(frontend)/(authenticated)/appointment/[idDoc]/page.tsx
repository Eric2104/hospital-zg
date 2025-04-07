import { getUser } from "../../_actions/getUser";
import { getDoctorSelected } from "./_actions/getDoctorSelected";
import FormAppoinment from "./_component/formAppoinment";


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
    const { idDoc } = await params;
    const doctorSpecialty: DoctorSpecialty = await getDoctorSelected({ idDoc });
    const user: any = await getUser();



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
                                alt={`${doctorSpecialty.docs[0].image.alt}`}
                                className="object-cover w-3/4 h-full mx-auto rounded"
                            />
                            {/* Texto sobre la imagen */}
                            <div className="absolute z-20 top-1/3 -left-14 transform -translate-y-1/2 px-4 py-2 bg-opacity-60 bg-[#ffffff] rounded-lg shadow-lg">
                                <p className="font-semibold text-lg lg:text-2xl text-stone-700">{doctorSpecialty.docs[0].name}</p>
                                <p className="lg:text-lg text-stone-600">{doctorSpecialty.docs[0].specialty.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <FormAppoinment doctorData={doctorSpecialty.docs[0]} userData={user} />

            </div>
        </div>
    );
}

export default Page;