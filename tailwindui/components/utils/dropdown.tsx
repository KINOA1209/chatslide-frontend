'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface DropdownButtonProps {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ accessToken, setAccessToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const delayedGetUsername = () => {
      timer = setTimeout(() => {
        getUsername()
          .then((username) => {
            if (username) {
              setUsername(username);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle the error as needed
          });
      }, 10); // Adjust the delay time as needed
    };

    // Call the delayedGetUsername function
    delayedGetUsername();

    // Clear the timer if the component unmounts or if accessToken changes
    return () => clearTimeout(timer);
  }, [accessToken]);
  

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


  async function getUsername() {
    const headers = new Headers();
    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch('/api/profile', {
        method: "GET",
        headers: headers,
        });
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      const data = await response.json();
      console.log(data.username);
      return data.username;
    } catch (error) {
      console.error(error);
      // Handle the error as needed
      return null;
    }
  }

  const handleSignOut = async () => {
    //send a request to the server to delete the access token

    const headers = new Headers();
    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: headers,
      });
      console.log(response);

      // Remove the access token from local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("signed_in");

      console.log(router.push("/"))
      setTimeout(() => {
        setAccessToken("");
      }, 100);
    } catch (error) {
      console.log(error);
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
          Hi, {username}
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
              Projects
            </a>
            <a
              href="#"
              className="block px-4 py-1 text-sm text-blue-600 hover:bg-gray-200"
              role="menuitem"
            >
              Account settings
            </a>
          </div>
          <div className="py-1" role="none">
            <div className="py-0.2" role="none">
              <a
                onClick={handleSignOut}
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