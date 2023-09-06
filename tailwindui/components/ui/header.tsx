"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Logo from "./logo";
import DropdownButton from "@/components/utils/dropdown";
import MobileMenu from "./mobile-menu";
import { useRouter } from "next/navigation";
import GoogleAnalytics from "../GoogleAnalytics";
// import AuthService from "../utils/AuthService";
import { Auth, Hub } from 'aws-amplify';

interface HeaderProps {
    loginRequired: boolean,
    isLanding: boolean,
    refList?: Array<React.RefObject<HTMLDivElement>>
}
const Header = ({loginRequired, isLanding = false, refList }: HeaderProps) => {
    const [top, setTop] = useState<boolean>(true);
    const [user, setUser] = useState(null);
    // const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

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
                if (loginRequired) {
                    router.push('/signin')
                }
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
        if (isLanding && refList && refList[index].current) {
            refList[index].current?.scrollIntoView();
        }
    }

    if (loading) {
        // Render a loading state or a blank placeholder
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
                                <div className="w-fit text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600  to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>
                                    <a href="/">DrLambda</a>
                                </div>
                            </div>
                        </div>

                        {/* Desktop navigation */}
                        <nav className="hidden lg:flex w-[272px]"></nav>

                        <MobileMenu refList={refList} />
                    </div>
                </div>
                <GoogleAnalytics />
            </header>
        );
    }


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
                            <div className="w-fit text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600  to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>
                                <a href="/">DrLambda</a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation on landing page */}
                    {isLanding ? <div className="grow max-w-4xl hidden lg:flex flex-row flex-nowrap justify-evenly px-4">
                        <div
                            className="text-lg cursor-pointer btn font-bold text-gray-700 hover:text-white hover:bg-blue-600 rounded-full px-4 py-2 transition duration-150 ease-in-out"
                            onClick={e => handScrollTo(e, 0)}>Features</div>
                        <div
                            className="text-lg cursor-pointer btn font-bold text-gray-700 hover:text-white hover:bg-blue-600 rounded-full px-4 py-2 transition duration-150 ease-in-out"
                            onClick={e => handScrollTo(e, 1)}>Use Cases</div>
                        <div
                            className="text-lg cursor-pointer btn font-bold text-gray-700 hover:text-white hover:bg-blue-600 rounded-full px-4 py-2 transition duration-150 ease-in-out"
                            onClick={e => handScrollTo(e, 2)}>Testimonial</div>
                        <div
                            className="text-lg cursor-pointer btn font-bold text-gray-700 hover:text-white hover:bg-blue-600 rounded-full px-4 py-2 transition duration-150 ease-in-out"
                            onClick={e => handScrollTo(e, 3)}>Pricing</div>
                    </div> : <></>}

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
                                        className="btn-sm drop-shadow-xl rounded-full text-white w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer mr-4"
                                        style={{ backgroundImage: 'linear-gradient(-45deg, #338AFF, #3CF0C5)', backgroundSize: '100%', fontFamily: 'Lexend, sans-serif' }}
                                    >
                                        Sign in
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/signup"
                                        className="btn-sm drop-shadow-xl rounded-full text-white w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer"
                                        style={{ backgroundImage: 'linear-gradient(-45deg, #7A55DB, #338AFF)', backgroundSize: '100%', fontFamily: 'Lexend, sans-serif' }}
                                    >
                                        <span>Join for Free</span>
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

export default Header;