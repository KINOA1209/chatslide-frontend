import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from './Firebase';
import { getAuth, onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GoogleSignIn: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const nextUri = searchParams.get("next");
    const [accessToken, setAccessToken] = useState<string | null>(null);
  
    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        console.log('You are signed in!');
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      const auth = getAuth();
  
      const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
        if (currentUser) {
          currentUser.getIdToken()
            .then((token) => {
              setAccessToken(token);
              console.log('accessToken: ', token); // Log the updated token here
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setAccessToken(null);
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    useEffect(() => {
      if (accessToken) { // Check if accessToken is not null or empty
        const project_id = localStorage.getItem('project_id') || '';
        const fetchProject = async () => {
          try {
            const response = await fetch('/api/link_project', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              body: JSON.stringify({ 'project_id': project_id }),
            });
            console.log(response);
            router.push(nextUri || "/dashboard"); // Use nextUri or fallback to "/dashboard"
          } catch (error) {
            console.error(error);
          }
        };
        // if project_id is not null or empty, fetch project
        if (project_id){
          fetchProject();
        }
      }
    }, [accessToken, nextUri, router]);


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
