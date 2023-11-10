'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthService from "../utils/AuthService";
import UserService from "../utils/UserService";

interface DropdownButtonProps {
}

const DropdownButton: React.FC<DropdownButtonProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [username, setUsername] = useState(null);
    const [credits, setCredits] = useState(0);
    const [tier, setTier] = useState<string>('');

    useEffect(() => {
        // Create a scoped async function within the hook.
        const fetchUser = async () => {
            const username = await AuthService.getCurrentUserDisplayName();
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
            if (username) {
                setUsername(username);
                UserService.getUserCreditsAndTier(idToken)
                .then(fetched => {
                    setCredits(fetched.credits)
                    setTier(fetched.tier)
                })
                .catch(() => {
                    setCredits(0)
                    setTier('FREE')
                })
            }
        };
        // Execute the created function directly
        fetchUser();
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const signOut = async () => {
        try {
            await AuthService.signOut();
            sessionStorage.clear();
            localStorage.clear();
            console.log('You have signed out!');
            router.push('/');
        } catch (error: any) {
            console.error(error);
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

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="dropdown-menu-button"
                    onClick={toggleDropdown}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    Hi, { username }
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-300"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-menu-button"
                >
                    <div className="py-1" role="none">
                        <a
                            href="/dashboard"
                            className="block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200"
                            role="menuitem"
                        >
                            My Projects
                        </a>
                        <a
                            href="/my-library"
                            className="block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200"
                            role="menuitem"
                        >
                            My Resources
                        </a>
                        <a
                            href="/account"
                            className="block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200"
                            role="menuitem"
                        >
                            Account Settings
                        </a>
                    </div>
                    <div className="block px-4 py-1 text-sm text-blue-600">
                        ⭐️Credits: {credits}
                    </div>
                    <div className="block px-4 py-1 text-sm text-blue-600">
                        Tier: {tier.split('_')[0]}
                    </div>
                    <div className="py-1" role="none">
                        <div className="py-0.2" role="none">
                            <a
                                onClick={signOut}
                                className="block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200 cursor-pointer"
                                role="menuitem"
                            >
                                Sign out
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;