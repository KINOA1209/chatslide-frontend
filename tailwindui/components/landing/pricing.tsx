import { useEffect, useRef, useState } from "react";
import AuthService from "@/components/utils/AuthService";
import { useRouter } from 'next/navigation';

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

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
                // Redirect to the checkout page
                router.push(url);
            } else {
                console.error('Error creating checkout session:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    


 
    return (
        <section style={{ fontFamily: 'Lexend, sans-serif' }}>
            <div className="mx-auto px-4 sm:px-6 mb-12">
                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 flex flex-col items-center" data-aos="fade-right">
                    <div className="max-w-6xl mx-auto md:pr-4 mb-8 w-full">
                        <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Pricing</h3>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center pb-8">
                            <button
                                onClick={() => setIsYearly(false)}
                                className={`py-2 px-4 rounded-l-full ${isYearly ? 'bg-gray-200' : 'bg-teal-400 text-white'}`}>
                                Monthly
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className={`py-2 px-4 rounded-r-full ${isYearly ? 'bg-blue-800 text-white' : 'bg-gray-200'}`}>
                                Yearly
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-top">
                        <div className="px-2 w-1/4 h-full" data-aos="flip-left" data-aos-delay="500">
                            <div className="flex flex-col w-full drop-shadow-md rounded-2xl overflow-hidden"
                                style={{
                                    background: 'linear-gradient(169deg, #B2F8FF 0%, #80D6FF 30%, #4FB2FF 60%, #2995FF 100%)'
                                }}>
                                <div className="px-8 py-2">
                                    <div className="text-2xl text-white">Free</div>
                                </div>

                                <div className="p-4 bg-white/90 mx-2 mb-2 rounded-xl">
                                    <div className="w-full text-center text-md">Join us as an early user!</div>
                                    <div className="w-full text-center text-5xl">$0</div>
                                    <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-6">
                                        <div>
                                            <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                                style={{ backgroundImage: 'linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)', backgroundSize: '600%' }}
                                                onClick={() => { currentUser ? router.push('/dashboard') : router.push('/signup') }}>
                                                {currentUser ? 'My Dashboard' : 'Join Now'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-2xl">Include</div>
                                    <ul className="list-disc list-outside px-5 space-y-4 mt-4 [&>*]:text-gray-500 text-xl" style={{ fontFamily: 'sans-serif' }}>
                                        <li>
                                            100 free credits
                                        </li>
                                        <li>
                                            Usage of GPT3.5
                                        </li>
                                        <li>
                                            Upload 1 file per project
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Plus Card */}
                        <div className="px-2 w-1/4 h-full" data-aos="flip-left" data-aos-delay="600">
                            <div className="flex flex-col w-full drop-shadow-md rounded-2xl overflow-hidden"
                                style={{
                                    background: 'linear-gradient(169deg, #D0A6FF 0%, #BF80FF 30%, #AE59FF 60%, #9D32FF 100%)',
                                }}
                            >
                                {/* ... You can adjust the content for "Plus" pricing here ... */}
                                <div className="px-8 py-2">
                                    <div className="text-2xl text-white">Plus</div>
                                </div>
                                <div className="p-4 bg-white/90 mx-2 mb-2 rounded-xl">
                                    <div className="w-full text-center text-md">
                                        {isYearly ? 'Billed yearly' : 'Billed monthly'}
                                    </div>
                                    {isYearly && <div className="w-full text-center text-md text-red-700">Save 20%</div>}
                                    <div className="w-full text-center text-5xl">
                                        {isYearly ? '$8/mo' : '$10/mo'}
                                    </div>
                                    <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-6">
                                        <div>
                                            <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                                style={{ backgroundImage: 'linear-gradient(-45deg, #5A24B4, #9271CB, #2E8BC0)', backgroundSize: '200%' }}
                                                onClick={() => { currentUser ? handlePlusSubscription() : router.push('/signup') }}>
                                                {currentUser ? 'Subscribe' : 'Sign up'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-2xl">Include</div>
                                    <ul className="list-disc list-outside px-5 space-y-2 mt-4 [&>*]:text-gray-500 text-xl" style={{ fontFamily: 'sans-serif' }}>
                                        <li>
                                            All features of free
                                        </li>
                                        <li>
                                            1,000 credits per month
                                        </li>
                                        <li>
                                            Usage of GPT4
                                        </li>
                                        <li>
                                            Upload multiple files per project
                                        </li>
                                        <li>
                                            Remove watermark
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Pro Card */}
                        <div className="px-2 w-1/4 h-full" data-aos="flip-left" data-aos-delay="700">
                            <div className="flex flex-col w-full drop-shadow-md rounded-2xl overflow-hidden"
                                style={{
                                    background: 'linear-gradient(169deg, #B084FF 0%, #8C62FF 30%, #703FFF 60%, #531CFF 100%)',
                                }}
                            >
                                {/* ... You can adjust the content for "Pro" pricing here ... */}
                                <div className="px-8 py-2">
                                    <div className="text-2xl text-white">Pro</div>
                                </div>
                                {/* ... Other content similar to "Free" card ... */}
                                <div className="p-4 bg-white/90 mx-2 mb-2 rounded-xl">
                                    <div className="w-full text-center text-md">
                                        {isYearly ? 'Billed yearly' : 'Billed monthly'}
                                    </div>
                                    {isYearly && <div className="w-full text-center text-md text-red-700">Save 20%</div>}
                                    <div className="w-full text-center text-5xl">
                                        {isYearly ? '$32/mo' : '$40/mo'}
                                    </div>
                                    <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-6">
                                        <div>
                                            <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                                style={{ backgroundImage: 'linear-gradient(-45deg, #002366, #003366, #004466)', backgroundSize: '200%' }}
                                                onClick={() => { currentUser ? handleProSubscription() : router.push('/signup') }}>
                                                {currentUser ? 'Subscribe' : 'Sign up'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-2xl">Include</div>
                                    <ul className="list-disc list-outside px-5 space-y-2 mt-4 [&>*]:text-gray-500 text-xl" style={{ fontFamily: 'sans-serif' }}>
                                        <li>
                                            All features of Free/Plus
                                        </li>
                                        <li>
                                            Unlimited credits
                                        </li>
                                        <li>
                                            24 hour support
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Card */}
                        <div className="px-2 w-1/4 h-full" data-aos="flip-left" data-aos-delay="800">
                            <div className="flex flex-col w-full drop-shadow-md rounded-2xl overflow-hidden"
                                style={{
                                    background: 'linear-gradient(169deg, #505050 0%, #3D3D3D 30%, #2A2A2A 60%, #000000 100%)',
                                }}
                            >
                                {/* ... You can adjust the content for "Enterprise" pricing here ... */}
                                <div className="px-8 py-2">
                                    <div className="text-2xl text-white">Enterprise</div>
                                </div>
                                {/* ... Other content similar to "Free" card ... */}
                                <div className="p-4 bg-white/90 mx-2 mb-2 rounded-xl">
                                    <div className="w-full text-center text-md">Contact us at contact@drlabmda.ai. We will give you a quote.</div>
                                    <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-6">
                                        <div>
                                            <a href="mailto:contact@drlambda.ai" className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                                style={{ backgroundImage: 'linear-gradient(-45deg, #2C2C2C, #2C2C2C)', backgroundSize: '300%' }}>
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
        </section>
    )
}