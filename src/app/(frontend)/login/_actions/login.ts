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

        // Intenta realizar el login con los datos proporcionados
        const result: Result = await payload.login({
            collection: "customers",
            data: { email, password },
        });

        console.log("Login result:", result); // Registro de depuración

        // Si el login es exitoso, guarda el token en una cookie
        if (result.token) {
            const cookieStore = await cookies();
            cookieStore.set("payload-token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
            });
            return { success: true }; // Retorna éxito
        } else {
            return { success: false, error: "Invalid email or password" }; // Retorna error si las credenciales son inválidas
        }

    } catch (error) {
        console.error("Error logging in", error);
        return { success: false, error: "An unexpected error occurred" }; // Retorna error si ocurre un problema inesperado
    }
}