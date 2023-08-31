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

// Content on landing page
// import Introduction from '@/components/landing/introduction'
import Features from '@/components/landing/features'
import UseCases from '@/components/landing/use_cases'
import SampleVideos from '@/components/landing/samplevideos'
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

    return (
        <header
            className={`fixed w-full z-30 bg-white md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? "bg-white backdrop-blur-sm shadow-lg" : ""
                }`}
        >
            <div className="max-w-4/5 mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Site branding */}
                    <div className="w-fit flex flex-row items-center">
                        <Logo />
                        <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600  to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>DrLambda.ai</div>
                    </div>

                    {/* Navigation on landing page */}
                    <div className="grow max-w-4xl hidden md:flex flex-row flex-nowrap justify-evenly px-4">
                        <div className="text-lg cursor-pointer text-gray-600 hover:text-black hover:underline" onClick={e => handScrollTo(e, 0)}>Features</div>
                        <div className="text-lg cursor-pointer text-gray-600 hover:text-black hover:underline" onClick={e => handScrollTo(e, 1)}>Use Cases</div>
                        <div className="text-lg cursor-pointer text-gray-600 hover:text-black hover:underline" onClick={e => handScrollTo(e, 2)}>Testimonial</div>
                        <div className="text-lg cursor-pointer text-gray-600 hover:text-black hover:underline">Pricing</div>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex">
                        {/* Desktop sign in links */}
                        {user ? (
                            <ul className="flex grow justify-end flex-wrap items-center">
                                <DropdownButton />
                            </ul>
                        ) : (
                            <ul className="flex grow justify-end flex-wrap items-center">
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

                    <MobileMenu />
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

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= slides.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const slideTimer = setTimeout(nextSlide, interval);

        // Cleanup the timer when the component is unmounted or before re-running the effect
        return () => {
            clearTimeout(slideTimer);
        };
    }, [currentIndex]);

    return (
        <div className="carousel-container relative overflow-hidden h-[7rem] max-w-xl mx-auto">
            <ul className="carousel-list flex flex-col transition-transform duration-500" style={{ transform: `translateY(-${currentIndex * 7}rem)` }}>
                {slides.map((slide, index) => (
                    <li key={index} className="carousel-item h-[7rem] text-center py-1 flex-none">
                        <h1 className={`text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter text-center ${colors[index]}`}>{slide}</h1>
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

    const scrollToDemo = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (demoRef.current) {
            demoRef.current?.scrollIntoView();
        }
    }

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

        if (buttonRef.current) {
            buttonRef.current.animate(animationProp, animationTiming);
        }
    }, []);

    return (
        <div className="w-full h-[100vh] flex justify-center pt-[64px] md:pt-[80px]"
            style={{
                background: 'linear-gradient(169deg, rgba(255,0,183,0.7391748935902486) 0%, rgba(237,93,196,0.6019199916294643) 6%, rgba(179,127,213,0.5655054258031338) 26%, rgba(121,145,215,0.3974381989123774) 40%, rgba(22,116,227,0.22096761067708337) 50%, rgba(255,255,255,1) 77%, rgba(255,255,255,1) 100%)',
            }}>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center px-8"  data-aos="zoom-in">
                    <div className="text-3xl">Be an expert with the power of AI</div>
                    <div className="text-6xl my-4"
                        style={{ fontFamily: 'Lexend, sans-serif' }}>
                        Use {drlambda} to<br></br>
                        <div className="relative -top-6">
                            <TextCarousel
                                slides={["Study", "Present", "Teach", "Create"]}
                                interval={2000}
                                colors={["text-[#25bad9]", 'text-[#f78f34]', 'text-[#d15a80]', 'text-[#ae42db]']} />
                        </div>
                    </div>
                    <div className="text-lg text-gray-600 text-center">
                        Give us a topic. <br></br>
                        Beautiful slides and videos with the wisdom of the entire internet. <br></br>
                        Now with the ability to comprehend your PDF files.
                    </div>
                </div>
                <div className="max-w-xs mx-auto sm:max-w-none flex-col sm:flex sm:justify-center mt-16" data-aos="fade-up" data-aos-delay="300">
                    <div>
                        <div ref={buttonRef} className="btn drop-shadow-xl text-lg rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                            style={{ backgroundImage: 'linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)', backgroundSize: '600%' }}
                            onClick={()=>{router.push('/signup');}}>
                            Try DrLambda for FREE
                        </div>
                    </div>
                    <div className="text-center mt-8 text-lg cursor-pointer text-gray-600 hover:text-black hover:underline" onClick={scrollToDemo}>Watch Demo</div>
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
    const refList = [featuresRef, useCasesRef, testimonialRef, demoRef];

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
            <div ref={testimonialRef}><IframeGallery /></div>
            {/* <Newsletter /> */}
            <Footer />
        </>
    )
};