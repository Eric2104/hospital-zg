import { redirect } from 'next/navigation';
import React, { FC, ReactNode } from 'react';
import { getUser } from './_actions/getUser';
import HeaderDashborad from './_components/header';
import Navbar from './_components/navBar';
import DoctorSeacher from './_components/doctorSeacher';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
    const user = await getUser();
    console.log(user);
    if (!user) {
        redirect('/login');
        return null;
    }
    return (
        <div>
            <HeaderDashborad />
            {children}
        </div>
    )
}

export default Layout;