import Link from "next/link";
import Image from "next/image";
import { getDoctorLogged } from "../_actions/getDoctorLogged";
import TimerHeader from "./TimerHeader";


const Header = async () => {

    const doc = await getDoctorLogged()

    return (
        <div className='relative mb-2'>
            <header className="sticky z-40 py-2 px-2 lg:w-[96vw] mx-auto flex justify-between items-center bg-white">
                <Link href={"/doctor"}>
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="object-contain w-[3rem] lg:w-[3vw] hover:opacity-90 transition-opacity duration-300"
                    />
                </Link>
            </header>
            <div className="grid lg:grid-cols-2 px-4 lg:px-10">
                <div className="text-2xl lg:text-4xl w-full">
                    Bienvenido, <span className="text-[#89ccc5] font-bold">{doc?.name}</span>
                </div>

                <TimerHeader />
            </div>
        </div>
    );
}

export default Header;
