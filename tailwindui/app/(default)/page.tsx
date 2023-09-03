"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useRouter } from 'next/navigation';
import AuthService from "@/components/utils/AuthService";

// Content on landing page
import Header from '@/components/ui/header';
// import Introduction from '@/components/landing/introduction'
import Features from '@/components/landing/features'
import UseCases from '@/components/landing/use_cases'
import SampleVideos from '@/components/landing/samplevideos'
import Pricing from '@/components/landing/pricing'
// import Newsletter from '@/components/landing/newsletter'
import IframeGallery from '@/components/landing/iframes'

interface TextCarouselProps {
    slides: string[];
    interval?: number; // Time interval for automatic slide change in milliseconds
    colors: string[];
}

const TextCarousel: React.FC<TextCarouselProps> = ({ slides, interval, colors }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [offset, SetOffset] = useState<number>(7);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= slides.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const slideTimer = setTimeout(nextSlide, interval);
        if (window.innerWidth < 768) {
            SetOffset(4);
        } else {
            SetOffset(7);
        }

        // Cleanup the timer when the component is unmounted or before re-running the effect
        return () => {
            clearTimeout(slideTimer);
        };
    }, [currentIndex]);

    return (
        <div className="carousel-container relative overflow-hidden h-[4rem] md:h-[7rem] mx-auto">
            <ul className="carousel-list flex flex-col transition-transform duration-500" style={{ transform: `translateY(-${currentIndex * offset}rem)` }}>
                {slides.map((slide, index) => (
                    <li key={index} className="carousel-item h-[4rem] md:h-[7rem] text-center py-1 flex-none">
                        <h1 className={`text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter text-left md:text-center ${colors[index]}`}>{slide}</h1>
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface IntroProps {
    demoRef: RefObject<HTMLDivElement>
}

const Introduction = ({ demoRef }: IntroProps) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const drlambda = <p className="inline text-transparent bg-clip-text bg-gradient-to-r from-blue-600  to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>DrLambda</p>
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);

    const scrollToDemo = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (demoRef.current) {
            demoRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
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

        if (window && window.innerWidth >= 768 && buttonRef.current) {
            buttonRef.current.animate(animationProp, animationTiming);
        } else if (buttonRef.current) {
            buttonRef.current.style.backgroundPosition = "35% 50%";
        }
    }, []);

    return (
        <div className="w-full min-h-[100vh] flex justify-center pt-[68px] md:pt-[84px]"
            style={{
                background: 'linear-gradient(169deg, rgba(255,0,183,0.7391748935902486) 0%, rgba(237,93,196,0.6019199916294643) 6%, rgba(179,127,213,0.5655054258031338) 26%, rgba(121,145,215,0.3974381989123774) 40%, rgba(22,116,227,0.22096761067708337) 50%, rgba(255,255,255,1) 77%, rgba(255,255,255,1) 100%)',
            }}>
            <div className="w-full flex flex-col md:items-center justify-between md:justify-center grow md:grow-0 my-20">
                <div className="h-full md:h-fit flex flex-col justify-evenly md:justify-center items-center px-4" data-aos="zoom-in">
                    <div>
                        <div className="text-2xl md:text-3xl w-full text-left md:text-center">Be an expert, AI-powered</div>
                        <div className="text-5xl md:text-6xl mt-0 md:mt-4"
                            style={{ fontFamily: 'Lexend, sans-serif' }}>
                            Use {drlambda} to
                            <div className="inline md:block relative md:-top-6">
                                <TextCarousel
                                    slides={["Study", "Present", "Teach", "Create"]}
                                    interval={2000}
                                    colors={["text-[#25bad9]", 'text-[#f78f34]', 'text-[#d15a80]', 'text-[#ae42db]']} />
                            </div>
                        </div>
                    </div>
                    <div className="text-md md:text-lg text-gray-600 text-center mt-2 flex items-center justify-center">
                        <div className="text-xl text-left md:text-center">
                            {/* Give us a topic. <br></br> */}
                            Transform your PDF or topic into professional and interactive slides for teaching and learning <br></br>
                            {/* Now with the ability to comprehend your PDF files. */}
                        </div>
                    </div>
                </div>
                <div className=" max-w-xs mx-auto sm:max-w-none flex-col flex justify-center mt-6 md:mt-16 items-center" data-aos="fade-up" data-aos-delay="300">
                    <div>
                        <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                            style={{ backgroundImage: 'linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)', backgroundSize: '600%', fontFamily: 'Lexend, sans-serif' }}
                            onClick={() => { currentUser ? router.push('/dashboard') : router.push('/signup') }}>
                            {currentUser ? 'Go to My Dashboard' : 'Try DrLambda for FREE'}
                        </div>
                        {/* <div className="text-center mt-2 md:mt-8 text-lg cursor-pointer text-gray-600 hover:text-black hover:underline mb-8 md:mb-0" onClick={scrollToDemo}>Watch Demo</div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default function newLanding() {
    // Refs
    const featuresRef = useRef<HTMLDivElement>(null);
    const useCasesRef = useRef<HTMLDivElement>(null);
    const testimonialRef = useRef<HTMLDivElement>(null);
    const demoRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);
    const refList = [
        featuresRef,
        useCasesRef,
        testimonialRef,
        pricingRef,
    ];

    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 700,
            easing: 'ease-out-cubic',
        })
    })

    return (
        <>
            <Header isLanding={true} refList={refList} />
            <Introduction demoRef={demoRef} />
            {/* <div ref={demoRef}><SampleVideos /></div> */}
            <div ref={featuresRef}><Features /></div>
            <div ref={useCasesRef}><UseCases /></div>
            <div ref={testimonialRef}><IframeGallery /></div>
            {/* <Newsletter /> */}
            <div ref={pricingRef}><Pricing /></div>
        </>
    )
};