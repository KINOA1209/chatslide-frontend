import React, { useState } from 'react';
import { auth, googleProvider } from './Firebase';
import { getAuth, signInWithPopup, User } from 'firebase/auth';
import { useRouter, useSearchParams } from "next/navigation";

const GoogleSignIn: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUri = searchParams.get("next");

  const handleRedirect = async (token: string) => {
    if (nextUri) {
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
    } else {
      router.push('/dashboard');
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('You are signed in!');
      sessionStorage.setItem('signed_in', 'true')

      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          console.log('Access token:', token);
          handleRedirect(token); // Pass the token to handleRedirect
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={signInWithGoogle} className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
      <svg
        className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
      </svg>
      <span className="flex-auto pl-16 pr-8 -ml-16">
        Continue with Google
      </span>
    </button>
  );
}

export default GoogleSignIn;
