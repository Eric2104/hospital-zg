import React, { ReactElement } from 'react'
import LoginForm from './components/loginForm'

export default async function page(): Promise<ReactElement> {

    return (
        <LoginForm />
    )
}
