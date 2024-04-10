'use client';


import { BigBlueButton } from "@/components/button/DrlambdaButton";
import { Column } from "@/components/layout/Column";
import Card from "@/components/ui/Card";
import { ProLabel } from "@/components/ui/GrayLabel";
import { BigTitle, Explanation, Instruction } from "@/components/ui/Text";
import useHydrated from "@/hooks/use-hydrated";
import { useUser } from "@/hooks/use-user";

export default function Studio() {

	const { tier } = useUser();

	const isPro = tier.includes('PRO');
	const isPlus = tier.includes('PLUS');

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<Column>
			{isPlus && <Card>
				<BigTitle>✅ Upgrade to Pro</BigTitle>
				<Instruction>
					🤫 Shhhh, snatch a lifetime deal now. Only available until May 11, 2024. <br />
					Get a lifetime upgrade to our PRO plan at only $99.
				</Instruction>
				<div >
					<BigBlueButton
						id='upgrade_to_pro'
						isPaidFeature={false}
						onClick={
							() => {
								window.open('https://buy.stripe.com/5kAcOV8800KgagEeUY');
							}
						}
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
			</Card>

			<Card>
				<BigTitle>🦹‍♂️ Avatar Cloning</BigTitle>
				<Instruction>
					Upload your photos, clone your avatar, and let your avatar speak for you. {!isPro && <ProLabel />}
				</Instruction>
				{isPlus && <Instruction>
					Upgrade to our PRO plan at a discounted price! Availble until May 31, 2024.
				</Instruction>
				}
				<Explanation>
					Coming soon, expected in June, 2024. <br />
					Learn more about our future plans at our <a href='https://blog.drlambda.ai/drlambda-product-roadmap/' className='text-blue-600'>roadmap</a>. <br />
					Join our <a href='discord' className='text-blue-600'>discord</a> channel to get up to date information.
				</Explanation>
			</Card>
		</Column>


	)

}