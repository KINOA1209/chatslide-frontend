'use client';

import MultiwayToggle from '@/components/button/MultiwayToggle';
import { Explanation } from '@/components/ui/Text';
import { useUser } from '@/hooks/use-user';
import UserService from '@/services/UserService';
import { userInEU } from '@/utils/userLocation';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Tier = 'FREE' | 'PLUS' | 'PRO' | 'ULTIMATE';
type Interval = 'onetime' | 'monthly' | 'yearly' | 'lifetime';

const PricingComparison: React.FC<{
	extraPadding?: boolean;
	small?: boolean;
	showFreeTier?: boolean;
}> = ({ extraPadding, small = false, showFreeTier = true }) => {
	const { token, email, tier: userTier } = useUser();
	const [currency, setCurrency] = useState<string>('$');
	const router = useRouter();
	const [interval, setInterval] = useState<Interval>('yearly');
	const smallSuffix = small ? '-small' : '';
	// console.log('smallSuffix', smallSuffix);

	const getCta = (tier: Tier): string => {
		if (!token) {
			return 'Sign up to Start';
		}
		if (interval === 'onetime' && tier != 'PLUS') {
			return '⏹️ Unavailable';
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

		return (
			<button
				onClick={() => handleClick(tier)}
				className='brix---btn-primary-small-full-width w-button whitespace-nowrap flex flex-col'
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
				return 9.9;
			case 'PRO':
				return 14.9;
			case 'ULTIMATE':
				return 59.9;
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
				amount = amount * 0.5;
				break;
			case 'monthly':
				amount = amount * (firstTime ? 0.6 : 1);
				break;
			case 'yearly':
				amount = amount * 0.6;
				break;
			case 'lifetime':
				amount = amount * 10;
		}

		// special for lifetime ultimate
		if (interval === 'lifetime') {
			if (tier === 'ULTIMATE') {
				amount = 236;
				return (
					<span className='text-green-600'>
						{currency + amount.toFixed(2)}
						<span className='text-xs'>-80%</span>
					</span>
				);
			} else {
				return (
					<span>
						{currency + amount.toFixed(2)}
						<span className='text-xs'> -50%</span>
					</span>
				);
			}
		}

		return currency + amount.toFixed(2);
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
				return '3 day access';
			case 'monthly':
				return 'then ' + getPrice(tier);
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
						<s>{currency + (getOriginalPrice(tier) * 20).toFixed(2)}</s>
					</span>
				);
		}
	};

	useEffect(() => {
		userInEU().then((res) => {
			setCurrency(res ? '€' : '$');
		});
	}, []);

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
		try {
			const url = await UserService.createStripePortalSession(token);
			router.push(url);
		} catch (error) {
			toast.error(
				'We cannot find your purchase information from Stripe, did you purchase through 3rd party?',
			);
		}
	};

	const handleSubscription = async (tier: Tier, token: string) => {
		const suffix = '_' + interval.toUpperCase();
		const plan = tier + suffix;

		try {
			const url = await UserService.checkout(plan, email, currency, token);

			// Redirect to the checkout page
			window.open(url, '_blank');
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	return (
		<div className='flex flex-col items-center overflow-y-scroll overflow-x-scroll'>
			<MultiwayToggle
				options={[
					{ key: 'onetime', text: '3 Day' },
					{ key: 'monthly', text: 'Monthly' },
					{
						key: 'yearly',
						element: (
							<span>
								Yearly <span className='text-xs'>-40%</span>
							</span>
						),
					},
					{
						key: 'lifetime',
						element: (
							<span className='text-green-600'>
								Lifetime <span className='text-xs'>-80%</span>
							</span>
						),
					},
				]}
				selectedKey={interval}
				setSelectedKey={setInterval as (key: string) => void}
			/>

			<Explanation>
				{interval === 'onetime' &&
					'You can also use this as a top-up for your other plans'}
				{interval === 'lifetime' && '14 day money back guarantee'}
				{interval === 'yearly' && '3 day money back guarantee'}
			</Explanation>

			<div
				data-w-id='a8590735-7e8f-bd41-a09e-37f58b801ed3'
				className={`w-layout-grid ${showFreeTier ? 'brix---grid-4-columns-pricing-tablet' : 'brix---grid-3-columns'}`}
			>
				{/* <link href="css/webflow.css" rel="stylesheet" type="text/css" /> */}
				<link href='css/pricing.webflow.css' rel='stylesheet' type='text/css' />

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
						<div className='brix---text-300-medium'>🦹‍♂️ Attach avatar (new)</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>
							🎙️ Voice cloning (coming)
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>
							🦹🏽‍♂️ Avatar cloning (coming)
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>
							📈 Smart table (coming)
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper-left${smallSuffix}`}>
						<div className='brix---text-300-medium'>
							☎️ Direct customer support
						</div>
					</div>
				</div>
				{/* {showFreeTier &&
          <div className="brix---pricing-column">
            <div className="brix---pricing-table-top">
              <div className="brix---mg-bottom-8px">
                <div className="brix---color-neutral-600">
                  <div className="brix---text-200">FREE</div>
                </div>
              </div>
              <div className="brix---mg-bottom-16px">
                <div className="brix---color-neutral-800 flex flex-col items-center">
                  <div className="brix---text-400-bold">{getPrice('FREE')}</div>
                  <div className="brix---text-300-medium">{'\u00A0'}</div>
                  <div className="brix---text-300-medium">{'\u00A0'}</div>
                </div>
              </div>
              <button
                onClick={() => handleClick('FREE')}
                className="brix---btn-secondary-small-full-width w-button whitespace-nowrap bg-white"
              >
                {getCta('FREE')}
              </button>
            </div>
            <div className={`brix---pricing-content-wrapper${smallSuffix}`}>
              <div className="brix---pricing-v8-title-table">
                <div className="brix---text-300-medium">⭐️ credits</div>
              </div>
              <div className="brix---text-300-medium">20</div>
            </div>
            <div className={`brix---pricing-content-wrapper${smallSuffix}`}>
              <div className="brix---pricing-v8-title-table">
                <div className="brix---text-300-medium">🌟 GPT</div>
              </div>
              <div className="brix---text-300-medium">3.5</div>
            </div>
            <div className={`brix---pricing-content-wrapper${smallSuffix}`}>
              <div className="brix---pricing-v8-title-table">
                <div className="brix---text-300-medium">📚 Upload documents</div>
              </div>
              <div className="brix---text-300-medium">Single</div>
            </div>
            <div className={`brix---pricing-content-wrapper${smallSuffix}`}>
              <div className="brix---pricing-v8-title-table">
                <div className="brix---text-300-medium">📑 Generate slides</div>
              </div>
              <img src="images/check-icon-white-brix-templates.svg" alt="" />
            </div>
            <div className={`brix---pricing-content-wrapper-empty${smallSuffix}`} />
            <div className={`brix---pricing-content-wrapper-empty${smallSuffix}`} />
            <div className={`brix---pricing-content-wrapper-empty${smallSuffix}`} />
            <div className={`brix---pricing-content-wrapper-empty${smallSuffix}`} />
            <div className={`brix---pricing-content-wrapper-empty${smallSuffix}`} />
            <div className={`brix---pricing-content-wrapper-empty${smallSuffix}`} />
            <div className={`brix---pricing-content-wrapper-empty${smallSuffix}`} />
            <div className={`brix---pricing-content-wrapper-empty${smallSuffix}`} />
          </div>
        } */}
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
							3.5 and <b>4</b>
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
						<img src='images/check-icon-white-brix-templates.svg' alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⬇️ Export slides</div>
						</div>
						<div className='brix---text-300-medium'>
							PDF and <b>PPTX</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🏷️ Customized branding
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🔈 Generate slide scripts
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📱 Generate video</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🦹‍♂️ Attach avatar (new)
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
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
					<div
						className={`brix---pricing-content-wrapper-empty${smallSuffix}`}
					/>
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
							<b>4000</b> / month{userTier.includes('PRO') && ' *'}
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>🌟 GPT</div>
						</div>
						<div className='brix---text-300-medium'>
							3.5 and <b>4</b>
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
						<img src='images/check-icon-white-brix-templates.svg' alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⬇️ Export slides</div>
						</div>
						<div className='brix---text-300-medium'>
							PDF and <b>PPTX</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🏷️ Customized branding
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🔈 Generate slide scripts
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📱 Generate video</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🦹‍♂️ Attach avatar (new)
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🎙️ Voice cloning (coming)
							</div>
						</div>
						<div className='brix---text-300-medium'>1 Voice</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🦹🏽‍♂️ Avatar cloning (coming)
							</div>
						</div>
						<div className='brix---text-300-medium'>1 Avatar</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								📈 Smart table (coming)
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								☎️ Direct customer support
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
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
							3.5 and <b>4</b>
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
						<img src='images/check-icon-white-brix-templates.svg' alt='' />
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>⬇️ Export slides</div>
						</div>
						<div className='brix---text-300-medium'>
							PDF and <b>PPTX</b>
						</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🏷️ Customized branding
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🔈 Generate slide scripts
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>📱 Generate video</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🦹‍♂️ Attach avatar (new)
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🎙️ Voice cloning (coming)
							</div>
						</div>
						<div className='brix---text-300-medium'>10 Voices</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								🦹🏽‍♂️ Avatar cloning (coming)
							</div>
						</div>
						<div className='brix---text-300-medium'>10 Avatars</div>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								📈 Smart table (coming)
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
					<div className={`brix---pricing-content-wrapper${smallSuffix}`}>
						<div className='brix---pricing-v8-title-table'>
							<div className='brix---text-300-medium'>
								☎️ Direct customer support
							</div>
						</div>
						<img
							src='images/check-icon-brix-templates.svg'
							alt='Check - Elements Webflow Library - BRIX Templates'
						/>
					</div>
				</div>
			</div>

			{userTier.includes('PRO') && (
				<div className='text-gray-600 md:whitespace-nowrap mt-4'>
					* Early users who purchased PRO plan before still have Unlimited
					credits under our <a href='terms'>fair usage</a> policy.
				</div>
			)}
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
				<PricingComparison extraPadding={true} />
			</div>
		</div>
	);
}

export { PricingComparison };
