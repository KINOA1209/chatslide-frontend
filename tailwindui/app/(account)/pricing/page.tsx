'use client';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
import { BigBlueButton, InversedBigBlueButton, SmallBlueButton } from '@/components/button/DrlambdaButton';
import { PricingComparison } from '@/app/(default)/landing/Pricing';
import { useSearchParams } from 'next/navigation';

const Subscription = () => {
	const params = useSearchParams();

	useEffect(() => {
		const paid = params.get('paid');
		if (paid === 'false') {
			toast.error('Payment cancelled.');
		}
	}, []);


	return (
		<div className='w-full'>

			<Card>
				{/* <div className='w-fit text-[#363E4A] text-[17px] font-bold'>
					Subscription
				</div> */}
				<Title>Find tailored plans for you</Title>

				<PricingComparison small={true} />

				<Title>
					Looking to redeem your code? Click{' '}
					<Link className='text-blue-600' href='/account'>
						here
					</Link>
					!
				</Title>
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
					<Title>Earn free credits⭐ by joining our user study</Title>
					<BigBlueButton onClick={handleUserResearchModal}>
						{'Join today!'}
					</BigBlueButton>
				</Card>
			</Panel>
		</div>
	);
}
