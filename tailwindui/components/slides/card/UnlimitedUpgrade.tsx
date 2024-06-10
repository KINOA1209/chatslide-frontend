'use client';

import { BigBlueButton } from '@/components/button/DrlambdaButton';
import Card from '@/components/ui/Card';
import { BigTitle, Instruction } from '@/components/ui/Text';
import useHydrated from '@/hooks/use-hydrated';
import { useUser } from '@/hooks/use-user';
import UserService from '@/services/UserService';
import { isChatslide } from '@/utils/getHost';
import { userInEU } from '@/utils/userLocation';
import { useEffect, useState } from 'react';

export const UnlimitedUpgrade: React.FC<{}> = ({}) => {
	const { tier, email, token, credits, user } = useUser();
	const [useEuro, setUseEuro] = useState(false);

	const isLifetime = tier.includes('LIFETIME');

	useEffect(() => {
		userInEU().then((inEU) => {
			setUseEuro(inEU);
		});
	}, []);

	async function upgradeToUnlimited() {
		const url = await UserService.checkout(
			'ULTIMATE_LIFETIME',
			email,
			!useEuro ? '$' : '€',
			token,
		);
		if (url) {
			// open a new tab
			window.open(url, '_blank');
		}
	}

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	if (credits != 'Unlimited')
		return (
			<Card>
				<BigTitle>✅ Upgrade to Ultimate</BigTitle>
				<Instruction>
					<div>
						🤫 Shhhh, snatch a lifetime deal now. <br />
						Get a lifetime upgrade to our ULTIMATE at a discounted price of{' '}
						<b>
							{!useEuro ? '$' : '€'}
							{user?.ltd_upgrade_price || 472}
						</b>
						. 14 day money back guarantee.{' '}
						<a
							href='https://blog.drlambda.ai/upgrade-to-ultimate-a-one-time-payment-for-lifetime-access/'
							className='text-blue-600'
						>
							Learn more
						</a>
						.
					</div>
				</Instruction>
				<BigBlueButton onClick={upgradeToUnlimited}>✅ Claim Now</BigBlueButton>
			</Card>
		);

	return <></>;
};
