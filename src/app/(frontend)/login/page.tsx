import React, { ReactElement } from 'react'
import LoginForm from './_components/loginForm'
import { redirect } from 'next/navigation';
import { getUser } from './_actions/getUser';

export default async function page(): Promise<ReactElement> {

    const user = await getUser()
    if (user && user?.role !== 'doctor') {
        redirect('/doctor');
    } else if (user && user?.role === 'customer') {
        redirect('/dashboard');
    }


    return (
        <LoginForm />
    )
}
