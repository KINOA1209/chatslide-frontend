'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthService from '@/services/AuthService'


const LandingButton = () => {
    const [user, setUser] = useState(null)
    const router = useRouter()


    useEffect(() => {
        const fetchUser = async () => {
            const user = await AuthService.getCurrentUser();
            if (user) {
                setUser(user);
                // router.push('/dashboard');
            }
        };

        fetchUser();
    }, []); 


    {/* start for free button */ }
    return (
        <button
        className='md:bottom-[48%] w-[10rem] h-8 md:w-[16rem] md:h-[3.75rem] mb-[3rem] py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-110 rounded-lg justify-center items-center gap-2.5 flex z-10 text-center text-zinc-100 text-m md:text-xl font-creato-medium capitalize tracking-wide'
            onClick={() => {
                if (user) {
                    window.location.href = '/dashboard'; // Example action to navigate
                } else {
                    window.location.href = '/signup'; // Example action to navigate
                }
            }}
        >
            {user ? 'Go to Dashboard' : 'Start for Free'}
        </button>
    )
}

export default LandingButton