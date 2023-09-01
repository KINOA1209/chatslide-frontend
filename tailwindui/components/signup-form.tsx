"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userInfo } from "os";
import next from "next/types";
import AuthService from "./utils/AuthService";


const SignupForm: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nextUri = searchParams.get("next");

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [countdown, setCountdown] = useState(15);

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const [verificationCodeError, setVerificationCodeError] = useState('');

    const [isFocused, setIsFocused] = useState(false);
    const [rule1Error, setRule1Error] = useState(false);
    const [rule2Error, setRule2Error] = useState(false);
    const [rule3Error, setRule3Error] = useState(false);
    const [rule4Error, setRule4Error] = useState(false);
    const [rule5Error, setRule5Error] = useState(false);

    const passwordRef = useRef<HTMLInputElement>(null);
    const rule1 = useRef<HTMLParagraphElement>(null);
    const rule2 = useRef<HTMLParagraphElement>(null);
    const rule3 = useRef<HTMLParagraphElement>(null);
    const rule4 = useRef<HTMLParagraphElement>(null);
    const rule5 = useRef<HTMLParagraphElement>(null);

    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function handleUsernameChange(event: any) {
        const username = event.target.value;

        // Validate the username (example: at least 6 characters)
        if (username.length < 2) {
            setUsernameError('Name should have at least 2 characters.');
        } else if (username.length > 16) {
            setUsernameError('Name should have at most 16 characters.');
        } else {
            setUsernameError('');
        }

        setUsername(username);
    }

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
    }

    const validatePassword = (pwd: string): boolean => {
        // Validate the password
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numericRegex = /[0-9]/;
        const symbolRegex = /[?\^\$\*\.\[\]\{\}\(\)?\-"\!\@\#%\&\/\\,><'\:\;\|\_~`]/;
        var validated = true;
        if (rule1.current) {
            if (pwd.length < 8) {
                rule1.current.style.color = 'red';
                setRule1Error(true);
                validated = false;
            } else {
                setRule1Error(false);
                rule1.current.style.color = 'green';
            }
        }
        if (rule2.current) {
            if (!uppercaseRegex.test(pwd)) {
                rule2.current.style.color = 'red';
                setRule2Error(true);
                validated = false;
            } else {
                setRule2Error(false);
                rule2.current.style.color = 'green';
            }
        }
        if (rule3.current) {
            if (!lowercaseRegex.test(pwd)) {
                rule3.current.style.color = 'red';
                setRule3Error(true);
                validated = false;
            } else {
                setRule3Error(false);
                rule3.current.style.color = 'green';
            }
        }
        if (rule4.current) {
            if (!numericRegex.test(pwd)) {
                rule4.current.style.color = 'red';
                setRule4Error(true);
                validated = false;
            } else {
                setRule4Error(false);
                rule4.current.style.color = 'green';
            }
        }
        if (rule5.current) {
            if (!symbolRegex.test(pwd)) {
                rule5.current.style.color = 'red';
                setRule5Error(true);
                validated = false;
            } else {
                setRule5Error(false);
                rule5.current.style.color = 'green';
            }
        }
        return validated;
    }

    const validateConfirmPassword = (pwd1: string, pwd2: string): boolean => {
        if (pwd1 === pwd2) {
            setPasswordConfirmError("");
            return true;
        } else {
            setPasswordConfirmError("Two passwords are different.");
            return false;
        }
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        validatePassword(value);
    }

    function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (passwordRef.current) {
            const validation1 = validatePassword(passwordRef.current.value);
            const validation2 = validateConfirmPassword(passwordRef.current.value, e.target.value);
            if (validation1 && validation2) {
                setPassword(passwordRef.current.value);
            } else {
                setPassword("");
            }
        }
    };

    async function sendVerificationCode() {
        if (password === "") { // Invalid password
            return;
        }

        const resp = await AuthService.sendCode(email, password, username);
        try {
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
            console.log("Error:", error);
        }
    }

    /* write a function that will take the form data and send it to the backend */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const username = (event.target as HTMLFormElement).username.value;
        const email = (event.target as HTMLFormElement).email.value;
        const code = (event.target as HTMLFormElement).verification_code.value;

        if (password === "") { // Invalid password
            return;
        }

        try {
            await AuthService.confirmSignUp(email, code);
            const signInResponse = await AuthService.signIn(email, password);  //auto sign in afterwards
            if (signInResponse) {
                const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
                if (userId) {
                    console.log('User registered:', userId);
                    sessionStorage.setItem("signed_in", "true")
                }
                if (nextUri == null) {
                    router.push("/dashboard");
                } else {
                    const project_id = sessionStorage.getItem('project_id') || '';
                    try {
                        const response = await fetch('/api/link_project', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ 'project_id': project_id }),
                        });
                        console.log(response);
                        router.push(nextUri); // Redirect to nextUri
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        } catch (error: any) {
            console.log("Error:", error);
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

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-4">
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
            </div>
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
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                        {isFocused || rule2Error ? <p ref={rule2}>&emsp;&emsp;Include at least one uppercase letter (A-Z)</p> : <></>}
                        {isFocused || rule3Error ? <p ref={rule3}>&emsp;&emsp;Include at least one lowercase letter (a-z)</p> : <></>}
                        {isFocused || rule4Error ? <p ref={rule4}>&emsp;&emsp;Include at least one number (0-9)</p> : <></>}
                        {isFocused || rule5Error ? <p ref={rule5}>&emsp;&emsp;Include at least one special character</p> : <></>}
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
                        onFocus={e=>{setIsFocused(true)}}
                        onBlur={e=>{setIsFocused(false)}}
                    />
                    <input
                        id="password"
                        type="password"
                        onChange={handleConfirmPasswordChange}
                        className="form-input w-full text-gray-800 mt-3"
                        placeholder="Confirm your password"
                        minLength={8}
                        maxLength={16}
                        required
                    />
                    {passwordConfirmError && <div className="text-sm text-red-500">{passwordConfirmError}</div>}
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="verification_code"
                    >
                        Verification Code <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="verification_code"
                        type="text"
                        className="form-input w-full text-gray-800 mb-2"
                        placeholder="Enter your verfication code"
                        required
                    />
                    <button
                        onClick={sendVerificationCode}
                        type="button"
                        className="bg-slate-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                    >
                        {disabled
                            ? `Retry after: ${countdown} seconds`
                            : "Send Verification Code"}
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                    <button className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full">
                        Sign up
                    </button>
                    <ToastContainer />
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
