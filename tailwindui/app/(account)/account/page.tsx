"use client"
import AuthService from '@/components/utils/AuthService';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, RefObject } from 'react';
import { Pricing } from '@/components/landing/pricing'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "@/components/utils/UserService";
import Link from 'next/link';
import AOS from 'aos'
import 'aos/dist/aos.css'
import ClickableLink from '@/components/ui/ClickableLink';
import ReferralLink from '@/components/ReferralLink';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [email, setEmail] = useState('abcdefg@gmail.com');
    const [changed, setChanged] = useState(false);

    const fetchUser = async () => {
        const user = await AuthService.getCurrentUser();
        setEmail(user.attributes.email);
        setUsername(user.attributes.name);
        setChanged(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // useEffect(() => {
    //     UserService.forceUpdateUserInfo();
    // }, []);

    useEffect(() => {
        setEditUsername(username);
    }, [username])

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        setEditUsername(e.target.value);
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

        await AuthService.updateName(editUsername);
        const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
        await fetch(`/api/user/update_username`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 'username': editUsername, }),
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw response.status, response;
            }
        }).then(data => {
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
        fetchUser();
    };

    return <div className='w-full px-4 sm:px-6'>
        <div className="mb-8 w-full">
            <div className="w-fit text-[#525C6A] text-[17px] font-bold">Profile</div>
            <div className="w-fit text-[#212121] text-[50px] md:text-[80px] font-light">Hi, {username}</div>
        </div>
        <div className='w-fit mx-auto'>
            <div className="w-full">
                <label
                    className="block text-[14px] mb-1 text-[#919DAA]"
                    htmlFor="email"
                >
                    Email
                </label>
                <div className="h-fit w-full form-input flex flex-row flex-nowrap border border-gray-500 p-0 cursor-text rounded-xl">
                    <svg className='my-1 ml-3 w-9 h-6 mt-3 pr-3 border-r-2 border-[#CAD0D3]' viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.23077 0.5H14.7692C15.2084 0.5 15.5 0.822065 15.5 1.14286V10.8571C15.5 11.1779 15.2084 11.5 14.7692 11.5H1.23077C0.791636 11.5 0.5 11.1779 0.5 10.8571V1.14286C0.5 0.822066 0.791636 0.5 1.23077 0.5Z"
                            stroke="#707C8A" strokeLinecap="round" strokeLinejoin="round" />
                        <mask id="path-2-inside-1_300_1046" fill="white">
                            <path
                                d="M0.5 0.5L7.21231 6.15385C7.43346 6.33805 7.71218 6.43892 8 6.43892C8.28782 6.43892 8.56654 6.33805 8.78769 6.15385L15.5 0.5" />
                        </mask>
                        <path
                            d="M1.14423 -0.264834C0.721821 -0.620631 0.0909631 -0.566634 -0.264834 -0.144228C-0.620631 0.278179 -0.566634 0.909037 -0.144228 1.26483L1.14423 -0.264834ZM7.21231 6.15385L6.56807 6.91869L6.57231 6.92222L7.21231 6.15385ZM8 6.43892V5.43892V6.43892ZM8.78769 6.15385L9.4277 6.92223L9.43192 6.91868L8.78769 6.15385ZM16.1442 1.26483C16.5666 0.909037 16.6206 0.278179 16.2648 -0.144228C15.909 -0.566634 15.2782 -0.620631 14.8558 -0.264834L16.1442 1.26483ZM-0.144228 1.26483L6.56808 6.91868L7.85654 5.38901L1.14423 -0.264834L-0.144228 1.26483ZM6.57231 6.92222C6.97315 7.25609 7.47832 7.43892 8 7.43892V5.43892C7.94603 5.43892 7.89378 5.42001 7.85231 5.38547L6.57231 6.92222ZM8 7.43892C8.52168 7.43892 9.02685 7.25609 9.42769 6.92222L8.14769 5.38547C8.10622 5.42001 8.05397 5.43892 8 5.43892V7.43892ZM9.43192 6.91868L16.1442 1.26483L14.8558 -0.264834L8.14346 5.38901L9.43192 6.91868Z"
                            fill="#707C8A" mask="url(#path-2-inside-1_300_1046)" />
                    </svg>
                    <input
                        id="email"
                        type="text"
                        className=" grow border-0 p-0 h-6 focus:outline-none focus:ring-0 mx-3 my-3 w-full overflow-hidden cursor-text text-[#A6B1BB]"
                        // disabled
                        value={email}
                        readOnly
                    />
                    <svg className='my-1 mr-3 w-7 h-7 mt-[10px]' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" fill="white" />
                        <path
                            d="M5.07647 8.65381H14.9226C15.3262 8.65381 15.6534 8.98099 15.6534 9.38458V16.7692C15.6534 17.1728 15.3262 17.5 14.9226 17.5H5.07647C4.67288 17.5 4.3457 17.1728 4.3457 16.7692V9.38458C4.3457 8.98099 4.67288 8.65381 5.07647 8.65381Z"
                            fill="#A6B1BB" stroke="#A6B1BB" strokeLinecap="round" strokeLinejoin="round" />
                        <mask id="path-2-inside-1_298_4618" fill="white">
                            <path
                                d="M14.3087 8.15385V6.30769C14.3087 5.16522 13.8549 4.06954 13.047 3.26169C12.2392 2.45384 11.1435 2 10.0011 2C8.85858 2 7.7629 2.45384 6.95505 3.26169C6.1472 4.06954 5.69336 5.16522 5.69336 6.30769V8.15385" />
                        </mask>
                        <path
                            d="M13.3087 8.15385C13.3087 8.70613 13.7565 9.15385 14.3087 9.15385C14.861 9.15385 15.3087 8.70613 15.3087 8.15385H13.3087ZM14.3087 6.30769H13.3087H14.3087ZM10.0011 2V1V2ZM5.69336 6.30769H4.69336H5.69336ZM4.69336 8.15385C4.69336 8.70613 5.14107 9.15385 5.69336 9.15385C6.24564 9.15385 6.69336 8.70613 6.69336 8.15385H4.69336ZM15.3087 8.15385V6.30769H13.3087V8.15385H15.3087ZM15.3087 6.30769C15.3087 4.9 14.7495 3.54997 13.7542 2.55459L12.3399 3.9688C12.9603 4.58911 13.3087 5.43044 13.3087 6.30769H15.3087ZM13.7542 2.55459C12.7588 1.5592 11.4087 1 10.0011 1V3C10.8783 3 11.7196 3.34849 12.3399 3.9688L13.7542 2.55459ZM10.0011 1C8.59336 1 7.24333 1.5592 6.24795 2.55459L7.66216 3.9688C8.28247 3.34849 9.1238 3 10.0011 3V1ZM6.24795 2.55459C5.25256 3.54997 4.69336 4.9 4.69336 6.30769H6.69336C6.69336 5.43044 7.04185 4.58911 7.66216 3.9688L6.24795 2.55459ZM4.69336 6.30769V8.15385H6.69336V6.30769H4.69336Z"
                            fill="#A6B1BB" mask="url(#path-2-inside-1_298_4618)" />
                        <path
                            d="M10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14Z"
                            fill="#F4F4F4" stroke="#F4F4F4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <form onSubmit={handleSubmitUsername}>
                <div className="w-full mt-4">
                    <label
                        className="block text-[14px] mb-1 text-[#363E4A]"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <div className='flex flex-row gap-4'>
                        {/* {editUsername ?<> */}
                        <div className="h-fit w-full form-input flex flex-row flex-nowrap border border-gray-500 p-0 cursor-text rounded-xl">
                            <svg className='my-1 ml-[10px] w-10 h-6 mt-3 pr-[10px] border-r-2 border-[#CAD0D3]' viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20.5926" height="20" fill="white" />
                                <path
                                    d="M3.14552 12.8653C2.7579 11.9564 2.55859 10.9829 2.55859 10C2.55859 9.01715 2.7579 8.04355 3.14552 7.13468C3.53316 6.22577 4.10173 5.39895 4.81952 4.70182C5.53734 4.00466 6.3903 3.4509 7.33006 3.07283C8.26985 2.69476 9.2776 2.5 10.2956 2.5C11.3137 2.5 12.3214 2.69476 13.2612 3.07283C14.201 3.4509 15.0539 4.00466 15.7717 4.70182C16.4895 5.39895 17.0581 6.22577 17.4457 7.13468C17.8334 8.04355 18.0327 9.01715 18.0327 10C18.0327 10.9829 17.8334 11.9564 17.4457 12.8653C17.0581 13.7742 16.4895 14.601 15.7717 15.2982C15.0539 15.9953 14.201 16.5491 13.2612 16.9272C12.3214 17.3052 11.3137 17.5 10.2956 17.5C9.27759 17.5 8.26985 17.3052 7.33006 16.9272C6.3903 16.5491 5.53734 15.9953 4.81952 15.2982C4.10173 14.601 3.53316 13.7742 3.14552 12.8653Z"
                                    stroke="#707C8A" strokeLinecap="round" strokeLinejoin="round" />
                                <path
                                    d="M5.14844 15.4032C5.36689 14.7083 5.81388 14.0993 6.42312 13.6664C7.03235 13.2335 7.77136 12.9998 8.53052 13H12.0609C12.821 12.9997 13.5609 13.234 14.1706 13.6679C14.7803 14.1018 15.2271 14.7122 15.4447 15.4083M7.64793 8.53058C7.64793 9.20173 7.92689 9.84539 8.42345 10.32C8.92 10.7945 9.59347 11.0612 10.2957 11.0612C10.9979 11.0612 11.6714 10.7945 12.168 10.32C12.6645 9.84539 12.9435 9.20173 12.9435 8.53058C12.9435 7.85943 12.6645 7.21576 12.168 6.74119C11.6714 6.26661 10.9979 6 10.2957 6C9.59347 6 8.92 6.26661 8.42345 6.74119C7.92689 7.21576 7.64793 7.85943 7.64793 8.53058Z"
                                    stroke="#707C8A" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                id="username"
                                type="text"
                                className=" grow border-0 p-0 h-6 focus:outline-none focus:ring-0 mx-3 my-3 w-full overflow-hidden cursor-text text-[#707C8A]"
                                onChange={e => handleUsernameChange(e)}
                                value={editUsername}
                            />
                        </div>
                        <button className='btn text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500 whitespace-nowrap rounded-xl'>Update</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
}

const PasswordModule = () => {
    const router = useRouter();

    return <div className='w-full px-4 sm:px-6'>
        <div className='w-fit mx-auto'>
            <div className='w-full flex flex-row justify-center mb-5'>
                <button className='btn text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500 whitespace-nowrap rounded-xl' onClick={e => router.push('/reset-password')}>Change Password</button>
            </div>
        </div>
    </div>
}

const Referral = () => {
    return <div className='w-full px-4 sm:px-6'>
        <div className="mb-8 w-full">
            <div className="w-fit text-[#363E4A] text-[17px] font-bold">Referral</div>
            <div className="w-fit text-[#212121] text-[80px]">50<span className='text-[24px]'>credit/invite</span></div>
        </div>
        <ReferralLink />
    </div>
}

const Subscription = () => {
    const [portalURL, setPortalURL] = useState('');

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
                if (data.tier !== 'FREE') {

                    fetch(`/api/create-portal-session`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    }).then(response => {
                        if (response.ok) {
                            return response.text()
                        }
                        else {
                            throw response.status, response;
                        }
                    }).then(data => {
                        setPortalURL(data);
                    })
                }
            }).catch(error => console.error)
        }
        fetchTier();
    }, [])


    return <div className='w-full'>
        <div className="mb-8 w-full max-w-none 2xl:max-w-[80%] mx-auto px-4 sm:px-6">
            <div className="w-fit text-[#363E4A] text-[17px] font-bold">Subscription</div>
            <div className="w-fit text-[#212121] text-[80px]">Plans</div>
        </div>
        <Pricing />
        {portalURL && <div className='w-full px-4 sm:px-6 flex flex-col justify-center items-center max-w-none 2xl:max-w-[80%] mx-auto'>
            <button className='btn max-w-sm text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500 whitespace-nowrap rounded-xl'><Link href={portalURL} target='_blank'>Manage Subscription</Link></button>
        </div>}
    </div>
}

const CreditHistory = () => {
    const [credits, setCredits] = useState(0);

    useEffect(() => {
        const fetchCredit = async () => {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            UserService.getUserCreditsAndTier(idToken)
                .then(fetched => {
                    setCredits(fetched.credits)
                    // setTier(fetched.tier)
                })
                .catch(() => setCredits(0))
        }
        fetchCredit();
    }, []);

    return <div className='w-full px-4 sm:px-6'>
        <div className="mb-8 w-full">
            <div className="w-fit text-[#363E4A] text-[17px] font-bold">Credit Balance</div>
            <div className="w-fit text-[#212121] text-[80px]">{credits}</div>
        </div>
    </div>
}

export default function Account() {
    // To add a new section
    // Add tabRef for header animation
    // Add section ref for scrollIntoView in function toSection
    // Add IntersectionObserver in function observeElements

    const [currentDisplay, setCurrentDisplay] = useState(0);
    const [selectDisplay, setSelectDisplay] = useState(0);
    const [hoverTo, setHoverTo] = useState(-1);
    const tabUnderlineRef = useRef<HTMLDivElement>(null);

    // refs for sub-header animation
    const tab1Ref = useRef<HTMLDivElement>(null);
    const tab2Ref = useRef<HTMLDivElement>(null);
    const tab3Ref = useRef<HTMLDivElement>(null);
    const tab4Ref = useRef<HTMLDivElement>(null);

    //ref for sections
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const ref4 = useRef<HTMLDivElement>(null);

    const initializeUser = async () => {
        const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        headers.append('Content-Type', 'application/json');

        const user = await AuthService.getCurrentUser()
        const username = user.attributes['name'];
        const email = user.attributes['email'];

        const userData = {
            username: username,
            email: email,
            is_admin: user.is_admin
        };

        console.log("New user initializing...");
        try {
            const createUserResponse = await fetch('/api/create_user', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userData)
            });
            if (createUserResponse.ok) {
                console.log("Initialized successfully.")
            } else {
                console.error('Failed to initialize user:', createUserResponse.status);
                const errorData = await createUserResponse.json();
                console.log('Error message:', errorData.message);
            }
        } catch (error) {
            console.error('Error initializing user:', error);
        }
    }

    useEffect(() => {
        initializeUser();
    }, [])

    const toSection = (index: number) => {
        setSelectDisplay(index);
        if (ref1.current && ref2.current && ref3.current && ref4.current) {
            if (index === 0) {
                ref1.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            } else if (index === 1) {
                ref2.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            } else if (index === 2) {
                ref3.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
            } else if (index === 3) {
                ref4.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            }
        }
    }

    const handleMouseOver = (index: number) => {
        setHoverTo(index);
    }

    const handleMouseOut = () => {
        setHoverTo(-1);
    }

    useEffect(() => {
        if (hoverTo !== -1) {
            setCurrentDisplay(hoverTo);
        } else {
            setCurrentDisplay(selectDisplay);
        }
    }, [hoverTo, selectDisplay])

    useEffect(() => {
        const handleIntersect1 = (entry: IntersectionObserverEntry[]) => {
            if (entry[0].isIntersecting) {
                setSelectDisplay(0);
            }
        }
        const handleIntersect2 = (entry: IntersectionObserverEntry[]) => {
            if (entry[0].isIntersecting) {
                setSelectDisplay(1);
            }
        }
        const handleIntersect3 = (entry: IntersectionObserverEntry[]) => {
            if (entry[0].isIntersecting) {
                setSelectDisplay(2);
            }
        }
        const handleIntersect4 = (entry: IntersectionObserverEntry[]) => {
            if (entry[0].isIntersecting) {
                setSelectDisplay(3);
            }
        }

        const observeElements = () => {
            if (ref1.current && ref2.current && ref3.current && ref4.current) {
                let options = {
                    root: null,
                    rootMargin: "0px",
                    threshold: [0.3],
                };

                let observer1 = new IntersectionObserver(handleIntersect1, options);
                observer1.observe(ref1.current);
                let observer2 = new IntersectionObserver(handleIntersect2, options);
                observer2.observe(ref2.current);
                let observer3 = new IntersectionObserver(handleIntersect3, options);
                observer3.observe(ref3.current);
                let observer4 = new IntersectionObserver(handleIntersect4, options);
                observer4.observe(ref4.current);
            }
        }

        observeElements();

    }, [ref1, ref2, ref3, ref4])

    useEffect(() => {
        if (tabUnderlineRef.current && tab1Ref.current && tab2Ref.current && tab3Ref.current && tab4Ref.current) {
            const margin = tab1Ref.current.offsetLeft;
            if (currentDisplay === 0) {
                tabUnderlineRef.current.style.width = tab1Ref.current.offsetWidth + 'px';
                tabUnderlineRef.current.style.marginLeft = margin + 'px';
            } else if (currentDisplay === 1) {
                tabUnderlineRef.current.style.width = tab2Ref.current.offsetWidth + 'px';
                tabUnderlineRef.current.style.marginLeft = tab1Ref.current.offsetWidth + margin * 3 + 'px';
            } else if (currentDisplay === 2) {
                tabUnderlineRef.current.style.width = tab3Ref.current.offsetWidth + 'px';
                tabUnderlineRef.current.style.marginLeft = tab1Ref.current.offsetWidth + tab2Ref.current.offsetWidth + margin * 5 + 'px';
            } else if (currentDisplay === 3) {
                tabUnderlineRef.current.style.width = tab4Ref.current.offsetWidth + 'px';
                tabUnderlineRef.current.style.marginLeft = tab1Ref.current.offsetWidth + tab2Ref.current.offsetWidth + tab3Ref.current.offsetWidth + margin * 7 + 'px';
            }
        }
    }, [currentDisplay])

    const bar = <div className='w-full h-0 border-b-2 border-[#CAD0D3]'></div>
    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 700,
            easing: 'ease-out-cubic',
        })
    })

    return (
        <div className='flex flex-col items-center gap-[70px] mx-auto'>
            <ToastContainer />
            {/* <div className='fixed w-full top-0 h-[130px] md:h-[160px] bg-[#E7E9EB] flex flex-col z-20 max-w-none 2xl:max-w-[80%]'> */}
                {/* <div className='grow flex flex-row mb-2 items-end'>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(0) }} onMouseMove={e => { handleMouseOver(0) }} onMouseOut={handleMouseOut} ref={tab1Ref}>Account Settings</div>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(1) }} onMouseMove={e => { handleMouseOver(1) }} onMouseOut={handleMouseOut} ref={tab4Ref}>Credits</div>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(2) }} onMouseMove={e => { handleMouseOver(2) }} onMouseOut={handleMouseOut} ref={tab3Ref}>Subscription</div>
                </div> */}
                {/* <div className='w-full flex flex-row'>
                    <div className='border-b-2 w-fit border-black h-0 overflow-hidden text-[16px] mx-1 md:mx-5 transition-all duration-300' ref={tabUnderlineRef}></div>
                </div> */}
            {/* </div> */}
            <div className='w-full mt-[20px] md:mt-0 max-w-none 2xl:max-w-[80%]' ref={ref1}><Profile /></div>
            <div className='w-full max-w-none 2xl:max-w-[80%]'><PasswordModule /></div>
            {bar}
            <div className='w-full max-w-none 2xl:max-w-[80%]' ref={ref4}><CreditHistory /></div>
            <div className='w-full max-w-none 2xl:max-w-[80%]' ref={ref2}><Referral /></div>
            {bar}
            <div className='w-full' ref={ref3}><Subscription /></div>
            
        </div >)
};