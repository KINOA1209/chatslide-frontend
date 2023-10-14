'use client';


import Link from "next/link";
import SignupForm from "@/components/signup-form";
import GoogleSignIn from "@/components/button/GoogleSignIn";
import CustomerServiceInfo from '@/components/customerService';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Auth, Hub } from 'aws-amplify';

export default function SignUp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [href, setHref] = useState('/signup-with-email');
    const [showPromo, setShowPromo] = useState(false);

    const [referralValue, setReferralValue] = useState('');

    useEffect(() => {
        const handlePromoChange = (promo: string) => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('promo', promo);
            }
        };

        const promo = searchParams.get('referral');
        if (promo) {
            handlePromoChange(promo);
            setReferralValue(promo);
            setShowPromo(true);
        };
    }, [])

    useEffect(() => {
        const loginRedirect = () => {
            Auth.currentAuthenticatedUser().then(user => {
                router.push('/dashboard');
            }).catch((error: string) => {
                // Throw error if the reason is unknown
                if (error !== "The user is not authenticated") {
                    console.error(error);
                }
            });
        };
        loginRedirect();

        setHref(`/signup-with-email${window.location.search}`);
    }, []);

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">
                            💙 Welcome!
                        </h1>
                    </div>



                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        {showPromo ? (
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label
                                        className="block text-green-600 font-medium mb-1"
                                        htmlFor="promo"
                                    >
                                        Get more credits with a promo or referral code
                                    </label>
                                    <div className="max-w-sm mx-auto">
                                        <input
                                            id="promo"
                                            type="text"
                                            value={referralValue}
                                            onChange={(e) => setReferralValue(e.target.value)}
                                            className="form-input w-full text-gray-800 bg-gray-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <span className="text-blue-500 cursor-pointer" onClick={() => setShowPromo(true)}>
                                Have a promo or referral code?
                            </span>
                        )}


                        <div className="flex items-center my-6">
                            <div
                                className="border-t border-gray-300 grow mr-3"
                                aria-hidden="true"
                            ></div>
                            <div className="text-gray-600 italic">Quick Sign Up</div>
                            <div
                                className="border-t border-gray-300 grow ml-3"
                                aria-hidden="true"
                            ></div>
                        </div>


                        <GoogleSignIn />

                        <div className="flex items-center my-6">
                            <div
                                className="border-t border-gray-300 grow mr-3"
                                aria-hidden="true"
                            ></div>
                            <div className="text-gray-600 italic">Or</div>
                            <div
                                className="border-t border-gray-300 grow ml-3"
                                aria-hidden="true"
                            ></div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mt-6">
                            <div className="w-full px-3">
                                <a
                                    href={href}
                                    className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full">
                                    Sign up with email
                                </a>
                                {/* <ToastContainer /> */}
                            </div>
                        </div>


                        <div className="text-sm text-gray-500 text-center mt-3">
                            By creating an account, you agree to the{" "}
                            <a className="underline" href="/terms">
                                terms & conditions
                            </a>
                            , and our{" "}
                            <a className="underline" href="/privacy">
                                privacy policy
                            </a>
                            .
                        </div>
                        <div className="text-gray-600 text-center mt-6">
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                            >
                                Sign in
                            </Link>
                        </div>
                        {/* <div className="text-gray-600 text-center mt-6">
                            <CustomerServiceInfo />
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
