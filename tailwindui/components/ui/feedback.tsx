'use client';


import React, { useEffect, useState } from 'react';
import ReferralLink from '../ReferralLink';
import Modal from './Modal';
import { BigBlueButton, InversedBigBlueButton } from '../button/DrlambdaButton';
import { useProject } from '@/hooks/use-project';
import { useUser } from '@/hooks/use-user';
import Laura from '@/public/images/laura.jpeg';
import Image from 'next/image';
import { Instruction } from './Text';
import UserService from '@/services/UserService';
import { getBrand } from '@/utils/getHost';
import { NewInputBox } from './InputBox';

interface FeedbackFormProps {
	onClose: () => void;
	message?: string;
	successDiv?: JSX.Element;
	textRequired?: boolean;
	instructionText?: string;
}

interface FeedbackButtonProps {
	displayText?: string;
	instructionText?: string;
	timeout?: number;
	message?: string;
	textRequired?: boolean;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
	displayText = 'Feedback',
	instructionText,
	timeout = 0,
	message = '',
	textRequired = false,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [timerFinished, setTimerFinished] = useState(false);

	const handleTimerCompletion = () => {
		setTimerFinished(true);
	};

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	// Start the timer when the component mounts
	useEffect(() => {
		if (timeout == 0) {
			// no timer
			return;
		}
		const timer = setTimeout(handleTimerCompletion, timeout); // 30 seconds

		// Clean up the timer when the component unmounts
		return () => clearTimeout(timer);
	}, []);

	// Check if the message prop is to open the modal
	useEffect(() => {
		if (message) {
			handleOpenModal();
		}
	}, [message]);

	// Check if the timer has finished before opening the modal
	useEffect(() => {
		if (timerFinished && window.location.hostname !== 'localhost') {
			handleOpenModal();
		}
	}, [timerFinished]);

	return (
		<div className='z-30'>
			<BigBlueButton onClick={handleOpenModal}>{displayText}</BigBlueButton>

			{showModal && (
				<FeedbackForm
					onClose={handleCloseModal}
					message={message}
					textRequired={textRequired}
					instructionText={instructionText}
				/>
			)}
		</div>
	);
};

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
	onClose,
	message,
	successDiv,
	textRequired,
	instructionText = 'Please leave your feedback below:',
}) => {
	const [rating, setRating] = useState<number>(0);
	const [feedbackText, setFeedbackText] = useState<string>('');
	const [submitSuccessful, setSubmitSuccessful] = useState<boolean>(false);
	const [ratingError, setRatingError] = useState<string | null>(null);
	const { project } = useProject();
	const { token } = useUser();

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
		// Clear the rating error when the user selects a rating.
		setRatingError(null);
	};

	const handleFeedbackTextChange = (
		text: string
	) => {
		setFeedbackText(text);
	};

	function getEmojiForStar(star: number) {
		switch (star) {
			case 5:
				return '😃'; // Happy Face
			case 4:
				return '😊'; // Smiling Face
			case 3:
				return '😐'; // Neutral Face
			case 2:
				return '😔'; // Sad Face
			case 1:
				return '😢'; // Crying Face
			default:
				return '⭐'; // Default Star
		}
	}

	function getEmojiForStarAndRating(star: number, rating: number) {
		if (rating === 0) {
			return getEmojiForStar(star);
		}
		if (star <= rating) {
			return getEmojiForStar(rating);
		}
		return '🌑';
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Check if rating is not 0 (meaning the user has selected a rating).
		if (rating === 0 && feedbackText === '') {
			setRatingError('Please select a rating.');
		} else if (feedbackText === '' && textRequired) {
			setRatingError('Please leave your feedback.');
		} else {
			try {
				const ok = await UserService.submitFeedback(
					rating,
					feedbackText,
					project?.id || '',
					token,
				);
				if (ok) {
					setSubmitSuccessful(true);
					setFeedbackText('');
					setRatingError(null);
				}
			} catch (error) {
				console.error('Error submitting feedbacks:', error);
			}
		}
	};

	if (!successDiv) {
		successDiv = (
			<div className='flex flex-col text-green-500'>
				<svg
					className='h-12 w-12 mx-auto mb-4'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M5 13l4 4L19 7'
					></path>
				</svg>
				<p className='text-xl font-semibold text-center'>
					Feedback submitted, thank you!
					{rating === 5 && (
						<div>
							<span> Share your 💚 for {getBrand()}:</span>
							<div className='mt-4'>
								<ReferralLink />
							</div>
						</div>
					)}
				</p>
			</div>
		);
	}

	return (
		<Modal
			showModal={true}
			setShowModal={onClose}
			width='400px'
		>
			<div className='bg-white'>
				{submitSuccessful ? (
					successDiv
				) : (
					<div>
						<div className='flex flex-row items-center justify-start gap-x-2'>
							<Image
								src={Laura}
								alt='Laura'
								width={30}
								height={30}
								style={{ borderRadius: '50%' }}
							/>
							<h3
								className='text-lg leading-6 font-bold text-gray-900'
								id='modal-headline'
							>
								{message ? message : `We'd love to hear from you!`}
							</h3>
						</div>
					</div>
				)}

				{submitSuccessful ? null : (
					<form onSubmit={handleSubmit} className='w-full mt-4'>
						<div className='mt-4'>
							<div className='flex items-center justify-center gap-x-4'>
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										type='button'
										onClick={() => handleRatingChange(star)}
										className={`text-5xl focus:outline-none hover:scale-110 transform transition-all`}
									>
										{getEmojiForStarAndRating(star, rating)}
									</button>
								))}
							</div>
							{ratingError && (
								<p className='text-red-500 text-sm mt-1'>{ratingError}</p>
							)}
						</div>
						<div className='mt-4'>
							<Instruction>
								{instructionText}
							</Instruction>
							{/* Increase the number of rows for the textarea to make it taller */}

							<NewInputBox
							  onChange={handleFeedbackTextChange}
								value={feedbackText}
								maxLength={2000}
								placeholder='Your feedback here...'
								textarea
							/>

						</div>
						<Instruction>
							Alternatively, book a meeting with me{' '}
							<a
								href='https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Ly0YZMnlcouxHwvv7cUsVLziVxNPfqNBoDl8H9D9ob6sn9-WMDg7Uu0ZTPzUlKjXFjmMBeJGS'
								className='underline text-blue-600'
							>
								here
							</a>
							.
						</Instruction>
						<div className='mt-4 flex justify-end gap-x-4'>
							<InversedBigBlueButton id='close-feedback' onClick={onClose}>
								Close
							</InversedBigBlueButton>

							<BigBlueButton id='submit-feedback' onClick={() => {}}>
								Submit
							</BigBlueButton>
						</div>
					</form>
				)}
			</div>
		</Modal>
	);
};

export default FeedbackButton;
