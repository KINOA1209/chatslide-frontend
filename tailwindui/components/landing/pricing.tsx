import { useEffect, useRef, useState } from "react";
import AuthService from "@/components/utils/AuthService";
import { useRouter } from 'next/navigation';
import moment from "moment";
import Toggle from "../button/Toggle";

export function Pricing() {
    const [isYearly, setIsYearly] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [showFree, setShowFree] = useState(true);
    const [showPlus, setShowPlus] = useState(false);
    const [showPro, setShowPro] = useState(false);
    const [showEnt, setShowEnt] = useState(false);

    const [tier, setTier] = useState('')
    const [expiration, setExpiration] = useState(0)

    const showPricingPanel = (index: number) => {
        setShowFree(false);
        setShowPlus(false);
        setShowPro(false);
        setShowEnt(false);

        if (index === 1) {
            setShowFree(true);
        } else if (index === 2) {
            setShowPlus(true);
        } else if (index === 3) {
            setShowPro(true);
        } else if (index === 4) {
            setShowEnt(true);
        };
    }

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await AuthService.getCurrentUser();
            setCurrentUser(user);
        }
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const animationProp = [
            { backgroundPosition: "0% 50%" },
            { backgroundPosition: "100% 50%" },
            { backgroundPosition: "0% 50%" },
        ];

        const animationTiming = {
            duration: 10000,
            iterations: Infinity,
        };

        if (window && window.innerWidth > 640 && buttonRef.current) {
            buttonRef.current.animate(animationProp, animationTiming);
        } else if (buttonRef.current) {
            buttonRef.current.style.backgroundPosition = "35% 50%";
        }
    }, []);

    const handleProSubscription = async () => {
        try {
            // Determine the tier based on isYearly
            const tier = isYearly ? 'PRO_YEARLY' : 'PRO_MONTHLY';

            // Get current user's token and email
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            const email = await AuthService.getCurrentUserEmail();
            // console.log(email);

            // Create a request object
            const requestData = {
                tier: tier,
                email: email,
            };

            console.log(requestData);

            // Make the API request to create a checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const url = await response.text();
                // Redirect to the checkout page
                router.push(url);
            } else {
                console.error('Error creating checkout session:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handlePlusSubscription = async () => {
        try {
            // Determine the tier based on isYearly
            const tier = isYearly ? 'PLUS_YEARLY' : 'PLUS_MONTHLY';

            // Get current user's token and email
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            const email = await AuthService.getCurrentUserEmail();
            // console.log(email);

            // Create a request object
            const requestData = {
                tier: tier,
                email: email,
            };

            console.log(requestData);

            // Make the API request to create a checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const url = await response.text();
                console.log(url)
                // Redirect to the checkout page
                router.push(url);
            } else {
                console.error('Error creating checkout session:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        const fetchTier = async () => {
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            fetch(`/api/get-user-subscription`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw response.status, response;
                }
            }).then(data => {
                setTier(data.tier)
                if (data.expiry_date) {
                    setExpiration(data.expiry_date)
                }
            }).catch(error => console.error)
        }
        fetchTier();
    }, [])

    return (

        <div className="w-full  px-4 sm:px-6 mb-12" style={{ fontFamily: 'Lexend, sans-serif' }}>
            <div className="w-full flex flex-col items-center" data-aos="fade-right">
                <Toggle isLeft={isYearly} setIsLeft={setIsYearly} leftText="Monthly" rightText="Yearly (17% off)" />
                <div className="changeCard items-center flex md:hidden">
                    <div className="flex items-center pb-8">
                        <button
                            onClick={() => showPricingPanel(1)}
                            className={`py-2 px-4 rounded-l-full border-r border-gray-300 ${showFree ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}>
                            Free
                        </button>
                        <button
                            onClick={() => showPricingPanel(2)}
                            className={`py-2 px-4 border-r border-gray-300 ${showPlus ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}>
                            Plus
                        </button>
                        <button
                            onClick={() => showPricingPanel(3)}
                            className={`py-2 px-4 border-r border-gray-300 ${showPro ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}>
                            Pro
                        </button>
                        <button
                            onClick={() => showPricingPanel(4)}
                            className={`py-2 px-4 rounded-r-full ${showEnt ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}>
                            Enterprise
                        </button>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="w-full flex flex-row overflow-x-auto">
                        <div className="w-fit flex flex-row mx-auto">
                            <div className={`mx-2 grow basis-0 min-w-[260px] max-w-sm ${showFree ? 'block' : 'hidden'} md:block`}>
                                <div className="flex flex-col w-full drop-shadow-lg rounded-2xl overflow-hidden h-full"
                                    style={{
                                        background: 'linear-gradient(169deg, #B2F8FF 0%, #80D6FF 30%, #4FB2FF 60%, #2995FF 100%)'
                                    }}>
                                    <div className="px-8 py-2">
                                        <div className="text-2xl text-white">Free</div>
                                    </div>

                                    <div className="p-4 bg-white/90 mx-2 mb-2 rounded-xl h-full flex flex-col">
                                        <div className="w-full text-center text-md"><br /><br />Join us as for free!</div>
                                        <div className="w-full text-center text-4xl md:text-5xl">$0</div>

                                        <div className="text-2xl mt-4">Include</div>
                                        <ul className="list-disc list-outside px-5 space-y-3 mt-2 [&>*]:text-gray-500 text-md" style={{ fontFamily: 'sans-serif' }}>
                                            <li>
                                                100 free ⭐️credits
                                            </li>
                                            <li>
                                                Usage of GPT-3.5
                                            </li>
                                            <li>
                                                Up to 1 file upload for each project
                                            </li>
                                        </ul>
                                        <div className="grow"></div>
                                        <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-3">
                                            <div>
                                                {(!currentUser) && <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                                    style={{ backgroundImage: 'linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)', backgroundSize: '600%' }}
                                                    onClick={() => { currentUser ? router.push('/dashboard') : router.push('/signup') }}>
                                                    Join Now
                                                </div>}

                                                {(currentUser && (tier === 'FREE' || tier === '')) && <><div className="text-xl text-center">Current Subscription</div></>}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className={`mx-2 grow basis-0 min-w-[260px] max-w-sm ${showPlus ? 'block' : 'hidden'} md:block`}>
                                <div className="flex flex-col w-full drop-shadow-md rounded-2xl overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(169deg, #D0A6FF 0%, #BF80FF 30%, #AE59FF 60%, #9D32FF 100%)',
                                    }}
                                >
                                    {/* ... You can adjust the content for "Plus" pricing here ... */}
                                    <div className="px-8 py-2 flex flex-row justify-between pr-3">
                                        <div className="text-2xl text-white">Plus</div>
                                        <div className="toggle flex items-center md:hidden">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => setIsYearly(false)}
                                                    className={`py-2 px-4 rounded-l-full ${isYearly ? 'bg-gray-200' : 'bg-teal-400 text-white'}`}>
                                                    Monthly
                                                </button>
                                                <button
                                                    onClick={() => setIsYearly(true)}
                                                    className={`py-2 px-4 rounded-r-full ${isYearly ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}>
                                                    Yearly
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/90 mx-2 mb-2 rounded-xl flex flex-col">

                                        {isYearly ? <>
                                            <div className="w-full text-center text-md">
                                                {isYearly ? 'Billed yearly' : 'Billed monthly'}
                                            </div>
                                            <div className="w-full text-center text-md text-red-700">Save 17%</div></>
                                            : <div className="w-full text-center text-md">
                                                <br />
                                                {isYearly ? 'Billed yearly' : 'Billed monthly'}
                                            </div>}
                                        <div className="w-full text-center text-md text-red-700">7 Day Free Trial</div>
                                        <div className="w-full text-center text-4xl md:text-5xl">
                                            {isYearly ? '$8/mo' : '$9.9/mo'}
                                        </div>

                                        <div className="text-2xl mt-4">Include</div>
                                        <ul className="list-disc list-outside px-5 space-y-3 mt-2 [&>*]:text-gray-500 text-md" style={{ fontFamily: 'sans-serif' }}>
                                            <li>
                                                All features of Free plan
                                            </li>
                                            <li>
                                                1,000 ⭐️credits per month
                                            </li>
                                            <li>
                                                Usage of GPT-4
                                            </li>
                                            <li>
                                                Upload multiple files per project
                                            </li>
                                            <li>
                                                No watermark for output slides and video
                                            </li>
                                        </ul>
                                        <div className="grow"></div>
                                        <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-3">
                                            <div>
                                                {(!currentUser || (tier === 'FREE' || tier === '')) && <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                                    style={{ backgroundImage: 'linear-gradient(-45deg, #5A24B4, #9271CB, #2E8BC0)', backgroundSize: '200%' }}
                                                    onClick={() => { currentUser ? handlePlusSubscription() : router.push('/signup') }}>
                                                    {currentUser ? 'Start Free Trial' : 'Sign up to Start'}
                                                </div>}

                                                {(currentUser && (tier === 'PLUS_MONTHLY' || tier === 'PLUS_YEARLY')) && <>
                                                {/* <div className="w-full text-center">Expiring: {moment.utc(expiration).format('L')}</div> */}
                                                <div className="text-xl text-center">Current Subscription</div></>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`mx-2 grow basis-0 min-w-[260px] max-w-sm ${showPro ? 'block' : 'hidden'} md:block`}>
                                <div className="flex flex-col w-full drop-shadow-md rounded-2xl overflow-hidden h-full"
                                    style={{
                                        background: 'linear-gradient(169deg, #B084FF 0%, #8C62FF 30%, #703FFF 60%, #531CFF 100%)',
                                    }}
                                >
                                    {/* ... You can adjust the content for "Pro" pricing here ... */}
                                    <div className="px-8 py-2 flex flex-row justify-between pr-3">
                                        <div className="text-2xl text-white">Pro</div>
                                        <div className="toggle flex items-center md:hidden">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => setIsYearly(false)}
                                                    className={`py-2 px-4 rounded-l-full ${isYearly ? 'bg-gray-200' : 'bg-teal-400 text-white'}`}>
                                                    Monthly
                                                </button>
                                                <button
                                                    onClick={() => setIsYearly(true)}
                                                    className={`py-2 px-4 rounded-r-full ${isYearly ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}>
                                                    Yearly
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ... Other content similar to "Free" card ... */}
                                    <div className="p-4 bg-white/90 mx-2 mb-2 rounded-xl h-full flex flex-col">
                                        {isYearly ? <>
                                            <div className="w-full text-center text-md">
                                                {isYearly ? 'Billed yearly' : 'Billed monthly'}
                                            </div>
                                            <div className="w-full text-center text-md text-red-700">Save 17%</div></>
                                            : <div className="w-full text-center text-md">
                                                <br />
                                                {isYearly ? 'Billed yearly' : 'Billed monthly'}
                                            </div>}
                                        <div className="w-full text-center text-md text-red-700">7 Day Free Trial</div>
                                        <div className="w-full text-center text-4xl md:text-5xl">
                                            {isYearly ? '$33/mo' : '$39.9/mo'}
                                        </div>

                                        <div className="text-2xl mt-4">Include</div>
                                        <ul className="list-disc list-outside px-5 space-y-3 mt-2 [&>*]:text-gray-500 text-md" style={{ fontFamily: 'sans-serif' }}>
                                            <li>
                                                All features of Free/Plus plans
                                            </li>
                                            <li>
                                                Unlimited ⭐️credits
                                            </li>
                                            <li>
                                                24 hour VIP customer support
                                            </li>
                                        </ul>
                                        <div className="grow"></div>
                                        <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-3">
                                            <div>
                                                {(!currentUser || (tier === 'FREE' || tier === '')) && <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                                    style={{ backgroundImage: 'linear-gradient(-45deg, #002366, #003366, #004466)', backgroundSize: '200%' }}
                                                    onClick={() => { currentUser ? handleProSubscription() : router.push('/signup') }}>
                                                    {currentUser ? 'Start Free Trial' : 'Sign up to Start'}
                                                </div>}
                                                {(currentUser && (tier === 'PRO_MONTHLY' || tier === 'PRO_YEARLY')) && <>
                                                {/* <div className="w-full text-center">Expiring: {moment.utc(expiration).format('L')}</div> */}
                                                <div className="text-xl text-center">Current Subscription</div></>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`mx-2 grow basis-0 min-w-[260px] max-w-sm ${showEnt ? 'block' : 'hidden'} md:block`}>
                                <div className="flex flex-col w-full drop-shadow-md rounded-2xl overflow-hidden h-full"
                                    style={{
                                        // background: 'linear-gradient(169deg, #505050 0%, #3D3D3D 30%, #2A2A2A 60%, #000000 100%)',
                                        background: '#000230'
                                    }}
                                >
                                    {/* ... You can adjust the content for "Enterprise" pricing here ... */}
                                    <div className="px-8 py-2">
                                        <div className="text-2xl text-white">Enterprise</div>
                                    </div>
                                    {/* ... Other content similar to "Free" card ... */}
                                    <div className="p-4 bg-[#ECF1FE] mx-2 mb-2 rounded-xl h-full flex flex-col justify-between">
                                        <div className="w-full text-center text-4xl md:text-5xl text-[#000230] leading-none mb-4 pt-9">Upon Request</div>
                                        <div className="w-full text-center text-md">Contact us at contact@drlabmda.ai.<br />We will give you a quote.</div>
                                        <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-3">
                                            <div>
                                                <a href="mailto:contact@drlambda.ai" className="btn drop-shadow-xl text-lg rounded-full text-white w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer bg-[#000230]">
                                                    Contact us
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default function PricingSection() {
    return <section>
        <div className="max-w-6xl mx-auto mb-8 w-full px-4 sm:px-6" style={{ fontFamily: 'Lexend, sans-serif' }}>
            <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Pricing</h3>
        </div>
        <Pricing />
    </section>
}