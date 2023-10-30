"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect, useRef, RefObject } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "./utils/AuthService";
import GoogleSignIn from "@/components/button/GoogleSignIn";



const SignupForm: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nextUri = searchParams.get("next");


    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [countdown, setCountdown] = useState(15);

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [verificationCodeError, setVerificationCodeError] = useState('');

    const [isFocused, setIsFocused] = useState(false);
    const [rule1Error, setRule1Error] = useState(false);

    const passwordRef = useRef<HTMLInputElement>(null);
    const rule1 = useRef<HTMLParagraphElement>(null);

    const verificationCodeInputRef = useRef<HTMLInputElement>(null);

    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // function handleUsernameChange(event: any) {
    //     const username = event.target.value;

    //     // Validate the username (example: at least 6 characters)
    //     if (username.length < 2) {
    //         setUsernameError('Name should have at least 2 characters.');
    //     } else if (username.length > 16) {
    //         setUsernameError('Name should have at most 16 characters.');
    //     } else {
    //         setUsernameError('');
    //     }

    //     setUsername(username);
    // }

    function handleEmailChange(event: any) {
        const value = event.target.value;
        setEmail(value);

        // Validate the email (example: using a regular expression)
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(value)) { // email.match(emailFormat)
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
        // For apppy promo code
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('email', value);
        }
    }

    const validatePassword = (pwd: string): boolean => {
        // Validate the password
        var validated = true;
        if (rule1.current) {
            if (pwd.length < 8) {
                rule1.current.style.color = 'red';
                setRule1Error(true);
                validated = false;
            } else {
                setRule1Error(false);
                rule1.current.style.color = 'green';
                setPassword(passwordRef.current?.value || '');
            }
        }
        return validated;
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        validatePassword(value);
    }

    async function sendVerificationCode(e: React.MouseEvent<HTMLButtonElement>) {
        console.log(`sendVerificationCode: ${email}, ${password}`);
        e.preventDefault();

        if (password === "") { // Invalid password
            console.log("Invalid password")
            return;
        }

        // Remove username input, use email instead
        try {
            const resp = await AuthService.sendCode(email, password, email);
            setDisabled(true);
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            setTimeout(() => {
                clearInterval(interval);
                setDisabled(false);
                setCountdown(15);
            }, 15000);

            toast.success("Email sent", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {

            let errorMessage: string;

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            } else {
                errorMessage = 'An unknown error occurred';
            }

            toast.error(errorMessage as string, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log("Error:", error);
        }
    }

    function handleClickVerificationInput(e: React.MouseEvent<HTMLDivElement>, textRef: RefObject<HTMLInputElement>) {
        if (textRef.current) {
            textRef.current.focus();
        }
    };

    /* write a function that will take the form data and send it to the backend */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const username = (event.target as HTMLFormElement).username.value;
        const email = (event.target as HTMLFormElement).email.value;
        if (password === "") { // Invalid password
            return;
        }

        try {
            const user = await AuthService.signupNoCode(email, password, email);
            if (user) {
                sessionStorage.setItem("signed_in", "true")

                if (nextUri == null) {
                    router.push("/dashboard");
                }
            }
        } catch (error: any) {
            console.log("Error:", error);

            if (error.message == "PreSignUp failed with error Email already exists.") {
                error.message = "Email already exists. Please sign in or reset your password."
            }
            toast.error(error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const referralCode = queryParams.get('referral');
        if (referralCode) {
            // If the 'referral' query parameter exists, set it as the input value
            const promoInput = document.getElementById('promo') as HTMLInputElement;
            if (promoInput) {
                promoInput.value = referralCode;
                // Manually trigger the change event so that the localStorage is updated
                promoInput.dispatchEvent(new Event('change'));
            }
        }
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <div className={`flex flex-wrap -mx-3 mb-4 ${!Boolean(searchParams.get('referral')) && 'hidden'}`}>
                <div className="w-full px-3">
                    <label
                        className="block text-green-600 text-sm font-medium mb-1"
                        htmlFor="promo"
                    >
                        Referral code applied
                    </label>
                    <input
                        id="promo"
                        type="text"
                        value={searchParams.get('referral') || ''}
                        className="form-input w-full text-gray-800 bg-gray-200 cursor-not-allowed"
                        disabled={true}
                    />
                </div>
            </div>

            {/* <div className="flex items-center my-6">
                <div
                    className="border-t border-gray-300 grow mr-3"
                    aria-hidden="true"
                ></div>
                <div className="text-gray-600 italic">Fast sign up with Google</div>
                <div
                    className="border-t border-gray-300 grow ml-3"
                    aria-hidden="true"
                ></div>
            </div>

            <GoogleSignIn /> */}
            {/* 
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
            </div> */}

            {/* <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="username"
                    >
                        Display Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="username"
                        type="text"
                        onChange={handleUsernameChange}
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your display name"
                        minLength={3}
                        maxLength={16}
                        required
                    />
                    {usernameError && <div className="text-sm text-red-500">{usernameError}</div>}
                </div>
            </div> */}
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                    >
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                        value={email}
                        onChange={handleEmailChange}
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                    />
                    {emailError && <div className="text-sm text-red-500">{emailError}</div>}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="password"
                    >
                        Password <span className="text-red-600">*</span>
                    </label>
                    <div className="text-sm text-gray-500">
                        {/* <p>&emsp;&emsp;Password must</p> */}
                        {isFocused || rule1Error ? <p ref={rule1}>&emsp;&emsp;Be a minimum of 8 characters</p> : <></>}
                    </div>
                    <input
                        id="password"
                        type="password"
                        onChange={handlePasswordChange}
                        className="form-input w-full text-gray-800 mt-3"
                        placeholder="Enter your password"
                        minLength={8}
                        maxLength={16}
                        required
                        ref={passwordRef}
                        onFocus={e => { setIsFocused(true) }}
                        onBlur={e => { setIsFocused(false) }}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                    <button className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full">
                        Sign up
                    </button>
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
        </form>
    );
};

export default SignupForm;
