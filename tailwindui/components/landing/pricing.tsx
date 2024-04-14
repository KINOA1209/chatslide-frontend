'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Toggle from '../button/Toggle';
import { GrayLabel } from '../ui/GrayLabel';
import DrlambdaButton from '../button/DrlambdaButton';
import { useUser } from '@/hooks/use-user';
import { userInEU } from '@/utils/userLocation';
import UserService from '@/services/UserService';


interface PricingProps {
	fewerCards?: boolean;
}

export default function Pricing({ fewerCards = false }: PricingProps) {
	const [isMonthly, setIsMonthly] = useState(true);
	const buttonRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const [showFree, setShowFree] = useState(false);
	const [showPlus, setShowPlus] = useState(true);
	const [showPro, setShowPro] = useState(false);
	const [showEnt, setShowEnt] = useState(false);
	const [clickedSubscribe, setClickedSubscribe] = useState(false);
	const [currency, setCurrency] = useState('$');

	const pathname = usePathname();

	const { token, tier, expirationDate, email } = useUser();

	const showPricingPanel = (index: number) => {
		setShowFree(false);
		setShowPlus(false);
		setShowPro(false);
		setShowEnt(false);

		if (index === 1) {
			setShowFree(true);
		} else if (index === 2) {
			setShowPlus(true);
		} else if (index === 3) {
			setShowPro(true);
		} else if (index === 4) {
			setShowEnt(true);
		}
	};

	const getCta = (): string => {
		if (!token) {
			return 'Sign up to Start';
		}
		return 'Claim Offer ✅';
	};

	useEffect(() => {
		const animationProp = [
			{ backgroundPosition: '0% 50%' },
			{ backgroundPosition: '100% 50%' },
			{ backgroundPosition: '0% 50%' },
		];

		const animationTiming = {
			duration: 10000,
			iterations: Infinity,
		};

		if (window && window.innerWidth > 640 && buttonRef.current) {
			buttonRef.current.animate(animationProp, animationTiming);
		} else if (buttonRef.current) {
			buttonRef.current.style.backgroundPosition = '35% 50%';
		}

		userInEU().then((res) => {
			setCurrency(
				res ? '€' : '$'
			);
		});
	}, []);

	const handleSubscription = async (
		tier: 'PLUS' | 'PRO',
		token: string,
	) => {
		const plan = tier + "_MONTHLY";

		try {
			const url = await UserService.checkout(
				plan,
				email,
				currency,
				token,
				pathname.includes('chatslide')
			)

			// Redirect to the checkout page
			window.open(url, '_blank');
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	const handleClick = async (tier: string) => {
		if (!token) {
			router.push('/signup');
			return;
		}

		if (tier == 'pro') {
			handleSubscription('PRO', token);
		} else if (tier == 'plus') {
			handleSubscription('PLUS', token);
		} else if (tier == 'free') {
			router.push('/signup');
		}

		setClickedSubscribe(true);
	};

	return (
		<div
			className='w-full  px-4 sm:px-6 mb-2'
			style={{ fontFamily: 'Lexend, sans-serif' }}
		>
			<div className='w-full flex flex-col items-center' data-aos='fade-right'>
				<Toggle
					isLeft={isMonthly}
					setIsLeft={setIsMonthly}
					leftText='Monthly'
					rightText='Yearly (17% off)'
				/>
				<div className='changeCard items-center flex md:hidden'>
					<div className='transition ease-in-out delay-150 flex items-center pb-8'>
						{!fewerCards && (
							<button
								type='button'
								onClick={() => showPricingPanel(1)}
								className={`py-2 px-4 rounded-l-full border-r border-gray-300 ${showFree ? 'bg-teal-400 text-white' : 'bg-gray-200'
									}`}
							>
								Free
							</button>
						)}
						<button
							type='button'
							onClick={() => showPricingPanel(2)}
							className={`py-2 px-4 ${fewerCards ? 'rounded-l-full' : ''
								} border-r border-gray-300 ${showPlus ? 'bg-teal-400 text-white' : 'bg-gray-200'
								}`}
						>
							Plus
						</button>
						<button
							type='button'
							onClick={() => showPricingPanel(3)}
							className={`py-2 px-4 ${fewerCards ? 'rounded-r-full' : ''
								} border-r border-gray-300 ${showPro ? 'bg-teal-400 text-white' : 'bg-gray-200'
								}`}
						>
							Pro
						</button>
						{!fewerCards && (
							<button
								type='button'
								onClick={() => showPricingPanel(4)}
								className={`py-2 px-4 rounded-r-full ${showEnt ? 'bg-teal-400 text-white' : 'bg-gray-200'
									}`}
							>
								Enterprise
							</button>
						)}
					</div>
				</div>
				<div className='w-full flex flex-row justify-center'>
					<div className='w-full flex flex-row overflow-x-auto pt-2'>
						<div className='w-fit flex flex-row mx-auto'>
							{!fewerCards && (
								<div
									className={`transition ease-in-out delay-150 hover:-translate-y-2 mx-2 grow basis-0 min-w-[260px] max-w-sm ${showFree ? 'block' : 'hidden'
										} md:block`}
								>
									<div className='flex flex-col w-full drop-shadow-lg rounded-xl overflow-hidden h-full bg-gray-400'>
										<div className='px-8 py-2'>
											<div className='text-2xl text-white'>Free</div>
										</div>

										<div className='p-2 bg-white/90 mx-2 mb-2 rounded-lg h-full flex flex-col'>
											<div className='w-full text-center text-md'>
												<br />
												<br />
												Join us for free!
											</div>
											<div className='w-full text-center text-3xl md:text-4xl'>
												{currency}0
											</div>

											<div className='text-xl mt-4'>Include</div>
											<ul
												className='list-disc list-inside space-y-2 text-sm'
												style={{ fontFamily: 'sans-serif' }}
											>
												<li>100 free ⭐️credits</li>
												<li>Usage of GPT-3.5</li>
												<li>Up to 1 file upload for each project</li>
											</ul>
											<div className='grow'></div>
											<div className='h-10 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-3'>
												<div>
													{!token && (
														<DrlambdaButton
															onClick={() => handleClick('free')}
															showArrow={false}
															id='free'
														>
															Sign up to Start
														</DrlambdaButton>
													)}

													{token && (tier === 'FREE' || tier === '') && (
														<div className='text-lg text-center'>
															Current Subscription
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
							<div
								className={`transition ease-in-out delay-150 hover:-translate-y-2 mx-2 grow basis-0 min-w-[260px] max-w-sm ${showPlus ? 'block' : 'hidden'
									} md:block`}
							>
								<div className='flex flex-col w-full drop-shadow-md rounded-xl overflow-hidden h-full bg-blue-400'>
									{/* ... You can adjust the content for "Plus" pricing here ... */}
									<div className='px-8 py-2 flex flex-row justify-between pr-3'>
										<div className='text-2xl text-white'>Plus</div>
									</div>
									<div className='p-2 bg-white/90 mx-2 mb-2 rounded-lg flex flex-col h-full'>
										{!isMonthly ? (
											<>
												<div className='w-full text-center text-md'>
													{!isMonthly ? 'Billed yearly' : 'Billed monthly'}
												</div>
												<div className='w-full text-center text-md text-red-700'>
													Save 17%
												</div>
											</>
										) : (
											<div className='w-full text-center text-md'>
												<br />
												{!isMonthly ? 'Billed yearly' : 'Billed monthly'}
											</div>
										)}

										<div className='w-full text-center text-3xl md:text-4xl'>
											{!isMonthly ? `${currency}39.6` : `${currency}3.96`}
										</div>
										<div className='w-full text-center text-md text-gray-700'>
											{!isMonthly ? `1st year, then ${currency}99/year` : `1st month, then ${currency}9.9/month`}
										</div>

										<div className='text-xl mt-4'>Include</div>
										<ul
											className='list-disc list-inside space-y-2 text-sm'
											style={{ fontFamily: 'sans-serif' }}
										>
											<li>All features of Free plan</li>
											<li>1,000 ⭐️credits per month</li>
											<li>Usage of GPT-4</li>
											<li>Upload multiple files per project</li>
										</ul>
										<div className='grow'></div>
										<div className='h-10 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-3'>
											<div>
												{(!token || tier === 'FREE' || tier === '') && (
													<DrlambdaButton
														onClick={() => handleClick('plus')}
														showArrow={false}
														id='plus'
													>
														{getCta()}
													</DrlambdaButton>
												)}
												{token &&
													(tier === 'PLUS_MONTHLY' ||
														tier === 'PLUS_YEARLY') && (
														<>
															{/* <div className="w-full text-center">Expiring: {moment.utc(expiration).format('L')}</div> */}
															<div className='text-xl text-center'>
																Current Subscription
															</div>
														</>
													)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								className={`transition ease-in-out delay-150 hover:-translate-y-2 mx-2 grow basis-0 min-w-[260px] max-w-sm ${showPro ? 'block' : 'hidden'
									} md:block`}
							>
								<div className='flex flex-col w-full drop-shadow-md rounded-xl overflow-hidden h-full bg-purple-500'>
									{/* ... You can adjust the content for "Pro" pricing here ... */}
									<div className='px-8 py-2 flex flex-row pr-3 items-center'>
										<div className='text-2xl text-white'>Pro</div>
										<GrayLabel bgColor='bg-gray-200'>Most Popular</GrayLabel>
									</div>
									{/* ... Other content similar to "Free" card ... */}
									<div className='p-2 bg-white/90 mx-2 mb-2 rounded-lg h-full flex flex-col'>
										{!isMonthly ? (
											<>
												<div className='w-full text-center text-md'>
													{!isMonthly ? 'Billed yearly' : 'Billed monthly'}
												</div>
												<div className='w-full text-center text-md text-red-700'>
													Save 17%
												</div>
											</>
										) : (
											<div className='w-full text-center text-md'>
												<br />
												{!isMonthly ? 'Billed yearly' : 'Billed monthly'}
											</div>
										)}
										{/* <div className="w-full text-center text-md text-red-700">7 Day Free Trial</div> */}
										<div className='w-full text-center text-3xl md:text-4xl'>
											{!isMonthly ? `${currency}159.6` : `${currency}15.96`}
										</div>
										<div className='w-full text-center text-md text-gray-700'>
											{!isMonthly ? `1st year, then ${currency}399/year` : `1st month, then ${currency}39.9/month`}
										</div>

										<div className='text-xl mt-4'>Include</div>
										<ul
											className='list-disc list-inside space-y-2 text-sm'
											style={{ fontFamily: 'sans-serif' }}
										>
											<li>All features of Free/Plus plans</li>
											<li>Unlimited ⭐️credits</li>
											<li>24 hour VIP customer support</li>
										</ul>
										<div className='grow'></div>
										<div className='h-10 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-3'>
											<div>
												{(!token || tier === 'FREE' || tier === '') && (
													<DrlambdaButton
														onClick={() => handleClick('pro')}
														showArrow={false}
														id='pro'
													>
														{getCta()}
													</DrlambdaButton>
												)}
												{token &&
													(tier === 'PRO_MONTHLY' || tier === 'PRO_YEARLY') && (
														<>
															{/* <div className="w-full text-center">Expiring: {moment.utc(expiration).format('L')}</div> */}
															<div className='text-xl text-center'>
																Current Subscription
															</div>
														</>
													)}
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* enterprise, disabled */}
							{!fewerCards && false && (
								<div
									className={`transition ease-in-out delay-150 hover:-translate-y-2 mx-2 grow basis-0 min-w-[260px] max-w-sm ${showEnt ? 'block' : 'hidden'
										} md:block`}
								>
									<div className='flex flex-col w-full drop-shadow-md rounded-xl overflow-hidden h-full bg-black'>
										{/* ... You can adjust the content for "Enterprise" pricing here ... */}
										<div className='px-8 py-2'>
											<div className='text-2xl text-white'>Enterprise</div>
										</div>
										{/* ... Other content similar to "Free" card ... */}
										<div className='p-2 bg-[#ECF1FE] mx-2 mb-2 rounded-lg h-full flex flex-col justify-between'>
											<div className='w-full text-center text-4xl md:text-5xl text-[#000230] leading-none mb-4 pt-9'>
												Upon Request
											</div>
											<div className='w-full text-center text-md'>
												Contact us at contact@drlabmda.ai or book a call.
												<br />
												We will give you a quote.
											</div>
											<div className='h-10 max-w-xs mx-auto sm:max-w-none flex-col flex justify-center items-center my-3'>
												<div>
													<DrlambdaButton
														onClick={() =>
														(window.location.href =
															'https://calendly.com/drlambda/30min')
														}
														showArrow={false}
													>
														Book a call
													</DrlambdaButton>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				{expirationDate && (
					<div className='w-full text-center text-red-700 my-2'>
						Your subscription will expire on {expirationDate}.
					</div>
				)}
				{clickedSubscribe && (
					<div className='my-4'>
						<DrlambdaButton
							onClick={() => window.location.reload()}
							showArrow={false}
						>
							Paid? Refresh!
						</DrlambdaButton>
					</div>
				)}
			</div>
		</div>
	);
}
