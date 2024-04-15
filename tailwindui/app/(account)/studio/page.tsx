'use client';


import { BigBlueButton, EarlyAccessButton } from "@/components/button/DrlambdaButton";
import { Column } from "@/components/layout/Column";
import { Panel } from "@/components/layout/Panel";
import Card from "@/components/ui/Card";
import { ProLabel } from "@/components/ui/GrayLabel";
import { BigTitle, Explanation, Instruction } from "@/components/ui/Text";
import useHydrated from "@/hooks/use-hydrated";
import { useUser } from "@/hooks/use-user";
import UserService from "@/services/UserService";
import { isChatslide } from "@/utils/getHost";
import { userInEU } from "@/utils/userLocation";
import { use, useEffect, useState } from "react";

export default function Studio() {

	const { tier, username, email, token, credits } = useUser();
	const [useEuro, setUseEuro] = useState(false);

	const isLifetime = tier.includes('LIFETIME');
	const isPro = tier.includes('PRO');

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	useEffect(() => {
		userInEU().then((inEU) => {
			setUseEuro(inEU);
		});
	}, []);

	return (
		<Column>
			<Panel>
				{isLifetime && credits != 'Unlimited' &&
					<Card>
						<BigTitle>✅ Upgrade to Unlimited</BigTitle>
						<Instruction>
							🤫 Shhhh, snatch a lifetime deal now. Only available until May 11, 2024. <br />
							Get a lifetime upgrade to our Unlimited credits plan at a discounted price.
						</Instruction>
						<div >
							<BigBlueButton
								onClick={() => UserService.checkout(
									'PRO_LIFETIME',
									email,
									!useEuro ? '$' : '€',
									token,
									isChatslide()
								)}
							>
								✅ Claim Now
							</BigBlueButton>
						</div>
					</Card>}

				<Card>
					<BigTitle>🎙️ Voice Cloning</BigTitle>
					<Instruction>
						Record your voice, and use your voice clone in your videos. {!isPro && <ProLabel />}
					</Instruction>

					<Explanation>
						Coming soon, expected in May, 2024. <br />
						Learn more about our future plans at our <a href='https://blog.drlambda.ai/drlambda-product-roadmap/' className='text-blue-600'>roadmap</a>. <br />
						Join our <a href='discord' className='text-blue-600'>discord</a> channel to get up to date information.
					</Explanation>

					<div>
						<EarlyAccessButton
							username={username}
							token={token}
							feature='voice cloning'
						/>
					</div>
				</Card>

				<Card>
					<BigTitle>🦹‍♂️ Avatar Cloning</BigTitle>
					<Instruction>
						Upload your photos, clone your avatar, and let your avatar speak for you. {!isPro && <ProLabel />}
					</Instruction>
					<Explanation>
						Coming soon, expected in June, 2024. <br />
						Learn more about our future plans at our <a href='https://blog.drlambda.ai/drlambda-product-roadmap/' className='text-blue-600'>roadmap</a>. <br />
						Join our <a href='discord' className='text-blue-600'>discord</a> channel to get up to date information.
					</Explanation>

					<div>
						<EarlyAccessButton
							username={username}
							token={token}
							feature='avatar cloning'
						/>
					</div>
				</Card>
			</Panel>
		</Column>


	)

}