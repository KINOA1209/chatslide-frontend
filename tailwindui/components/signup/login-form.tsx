'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import AuthService from '../../services/AuthService';

const LoginForm: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const nextUri = searchParams?.get('next');
	const [isSubmitting, setIsSubmitting] = useState(false);

	/* write a function that will take the form data and send it to the backend */
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		const email = (event.target as HTMLFormElement).email.value;
		const password = (event.target as HTMLFormElement).password.value;

		try {
			await AuthService.signIn(email, password);
			router.push('/dashboard');
		} catch (error: any) {
			console.error(error);
			let message = error.message || 'An error occurred';
			console.log('message', message);
			if (message == 'User does not exist.') {
				message += ' Please sign up first.';
			}
			toast.error(message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}

		setIsSubmitting(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full px-3'>
					<label
						className='block text-gray-800 text-sm font-medium mb-1'
						htmlFor='email'
					>
						Email
					</label>
					<input
						id='email'
						type='email'
						className='form-input w-full text-gray-800'
						placeholder='Enter your email address'
						maxLength={32}
						required
					/>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full px-3'>
					<div className='flex justify-between'>
						<label
							className='block text-gray-800 text-sm font-medium mb-1'
							htmlFor='password'
						>
							Password
						</label>
						<Link
							href='/reset-password'
							className='text-sm font-medium text-blue-600 hover:underline'
						>
							Having trouble signing in?
						</Link>
					</div>
					<input
						id='password'
						type='password'
						className='form-input w-full text-gray-800'
						placeholder='Enter your password'
						minLength={8}
						maxLength={16}
						required
					/>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mt-6'>
				<div className='w-full px-3'>
					<button className='btn text-white font-bold bg-Blue w-full'>
						{ isSubmitting ? 'Signing in...' : 'Sign in' }
					</button>
					<ToastContainer />
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
