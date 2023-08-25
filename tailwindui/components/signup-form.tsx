"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
    const [passwordError, setPasswordError] = useState('');
    const [verificationCodeError, setVerificationCodeError] = useState('');

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

    function handlePasswordChange(event: any) {
        const value = event.target.value;

        // Validate the password
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numericRegex = /[0-9]/;
        const symbolRegex = /[?\^\$\*\.\[\]\{\}\(\)?\-"\!\@\#%\&\/\\,><'\:\;\|\_~`]/;

        let error = '';
        if (value.length < 8) {
            error = 'Password should be at least 8 characters';
        } else if (value.length > 16) {
            error = 'Password should be no longer than 16 characters';
        } else {
            if (!uppercaseRegex.test(value)) {
                error += 'Password should contain at least one uppercase letter. ';
            }
            if (!lowercaseRegex.test(value)) {
                error += 'Password should contain at least one lowercase letter. ';
            }
            if (!numericRegex.test(value)) {
                error += 'Password should contain at least one numeric character. ';
            }
            if (!symbolRegex.test(value)) {
                error += 'Password should contain at least one of the following symbol character: ?^ $ * . [ ] { } ( ) ? - " ! @ # % & / \ , > < \' : ; | _ ~ `';
            }
        }

        setPassword(value);
        setPasswordError(error);
    }

    async function sendVerificationCode() {
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
                    <input
                        id="password"
                        type="password"
                        onChange={handlePasswordChange}
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        minLength={8}
                        maxLength={16}
                        required
                    />
                    {passwordError && <div className="text-sm text-red-500">{passwordError}</div>}
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
                    <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
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
