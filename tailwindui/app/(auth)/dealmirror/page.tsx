import Link from 'next/link';
import GoogleSignIn from '@/components/button/GoogleSignIn';
import Promo from '@/components/signup/Promo';
import { BsFillChatTextFill } from 'react-icons/bs';
import { BigTitle } from '@/components/ui/Text';
import { BigBlueButton } from '@/components/button/DrlambdaButton';
import useHydrated from '@/hooks/use-hydrated';

export default function SignUp() {
	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
						<BigTitle center>💙 Welcome, DealMirror Users!</BigTitle>
					</div>

					{/* Form */}
					<div className='max-w-sm mx-auto'>
						<Promo
							text='Enter your DealMirror redemption code here'
							initShowPromo
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

						<GoogleSignIn signup={true} />

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
								<a href={'signup-with-email'}>
									<BigBlueButton width='384px'>
										Sign up with email
									</BigBlueButton>
								</a>
								{/* <ToastContainer /> */}
							</div>
						</div>

						<div className='text-sm text-gray-500 text-center mt-3'>
							<input type='checkbox' id='agree' name='agree' checked readOnly />{' '}
							By creating an account, you agree to the{' '}
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
