"use client"
import AuthService from '@/components/utils/AuthService';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function Account() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('abcdefg@gmail.com');
    const router = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            const username = await AuthService.getCurrentUserDisplayName();
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            if (username) {
                setUsername(username);
            }
        };
        // Execute the created function directly
        fetchUser();
    }, []);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSubmitUsername = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('a')
    };

    return (<div className='flex flex-col items-center'>
        <div className='h3 text-blue-600'>Profile</div>
        <div className='w-full'>
            <form onSubmit={handleSubmitUsername}>
                <div className="w-full px-3">
                    <label
                        className="block text-gray-800 text-lg font-medium mb-1"
                        htmlFor="promo"
                    >
                        Username
                    </label>
                    <div className='flex flex-row gap-4'>
                        {/* {editUsername ?<> */}
                        <input
                            id="promo"
                            type="text"
                            onChange={e => handleUsernameChange(e)}
                            className="form-input text-gray-800 grow"
                            value={username}
                            placeholder="Enter your username"
                        />
                        <button className='btn text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500'>Update</button>
                    </div>
                </div>
            </form>
            <div className="w-full px-3 mt-4">
                <label
                    className="block text-gray-800 text-lg font-medium mb-1"
                    htmlFor="promo"
                >
                    Email
                </label>
                <div className='flex flex-row gap-4'>
                    <input
                        id="promo"
                        type="text"
                        className="form-input text-gray-800 grow"
                        value={email}
                        disabled
                    />
                </div>
            </div>
        </div>


        <div className='h3 text-blue-600'>Password</div>

        We need to verify your email before you can reset your password.
        <div className='w-full'>
            <button className='btn text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500' onClick={e => { router.push('/reset-password') }}>Send Verification Code</button>
        </div>

        <div className='h3 text-blue-600'>Subscription</div>
        <div className='flex flex-row w-full'>
            <div className='border border-black h-[200px] grow'>Current tier  <br></br> till (subscrition end date)</div>
            <div className='border border-black h-[200px] grow'>upgrade</div>
            <div className='border border-black h-[200px] grow'>upgrade</div>
            <div className='border border-black h-[200px] grow'>upgrade</div>
        </div>
        <div className='w-full'>
            <button className='btn text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500' onClick={e => { router.push('/reset-password') }}>Cancel Subscription</button>
        </div>


        <div className='h3 text-blue-600'>Credit history</div>
        
    </div >)
};