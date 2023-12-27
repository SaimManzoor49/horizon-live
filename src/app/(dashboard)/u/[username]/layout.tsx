import { getSelfByUsername } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import React from 'react'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'
import Container from './_components/Container'

interface CreatorLayoutProps {
    params: { username: string },
    children: React.ReactNode
}

const CreatorLayout = async({ children,params }: CreatorLayoutProps) => {

    const self =await getSelfByUsername(params.username) 
    if(!self) redirect('/')

    return (
        <>
        <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container >
            {children}
                </Container>

            </div>
        </>
    )
}

export default CreatorLayout