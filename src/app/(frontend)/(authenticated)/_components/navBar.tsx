import Link from "next/link";
import DoctorSeacher from "./doctorSeacher";

interface NavbarProps {
    openMenu?: boolean;
}

const Navbar = ({ openMenu }: NavbarProps) => {

    return (
        <div className={`absolute flex justify-around items-center w-full lg:w-[95vw] lg:rounded-xl lg:mx-auto lg:relative z-10 bg-neutral-200 lg:bg-[#89ccc5] transform transition-transform duration-300 ${openMenu ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'}  shadow-md`}>
            <div className="hidden lg:block w-full">
                <DoctorSeacher />
            </div>
            <div
                className="flex flex-col lg:flex-row lg:items-center px-4 py-3 lg:py-2 space-y-2 lg:space-y-0 w-full justify-around text-stone-600 lg:text-white lg:text-lg">
                <Link href={`/dashboard`}
                    className=" px-3 lg:px-6 py-2 lg:hover:underline rounded hover:bg-neutral-100 hover:text-stone-800 transition-colors duration-300">
                    Inicio
                </Link>
                <Link href={`/#`}
                    className=" px-3 lg:px-6 py-2 lg:hover:underline rounded hover:bg-neutral-100 hover:text-stone-800 transition-colors duration-100">
                    Historial de citas
                </Link>
                <Link href={`/#`}
                    className=" px-3 lg:px-6 py-2 lg:hover:underline rounded hover:bg-neutral-100 hover:text-stone-800 transition-colors duration-300">
                    Perfil
                </Link>
            </div>
        </div>
    );
};

export default Navbar;