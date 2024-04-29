'use client';
import { useState, useEffect } from 'react';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FeedbackForm } from '@/components/ui/feedback';
import { UserResearchWindow } from './subscriptionCTAs';
import { Title } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { Panel } from '@/components/layout/Panel';
import useHydrated from '@/hooks/use-hydrated';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import { PricingComparison } from '@/app/(default)/landing/Pricing';

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
		<div className='w-full'>
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

				<PricingComparison small={true} />

				<Title>
					Looking to redeem your code? Click <Link className='text-blue-600' href='/account'>here</Link>!
				</Title>

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
		<div className='flex flex-col items-center mx-auto w-full'>
			<ToastContainer />
			{/* user research modal */}
			{showUserResearchModal && (
				<UserResearchWindow
					onClick={handleUserResearchModal}
				></UserResearchWindow>
			)}
			<Panel>
				<Subscription />
				<Card>
					<Title>
						Earn free credits⭐ by joining our user study
					</Title>
					<SmallBlueButton
						onClick={handleUserResearchModal}
					>{'Join today!'}</SmallBlueButton>
				</Card>
			</Panel>
		</div>
	);
}
