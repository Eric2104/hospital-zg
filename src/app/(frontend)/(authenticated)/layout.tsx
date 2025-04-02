import { redirect } from 'next/navigation';
import React, { FC, ReactNode } from 'react';
import { getUser } from './_actions/getUser';
import HeaderDashborad from './_components/header';
import ClientProvider from '../_components/clientProvider';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
    const user = await getUser();

    if (!user) {
        redirect('/login');
        return null;
    }

    return (
        <div>
            <ClientProvider user={user}>
                <HeaderDashborad userId={user.id} />
                {children}
            </ClientProvider>
        </div>
    );
};

export default Layout;