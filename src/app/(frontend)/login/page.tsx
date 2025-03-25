import React, { ReactElement } from 'react'
import LoginForm from './_components/loginForm'

export default async function page(): Promise<ReactElement> {

    return (
        <LoginForm />
    )
}
