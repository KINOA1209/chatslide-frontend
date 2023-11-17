import React, { useEffect, useState } from 'react'
import AuthService from '../utils/AuthService'
import ReferralLink from '../ReferralLink'

interface FeedbackFormProps {
    onClose: () => void
}

interface FeedbackButtonProps {
    timeout?: number
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ timeout = 0 }) => {

    const [showModal, setShowModal] = useState(false);
    const [timerFinished, setTimerFinished] = useState(false)

    const handleTimerCompletion = () => {
        setTimerFinished(true)
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    // Start the timer when the component mounts
    useEffect(() => {
        if (timeout == 0){
            // no timer
            return 
        }
        const timer = setTimeout(handleTimerCompletion, timeout) // 30 seconds

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer)
    }, [])

    // Check if the timer has finished before opening the modal
    useEffect(() => {
        if (timerFinished && window.location.hostname !== 'localhost') {
            handleOpenModal()
        }
    }, [timerFinished])

    return <div className='fixed bottom-10 right-10 hidden sm:block'>
        <button
            onClick={handleOpenModal}
            className='bg-gray-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700'
        >
            Feedback
        </button>

        {showModal && <FeedbackForm onClose={handleCloseModal} />}
    </div>
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
    const [rating, setRating] = useState<number>(0)
    const [feedbackText, setFeedbackText] = useState<string>('')
    const [submitSuccessful, setSubmitSuccessful] = useState<boolean>(false)
    const [ratingError, setRatingError] = useState<string | null>(null)

    const handleRatingChange = (newRating: number) => {
        setRating(newRating)
        // Clear the rating error when the user selects a rating.
        setRatingError(null)
    }

    const handleFeedbackTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFeedbackText(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Check if rating is not 0 (meaning the user has selected a rating).
        if (rating === 0) {
            setRatingError('Please select a rating.')
        } else {
            try {
                const { userId, idToken: token } =
                    await AuthService.getCurrentUserTokenAndId()

                const headers = new Headers()
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`)
                }
                headers.append('Content-Type', 'application/json')

                const project_id = sessionStorage.getItem('project_id')
                const feedbackData = {
                    rating: rating,
                    feedbackText: feedbackText,
                    project_id: project_id,
                }

                const response = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(feedbackData), // Sending the data as JSON string in the request body
                })

                if (response.ok) {
                    // Show the success message and reset the form fields
                    setSubmitSuccessful(true)
                    setFeedbackText('')
                    // Clear the rating error after successful submission.
                    setRatingError(null)
                } else {
                    // Handle error cases
                    const data = await response.json()
                    console.error('Fail to submit ', data.message)
                }
            } catch (error) {
                console.error('Error submitting feedbacks:', error)
            }
        }
    }

    return (
        <div className='fixed bottom-5 right-5 hidden sm:block '>
            <div className='z-50 flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                {/* overlay that block clicking on screen */}
                <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
                    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>
                <span
                    className='hidden sm:inline-block sm:h-screen'
                    aria-hidden='true'
                >
                    &#8203;
                </span>
                <div
                    className='z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby='modal-headline'
                >
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 shadow-lg'>
                        {submitSuccessful ? (
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
                                            <span>
                                                {' '}
                                                Share your 💚 for DrLambda:
                                            </span>
                                            <div className='mt-4'>
                                                <ReferralLink />
                                            </div>
                                        </div>
                                    )}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h3
                                    className='text-lg leading-6 font-bold text-gray-900'
                                    id='modal-headline'
                                >
                                    Your Feedback
                                </h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    We'd love to hear from you! You can also send us an email at{' '}
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
                                    <div className='flex items-center justify-center'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type='button'
                                                onClick={() => handleRatingChange(star)}
                                                className={`${star <= rating ? 'text-yellow-500' : 'text-gray-400'
                                                    } text-5xl focus:outline-none`}
                                            >
                                                ★
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
                                    <button
                                        className='px-4 py-2 font-bold text-blue-500 rounded focus:outline-none'
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className='absolute top-2 right-2 text-gray-400 hover:text-gray-800 focus:outline-none'
                    >
                        <svg
                            className='h-6 w-6'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackButton
