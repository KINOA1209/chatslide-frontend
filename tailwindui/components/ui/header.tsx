"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Logo from "./logo";
import DropdownButton from "@/components/utils/dropdown";
import MobileMenu from "./mobile-menu";
import { usePathname } from "next/navigation";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    } else {
      setAccessToken("");
    }
    setLoading(false);
  }, [accessToken, pathname]);

  if (loading) {
    return <p></p>;
  }

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            {accessToken ? (
              <ul className="flex grow justify-end flex-wrap items-center">
                <DropdownButton accessToken={accessToken} setAccessToken={setAccessToken}/>
              </ul>
            ) : (
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    href="/signin"
                    className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                  >
                    <span>Sign up</span>
                  </Link>
                </li>
              </ul>

              )}
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
