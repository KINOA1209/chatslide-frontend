"use client"
import AuthService from '@/components/utils/AuthService';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Pricing from '@/components/landing/pricing'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "@/components/utils/UserService";

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('abcdefg@gmail.com');
    const [changed, setChanged] = useState(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        setUsername(e.target.value);
    };

    const handleSubmitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!changed) {
            toast.error('This username is the same as your old username.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        await AuthService.updateName(username);
        const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
        await fetch(`/api/user/update_username`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 'username': username, }),
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw response.status, response;
            }
        }).then(data => {
            console.log(data);
            const status = data['status'];
            const message = data['message'];
            if (status === 'success') {
                toast.success("Username successfully updated", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }).catch(error => {
            toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })

        setChanged(false);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AuthService.getCurrentUser();
            setEmail(user.attributes.email);
            setUsername(user.attributes.name);
            setChanged(false);
        };
        // Execute the created function directly
        fetchUser();
    }, []);

    return <div className='max-w-6xl w-full px-4 sm:px-6'>
        <div className="max-w-6xl mx-auto mb-8 w-full">
            <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>Profile</h3>
        </div>
        <div className='w-full'>
            <div className="w-full px-3">
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
            <form onSubmit={handleSubmitUsername}>
                <div className="w-full px-3 mt-4">
                    <label
                        className="block text-gray-800 text-lg font-medium mb-1"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <div className='flex flex-row gap-4'>
                        {/* {editUsername ?<> */}
                        <input
                            id="username"
                            type="text"
                            onChange={e => handleUsernameChange(e)}
                            className="form-input text-gray-800 grow"
                            value={username}
                            placeholder="Enter your username"
                        />
                        <button className='btn text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500'>Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

const PasswordModule = () => {
    const router = useRouter();

    return <div className='max-w-6xl w-full px-4 sm:px-6'>
        <div className="max-w-6xl mx-auto mb-8 w-full">
            <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>Password</h3>
        </div>
        <div className='w-full'>
            <div className='text-center mb-5'>Click the button below to change your password.</div>
            < div className='w-full flex flex-row justify-center' >
                <button className='btn text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500' onClick={e => router.push('/reset-password')}>Change Password</button>
            </div>
        </div>
    </div>
}

const Referral = () => {
    const [host, setHost] = useState('https://drlambda.ai');
    const [referralLink, setReferralLink] = useState('');

    useEffect(() => {
        if (window.location.hostname !== 'localhost') {
            setHost('https://' + window.location.hostname);
        } else {
            setHost(window.location.hostname);
        }
    }, [])

    useEffect(() => {
        const fetchReferral = async () => {
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            const user = await AuthService.getCurrentUser();
            const email = user.attributes.email;
            await fetch(`/api/user/create_referral_code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 'email': email }),
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw response.status, response;
                }
            }).then(data => {
                const code = data['referral_code'];
                setReferralLink(host + '/signup?referral=' + code);
            }).catch(error => console.error);
        }
        fetchReferral();
    }, [])

    const sendEmail = () => {
        var subject = 'Invitation to DrLambda';
        var emailBody = `Hey there!\nI wanted to recommend you check out DrLambda, an AI-powered tool for automatic slide generation. I think you'll really like it. You can get 50 extra credit by using my link:\n${referralLink}`;
        window.location.href = "mailto:"+"?subject=" + subject + "&body=" + emailBody;
    }

    const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(referralLink);
        toast.success("Referral link copied.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleShare = async () => {
        const shareData = {
            text: `Hey there!\nI wanted to recommend you check out DrLambda, an AI-powered tool for automatic slide generation. I think you'll really like it. You can get 50 extra credit by using my link:\n${referralLink}`,
        };
        await navigator.share(shareData);
    }

    return <div className='max-w-6xl w-full px-4 sm:px-6'>
        <div className="max-w-6xl mx-auto mb-8 w-full">
            <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>Referral</h3>
        </div>
        <div className='w-full'>
            <div className='text-center mb-5'>You friends can get 100 credits for free when they register using your referral link. <br></br>
                Meanwhile, we will also gift you 100 credits for gratitude.</div>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className="h-fit w-full form-input flex flex-row flex-nowrap border border-gray-500 p-0 cursor-text rounded-xl" onClick={e => { handleOnMouseDown(e) }}>
                    <svg className='my-1 ml-3 w-6 h-6 mt-3' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 4V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2H7M4.5 11H2C1.73478 11 1.48043 10.8946 1.29289 10.7071C1.10536 10.5196 1 10.2652 1 10V3C1 2.73478 1.10536 2.48043 1.29289 2.29289C1.48043 2.10536 1.73478 2 2 2H3"
                            stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M13 6H8C7.44772 6 7 6.44772 7 7V13C7 13.5523 7.44772 14 8 14H13C13.5523 14 14 13.5523 14 13V7C14 6.44772 13.5523 6 13 6Z"
                            stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M9 9H12M9 11H12M7.25 1H2.75L3.16 2.62C3.18498 2.72843 3.24611 2.82513 3.33335 2.89419C3.42059 2.96325 3.52873 3.00057 3.64 3H6.36C6.47127 3.00057 6.57941 2.96325 6.66665 2.89419C6.75389 2.82513 6.81502 2.72843 6.84 2.62L7.25 1Z"
                            stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input
                        id="search_keyword"
                        type="text"
                        className=" text-gray-800 grow border-0 p-0 h-6 focus:outline-none focus:ring-0 mx-3 my-3 w-full overflow-hidden cursor-text"
                        // disabled
                        value={referralLink}
                    />
                </div>
                <div className='w-full md:w-fit flex flex-row justify-center' >
                    <button className='btn md:hidden text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500' onClick={handleShare}>Share</button>
                    <button className='btn hidden md:block text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500 whitespace-nowrap' onClick={sendEmail}>Send Email</button>
                </div>
            </div>
        </div>
    </div>
}

const Subscription = () => {
    return <div>
        <Pricing />
        <div className='max-w-6xl mx-auto w-full px-4 sm:px-6 flex flex-col justify-center items-center'>
            <button className='btn max-w-sm text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500' onClick={e => { }}>Manage Subscription</button>
        </div>
    </div>
}

const CreditHistory = () => {
    const [credits, setCredits] = useState(0);
    const [history, setHistory] = useState(['11111', '22222']);

    useEffect(() => {
        const fetchCredit = async () => {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            UserService.getUserCredits(idToken)
                .then(fetched => {
                    setCredits(fetched)
                })
                .catch(() => setCredits(0))
        }
        fetchCredit();
    }, []);

    return <div className='max-w-6xl w-full px-4 sm:px-6 mb-[100px]'>
        <div className="max-w-6xl mx-auto mb-8 w-full">
            <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>Credit History</h3>
        </div>
        <div className='w-full'>
            <div className='w-full h1 text-center'>{credits}</div>
            <div className='font-bold text-xl text-center'>Credit Balance</div>
            < div className='w-full mt-8 font-bold text-xl' >Usage History</div>
            < div className='w-full min-h-[100px] border border-black' >
            </div>
        </div>
    </div>
}

export default function Account() {
    return (<div className='flex flex-col items-center gap-[70px]'>
        <ToastContainer />
        <Profile />
        <PasswordModule />
        <Referral />
        <Subscription />
        <CreditHistory />

    </div >)
};