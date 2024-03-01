import LoginForm from '@/components/forms/login-form';
import Link from 'next/link';
import React from 'react';
import GoogleSignIn from '@/components/button/GoogleSignIn';
import CustomerServiceInfo from '@/components/customerService';
import { generateMetadata } from '@/app/layout';

const title = 'Sign In | DrLambda';
const description =
	'DrLambda is your AI assistant to create professional slides and posts. Join us to experience the power of AI in creating professional slides and posts.';
export const metadata = generateMetadata({ title, description });

export default function SignIn() {
	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
						<h1 className='h1'>💙 Welcome back!</h1>
					</div>

					{/* Form */}
					<div className='max-w-sm mx-auto'>
						<GoogleSignIn />
						<div className='flex items-center my-6'>
							<div
								className='border-t border-gray-300 grow mr-3'
								aria-hidden='true'
							></div>
							<div className='text-gray-600 italic'>Or</div>
							<div
								className='border-t border-gray-300 grow ml-3'
								aria-hidden='true'
							></div>
						</div>

						<LoginForm />

						<div className='text-gray-600 text-center mt-6'>
							Do not have an account?{' '}
							<Link
								href={'/signup'}
								className='text-blue-600 hover:underline transition duration-150 ease-in-out'
							>
								Sign up
							</Link>
						</div>
						<div className='text-gray-600 text-center mt-6'>
							<CustomerServiceInfo />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
