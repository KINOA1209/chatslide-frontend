'use client';


import { BigBlueButton, EarlyAccessButton } from "@/components/button/DrlambdaButton";
import { Column } from "@/components/layout/Column";
import { Panel } from "@/components/layout/Panel";
import { UnlimitedUpgrade } from "@/components/slides/card/UnlimitedUpgrade";
import Card from "@/components/ui/Card";
import { ProLabel } from "@/components/ui/GrayLabel";
import { BigTitle, Explanation, Instruction } from "@/components/ui/Text";
import useHydrated from "@/hooks/use-hydrated";
import { useUser } from "@/hooks/use-user";

export default function Studio() {

	const { tier, username, token } = useUser();
	const isPro = tier.includes('PRO');

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<Column>
			<Panel>
				<UnlimitedUpgrade />
				<Card>
					<BigTitle>🎙️ Voice Cloning</BigTitle>
					<Instruction>
						Record your voice, and use your voice clone in your videos. {!isPro && <ProLabel />}
					</Instruction>

					<Explanation>
						Coming soon, expected in May, 2024. <br />
						Learn more about our future plans on our <a href='https://blog.drlambda.ai/drlambda-product-roadmap/' className='text-blue-600'>roadmap</a>. <br />
						Join our <a href='discord' className='text-blue-600'>discord</a> channel to get up to date information.
					</Explanation>

					<EarlyAccessButton
						username={username}
						token={token}
						feature='voice cloning'
					/>
				</Card>

				<Card>
					<BigTitle>🦹‍♂️ Avatar Cloning</BigTitle>
					<Instruction>
						Upload your photos, clone your avatar, and let your avatar speak for you. {!isPro && <ProLabel />}
					</Instruction>
					<Explanation>
						Coming soon, expected in June, 2024. <br />
						Learn more about our future plans on our <a href='https://blog.drlambda.ai/drlambda-product-roadmap/' className='text-blue-600'>roadmap</a>. <br />
						Join our <a href='discord' className='text-blue-600'>Discord</a> channel to get up to date information.
					</Explanation>

					<EarlyAccessButton
						username={username}
						token={token}
						feature='avatar cloning'
					/>
				</Card>
			</Panel>
		</Column>


	)

}