'use client'
import Link from "next/link";
import Image from "next/image";
import { Menu, User, X } from "lucide-react";
import Navbar from "./navBar";
import { useState } from "react";


const HeaderDashborad = ({ userId }: { userId: string }) => {

    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className='relative mb-2'>
            <header className="sticky z-40 py-2 px-2 lg:w-[96vw] mx-auto flex justify-between items-center bg-white">
                <Link href={"/#"}>
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={64}
                        height={64}
                        className="object-contain w-[3rem] lg:w-[3vw] hover:opacity-90 transition-opacity duration-300"
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
            <Navbar openMenu={openMenu} userId={userId} />
        </div>
    );
};

export default HeaderDashborad;