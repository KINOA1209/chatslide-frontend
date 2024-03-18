'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import AuthService from '../../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import CustomerServiceInfo from '@/components/signup/customerService';

export default function ResetPassword(): JSX.Element {
	const [email, setEmail] = useState<string>('');
	const [confirmationCode, setConfirmationCode] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [emailSent, setEmailSent] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const router = useRouter();

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};

	const handleCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setConfirmationCode(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setNewPassword(e.target.value);
	};

	const handleSendResetLink = async (
		e: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();

		try {
			const resp = await AuthService.forgotPassword(email);
			console.log(resp);
			// Show the success message and confirmation code field
			setEmailSent(true);
			setErrorMessage('');
		} catch (error) {
			console.error('Error sending code: ', error);
			if (typeof error === 'string') {
				setErrorMessage(error);
			} else if (error instanceof Error && error.message) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(
					'An error occurred while sending the code. Please try again.',
				);
			}
		}
	};

	const handleResetPassword = async (
		e: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		try {
			await AuthService.forgotPasswordSubmit(
				email,
				confirmationCode,
				newPassword,
			);
			// Reset password successful
			console.log('Password reset successful');

			toast.success(
				'reset password successfully, redirecting to sign in page',
				{
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				},
			);

			setTimeout(() => {
				router.push('/signin');
			}, 2000);
		} catch (error: any) {
			console.error('Error resetting password: ', error);
			setErrorMessage(
				'An error occurred while resetting the password. Please try again.',
			);
			toast.error(error.message, {
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
	};

	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<ToastContainer />
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
						<h1 className='h1 mb-4'>Reset password</h1>
						<p className='text-xl text-gray-600'>
							Enter the email address you used when you signed up for your account.
						</p>
						<p className='text-xl text-gray-600'>
							You might need to find your confirmation code in your spam folder.
						</p>
					</div>

					{/* Form */}
					<div className='max-w-sm mx-auto'>
						{!emailSent && (
							<form onSubmit={handleSendResetLink}>
								<div className='flex flex-wrap -mx-3 mb-4'>
									<div className='w-full px-3'>
										<label
											className='block text-gray-800 text-sm font-medium mb-1'
											htmlFor='email'
										>
											Email <span className='text-red-600'>*</span>
										</label>
										<input
											id='email'
											type='email'
											className='form-input w-full text-gray-800'
											placeholder='Enter your email address'
											value={email}
											onChange={handleEmailChange}
											required
										/>
									</div>
								</div>

								{errorMessage && (
									<p className='text-sm text-red-600 mb-4'>{errorMessage}</p>
								)}

								<div className='flex flex-wrap -mx-3 mt-6'>
									<div className='w-full px-3'>
										<button
											type='submit'
											className='btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full'
										>
											Send reset verification code
										</button>
									</div>
								</div>
							</form>
						)}

						{emailSent && (
							<form onSubmit={handleResetPassword}>
								<div className='flex flex-wrap -mx-3 mb-4'>
									<div className='w-full px-3'>
										<label
											className='block text-gray-800 text-sm font-medium mb-1'
											htmlFor='newPassword'
										>
											New Password <span className='text-red-600'>*</span>
										</label>
										<input
											id='newPassword'
											type='password'
											className='form-input w-full text-gray-800'
											placeholder='Enter your new password'
											value={newPassword}
											onChange={handlePasswordChange}
											required
										/>
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-4'>
									<div className='w-full px-3'>
										<label
											className='block text-gray-800 text-sm font-medium mb-1'
											htmlFor='code'
										>
											Confirmation Code <span className='text-red-600'>*</span>
										</label>
										<input
											id='code'
											type='text'
											className='form-input w-full text-gray-800'
											placeholder='Enter the confirmation code'
											value={confirmationCode}
											onChange={handleCodeChange}
											required
										/>
									</div>
								</div>
								{errorMessage && (
									<p className='text-sm text-red-600 mb-4'>{errorMessage}</p>
								)}
								<div className='flex flex-wrap -mx-3 mt-6'>
									<div className='w-full px-3'>
										<button
											type='submit'
											className='btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full'
										>
											Reset Password
										</button>
									</div>
								</div>
							</form>
						)}

						<div className='text-gray-600 text-center mt-6'>
							<CustomerServiceInfo />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
