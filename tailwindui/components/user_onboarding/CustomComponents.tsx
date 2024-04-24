import React, { FC } from 'react';
import ExitUserGuideWarningImg from '@/public/images/user_onboarding/ExitTourWarning.png';
import SlidesPageEndTour from '@/public/images/user_onboarding/SlidesPageEndTour.png';
import StartATourImg from '@/public/images/user_onboarding/SummaryPageStep1Welcom.png';
import {
	PrimaryColorButton,
	SecondaryColorButton,
} from './UserOnboardingButtons';
import Modal from '../ui/Modal';
interface TutorialStepContentProps {
	action: string;
	explanation: string;
}

export const TutorialStepContent: FC<TutorialStepContentProps> = ({
	action,
	explanation,
}) => {
	return (
		<div className='h-auto z-50 flex flex-col'>
			<div
				className='flex flex-col items-start gap-[0.5rem] flex-wrap'
				style={{ maxWidth: '25rem' }}
			>
				<div className='text-neutral-900 text-base font-bold font-bold leading-tight tracking-tight'>
					{action}
				</div>
				<p className='text-neutral-800 text-sm font-normal leading-normal tracking-tight text-left'>
					{explanation}
				</p>
			</div>
		</div>
	);
};

interface TutorialEndStepPromptWindowProps {
	onConfirmingForward: (confirmed: boolean) => void;
	onClose: () => void;
}

export const TutorialEndStepPromptWindow: FC<
	TutorialEndStepPromptWindowProps
> = ({ onConfirmingForward, onClose }) => {
	return (
		<Modal
			showModal={true}
			setShowModal={onClose}
			position='fixed max-w-lg h-auto'
		>
			<img
				src={SlidesPageEndTour.src}
				alt='Step end'
				style={{ maxWidth: '12rem', alignSelf: 'center' }}
			/>

			<TutorialStepContent
				action={'Congratulation! 🎉'}
				explanation={
					'You’ve completed our Guided Tutorial! Now Enhance your experience with an account upgrade. Curious about the exclusive perks our premium features offer? Discover a variety of plans crafted to suit your unique needs.'
				}
			></TutorialStepContent>
			<div className='pt-[3rem] flex flex-row items-center justify-end gap-[0.75rem]'>
				<SecondaryColorButton
					label={'Not Now'}
					onClick={() => onConfirmingForward(false)}
				></SecondaryColorButton>

				<PrimaryColorButton
					label={'Sure'}
					onClick={() => onConfirmingForward(true)}
				></PrimaryColorButton>
			</div>
		</Modal>
	);
};

interface StartATourGuidePromptWindowProps {
	onConfirm: () => void;
	onClose: () => void;
}

export const StartATourGuidePromptWindow: React.FC<
	StartATourGuidePromptWindowProps
> = ({ onConfirm, onClose }) => {
	return (
		<Modal
			showModal={true}
			setShowModal={onClose}
			position='fixed max-w-lg h-auto'
		>
			<img
				src={StartATourImg.src}
				alt='Start Tour Guide'
				style={{ maxWidth: '12rem', alignSelf: 'center' }}
			/>

			<TutorialStepContent
				action={'Welcome to the Guided Tutorial! 🌟'}
				explanation={
					'Would you like to start a guided tutorial to help you navigate through the features of this page?'
				}
			></TutorialStepContent>

			<div className='pt-[3rem] flex flex-row items-center justify-end gap-[0.75rem]'>
				<SecondaryColorButton
					label={'Not Now'}
					onClick={onClose}
				></SecondaryColorButton>

				<PrimaryColorButton
					label={'Sure'}
					onClick={onConfirm}
				></PrimaryColorButton>
			</div>
		</Modal>
	);
};

interface ExitConfirmationWindowProps {
	onConfirmation: (confirmed: boolean) => void;
}

export const ExitConfirmationWindow: FC<ExitConfirmationWindowProps> = ({
	onConfirmation,
}) => {
	return (
		<>
			<div
				className='confirmation-overlay fixed inset-0 bg-black bg-opacity-50 z-50'
				onClick={() => onConfirmation(false)} // Close the confirmation on overlay click
			></div>
			<div className='confirmation-tooltip bg-white p-8 rounded-lg shadow-lg fixed top-1/2 left-1/2 max-w-lg h-auto transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col'>
				<img
					src={ExitUserGuideWarningImg.src}
					alt='Exit warning'
					style={{ maxWidth: '12rem', alignSelf: 'center' }}
				/>

				<TutorialStepContent
					action={'Are you sure to leave the tutorial?'}
					explanation={
						'You could always come back via the help section on the header.'
					}
				></TutorialStepContent>
				<div className='pt-[3rem] flex flex-row items-center justify-end gap-[0.75rem]'>
					<SecondaryColorButton
						label={'Quit'}
						onClick={() => onConfirmation(true)}
					></SecondaryColorButton>

					<PrimaryColorButton
						label={'Not now'}
						onClick={() => onConfirmation(false)}
					></PrimaryColorButton>
				</div>
			</div>
		</>
	);
};

interface FeedbackWindowProps {
	onClose: () => void;
}

export const FeedbackWindow: FC<FeedbackWindowProps> = ({ onClose }) => {
	return (
		<>
			<div className='confirmation-overlay fixed inset-0 bg-black bg-opacity-50 z-50'></div>
			<div className='confirmation-tooltip bg-white p-8 rounded-lg shadow-lg fixed top-1/2 left-1/2 w-[31rem] h-auto transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col'>
				<TutorialStepContent
					action={'How was your experience on Summary Page?'}
					explanation={
						'You could always come back via the help section on the header. '
					}
				></TutorialStepContent>
				<div className='pt-[3rem] flex flex-row items-center justify-end gap-[0.75rem]'>
					<div
						onClick={() => onClose()}
						className='h-10 px-2 py-0.5 bg-[#5168f6] rounded justify-center items-center gap-1.5 inline-flex cursor-pointer'
					>
						<span className='text-center text-zinc-100 text-base font-medium leading-none tracking-wide'>
							Next Section
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
