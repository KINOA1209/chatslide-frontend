'use client';

import { Blank } from '@/components/ui/Loading';
import SessionStorage from '@/components/utils/SessionStorage';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function SSORedirect() {
	const router = useRouter();

	useEffect(() => {
		const initUser = async () => {
			const maxRetries = 5; // Maximum number of retries
			let retries = 0;
			let idToken = null;

			while (retries < maxRetries && !idToken) {
				try {
					const result = await AuthService.getCurrentUserTokenAndId();
					idToken = result.idToken;
				} catch (error) {
					console.error('Error fetching token, retrying...', error);
					retries++;
					await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
				}
			}

			if (idToken) {
				await UserService.initializeUser(idToken);
				const promo = SessionStorage.getItem('promo');
				if (promo) {
					const { status, message } = await UserService.applyPromoCode(
						promo,
						idToken,
					);
					console.log(status, message);
					if (status == 200) {
						toast.success(message, {
							position: 'top-center',
							autoClose: 2000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'light',
						});
						SessionStorage.removeItem('promo');
					}
				}

				router.push('/dashboard');
			} else {
				console.error('Error fetching token, need to sign up again.');
				router.push('/signup');
			}
		};

		initUser();
	}, []);

	const [showLink, setShowLink] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLink(true);
		}, 2000);

		// Clean up the timer if the component is unmounted
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<ToastContainer />
			<Blank>
				<div>You should be redirected soon. </div>
				{showLink && (
					<a href='/dashboard' className='text-blue-600'>
						If not, click here.
					</a>
				)}
			</Blank>
		</div>
	);
}
