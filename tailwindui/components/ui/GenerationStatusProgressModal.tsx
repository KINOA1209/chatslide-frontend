import Modal from './Modal';
import React, { FC } from 'react';
import FillOutFormImg from '@/public/images/user_onboarding/FillOutForms.png';
import BookASessionImg from '@/public/images/user_onboarding/BookASession.png';
interface GenerationStatusProgressModalProps {
	onClick: () => void;
}

export const GenerationStatusProgressModal: FC<
	GenerationStatusProgressModalProps
> = ({ onClick }) => {
	return (
		<Modal
			showModal={true}
			setShowModal={onClick}
			position='fixed max-w-[50rem] h-auto'
			clickOutsideToClose={false}
			canClose={false}
		>
			{/* Generation status prompt area */}
			<section
				id='generationStatus'
				className='w-full px-4 py-2 flex flex-col items-start gap-[0.5rem]'
			>
				<div className='w-full px-4 py-2 flex flex-row items-center justify-between'>
					{/* status prompt text */}
					<div className='text-center text-neutral-800 text-xl font-bold leading-normal font-creato-medium'>
						AI is generating your slides...
					</div>

					{/* progress status number percentage */}
					<div className='flex flex-col lg:flex-row gap-[1.5rem] self-center'>
						22%
					</div>
				</div>
				{/* progress bar */}
				<div className='w-full'>purple bar here</div>
			</section>
			{/* explaining text for filling out form */}
			<section
				id='userResearch'
				className='w-full px-4 py-2 flex flex-col items-start gap-[0.5rem]'
			>
				<div className='text-center text-neutral-800 text-xl font-bold leading-normal font-creato-medium'>
					Earn free credits⭐ by joining our user study
				</div>
				<div className='text-gray-600 text-sm font-normal font-creato-medium leading-normal tracking-[0.0175rem]'>
					We want to learn more about what you think of DrLambda, and how you
					use DrLambda.
				</div>
				<div className='flex flex-col lg:flex-row gap-[1.5rem] self-center'>
					{/* book a session */}
					<a
						href='https://calendar.app.google/2uGV3B6h9UdYBHPB8'
						target='_blank'
						className='py-2 px-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out'
						role='menuitem'
					>
						<div className='w-40 sm:w-80 relative bg-white rounded-md shadow-md border border-indigo-300 flex flex-col justify-between items-center transition duration-300 ease-in-out hover:shadow-lg'>
							<div className='h-[5rem] w-[5rem] sm:h-[10rem] sm:w-[10rem] lg:w-[15rem] lg:h-[15rem]'>
								<img
									src={BookASessionImg.src}
									alt='Book a session'
									className='h-[5rem] w-[5rem] sm:h-[10rem] sm:w-[10rem] lg:w-[15rem] lg:h-[15rem] object-contain'
								/>
							</div>

							<div className='text-center'>
								<span className='text-black text-base font-bold font-creato-medium leading-snug tracking-tight'>
									Book a session +1000⭐
									<br />
								</span>
								<span className='text-black text-sm font-normal font-creato-medium leading-snug tracking-tight'>
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
						<div className='w-40 sm:w-80 relative bg-white rounded-md shadow border border-indigo-300 flex flex-col justify-between items-center transition duration-300 ease-in-out hover:shadow-lg'>
							<div className='h-[5rem] w-[5rem] sm:h-[10rem] sm:w-[10rem] lg:w-[15rem] lg:h-[15rem]'>
								<img
									src={FillOutFormImg.src}
									alt='Fill out form'
									className='object-contain h-[5rem] w-[5rem] sm:h-[10rem] sm:w-[10rem] lg:w-[15rem] lg:h-[15rem]'
								/>
							</div>

							<div className='text-center'>
								<span className='text-black text-base font-bold font-creato-medium leading-snug tracking-tight'>
									Fill out form +100⭐
									<br />
								</span>
								<span className='text-black text-sm font-normal font-creato-medium leading-snug tracking-tight'>
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
