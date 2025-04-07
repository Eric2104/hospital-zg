import { CalendarRange } from "lucide-react";
import { getSpecialties } from "../../_actions/getSpecialties";
import Carousel from "../../_components/carousel";
import Link from "next/link";

interface Specialty {
    id: string;
    name: string;
    color: string;
    slug: string;
}

interface SpecialtiesProps {
    docs: Specialty[];
}

const SpecialtyOptions = async () => {
    const specialties: SpecialtiesProps = await getSpecialties();
    return (
        <Carousel dotsProp={false} slideToShowProp={6} slidesToScrollProp={6} infiniteProp={true}>
            {specialties.docs.map((item) => (
                <div>
                    <div className="w-full lg:w-[7rem] h-[6rem] lg:h-[8rem] rounded-xl flex justify-center items-center" style={{ backgroundColor: `#${item.color}`, width: "100%" }}>
                        <CalendarRange size={56} color="#fff" />
                    </div>
                    <Link href={`/specialty/${item.slug}`} key={`carousel-item-${item.id}`} className="w-full text-black ">
                        <div className="flex flex-col justify-center items-center  py-2">
                            <p className="text-sm lg:text-lg text-center font-semibold">{item.name}</p>
                        </div>
                    </Link>
                </div>

            ))}
        </Carousel>
    );
};

export default SpecialtyOptions;