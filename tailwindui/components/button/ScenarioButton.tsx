import { FC, useState } from 'react';
import PaywallModal from '../paywallModal';
import { useUser } from '@/hooks/use-user';
import { ScenarioOption } from '@/app/(feature)/scenario-choice/slidesScenarios';
import Image from 'next/image';
import { Explanation } from '../ui/Text';
import DesignSystemButton from '../ui/design_systems/ButtonsOrdinary';

export const ScenarioButton: FC<{
	scenario: ScenarioOption;
	navigate: (type: string) => void;
}> = ({ scenario, navigate }) => {
	const [showPaywall, setShowPaywall] = useState(false);
	const { tier } = useUser();
	return (
		<>
			<PaywallModal
				showModal={showPaywall}
				setShowModal={setShowPaywall}
				message='🥇 Upgrade to ULTIMATE to get early access!'
        trigger='scenario'
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


export const MinorScenarioButton: FC<{
	scenario: ScenarioOption;
	navigate: (type: string) => void;
}> = ({ scenario, navigate }) => {
	return (
		<div className='transition-transform transform-gpu hover:scale-110'>
			<DesignSystemButton
				onClick={() => navigate(scenario.id)}
				size='lg'
				hierarchy='secondary'
				buttonStatus={ scenario.disabled ? 'disabled' : 'enabled'}
			>
				<div className='w-[12rem] flex flex-row gap-2 items-center'>
					{scenario.icon}
					{scenario.title}
				</div>
			</DesignSystemButton>
		</div>
	);
};
