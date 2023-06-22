'use client';


import Link from "next/link";
import SignupForm from "@/components/signup-form";
import GoogleSignIn from "@/components/GoogleSignIn";

export default function SignUp() {
    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">
                            💙 Welcome.
                        </h1>
                    </div>

                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        <SignupForm />
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
                        <GoogleSignIn />
                        <div className="text-gray-600 text-center mt-6">
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
