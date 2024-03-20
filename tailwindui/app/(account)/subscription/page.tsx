'use client';
import { useState, useEffect, useRef, RefObject } from 'react';
import Pricing from '@/components/landing/pricing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FeedbackForm } from '@/components/ui/feedback';
import { PrimaryButton, UserResearchWindow } from './subscriptionCTAs';
import { Explanation, Instruction, Title } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import useHydrated from '@/hooks/use-hydrated';

const Subscription = () => {
	const [portalURL, setPortalURL] = useState('');
	const [showModal, setShowModal] = useState(false);

	const cancelButton = (
		<div>
			<Link href={portalURL} target='_blank'>
				Cancel Subscription
			</Link>
		</div>
	);

	return (
		<div className='w-full pb-4'>
			{showModal && (
				<FeedbackForm
					onClose={() => setShowModal(false)}
					message='😭 We are sorry to see you go!'
					successDiv={cancelButton}
					textRequired={true}
				/>
			)}

			<Card>
				{/* <div className='w-fit text-[#363E4A] text-[17px] font-bold'>
					Subscription
				</div> */}
				<Title>
					Find tailored plans for you
				</Title>

				<Pricing />

				<Instruction>
					Looking to redeem your code? Click <Link className='text-blue-600' href='/account'>here</Link>!
				</Instruction>

				{portalURL && (
					<button
						onClick={() => {
							setShowModal(true);
						}}
						className='w-full py-4 sm:px-6 flex flex-col justify-center items-center max-w-none 2xl:max-w-[80%] mx-auto'
					>
						Manage Subscription
					</button>
				)}
			</Card>
		</div>
	);
};

export default function SubscriptionAndUserResearch() {
	// To add a new section
	// Add tabRef for header animation
	// Add section ref for scrollIntoView in function toSection
	// Add IntersectionObserver in function observeElements

	const [showUserResearchModal, setShowUserResearchModal] = useState(false);

	const handleUserResearchModal = () => {
		// console.log('user Research Modal toggled');
		setShowUserResearchModal(!showUserResearchModal);
	};

	const bar = <div className='w-full h-0 border-b-2 border-[#CAD0D3]'></div>;
	useEffect(() => {
		AOS.init({
			once: true,
			disable: 'phone',
			duration: 700,
			easing: 'ease-out-cubic',
		});
	});

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<div className='flex flex-col items-center gap-[30px] md:gap-[70px] mx-auto w-full'>
			<ToastContainer />
			{/* user research modal */}
			{showUserResearchModal && (
				<UserResearchWindow
					onClick={handleUserResearchModal}
				></UserResearchWindow>
			)}
			<Column>
				<section id='subscription' className='w-full'>
					<Subscription />
				</section>
				<Card>
					<Instruction>
						Earn free credits⭐ by joining our user study
					</Instruction>
					<Explanation>
						We want to learn more about what you think of DrLambda, and how you
						use DrLambda.
					</Explanation>
					<PrimaryButton
						onClick={handleUserResearchModal}
						label={'Join today!'}
					></PrimaryButton>
				</Card>
			</Column>
		</div>
	);
}
