import { useEffect, useRef, useState } from "react";
import AuthService from "@/components/utils/AuthService";
import { useRouter } from 'next/navigation';

export default function Pricing() {
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

    return (
        <section style={{ fontFamily: 'Lexend, sans-serif' }}>
            <div className="mx-auto px-4 sm:px-6 mb-12">
                <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6 flex flex-col items-center" data-aos="fade-right">
                    <div className="max-w-6xl mx-auto md:pr-4 mb-8 w-full">
                        <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Pricing</h3>
                    </div>
                    <div className="px-4" data-aos="flip-left" data-aos-delay="500">
                        <div className="flex flex-col w-full drop-shadow-md rounded-2xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(169deg, rgba(255,0,183,0.7391748935902486) 0%, rgba(237,93,196,0.6019199916294643) 6%, rgba(179,127,213,0.5655054258031338) 26%, rgba(121,145,215,0.3974381989123774) 40%, rgba(22,116,227,0.22096761067708337) 50%, #a7c6ed 77%, #6d7ae3 100%)',
                            }}>
                            <div className="px-8 py-2">
                                <div className="text-2xl text-white">Free</div>
                            </div>

                            <div className="p-8 bg-white/90 mx-2 mb-2 rounded-xl">
                                <div className="w-full text-center text-md">Join us as an early user!</div>
                                <div className="w-full text-center text-7xl">$0</div>
                                <div className="h-16 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-6">
                                    <div>
                                        <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                            style={{ backgroundImage: 'linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)', backgroundSize: '600%' }}
                                            onClick={() => { currentUser ? router.push('/dashboard') : router.push('/signup') }}>
                                            {currentUser ? 'Go to My Dashboard' : 'Join Now for FREE'}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-2xl">Include</div>
                                <ul className="list-disc list-outside px-6 space-y-4 mt-4 [&>*]:text-gray-500 text-xl"  style={{ fontFamily: 'sans-serif' }}>
                                    <li>
                                        Content generated by our most advanced large language models
                                    </li>
                                    <li>
                                        Automatic voice-over and video composition
                                    </li>
                                    <li>
                                        Tailor the content by uploading your PDF files
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}