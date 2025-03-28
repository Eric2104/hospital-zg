'use client';

import React, { useEffect } from 'react';
import useUserStore from '@/store/userStore';

interface ClientProviderProps {
    user: any; // Cambia `any` por el tipo adecuado de tu usuario
    children: React.ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ user, children }) => {
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        setUser(user);
    }, [user, setUser]);

    return <>{children}</>;
};

export default ClientProvider;