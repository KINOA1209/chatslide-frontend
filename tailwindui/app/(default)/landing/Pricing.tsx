'use client';


import { useUser } from "@/hooks/use-user";
import UserService from "@/services/UserService";
import { userInEU } from "@/utils/userLocation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const PricingComparison: React.FC<{
	extraPadding?: boolean
}> = ({ extraPadding }) => {
	const { token, email, tier: userTier } = useUser();
	const [currency, setCurrency] = useState<string>('$');
	const router = useRouter();

	const getCta = (tier: 'FREE' | 'PLUS' | 'PRO'): string => {
		if (!token) {
			return 'Sign up to Start';
		}
		if (userTier.includes('CANCELLED') || userTier === 'FREE') {
			return '🌟 Claim Offer';
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
			} else {
				return '✅ Current Plan';
			}
		}
		return ''
	}

	useEffect(() => {
		userInEU().then((res) => {
			setCurrency(
				res ? '€' : '$'
			);
		});
	}, []);

	const handleClick = async (tier: 'FREE' | 'PLUS' | 'PRO') => {
		if (!token) {
			router.push('/signup');
		}
		if (tier === 'FREE') {
			toast.success('Your plan already includes this feature');
		}
		else if (userTier.includes('CANCELLED') || userTier === 'FREE') {
			return handleSubscription(tier, token);
		}
		else if (userTier.includes('PLUS')) {
			if (tier === 'PLUS') {
				return handleManageSubscription(token);
			} else {
				return handleSubscription(tier, token);
			}
		}
		else if (userTier.includes('PRO')) {
			if (tier === 'PLUS') {
				toast.success('Your plan already includes this feature');
			} else {
				return handleManageSubscription(token);
			}
		}
	}

	const handleManageSubscription = async (token: string) => {
		try {
			const url = await UserService.createStripePortalSession(token);
			router.push(url);
		}
		catch (error) {
			toast.error('We cannot find your purchase information from Stripe, did you purchase through 3rd party?');
		}
	}

	const handleSubscription = async (tier: 'PLUS' | 'PRO', token: string) => {
		try {
			// Determine the tier based on isYearly

			const plan = tier + "_MONTHLY";

			// Create a request object
			const requestData = {
				tier: plan,
				email: email,
				currency: currency === '$' ? 'usd' : 'eur',
			};

			// Make the API request to create a checkout session
			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
				body: JSON.stringify(requestData),
			});

			if (response.ok) {
				const url = await response.text();
				console.log(url);
				// Redirect to the checkout page
				window.open(url, '_blank');
			} else {
				console.error('Error creating checkout session:', response.statusText);
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	return (
		<div className='w-full flex flex-col items-center'>
			<div
				data-w-id="a8590735-7e8f-bd41-a09e-37f58b801ed3"
				className="w-layout-grid brix---grid-4-columns-pricing-tablet"
			>
				<link href="css/webflow.css" rel="stylesheet" type="text/css" />
				<link href="css/drlambda.webflow.css" rel="stylesheet" type="text/css" />

				<div className="brix---pricing-column-first">
					<div className="brix---pricing-table-top-first">
						<div className="brix---color-neutral-800">
							<div className="brix---text-400-bold">Features</div>
						</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">⭐️ Credits</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">🚀 GPT</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">📚 Upload documents</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">📑 Generate slides</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">
							⬇️ Export slides
						</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">🏷️ Customized branding</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">
							🔈 Generate slides scripts
						</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">📱 Generate video</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">🦹‍♂️ Attach avatar (new)</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">
							☎️ Direct customer support
						</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">
							🎙️ Voice cloning (coming)
						</div>
					</div>
					<div className="brix---pricing-content-wrapper-left">
						<div className="brix---text-300-medium">
							🦹🏽‍♂️ Avatar cloning (coming)
						</div>
					</div>
				</div>
				<div className="brix---pricing-column">
					<div className="brix---pricing-table-top">
						<div className="brix---mg-bottom-8px">
							<div className="brix---color-neutral-600">
								<div className="brix---text-200">FREE</div>
							</div>
						</div>
						<div className="brix---mg-bottom-16px">
							<div className="brix---color-neutral-800 flex flex-col items-center">
								<div className="brix---text-300-medium opacity-0">{'$0'}</div>
								<div className="brix---text-400-bold">$0</div>
								<div className="brix---text-300-medium opacity-0">{'$0'}</div>
							</div>
						</div>
						<button
							onClick={() => handleClick('FREE')}
							className="brix---btn-primary-small-full-width w-button whitespace-nowrap"
						>
							{getCta('FREE')}
						</button>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">⭐️ credits</div>
						</div>
						<div className="brix---text-300-medium">100</div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">🌟 GPT</div>
						</div>
						<div className="brix---text-300-medium">3.5</div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">📚 Upload documents</div>
						</div>
						<div className="brix---text-300-medium">Single</div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">📑 Generate slides</div>
						</div>
						<img src="images/check-icon-white-brix-templates.svg" alt="" />
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">
								⬇️ Export slides
							</div>
						</div>
						<div className="brix---text-300-medium">PDF</div>
					</div>
					<div className="brix---pricing-content-wrapper-empty" />
					<div className="brix---pricing-content-wrapper-empty" />
					<div className="brix---pricing-content-wrapper-empty" />
					<div className="brix---pricing-content-wrapper-empty" />
					<div className="brix---pricing-content-wrapper-empty" />
					<div className="brix---pricing-content-wrapper-empty" />
					<div className="brix---pricing-content-wrapper-empty" />
				</div>
				<div className="brix---pricing-column">
					<div className="brix---pricing-table-top">
						<div className="brix---mg-bottom-8px">
							<div className="brix---color-neutral-600">
								<div className="brix---text-200">PLUS</div>
							</div>
						</div>
						<div className="brix---mg-bottom-16px">
							<div className="brix---color-neutral-800 flex flex-col items-center">
								<div className="brix---text-400-bold">$3.96</div>
								<div className="brix---text-300-medium">1st month, then</div>
								<div className="brix---text-300-medium">$9.99</div>
							</div>
						</div>
						<button
							onClick={() => handleClick('PLUS')}
							className="brix---btn-primary-small-full-width w-button whitespace-nowrap"
						>
							{getCta('PLUS')}
						</button>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">⭐️ Credits</div>
						</div>
						<div className="brix---text-300-medium">1000 / month{userTier.includes('PLUS') && ' *'}</div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">🌟 GPT</div>
						</div>
						<div className="brix---text-300-medium">3.5 and <b>4</b></div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">📚 Upload documents</div>
						</div>
						<div className="brix---text-300-medium"><b>Multiple</b></div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">📑 Generate slides</div>
						</div>
						<img src="images/check-icon-white-brix-templates.svg" alt="" />
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">
								⬇️ Export slides
							</div>
						</div>
						<div className="brix---text-300-medium">PDF and <b>PPTX</b></div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">
								🏷️ Customized branding
							</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">
								🔈 Generate slides scripts
							</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">📱 Generate video</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">🦹‍♂️ Attach avatar (new)</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper-empty" />
					<div className="brix---pricing-content-wrapper-empty" />
					<div className="brix---pricing-content-wrapper-empty" />
				</div>
				<div className="brix---pricing-column-featured">
					<div className="brix---pricing-table-top-featured">
						<div className="brix---mg-bottom-8px">
							<div className="brix---color-neutral-600">
								<div className="brix---text-200">PRO</div>
							</div>
						</div>
						<div className="brix---mg-bottom-16px">
							<div className="brix---color-neutral-800 flex flex-col items-center">
								<div className="brix---text-400-bold">$15.96</div>
								<div className="brix---text-300-medium">1st month, then</div>
								<div className="brix---text-300-medium">$39.99</div>
							</div>
						</div>
						<button
							onClick={() => handleClick('PRO')}
							className="brix---btn-primary-small-full-width w-button whitespace-nowrap"
						>
							{getCta('PRO')}
						</button>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">⭐️ Credits</div>
						</div>
						<div className="brix---text-300-medium"><b>5000</b> / month{userTier.includes('PRO') && ' *'}</div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">🌟 GPT</div>
						</div>
						<div className="brix---text-300-medium">3.5 and <b>4</b></div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">📚 Upload documents</div>
						</div>
						<div className="brix---text-300-medium"><b>Multiple</b></div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">📑 Generate slides</div>
						</div>
						<img src="images/check-icon-white-brix-templates.svg" alt="" />
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">
								⬇️ Export slides
							</div>
						</div>
						<div className="brix---text-300-medium">PDF and <b>PPTX</b></div>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">
								🏷️ Customized branding
							</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">
								🔈 Generate slides scripts
							</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">📱 Generate video</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">🦹‍♂️ Attach avatar (new)</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">🎙️ Voice cloning (coming)</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">🦹🏽‍♂️ Avatar cloning (coming)</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
					<div className="brix---pricing-content-wrapper">
						<div className="brix---pricing-v8-title-table">
							<div className="brix---text-300-medium">
								☎️ Direct customer support
							</div>
						</div>
						<img
							src="images/check-icon-brix-templates.svg"
							alt="Check - Elements Webflow Library - BRIX Templates"
						/>
					</div>
				</div>

			</div>

			{userTier.includes('PRO') &&
				<div className='text-gray-600 whitespace-nowrap mt-4'>
					* Early users who purchased PRO plan before still has Unlimited credits under our <a href='terms'>fair usage</a> policy.
				</div>}
			{userTier.includes('PLUS') &&
				<div className='text-gray-600 whitespace-nowrap mt-4'>
					* If you purchased a lifetime deal, the monthly credits may be different from this retail plan.
				</div>}
		</div>
	)
}


export function Pricing() {
	return (
		<div className="brix---section">
			<div className="brix---container-default w-container">
				<div className="brix---mg-bottom-48px">
					<div
						data-w-id="a8590735-7e8f-bd41-a09e-37f58b801ec9"
						className="brix---inner-container-700px-center"
					>
						<div className="brix---text-center">
							<div className="brix---color-neutral-800">
								<h1 id="pricing" className="brix---heading-h1-size">
									Affordable pricing plans
								</h1>
							</div>
						</div>
					</div>
				</div>
				<PricingComparison
					extraPadding={true}
				/>
			</div>
		</div>
	)
}

export { PricingComparison };