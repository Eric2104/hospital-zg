"use server"

// Importa las funciones y configuraciones necesarias
import { getPayload } from 'payload';
import config from '@payload-config';

// Define las interfaces para los parámetros y la respuesta del login
interface AppoimentParams {
    schedule: string;
    time: string;
    idCustomer: string;
    idDoctor: string;
}

export interface AppoimentResponse {
    success: boolean;
    error?: string;
}

export type Result = {

}

// Función asíncrona para manejar el login
export async function appoiment({ schedule, time, idCustomer, idDoctor }: AppoimentParams): Promise<AppoimentResponse> {
    const payload = await getPayload({ config });
    const status = "pending"
    try {
        // Intenta realizar el login con los datos proporcionados
        const result: Result = await payload.create({
            collection: "appointments",
            data: { schedule, time, idCustomer, idDoctor, status },
        });

        if (result) {
            return { success: true }; // Retorna éxito
        } else {
            return { success: false, error: "Error to create an appointment" };
        }


    } catch (error) {
        console.error("Error logging in", error);
        return { success: false, error: "An unexpected error occurred" }; // Retorna error si ocurre un problema inesperado
    }
}