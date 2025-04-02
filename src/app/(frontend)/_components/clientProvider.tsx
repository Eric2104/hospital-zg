'use client';

import useUserStore from '@/store/userStore';
import { FC, useEffect } from 'react';

interface ClientProviderProps {
    user: any; // Cambia `any` por el tipo adecuado
    children: React.ReactNode;
}

const ClientProvider: FC<ClientProviderProps> = ({ user, children }) => {
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        setUser(user);
    }, [user, setUser]);

    return <>{children}</>;
};

export default ClientProvider;