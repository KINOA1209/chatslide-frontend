"use client";
// export const metadata = {
//   title: "Sign In - Dr. Lambda",
//   description: "AI copilot for educators",
// };

import LoginForm from "@/components/login-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import GoogleSignIn from "@/components/GoogleSignIn";
import CustomerServiceInfo from '@/components/customerService';


export default function SignIn() {
    const searchParams = useSearchParams();
    const nextUri = searchParams.get("next");


    return (
        <section className="bg-gradient-to-b from-gray-100 to-white">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h1 className="h1">💙 Welcome back!</h1>
                    </div>

                    {/* Form */}
                    <div className="max-w-sm mx-auto">
                        <LoginForm />
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
                            Do not have an account?{" "}
                            <Link
                                href={"/signup" + (nextUri == null ? "" : "?next=" + nextUri)}
                                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                            >
                                Sign up
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
