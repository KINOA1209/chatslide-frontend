"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useRouter } from 'next/navigation';

// Font dependency
import './index.css';

// Header Dependencies
import Link from "next/link";
import Logo from "@/components/ui/logo";
import DropdownButton from "@/components/utils/dropdown";
import MobileMenu from "@/components/ui/mobile-menu";
import { usePathname } from "next/navigation";
import GoogleAnalytics from "@/components/GoogleAnalytics";
// import AuthService from "../utils/AuthService";
import { Auth, Hub } from 'aws-amplify';
import AuthService from "@/components/utils/AuthService";

// Content on landing page
// import Introduction from '@/components/landing/introduction'
import Features from '@/components/landing/features'
import UseCases from '@/components/landing/use_cases'
import SampleVideos from '@/components/landing/samplevideos'
import Pricing from '@/components/landing/pricing'
// import Newsletter from '@/components/landing/newsletter'
import IframeGallery from '@/components/landing/iframes'
import Footer from '@/components/ui/footer'



interface HeaderProps {
    refList: Array<RefObject<HTMLDivElement>>
}

const Header = ({ refList }: HeaderProps) => {
    const [top, setTop] = useState<boolean>(true);
    const [user, setUser] = useState(null);
    // const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    // detect whether user has scrolled the page down by 10px
    const scrollHandler = () => {
        window.scrollY > 10 ? setTop(false) : setTop(true);
    };

    useEffect(() => {
        scrollHandler();
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [top]);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
                setLoading(false);
            } catch {
                console.log('No authenticated user.');
                setLoading(false);
            }
        };

        // check the current user when component loads
        checkUser();

        const listener = (data: any) => {
            switch (data.payload.event) {
                case 'signIn':
                    console.log('user signed in');
                    checkUser();
                    break;
                case 'signOut':
                    console.log('user signed out');
                    setUser(null);
                    break;
                default:
                    break;
            }
        };

        // add auth event listener
        Hub.listen('auth', listener);

        // remove auth event listener on cleanup
        return () => {
            Hub.remove('auth', listener);
        };
    }, []);


    const handScrollTo = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (refList[index].current) {
            refList[index].current?.scrollIntoView();
        }
    }

    // Hide old header
    useEffect(() => {
        const header = Array.from(document.getElementsByClassName("common-header") as HTMLCollectionOf<HTMLElement>);
        if (header.length > 0) {
            header[0].style.display = 'none';
        }
    }, [])

    return (
        <header
            className={`fixed w-full z-30 bg-white md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? "bg-white backdrop-blur-sm shadow-lg" : ""
                }`}
        >
            <div className="max-w-4/5 mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Site branding */}
                    <div className="flex flex-row items-center grow md:grow-0">
                        <Logo />
                        <div className="grow md:grow-0 flex justify-center md:justify-start">
                            <div className="w-fit text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600  to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>DrLambda.ai</div>
                        </div>
                    </div>

                    {/* Navigation on landing page */}
                    <div className="grow max-w-4xl hidden lg:flex flex-row flex-nowrap justify-evenly px-4">
                        <div
                            className="text-lg cursor-pointer text-gray-700 hover:text-white hover:bg-blue-600 border border-slate-400 rounded-md px-4 py-2 transition duration-150 ease-in-out"
                            onClick={e => handScrollTo(e, 0)}>Features</div>
                        <div
                            className="text-lg cursor-pointer text-gray-700 hover:text-white hover:bg-blue-600 border border-slate-400 rounded-md px-4 py-2 transition duration-150 ease-in-out"
                            onClick={e => handScrollTo(e, 1)}>Use Cases</div>
                        {/* <div
                            className="text-lg cursor-pointer text-gray-700 hover:text-white hover:bg-blue-600 border border-slate-400 rounded-md px-4 py-2 transition duration-150 ease-in-out"
                            onClick={e => handScrollTo(e, 2)}>Testimonial</div> */}
                        <div
                            className="text-lg cursor-pointer text-gray-700 hover:text-white hover:bg-blue-600 border border-slate-400 rounded-md px-4 py-2 transition duration-150 ease-in-out"
                            onClick={e => handScrollTo(e, 2)}>Pricing</div>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden lg:flex w-[272px]">
                        {/* Desktop sign in links */}
                        {user ? (
                            <ul className="flex grow justify-end flex-wrap items-center">
                                <DropdownButton />
                            </ul>
                        ) : (
                            <ul className="flex grow justify-end flex-nowrap items-center">
                                <li>
                                    <Link
                                        href="/signin"
                                        className="btn-sm text-blue-600 border-2 border-blue-600 bg-white hover:bg-blue-600 hover:text-white ml-3"
                                    >
                                        Sign in
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/signup"
                                        className="btn-sm text-white bg-blue-600 border-2 border-blue-600 hover:bg-white hover:text-blue-600 ml-3"
                                    >
                                        <span className="animate-bounce">Join for Free</span>
                                    </Link>
                                </li>
                            </ul>

                        )}
                    </nav>

                    <MobileMenu refList={refList} />
                </div>
            </div>

            <GoogleAnalytics />
        </header>
    );
}

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
        if (window.innerWidth <= 640) {
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
            demoRef.current?.scrollIntoView();
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

        if (window && window.innerWidth > 640 && buttonRef.current) {
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
            <div className="w-full flex flex-col md:items-center justify-between md:justify-center grow md:grow-0">
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
                            Give us a topic. <br></br>
                            Beautiful slides and videos backed by the wisdom of the entire internet. <br></br>
                            Now with the ability to comprehend your PDF files.
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
                        <div className="text-center mt-2 md:mt-8 text-lg cursor-pointer text-gray-600 hover:text-black hover:underline mb-8 md:mb-0" onClick={scrollToDemo}>Watch Demo</div>
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
    // const testimonialRef = useRef<HTMLDivElement>(null);
    const demoRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);
    const refList = [
        featuresRef,
        useCasesRef,
        // testimonialRef,
        // demoRef,
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
            <Header refList={refList} />
            <Introduction demoRef={demoRef} />
            <div ref={demoRef}><SampleVideos /></div>
            <div ref={featuresRef}><Features /></div>
            <div ref={useCasesRef}><UseCases /></div>
            {/* <div ref={testimonialRef}><IframeGallery /></div> */}
            {/* <Newsletter /> */}
            <div ref={pricingRef}><Pricing /></div>
            <Footer />
        </>
    )
};