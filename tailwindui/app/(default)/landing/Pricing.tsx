'use client';

import SubscriptionModal from '@/app/(account)/SubscriptionModal';
import MultiwayToggle from '@/components/button/MultiwayToggle';
import { Explanation } from '@/components/ui/Text';
import useHydrated from '@/hooks/use-hydrated';
import { useUser } from '@/hooks/use-user';
import UserService from '@/services/UserService';
import { isChatslide } from '@/utils/getHost';
import { userInEU } from '@/utils/userLocation';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '@/public/css/pricing.css';
import checkIcon from '@/public/images/check-icon-white-brix-templates.svg';
import darkCheckIcon from '@/public/images/check-icon-brix-templates.svg';

type Tier = 'FREE' | 'PLUS' | 'PRO' | 'ULTIMATE';
type Interval = 'onetime' | 'monthly' | 'yearly' | 'lifetime';

const PricingComparison: React.FC<{
	extraPadding?: boolean;
	small?: boolean;
	showFreeTier?: boolean;
	trigger: string;
}> = ({ extraPadding, small = false, showFreeTier = true, trigger }) => {
	const { token, email, tier: userTier, user } = useUser();
	const [currency, setCurrency] = useState<string>('$');
	const router = useRouter();
	const [interval, setInterval] = useState<Interval>(
		isChatslide() ? 'yearly' : 'lifetime',
		// 'lifetime',
	);
	const smallSuffix = small ? '-small' : '';
	const [showManageSubscription, setShowManageSubscription] = useState(false);
	// console.log('smallSuffix', smallSuffix);

	const getCta = (tier: Tier): string => {
		if (!token) {
			return 'Sign up to Start';
		}
		if (userTier.includes('CANCELLED') || userTier === 'FREE') {
			if (tier === 'FREE') return '✅ Current Plan';
			else return '🌟 Claim Offer';
		}
		if (userTier.includes('PLUS')) {
			if (tier === 'FREE') {
				return '✅ Included';
			} else if (tier === 'PLUS') {
				return '✅ Current Plan';
			} else {
				return '🌟 Claim Offer';
			}
		}
		if (userTier.includes('PRO')) {
			if (tier === 'FREE' || tier === 'PLUS') {
				return '✅ Included';
			} else if (tier === 'PRO') {
				return '✅ Current Plan';
			} else {
				return '🌟 Claim Offer';
			}
		}
		if (userTier.includes('ULTIMATE')) {
			if (tier === 'FREE' || tier === 'PLUS' || tier === 'PRO') {
				return '✅ Included';
			} else {
				return '✅ Current Plan';
			}
		}
		return '';
	};

	const CtaButton: FC<{ tier: Tier }> = ({ tier }) => {
		const cta = getCta(tier);
		const bgColor = cta.includes('✅') || cta.includes('⏹️') ? 'white' : '';
		const textColor = cta.includes('✅') || cta.includes('⏹️') ? 'black' : '';
		const btnTier = tier === 'PRO' ? 'primary' : 'secondary';

		return (
			<button
				onClick={() => handleClick(tier)}
				className={`brix---btn-${btnTier}-small-full-width w-button whitespace-nowrap flex flex-col`}
				style={{
					backgroundColor: bgColor,
					color: textColor,
				}}
			>
				<span>{getCta(tier)}</span>
				{/* {interval === 'lifetime' && (<span className='text-xs'>14 day money back</span>)} */}
			</button>
		);
	};

	const getOriginalPrice = (tier: Tier): number => {
		switch (tier) {
			case 'FREE':
				return 0;
			case 'PLUS':
				if (isChatslide()) return 8.5;
				else return 9.9;
			case 'PRO':
				return 14.9;
			case 'ULTIMATE':
				if (isChatslide()) return 59.9;
				else return 69.9;
		}
	};

	const getPrice = (
		tier: Tier,
		firstTime: boolean = false,
	): string | JSX.Element => {
		let amount = getOriginalPrice(tier);

		// apply discounts
		switch (interval) {
			case 'onetime':
				amount = amount;
				break;
			case 'monthly':
				amount = amount * (firstTime ? 0.7 : 1); // 30% off first time
				break;
			case 'yearly':
				amount = amount * 0.6; // 40% off forever
				break;
			case 'lifetime':
				switch (tier) {
					case 'PLUS':
						amount = 119;
						break;
					case 'PRO':
						amount = 208.6;
						break;
					case 'ULTIMATE':
						amount = 479.2;
						break;
				}
				break;
		}

		let discountLabel = '';

		// special discount label for lifetime ultimate
		if (interval === 'lifetime') {
			discountLabel = ' -80%';
		} else if (interval === 'yearly' || interval === 'monthly') {
			discountLabel = ' -40%';
		}

		return (
			<span className={interval === 'lifetime' ? 'text-green-600' : ''}>
				{currency + amount.toFixed(2)}
				{discountLabel && <span className='text-xs'>{discountLabel}</span>}
			</span>
		);
	};

	const getFirstLine = (tier: Tier): string => {
		switch (interval) {
			case 'onetime':
				return 'one time';
			case 'monthly':
				return '1st month';
			case 'yearly':
				return 'per month';
			case 'lifetime':
				return 'one time';
		}
	};

	const getSecondLine = (tier: Tier): string | JSX.Element => {
		switch (interval) {
			case 'onetime':
				return '15 day access';
			case 'monthly':
				return 'then ' + currency +  getOriginalPrice(tier);
			case 'yearly':
				// strike through the original price
				return (
					<span className='text-gray-600'>
						<s>{currency + getOriginalPrice(tier).toFixed(2)}</s>
					</span>
				);
			case 'lifetime':
				return (
					<span className='text-gray-600'>
						<s>{currency + (getOriginalPrice(tier) * 40).toFixed(2)}</s>
					</span>
				);
		}
	};

	// useEffect(() => {
	// 	userInEU().then((res) => {
	// 		setCurrency(res ? '€' : '$');
	// 	});
	// }, []);

	const handleClick = async (tier: Tier) => {
		if (!token) {
			router.push('/signup');
		}
		if (tier === 'FREE') {
			if (userTier === 'FREE') {
				toast.success('You are already on the free plan');
				return;
			}
			toast.success('Your plan already includes this feature');
		} else if (userTier.includes('CANCELLED') || userTier === 'FREE') {
			return handleSubscription(tier, token);
		} else if (interval === 'onetime') {
			// top-up
			return handleSubscription(tier, token);
		} else if (userTier.includes('PLUS')) {
			if (tier === 'PLUS') {
				return handleManageSubscription(token);
			} else {
				// PRO or ULTIMATE
				return handleSubscription(tier, token);
			}
		} else if (userTier.includes('PRO')) {
			if (tier === 'PLUS') {
				toast.success('Your plan already includes this feature');
			} else if (tier === 'PRO') {
				return handleManageSubscription(token);
			} else {
				// ULTIMATE
				return handleSubscription(tier, token);
			}
		} else if (userTier.includes('ULTIMATE')) {
			// cannot manage subscription
			toast.success('Your plan already includes this feature');
		}
	};

	const handleManageSubscription = async (token: string) => {
		setShowManageSubscription(true);
	};

	const handleSubscription = async (tier: Tier, token: string) => {
		const suffix = '_' + interval.toUpperCase();
		const plan = tier + suffix;

		try {
			const url = await UserService.checkout(
				plan,
				email,
				currency,
				token,
				trigger,
			);

			// Redirect to the checkout page
			window.open(url, '_blank');
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	const options = isChatslide()
		? [
				{
					key: 'onetime',
					element: <span className='whitespace-nowrap'>15-Day</span>,
				},
				{
					key: 'monthly',
					element: (
						<span className='whitespace-nowrap'>
							Monthly <span className='text-xs whitespace-nowrap'>-30%</span>
						</span>
					),
				},
				{
					key: 'yearly',
					element: (
						<span className='whitespace-nowrap'>
							Yearly <span className='text-xs whitespace-nowrap'>-40%</span>
						</span>
					),
				},
				{
					key: 'lifetime',
					element: (
						<span className='text-green-600 whitespace-nowrap'>
							Lifetime <span className='text-xs whitespace-nowrap'>-80%</span>
						</span>
					),
				},
			]
		: [
				{
					key: 'onetime',
					element: <span className='whitespace-nowrap'>15-Day</span>,
				},
				{
					key: 'lifetime',
					element: (
						<span className='text-green-600 whitespace-nowrap'>
							Lifetime <span className='text-xs whitespace-nowrap'>-60%</span>
						</span>
					),
				},
			];

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-col items-center overflow-y-auto overflow-x-auto notranslate gap-y-2'>
			<MultiwayToggle
				options={options}
				selectedKey={interval}
				setSelectedKey={setInterval as (key: string) => void}
			/>

			<Explanation>
				{interval === 'onetime' &&
					'You can also use this as a top-up for your other plans'}
				{interval === 'monthly' && 'Cancel anytime'}
				{interval === 'lifetime' && '14 day money back guarantee'}
				{interval === 'yearly' && '3 day money back guarantee'}
			</Explanation>

			{showManageSubscription && (
				<SubscriptionModal
					showManageSubscription={showManageSubscription}
					setShowManageSubscription={setShowManageSubscription}
				/>
			)}

			<link href='css/pricing.css' rel='stylesheet' type='text/css' />
			<div
				data-w-id='a8590735-7e8f-bd41-a09e-37f58b801ed3'
				className={`w-layout-grid ${showFreeTier ? 'brix---grid-4-columns-pricing-tablet' : 'brix---grid-3-columns'}`}
			>
				<div className='brix---pricing-column-first'>
					<div className='brix---pricing-table-top-first'>
						<div className='brix---color-neutral-800'>
							<div className='brix---text-400-bold'>Features</div>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>⭐️ Credits</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>🚀 GPT</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>📚 Upload documents</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>📑 Generate slides</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>⬇️ Export slides</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>🏷️ Customized branding</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>
							🔈 Generate slide scripts
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>📱 Generate video</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>🦹‍♂️ Attach avatar</div>
					</div>
					{!small && (
						<div
							className={`brix---pricing-content-wrapper-left${smallSuffix}`}
						>
							<div className='brix---text-300-medium'>🎙️ Cloned Voiceover</div>
						</div>
					)}
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>🪑 Free Team Seats</div>
					</div>
					{!small && (
						<div
							className={`brix---pricing-content-wrapper-left${smallSuffix}`}
						>
							<div className='brix---text-300-medium'>
								🦹🏽‍♂️ Avatar cloning (coming)
							</div>
						</div>
					)}
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>📈 Smart chart</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>
							☎️ Direct customer support
						</div>
					</div>
				</div>
				<div className='brix---pricing-column-last'>
					<div className='brix---pricing-table-top'>
						<div className='brix---mg-bottom-8px'>
							<div className='brix---color-neutral-600'>
								<div className='brix---text-200'>PLUS</div>
							</div>
						</div>
						<div className='brix---mg-bottom-16px'>
							<div className='brix---color-neutral-800 flex flex-col items-center'>
								<div className='brix---text-400-bold'>
									{getPrice('PLUS', true)}
								</div>
								<div className='brix---text-300-medium'>
									{getFirstLine('PLUS')}
								</div>
								<div className='brix---text-300-medium'>
									{getSecondLine('PLUS')}
								</div>
							</div>
						</div>
						<CtaButton tier={'PLUS'} />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⭐️ Credits</div>
						</div>
						<div className='brix---text-300-medium'>
							1000 / month{userTier.includes('PLUS') && ' *'}
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🌟 GPT</div>
						</div>
						<div className='brix---text-300-medium'>
							3.5, 4, and <b>4o</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📚 Upload documents</div>
						</div>
						<div className='brix---text-300-medium'>
							Up to <b>5</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📑 Generate slides</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⬇️ Export slides</div>
						</div>
						<div className='brix---text-300-medium'>PDF, PPTX, Key</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🏷️ Customized branding
							</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🔈 Generate slide scripts
							</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📱 Generate video</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🦹‍♂️ Attach avatar</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div
						className={`brix---pricing-content-wrapper-empty${smallSuffix}`}
					/>
					<div
						className={`brix---pricing-content-wrapper-empty${smallSuffix}`}
					/>
					<div
						className={`brix---pricing-content-wrapper-empty${smallSuffix}`}
					/>
					{!small && (
						<div
							className={`brix---pricing-content-wrapper-empty${smallSuffix}`}
						/>
					)}
					{!small && (
						<div
							className={`brix---pricing-content-wrapper-empty${smallSuffix}`}
						/>
					)}
				</div>

				{/* PRO */}
				<div className='brix---pricing-column-featured'>
					<div className='brix---pricing-table-top-featured'>
						<div className='brix---mg-bottom-8px'>
							<div className='brix---color-neutral-600'>
								<div className='brix---text-200'>PRO</div>
							</div>
						</div>
						<div className='brix---mg-bottom-16px'>
							<div className='brix---color-neutral-800 flex flex-col items-center'>
								<div className='brix---text-400-bold'>
									{getPrice('PRO', true)}
								</div>
								<div className='brix---text-300-medium'>
									{getFirstLine('PRO')}
								</div>
								<div className='brix---text-300-medium'>
									{getSecondLine('PRO')}
								</div>
							</div>
						</div>
						<CtaButton tier={'PRO'} />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⭐️ Credits</div>
						</div>
						<div className='brix---text-300-medium'>
							<b>2500</b> / month{userTier.includes('PRO') && ' *'}
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🌟 GPT</div>
						</div>
						<div className='brix---text-300-medium'>
							3.5, 4, and <b>4o</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📚 Upload documents</div>
						</div>
						<div className='brix---text-300-medium'>
							Up to <b>10</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📑 Generate slides</div>
						</div>
						<img src={darkCheckIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⬇️ Export slides</div>
						</div>
						<div className='brix---text-300-medium'>PDF, PPTX, Key</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🏷️ Customized branding
							</div>
						</div>
						<img src={darkCheckIcon.src} alt='Check' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🔈 Generate slide scripts
							</div>
						</div>
						<img src={darkCheckIcon.src} alt='Check' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📱 Generate video</div>
						</div>
						<img src={darkCheckIcon.src} alt='Check' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🦹‍♂️ Attach avatar</div>
						</div>
						<img src={darkCheckIcon.src} alt='Check' />
					</div>
					{!small && (
						<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
							<div className='brix---pricing-v8-title-table'>
								<div className='brix---text-300-medium'>
									🎙️ Cloned Voiceover
								</div>
							</div>
							<div className='brix---text-300-medium'>1 Voice</div>
						</div>
					)}
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🪑 Free Team Seats</div>
						</div>
						<div className='brix---text-300-medium'>1 Seat</div>
					</div>
					{!small && (
						<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
							<div className='brix---pricing-v8-title-table'>
								<div className='brix---text-300-medium'>
									🦹🏽‍♂️ Avatar cloning (coming)
								</div>
							</div>
							<div className='brix---text-300-medium'>1 Avatar</div>
						</div>
					)}
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📈 Smart chart</div>
						</div>
						<img src={darkCheckIcon.src} alt='Check' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								☎️ Direct customer support
							</div>
						</div>
						<img src={darkCheckIcon.src} alt='Check' />
					</div>
				</div>

				{/* ULTIMATE */}
				<div className='brix---pricing-column'>
					<div className='brix---pricing-table-top'>
						<div className='brix---mg-bottom-8px'>
							<div className='brix---color-neutral-600'>
								<div className='brix---text-200'>ULTIMATE</div>
							</div>
						</div>
						<div className='brix---mg-bottom-16px'>
							<div className='brix---color-neutral-800 flex flex-col items-center'>
								<div className='brix---text-400-bold'>
									{getPrice('ULTIMATE', true)}
								</div>
								<div className='brix---text-300-medium'>
									{getFirstLine('ULTIMATE')}
								</div>
								<div className='brix---text-300-medium'>
									{getSecondLine('ULTIMATE')}
								</div>
							</div>
						</div>
						<CtaButton tier={'ULTIMATE'} />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⭐️ Credits</div>
						</div>
						<div className='brix---text-300-medium'>
							<b>Unlimited</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🌟 GPT</div>
						</div>
						<div className='brix---text-300-medium'>
							3.5, 4, and <b>4o</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📚 Upload documents</div>
						</div>
						<div className='brix---text-300-medium'>
							<b>Unlimited</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📑 Generate slides</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⬇️ Export slides</div>
						</div>
						<div className='brix---text-300-medium'>PDF, PPTX, Key</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🏷️ Customized branding
							</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🔈 Generate slide scripts
							</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📱 Generate video</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🦹‍♂️ Attach avatar</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					{!small && (
						<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
							<div className='brix---pricing-v8-title-table'>
								<div className='brix---text-300-medium'>
									🎙️ Cloned Voiceover (new)
								</div>
							</div>
							<div className='brix---text-300-medium'>
								<b>Unlimited</b>
							</div>
						</div>
					)}
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🪑 Free Team Seats</div>
						</div>
						<div className='brix---text-300-medium'>5 Seats</div>
					</div>
					{!small && (
						<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
							<div className='brix---pricing-v8-title-table'>
								<div className='brix---text-300-medium'>
									🦹🏽‍♂️ Avatar cloning (coming)
								</div>
							</div>
							<div className='brix---text-300-medium'>10 Avatars</div>
						</div>
					)}
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📈 Smart chart</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								☎️ Direct customer support
							</div>
						</div>
						<img src={checkIcon.src} alt='' />
					</div>
				</div>
			</div>

			{/* {userTier.includes('PRO') && (
				<div className='text-gray-600 md:whitespace-nowrap mt-4'>
					* Early users who purchased PRO plan before still have Unlimited
					credits under our <a href='terms'>fair usage</a> policy.
				</div>
			)} */}
			{userTier.includes('PLUS') && (
				<div className='text-gray-600 md:whitespace-nowrap mt-4'>
					* If you purchased a lifetime deal, the monthly credits may be
					different from this retail plan.
				</div>
			)}
		</div>
	);
};

export function Pricing() {
	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='brix---section'>
			<div className='brix---container-default w-container'>
				<div className='brix---mg-bottom-48px'>
					<div
						data-w-id='a8590735-7e8f-bd41-a09e-37f58b801ec9'
						className='brix---inner-container-700px-center'
					>
						<div className='brix---text-center'>
							<div className='brix---color-neutral-800'>
								<h1 id='pricing' className='brix---heading-h1-size'>
									Affordable pricing plans
								</h1>
							</div>
						</div>
					</div>
				</div>
				<PricingComparison extraPadding={true} trigger='pricing' />
			</div>
		</div>
	);
}

export { PricingComparison };
