import React, { FC } from 'react';
import Modal from '@/components/ui/Modal';
interface ButtonProps {
	onClick?: () => void;
	label: string;
	primary?: boolean;
}
import FillOutFormImg from '@/public/images/user_onboarding/FillOutForms.png';
import BookASessionImg from '@/public/images/user_onboarding/BookASession.png';
import { getBrand } from '@/utils/getHost';
// join user research button/ claim special offer button
const PrimaryButton: FC<ButtonProps> = ({ onClick, label }) => {
	return (
		<button
			onClick={onClick}
			className='h-10 py-2 bg-white rounded-md border border-[#5168f6] justify-center items-center inline-flex'
		>
			<span className='w-[9rem] text-center text-[#5168f6] text-base leading-none tracking-tight'>
				{label}
			</span>
		</button>
	);
};

// you already in button
const SecondaryButton: FC<ButtonProps> = ({ onClick, label }) => {
	return (
		<button
			onClick={onClick}
			className='w-24 h-10 px-2 py-0.5 rounded border border-[#FFFFFF] justify-center items-center gap-1.5 inline-flex'
		>
			<span className='text-center text-[#5168f6] text-base font-medium leading-none tracking-wide'>
				{label}
			</span>
		</button>
	);
};

interface UserResearchWindowProps {
	onClick: () => void;
}

const UserResearchWindow: FC<UserResearchWindowProps> = ({ onClick }) => {
	return (
		<Modal
			showModal={true}
			setShowModal={onClick}
			position='fixed max-w-[50rem] h-auto'
		>
			{/* <img src={SlidesPageEndTour.src} alt='Step end' /> */}
			{/* explaining text for filling out form */}
			<section
				id='userResearch'
				className='w-full px-4 py-2 flex flex-col items-start gap-[0.5rem]'
			>
				<div className='text-center text-neutral-800 text-xl font-bold leading-normal font-creato-medium'>
					Earn free credits⭐ by joining our user study
				</div>
				<div className='text-gray-600 text-sm font-normal leading-normal tracking-[0.0175rem]'>
					We want to learn more about what you think of {getBrand()}, and how you
					use {getBrand()}.
				</div>
				<div className='flex flex-col lg:flex-row gap-[1.5rem] self-center'>
					{/* book a session */}
					<a
						href='https://calendar.app.google/2uGV3B6h9UdYBHPB8'
						target='_blank'
						className='py-2 px-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out'
						role='menuitem'
					>
						<div
							className='w-40 sm:w-80 relative flex flex-col justify-between items-center transition duration-300 ease-in-out hover:shadow-lg'
							style={{
								borderRadius: '0.4375rem',
								border: '1px solid var(--Blue-Blue_200, #B4C5FA)',
								background: '#FFF',
								boxShadow: '0px 12px 28.8px 0px rgba(74, 153, 246, 0.25)',
							}}
						>
							<div className='h-[5rem] w-[5rem] sm:h-[10rem] sm:w-[10rem] lg:w-[15rem] lg:h-[15rem]'>
								<img
									src={BookASessionImg.src}
									alt='Book a session'
									className='h-[5rem] w-[5rem] sm:h-[10rem] sm:w-[10rem] lg:w-[15rem] lg:h-[15rem] object-contain'
								/>
							</div>

							<div className='text-center'>
								<span className='text-black text-base font-bold leading-snug tracking-tight'>
									Book a session +1000⭐
									<br />
								</span>
								<span className='text-black text-sm font-normal leading-snug tracking-tight'>
									(~30 mins){' '}
								</span>
							</div>
						</div>
					</a>

					{/* fill out a form */}
					<a
						href='https://forms.gle/kncWqBjU4n5xps1w8'
						target='_blank'
						className='py-2 px-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out'
						role='menuitem'
					>
						{' '}
						<div
							className='w-40 sm:w-80 relative flex flex-col justify-between items-center transition duration-300 ease-in-out hover:shadow-lg'
							style={{
								borderRadius: '0.4375rem',
								border: '1px solid var(--Blue-Blue_200, #B4C5FA)',
								background: '#FFF',
								boxShadow: '0px 12px 28.8px 0px rgba(74, 153, 246, 0.25)',
							}}
						>
							<div className='h-[5rem] w-[5rem] sm:h-[10rem] sm:w-[10rem] lg:w-[15rem] lg:h-[15rem]'>
								<img
									src={FillOutFormImg.src}
									alt='Fill out form'
									className='object-contain h-[5rem] w-[5rem] sm:h-[10rem] sm:w-[10rem] lg:w-[15rem] lg:h-[15rem]'
								/>
							</div>

							<div className='text-center'>
								<span className='text-black text-base font-bold leading-snug tracking-tight'>
									Fill out form +100⭐
									<br />
								</span>
								<span className='text-black text-sm font-normal leading-snug tracking-tight'>
									(5-10 mins){' '}
								</span>
							</div>
						</div>
					</a>
				</div>
			</section>
		</Modal>
	);
};

export { PrimaryButton, SecondaryButton, UserResearchWindow };
