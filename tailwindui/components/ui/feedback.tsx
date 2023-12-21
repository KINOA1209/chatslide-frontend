import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import ReferralLink from '../ReferralLink';
import Modal from './Modal';
import { BigBlueButton, InversedBigBlueButton } from '../button/DrlambdaButton';

interface FeedbackFormProps {
	onClose: () => void;
	message?: string;
	successDiv?: JSX.Element;
	textRequired?: boolean;
}

interface FeedbackButtonProps {
	timeout?: number;
	message?: string;
	textRequired?: boolean;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
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
		<div className='fixed bottom-10 right-10 hidden sm:block z-30'>
			<button
				onClick={handleOpenModal}
				className='bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700'
			>
				Feedback
			</button>

			{showModal && (
				<FeedbackForm
					onClose={handleCloseModal}
					message={message}
					textRequired={textRequired}
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
}) => {
	const [rating, setRating] = useState<number>(0);
	const [feedbackText, setFeedbackText] = useState<string>('');
	const [submitSuccessful, setSubmitSuccessful] = useState<boolean>(false);
	const [ratingError, setRatingError] = useState<string | null>(null);

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
		// Clear the rating error when the user selects a rating.
		setRatingError(null);
	};

	const handleFeedbackTextChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setFeedbackText(event.target.value);
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
		if (rating === 0) {
			setRatingError('Please select a rating.');
		} else if (feedbackText === '' && textRequired) {
			setRatingError('Please leave your feedback.');
		} else {
			try {
				const { userId, idToken: token } =
					await AuthService.getCurrentUserTokenAndId();

				const headers = new Headers();
				if (token) {
					headers.append('Authorization', `Bearer ${token}`);
				}
				headers.append('Content-Type', 'application/json');

				const project_id = sessionStorage.getItem('project_id');
				const feedbackData = {
					rating: rating,
					feedbackText: feedbackText,
					project_id: project_id,
				};

				const response = await fetch('/api/feedback', {
					method: 'POST',
					headers: headers,
					body: JSON.stringify(feedbackData), // Sending the data as JSON string in the request body
				});

				if (response.ok) {
					// Show the success message and reset the form fields
					setSubmitSuccessful(true);
					setFeedbackText('');
					// Clear the rating error after successful submission.
					setRatingError(null);
				} else {
					// Handle error cases
					const data = await response.json();
					console.error('Fail to submit ', data.message);
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
							<span> Share your 💚 for DrLambda:</span>
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
			position='fixed bottom-5 right-5'
		>
			<div className='bg-white'>
				{submitSuccessful ? (
					successDiv
				) : (
					<div>
						<h3
							className='text-lg leading-6 font-bold text-gray-900'
							id='modal-headline'
						>
							{message ? message : `We'd love to hear from you!`}
						</h3>
						<p className='text-sm text-gray-500 mt-2'>
							You can also send us an email at{' '}
							<a href='mailto:contact@drlambda.ai' className='underline'>
								contact@drlambda.ai
							</a>
							.
						</p>
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
							<label className='block text-gray-700 text-sm font-bold mb-2'>
								Please leave your feedback below:
							</label>
							{/* Increase the number of rows for the textarea to make it taller */}
							<textarea
								className='resize-none w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
								rows={3} // Increase the number of rows here to make the text field larger
								value={feedbackText}
								onChange={handleFeedbackTextChange}
							></textarea>
						</div>
						<div className='mt-4 flex justify-end gap-x-4'>
							<InversedBigBlueButton onClick={onClose}>
								Close
							</InversedBigBlueButton>

							<BigBlueButton onClick={() => {}}>Submit</BigBlueButton>
						</div>
					</form>
				)}
			</div>
		</Modal>
	);
};

export default FeedbackButton;
