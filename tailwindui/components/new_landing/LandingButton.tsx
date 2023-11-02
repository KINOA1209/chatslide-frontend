'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AuthService from '@/components/utils/AuthService'


const LandingButton = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null)


    const fetchUser = async () => {
        const user = await AuthService.getCurrentUser()
        setUser(user)
        setUsername(user?.attributes.name)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    {/* start for free button */ }
    return (
    <div className='lg:bottom-[48%] w-[6rem] h-8 lg:w-[14rem] lg:h-[3.75rem] mb-[3rem] px-[4rem] py-2 bg-gradient-to-b from-blue-950 to-slate-950 rounded-lg shadow border border-blue-700 flex-col justify-center items-center gap-2.5 inline-flex z-10'>
        <div className='w-40 h-12 text-center text-zinc-100 text-xs lg:text-xl font-creato-medium capitalize leading-10 tracking-wide'>
            {user ? (
                <Link href='/dashboard'>Go to Dashboard</Link>
            ) : (
                <Link href='/signup'>Start for Free</Link>
            )}
        </div>
    </div>
    )
}

export default LandingButton