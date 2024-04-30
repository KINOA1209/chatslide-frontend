import { EarlyAccessButton } from '@/components/button/DrlambdaButton';
import { Column } from '@/components/layout/Column';
import { Panel } from '@/components/layout/Panel';
import { UnlimitedUpgrade } from '@/components/slides/card/UnlimitedUpgrade';
import Card from '@/components/ui/Card';
import { ProLabel } from '@/components/ui/GrayLabel';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';

export default function Studio() {
	// avoid hydration error during development caused by persistence
	// if (!useHydrated()) return <></>;

	return (
		<Column>
			<Panel>
				<UnlimitedUpgrade />
				<Card>
					<BigTitle>
						🎙️ Voice Cloning <ProLabel />
					</BigTitle>
					<Instruction>
						Record your voice, and use your voice clone in your videos.
					</Instruction>

					<Explanation>
						📆 Coming soon, expected in May, 2024. <br />
						Learn more about our future plans on our{' '}
						<a
							href='https://blog.drlambda.ai/drlambda-product-roadmap/'
							className='text-blue-600'
						>
							roadmap
						</a>
						. <br />
						Join our{' '}
						<a href='discord' className='text-blue-600'>
							Discord
						</a>{' '}
						channel to get up to date information.
					</Explanation>

					<EarlyAccessButton feature='voice cloning' />
				</Card>

				<Card>
					<BigTitle>
						🦹‍♂️ Avatar Cloning <ProLabel />
					</BigTitle>
					<Instruction>
						Upload your photos, clone your avatar, and let your avatar speak for
						you in your videos.
					</Instruction>
					<Explanation>
						📆 Coming soon, expected in June, 2024. <br />
						Learn more about our future plans on our{' '}
						<a
							href='https://blog.drlambda.ai/drlambda-product-roadmap/'
							className='text-blue-600'
						>
							roadmap
						</a>
						. <br />
						Join our{' '}
						<a href='discord' className='text-blue-600'>
							Discord
						</a>{' '}
						channel to get up to date information.
					</Explanation>

					<EarlyAccessButton feature='avatar cloning' />
				</Card>

				<Card>
					<BigTitle>
						👨‍💼 Expert Mode <ProLabel />
					</BigTitle>
					<Instruction>
						In expert mode, you will be able to have your own LLM model instead
						of GPT3.5 or GPT4. Your own model is like a dedicated in-house team,
						whereas GPT3.5 or GPT4 is like a freelancer.
					</Instruction>

					<Instruction>
						If you share your data (e.g. website), we will help you train your
						own LLM model, it is best for people with their brands and data.{' '}
						<br />
						You can also opt-in for continuous training, so your model will be
						updated every time you create a new slide. The data is only
						accessible to your own model. <br />
					</Instruction>
					<Instruction>
						However, the ⭐️credit cost and ⏳time cost for generating a project
						will also be higher.
					</Instruction>
					<Explanation>
						📆 Coming soon, expected in June ~ July, 2024. <br />
						Learn more about our future plans on our{' '}
						<a
							href='https://blog.drlambda.ai/drlambda-product-roadmap/'
							className='text-blue-600'
						>
							roadmap
						</a>
						. <br />
						Join our{' '}
						<a href='discord' className='text-blue-600'>
							Discord
						</a>{' '}
						channel to get up to date information.
					</Explanation>
					<EarlyAccessButton feature='expert mode' />
				</Card>
			</Panel>
		</Column>
	);
}
