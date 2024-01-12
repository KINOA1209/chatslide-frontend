'use client';

import Link from 'next/link';
import GoogleSignIn from '@/components/button/GoogleSignIn';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Promo from '@/components/signup/Promo';

export default function SignUp() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [href, setHref] = useState('/signup-with-email');
	const [showPromo, setShowPromo] = useState(false);

	const [referralValue, setReferralValue] = useState('');

	useEffect(() => {
		const handlePromoChange = (promo: string) => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('promo', promo);
			}
		};

		const promo = searchParams?.get('referral');
		if (promo) {
			handlePromoChange(promo);
			setReferralValue(promo);
			setShowPromo(true);
      setHref(`/signup-with-email?referral=${promo}`);
      console.log('href', href);
		}
    
    const appSumoRedepmtionCode = searchParams?.get('code');
    if (appSumoRedepmtionCode) {
      handlePromoChange(appSumoRedepmtionCode);
      setReferralValue(appSumoRedepmtionCode);
      setShowPromo(true);
      setHref(`/signup-with-email?code=${appSumoRedepmtionCode}`);
    }

	}, []);

	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
						<h2 className='h2'>💙 Welcome, Sumolings!</h2>
					</div>

					{/* Form */}
					<div className='max-w-sm mx-auto'>
						<Promo
							showPromo={showPromo}
							setShowPromo={setShowPromo}
							referralValue={referralValue}
							setReferralValue={setReferralValue}
              text='Enter your AppSumo redemption code here'
						/>

						<div className='flex items-center my-6'>
							<div
								className='border-t border-gray-300 grow mr-3'
								aria-hidden='true'
							></div>
							<div className='text-gray-600 italic'>Quick Sign Up</div>
							<div
								className='border-t border-gray-300 grow ml-3'
								aria-hidden='true'
							></div>
						</div>

						<GoogleSignIn promo={referralValue} />

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

						<div className='flex flex-wrap -mx-3 mt-6'>
							<div className='w-full px-3'>
								<a
									href={href}
									className='btn text-white font-bold bg-Blue w-full'
								>
									Sign up with email
								</a>
								{/* <ToastContainer /> */}
							</div>
						</div>

						<div className='text-sm text-gray-500 text-center mt-3'>
							<input type='checkbox' id='agree' name='agree' checked /> By
							creating an account, you agree to the{' '}
							<a className='underline' href='/terms'>
								terms & conditions
							</a>
							, and our{' '}
							<a className='underline' href='/privacy'>
								privacy policy
							</a>
							.
						</div>
						<div className='text-gray-600 text-center mt-6'>
							Already have an account?{' '}
							<Link
								href='/signin'
								className='text-blue-600 hover:underline transition duration-150 ease-in-out'
							>
								Sign in
							</Link>
						</div>
						{/* <div className="text-gray-600 text-center mt-6">
                            <CustomerServiceInfo />
                        </div> */}
					</div>
				</div>
			</div>
		</section>
	);
}
