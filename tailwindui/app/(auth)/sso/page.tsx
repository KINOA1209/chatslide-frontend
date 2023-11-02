"use client";

import AuthService from '@/components/utils/AuthService';
import UserService from '@/components/utils/UserService';
import { init } from 'aos';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';


export default function SSORedirect() {    
    const router = useRouter();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const errorDescription = queryParams.get('error_description');
        
        if(errorDescription) {
            toast.error(errorDescription, {
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


        const initUser = async () => {
            const { idToken } = await AuthService.getCurrentUserTokenAndId();
            await UserService.initializeUser(idToken);
            const promo = localStorage.getItem("promo");
            if (promo) {
                const { status, message } = await UserService.applyPromoCode(promo, idToken);
                console.log(status, message);
                if (status == 200) {
                    toast.success(message, {
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
            }

            router.push("/dashboard");
        }
        initUser();

    }, []);
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                You should be redirected soon. If not, you may already have an account. Please sign in or reset your password.
                <ToastContainer />
            </div>
        </div>
    );
};
