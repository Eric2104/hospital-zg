import { CalendarRange } from "lucide-react";
import { getFeaturedDoctors } from "../../_actions/getFeaturedDoctors";
import Carousel from "../../_components/carousel";
import Image from "next/image";

interface Doctors {
    id: string;
    name: string;
    specialty: any | {
        id: string;
        name: string;
        color: string;
    }
    featured: boolean;
    image?: any | {
        alt: string;
        url: string;
        id: string;
    }
}

interface FeaturedDocsProps {
    docs: Doctors[];
}

const FeatureDoctors = async () => {

    const featuredDocs: FeaturedDocsProps = await getFeaturedDoctors();
    console.log(featuredDocs.docs);
    return (
        <div className="mt-0">
            <Carousel dotsProp={false} slideToShowProp={6} slidesToScrollProp={6} infiniteProp={false}>
                {featuredDocs.docs.map((item) => (
                    <div key={`carousel-item-${item.id}`} className="w-full text-black ">
                        <div className="bg-[#89ccc5] rounded-xl lg:h-[14rem] overflow-hidden" >
                            <Image src={item.image.url} width={250} height={250} alt={item.name} className="rounded-xl" />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-sm lg:text-lg text-center font-semibold mt-2">Dr. {item.name}</p>
                            <p className="text-sm lg:text-lg text-center ">{item.specialty.name}</p>
                        </div>
                    </div>

                ))}
            </Carousel>
        </div>
    );
}

export default FeatureDoctors;