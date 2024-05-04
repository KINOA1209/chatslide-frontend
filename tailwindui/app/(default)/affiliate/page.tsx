import DrlambdaButton, {
	DrlambdaLink,
} from '@/components/button/DrlambdaButton';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { getBrand } from '@/utils/getHost';
import { MouseEventHandler } from 'react';

export const metadata = {
	title: `Affiliate Program | ${getBrand()}`,
	description: 'Join the revolution of knowledge transformation.',
};

export default function Affiliate() {
	return (
		<section className='bg-gradient-to-b from-gray-100 to-white'>
			<Header loginRequired={false} isLanding={false} />
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<div className='pt-32 pb-12 md:pt-40 md:pb-20'>
					{/* Page header */}
					<div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
						<h1 className='h1'>Earn 30% Referral Commission 💸</h1>
					</div>
					<div className='max-w-3xl mx-auto pb-4'>
						{/* Program Details */}
						<div className='pb-8'>
							<h2 className='h3 text-xl'>🌟 Why Partner With {getBrand()}?</h2>
							<ul className='text-base text-gray-600 list-disc list-inside mt-4'>
								<li>
									<strong>Innovative Technology:</strong> Be part of a
									revolutionary approach in transforming documents into engaging
									slides.
								</li>
								<li>
									<strong>Transparency:</strong> See your rewards with
									transparency. Track the visitors, leads, and conversions in
									real time.{' '}
									<a
										href='https://help.rewardful.com/en/articles/4202371-visitors-leads-conversions'
										target='_blank'
										rel='noreferrer'
										className='text-blue-600'
									>
										Learn more.
									</a>
									.
								</li>
								<li>
									<strong>Support & Resources:</strong> Get access to
									promotional materials, tracking tools, and dedicated support.
								</li>
							</ul>
						</div>

						{/* Benefits */}
						<div className='flex flex-col md:flex-row items-center pb-8'>
							<div>
								<h3 className='h3 text-xl mb-2'>🤩 Affiliate Benefits</h3>
								<ul className='text-base text-gray-600 list-disc list-inside mt-4'>
									<li>
										<strong>High Conversion Rate:</strong> Get noticed instantly
										when your referral converts.
									</li>
									<li>
										<strong>Monthly Payouts:</strong> Easily calculate how much
										money you are gaining.
									</li>
									<li>
										<strong>Easy to Onboard:</strong> Get started by signing up,
										sharing your link, and see the money roll in.
									</li>
									<li>
										<strong>Share your deal:</strong> Your friend also gets{' '}
										<strong>60%</strong> off on their first purchase.
									</li>
								</ul>
							</div>
						</div>

						{/* CTA */}
						<div className='text-center'>
							<h2 className='h3 text-xl'>Ready to Earn? 💰</h2>
							<p className='text-base text-gray-600 mt-4'>
								Join the affiliate program at Rewardful and start earning today!
							</p>
							<div className='w-full flex flex-col items-center my-4'>
								<DrlambdaLink
									link='https://chatslide.getrewardful.com/signup'
									text='Start Earning Now'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</section>
	);
}
