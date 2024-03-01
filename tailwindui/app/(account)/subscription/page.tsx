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

			<div className='mb-8 w-full max-w-none 2xl:max-w-[80%] mx-auto px-4 sm:px-6'>
				{/* <div className='w-fit text-[#363E4A] text-[17px] font-bold'>
					Subscription
				</div> */}
				<h2 className='w-fit text-[#212121] text-xl md:text-[80px]'>
					Find tailored plans for you
				</h2>
			</div>

			<Pricing />
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

	return (
		<div className='flex flex-col items-center gap-[30px] md:gap-[70px] mx-auto w-full'>
			<ToastContainer />
			{/* user research modal */}
			{showUserResearchModal && (
				<UserResearchWindow
					onClick={handleUserResearchModal}
				></UserResearchWindow>
			)}
			<section id='subscription' className='w-full'>
				<Subscription />
			</section>
			{/* explaining text for filling out form */}
			<section className='w-full px-4 py-2 flex flex-col items-start gap-[0.5rem]'>
				<div className='text-center text-neutral-800 text-xl font-bold leading-normal font-creato-medium'>
					Earn free credits⭐ by joining our user study
				</div>
				<div className='text-gray-600 text-sm font-normal font-creato-medium leading-normal tracking-[0.0175rem]'>
					We want to learn more about what you think of DrLambda, and how you
					use DrLambda.
				</div>
				<PrimaryButton
					onClick={handleUserResearchModal}
					label={'Join today!'}
				></PrimaryButton>
			</section>
		</div>
	);
}
