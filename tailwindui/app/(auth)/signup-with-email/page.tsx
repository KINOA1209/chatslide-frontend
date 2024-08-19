import Link from 'next/link';
import SignupForm from '@/components/signup/signup-form';
import CustomerServiceInfo from '@/components/signup/customerService';
import { generateMetadata } from '@/app/metadata';
import { getBrand } from '@/utils/getHost';
import { BigTitle } from '@/components/ui/Text';

const title = `Sign Up with Email | ${getBrand()}`;
const description = `${getBrand()} is your AI assistant to create professional slides and posts. Join us to experience the power of AI in creating professional slides and posts.`;
export const metadata = generateMetadata({ title, description });

export default function SignUp() {

	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
						<BigTitle center>💙 Hello!</BigTitle>
					</div>

					{/* Form */}
					<div className='max-w-sm mx-auto'>
						<SignupForm />
						<div className='text-gray-600 text-center mt-6'>
							Already have an account?{' '}
							<Link
								href='/signin'
								className='text-blue-600 hover:underline transition duration-150 ease-in-out'
							>
								Sign in
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
