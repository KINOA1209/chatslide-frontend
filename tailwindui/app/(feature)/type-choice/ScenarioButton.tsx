import React, { FC, useState } from 'react';
import Image from 'next/image';
import { Explanation } from '@/components/ui/Text';
import PaywallModal from '@/components/paywallModal';
import { ScenarioOption } from '../scenario-choice/slidesScenarios';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';

const ScenarioButton: FC<{
	scenario: ScenarioOption;
	navigate: (type: string) => void;
}> = ({ scenario, navigate }) => {
	const [showPaywall, setShowPaywall] = useState(false);
	const { tier } = useUser();
	const router = useRouter();

	return (
		<>
			<PaywallModal
				showModal={showPaywall}
				setShowModal={setShowPaywall}
				message='🥇 Upgrade to ULTIMATE to get early access!'
			/>
			<div
				key={scenario.id}
				className={
					'flex flex-col transition-transform transform-gpu ' +
					(scenario?.featured ? 'hover:scale-110' : 'hover:scale-110')
				}
			>
				<div
					className={
						'h-[250px] sm:h-[300px] rounded-lg shadow flex justify-center items-center cursor-pointer mb-4 ' +
						(scenario?.featured ? 'bg-[#eff4ff]' : 'bg-gray-100')
					}
					onClick={() => {
						if (scenario?.previewOnly) {
							if (!tier.includes('ULTIMATE')) {
								setShowPaywall(true);
								return;
							}
						}
						navigate(scenario.id);
					}}
				>
					<Image
						className='mx-[20px] mh-[20px]'
						width={281}
						height={174}
						alt={scenario.id}
						src={scenario.imageSrc}
					/>
				</div>
				<div className='text-center my-2 leading-snug tracking-tight whitespace-nowrap font-bold'>
					{scenario.title}
				</div>
				{scenario?.previewOnly && (
					<Explanation>
						<div className='text-center'>
							This feature is in Beta mode. <br />
							Early access limited to Ultimate users.
						</div>
					</Explanation>
				)}
			</div>
		</>
	);
};

export default ScenarioButton;
