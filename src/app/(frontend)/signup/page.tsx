import React, { ReactElement } from 'react';
import SignupForm from './_components/SignupForm';
import { getUser } from './_action/getUser';
import { redirect } from 'next/navigation';


export default async function Page(): Promise<ReactElement> {

    const user = await getUser()
    if (user && user?.role !== 'doctor') {
        redirect('/doctor');
    } else if (user && user?.role === 'customer') {
        redirect('/dashboard');
    }

    return (
        <div className='h-[calc(100vh-3rem)]'>
            <SignupForm />
        </div>
    );
}