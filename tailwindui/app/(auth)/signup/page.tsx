'use client';


import Link from "next/link";
import SignupForm from "@/components/signup-form";
import CustomerServiceInfo from '@/components/customerService';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth, Hub } from 'aws-amplify';

export default function SignUp() {
    const router = useRouter();

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
                        <SignupForm />
                        <div className="text-gray-600 text-center mt-6">
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                            >
                                Sign in
                            </Link>
                        </div>
                        <div className="text-gray-600 text-center mt-6">
                            <CustomerServiceInfo />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
