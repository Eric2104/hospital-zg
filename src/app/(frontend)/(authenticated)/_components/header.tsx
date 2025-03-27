'use client'
import Link from "next/link";
import Image from "next/image";
import { Menu, User, X } from "lucide-react";
import Navbar from "./navBar";
import { useState } from "react";


const HeaderDashborad = () => {

    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className='relative mb-2'>
            <header className="sticky z-40 py-2 px-4 flex justify-between items-center bg-white shadow">
                <Link href={"/#"}>
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="object-contain w-[14vw] lg:w-[4vw] hover:opacity-90 transition-opacity duration-300"
                    />
                </Link>
                <User size={34} className="hidden lg:block text-gray-600 hover:text-gray-800 transition-colors duration-300 cursor-pointer" />
                <button
                    type="button"
                    onClick={() => { setOpenMenu(!openMenu) }}
                    className="lg:hidden p-2 rounded hover:bg-gray-100 transition-colors duration-300"
                >
                    {openMenu ? <X size={34} /> : <Menu size={34} />}

                </button>
            </header>
            <Navbar openMenu={openMenu} />
        </div>
    );
};

export default HeaderDashborad;