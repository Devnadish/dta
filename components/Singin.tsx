"use client"
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

function Singin() {
    return (
        <button onClick={() => { signIn('google', { redirect: true, callbackUrl: '/' }) }}>Singin With Google</button>
    )
}

export default Singin


export function SingOut() {
    return (
        <button onClick={() => { signOut() }}>SignOut</button>
    )
}