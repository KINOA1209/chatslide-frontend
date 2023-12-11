'use client'

import Image from 'next/image'
import background from '@/public/images/landing.jpeg'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AuthService from "../../services/AuthService";
import HeroText from './HeroText';

const InternalIntroduction = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);

  const [imageOpacity, setImageOpacity] = useState('opacity-100');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
    }

    fetchCurrentUser();

    setImageOpacity('opacity-50');
  }, []); // The empty array means this effect runs once on mount and never again


  const handleOnClick = async () => {
    if (currentUser) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
    sessionStorage.clear();
  }


  return (
    <section className="relative h-[100vh] max-h-[1000px] md:h-[75vh]">

      {/* Illustration behind hero content */}
      <div className="h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-1" aria-hidden="true">
        <Image
          className={`h-full max-w-none ${imageOpacity} transition-opacity duration-1000`}
          src={background}
          height={(typeof window !== 'undefined' && window.innerHeight < 768) ? window.innerHeight : 768}
          style={{ objectFit: "contain" }}
          alt="Features bg"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -bottom-[48%] md:-bottom-[30%]">

        {/* Introduction content */}
        <div className="pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <div className="max-w-3xl mx-auto">
                <HeroText />
              {/* <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Dr. <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Lambda</span></h1> */}
              <br></br>
              {/* <p className="text-2xl md:text-2xl text-black-400 mb-8 font-bold" data-aos="zoom-y-out" data-aos-delay="150">Remix your knowledge with DrLambda</p> */}
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full mb-4 sm:w-auto sm:mb-0 cursor-pointer" onClick={handleOnClick}>
                    {currentUser ? 'My dashboard' : 'Start free trial'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default function Introduction() {
  return (
    <>
      <InternalIntroduction />
    </>
  )
}