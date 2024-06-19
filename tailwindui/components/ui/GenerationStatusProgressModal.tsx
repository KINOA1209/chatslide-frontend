import Modal from './Modal';
import React, { FC, useEffect, useState } from 'react';
import FillOutFormImg from '@/public/images/user_onboarding/FillOutForms.png';
import BookASessionImg from '@/public/images/user_onboarding/BookASession.png';
import { getBrand, isChatslide } from '@/utils/getHost';
import { Explanation, Instruction, Title } from './Text';
import { useUser } from '@/hooks/use-user';

const ProgressButton: FC<{
	href: string;
	imgSrc: string;
	alt: string;
	children: React.ReactNode;
}> = ({ href, imgSrc, alt, children }) => {
	return (
		<a
			href={href}
			target='_blank'
			className='py-2 px-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out'
			role='menuitem'
		>
			{' '}
			<div
				className='w-80 relative flex flex-row justify-evenly items-center transition duration-300 ease-in-out hover:shadow-lg'
				style={{
					borderRadius: '0.4375rem',
					border: '1px solid var(--Blue-Blue_200, #B4C5FA)',
					background: '#FFF',
					boxShadow: '0px 12px 28.8px 0px rgba(74, 153, 246, 0.25)',
				}}
			>
				<div className='h-[4rem] w-[4rem] sm:h-[5rem] sm:w-[5rem] lg:w-[7rem] lg:h-[7rem]'>
					<img
						src={imgSrc}
						alt={alt}
						className='h-[4rem] w-[4rem] sm:h-[5rem] sm:w-[5rem] lg:w-[7rem] lg:h-[7rem] object-contain'
					/>
				</div>

				<div className='text-center'>{children}</div>
			</div>
		</a>
	);
};

const ctas = [
	{
		href: 'https://calendar.app.google/2uGV3B6h9UdYBHPB8',
		imgSrc: BookASessionImg.src,
		alt: 'Book a session',
		instruction: 'Book a session',
		emoji: '+1000⭐',
		explanation: '~30 mins',
	},
	{
		href: '/account',
		imgSrc: BookASessionImg.src,
		alt: 'Upgrade to unlimited',
		instruction: 'Upgrade to unlimited',
		emoji: '+🌟🌟🌟🌟🌟',
		explanation: 'One-time payment',
		condition: ({
			isPaidUser,
			credits,
		}: {
			isPaidUser: boolean;
			credits: string;
		}) => isPaidUser && credits !== 'Unlimited',
	},
	{
		href: isChatslide()
			? 'https://qualtricsxm6ltvkn8sw.qualtrics.com/jfe/form/SV_6nF7L74Sv68ynzw'
			: 'https://forms.gle/kncWqBjU4n5xps1w8',
		imgSrc: FillOutFormImg.src,
		alt: 'Fill out a form',
		instruction: 'Fill out form',
		emoji: isChatslide() ? '+200⭐️' : '+100⭐',
		explanation: '5-10 mins',
	},
	{
		href: `https://twitter.com/${getBrand()}_ai`,
		imgSrc: FillOutFormImg.src,
		alt: 'Follow our Twitter',
		instruction: 'Follow our Twitter',
		emoji: '+50⭐',
		explanation: '1 click',
	},
	{
		href: 'https://discord.gg/7g3g4CJ',
		imgSrc: FillOutFormImg.src,
		alt: 'Join our Discord',
		instruction: 'Join our Discord',
		emoji: '+50⭐',
		explanation: '1 click',
	},
	{
		href: 'https://appsumo.com/products/drlambda/',
		imgSrc: FillOutFormImg.src,
		alt: 'Write a review',
		instruction: 'Write a review',
		emoji: '🌮🌮🌮🌮🌮',
		explanation: '5 mins',
		condition: ({ tier }: { tier: string }) => tier === 'PRO_LIFETIME',
	},
	{
		href: 'https://blog.drlambda.ai/how-to-make-money-with-your-high-quality-content-using-chatslide-ai/',
		imgSrc: FillOutFormImg.src,
		alt: 'Monetize your content',
		instruction: 'Monetize your content',
		emoji: '💸💸💸💸💸',
		explanation: '5 mins',
	},
];

// Function to pick 2 random elements
const pickRandomCTAs = (filteredCTAs: any, count: number) => {
	let shuffled = [...filteredCTAs];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(0, count);
};

interface GenerationStatusProgressModalProps {
	onClick: () => void;
	prompts: [string, number][]; // Array of prompt text and waiting time pairs
}

export const GenerationStatusProgressModal: FC<
	GenerationStatusProgressModalProps
> = ({ onClick, prompts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [percentage, setPercentage] = useState(0);
	const [stepsCompleted, setStepsCompleted] = useState(false); // Flag to track whether steps are completed
	const [canClose, setCanClose] = useState(false);
	const [showModal, setShowModal] = useState(true);
	const { isPaidUser, tier, credits } = useUser();
	const [selectedCtas, setSelectedCtas] = useState([] as any[]);

	useEffect(() => {
		const filteredCTAs = ctas.filter(
			(item) =>
				!item.condition || item.condition({ isPaidUser, credits, tier }),
		);
		setSelectedCtas(pickRandomCTAs(filteredCTAs, 2));
	}, [isPaidUser, credits, tier]);

	useEffect(() => {
		const targetPercentage = 99;
		let currentPercentage = 0;

		if (prompts[currentIndex] && !stepsCompleted) {
			const interval = setInterval(
				() => {
					// Increment the progress until it reaches the target percentage
					if (currentPercentage < targetPercentage) {
						currentPercentage++;
						setPercentage(currentPercentage);
					} else {
						clearInterval(interval); // Stop the interval when target percentage is reached
						if (currentIndex < prompts.length - 1) {
							setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next prompt
							setPercentage(0); // Reset percentage for the next prompt
						} else {
							setStepsCompleted(true); // Set flag to true when all steps are completed
							setCanClose(true); // Enable the close button when all steps are completed
						}
					}
				},
				(prompts[currentIndex][1] || 1) * 10,
			); // Adjust the interval duration based on waitingTime

			return () => clearInterval(interval); // Clean up interval on unmount
		}
	}, [currentIndex, prompts]);

	return (
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			// position='fixed max-w-[50rem] h-auto'
			clickOutsideToClose={canClose}
			canClose={canClose}
		>
			{/* Generation status prompt area */}
			<section
				id='generationStatus'
				className='w-full px-4 py-2 flex flex-col items-start gap-[0.5rem]'
			>
				<div className='w-full flex flex-row items-center justify-between'>
					{/* status prompt text */}
					<div className='text-center text-neutral-800 text-xl font-bold leading-normal'>
						{canClose
							? '💪 Still working on your job...'
							: prompts[currentIndex] && prompts[currentIndex][0]}
					</div>

					{/* progress status number percentage */}
					<div className='flex flex-col lg:flex-row gap-[1.5rem] self-center'>
						<span className='text-center text-neutral-800 text-xl font-bold leading-normal'>
							{percentage.toFixed(0)}%
						</span>
					</div>
				</div>
				{/* progress bar */}
				<div className='w-full bg-[#F4F4F4] relative'>
					<div
						className='absolute top-0 left-0 h-[0.375rem] bg-[#5168F6]'
						style={{ width: `${percentage}%` }}
					/>
				</div>
			</section>
			{/* explaining text for filling out form */}
			<hr className='border-t-[1px] border-[#E0E0E0]' />
			<section
				id='userResearch'
				className='w-full px-4 py-2 flex flex-col items-start gap-[0.5rem]'
			>
				<Title center>More ways to get credits 🌟</Title>
				<Explanation>
					We want to learn more about what you think of {getBrand()}, and how
					you use {getBrand()}.
				</Explanation>
				<div className='flex flex-col lg:flex-row gap-[1.5rem] self-center'>
					{selectedCtas.map((cta, index) => (
						<ProgressButton
							key={index}
							href={cta.href}
							imgSrc={cta.imgSrc}
							alt={cta.alt}
						>
							<Instruction center>{cta.instruction}</Instruction>
							<Instruction center>{cta.emoji}</Instruction>
							<Explanation>{cta.explanation}</Explanation>
						</ProgressButton>
					))}
				</div>
			</section>
		</Modal>
	);
};
