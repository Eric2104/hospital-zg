"use server"

// Importa las funciones y configuraciones necesarias
import { getPayload } from 'payload';
import config from '@payload-config';
import { cookies } from 'next/headers';
import { Customer } from '@/payload-types';

// Define las interfaces para los parámetros y la respuesta del login
interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    error?: string;
    userType?: "customer" | "doctor";
}

export type Result = {
    exp?: number;
    token?: string;
    user?: Customer;
}

// Función asíncrona para manejar el login
export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
    const payload = await getPayload({ config }); // Obtiene la instancia de payload con la configuración

    try {
        // Intenta realizar el login con la colección "customers"
        const resultCustomer: Result = await payload.login({
            collection: "customers",
            data: { email, password },
        });

        if (resultCustomer.token) {
            const cookieStore = await cookies();
            cookieStore.set("payload-token", resultCustomer.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",

            });
            return { success: true, userType: "customer" }; // Retorna éxito con tipo de usuario
        }
    } catch (error) {
        console.warn("Customer login failed, trying doctor login...");
    }

    try {
        // Si falla el login con "customers", intenta con la colección "doctors"
        const resultDocs = await payload.login({
            collection: "doctors",
            data: { email, password },
        });

        if (resultDocs.token) {
            const cookieStore = await cookies();
            cookieStore.set("payload-token", resultDocs.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
            });
            return { success: true, userType: "doctor" }; // Retorna éxito con tipo de usuario
        }
    } catch (error) {
        console.error("Doctor login failed", error);
    }

    return { success: false, error: "Invalid email or password" }; // Retorna error si ambos intentos fallan
}