"use server"
import { getPayload } from 'payload'
import config from '@payload-config'
import { Customer } from '@/payload-types'
import { cookies } from 'next/headers'

interface SignupProps {
    firstName: string;
    lastName: string;
    dni: string;
    born: string;
    residence: string;
    phone: number;
    email: string;
    password: string;
}

export interface SignupResponse {
    success: boolean
    error?: string
}

type Result = {
    exp?: number;
    token?: string;
    user?: Customer;
}

export async function signup({ firstName, lastName, dni, born, residence, phone, email, password }: SignupProps): Promise<SignupResponse> {
    const payload = await getPayload({ config });

    try {
        //Create a new customer
        await payload.create({
            collection: "customers",
            data: { firstName, lastName, dni, born, residence, phone, email, password },
        });

        //try to login with the new customer
        const result: Result = await payload.login({
            collection: "customers",
            data: { email, password },
        });

        //If the login is successful, save the token in a cookie
        if (result.token) {

            //Save the token in a cookie
            let cookieStore = await cookies();
            cookieStore.set({
                name: "payload-token",
                value: result.token,
                httpOnly: true,
                path: "/",
            })

            return { success: true };
        } else {
            return { success: false, error: "Login failed" };
        }

    } catch (error) {
        console.error("Error signing up", error);
        return { success: false, error: "An unexpected error occurred into signup" };
    }

}
