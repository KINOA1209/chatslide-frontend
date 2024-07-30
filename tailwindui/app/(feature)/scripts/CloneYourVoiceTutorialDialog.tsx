import React, { useState, useEffect } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CloneYourVoiceTutorial() {
	const [isOpen, setIsOpen] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [isRecording, setIsRecording] = useState(false);
	const [remainingSeconds, setRemainingSeconds] = useState(10); // Example remaining seconds for recording
	const [voiceName, setVoiceName] = useState('');

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	const handleNextStep = () => {
		setCurrentStep((prevStep) => prevStep + 1);
	};

	const handlePreviousStep = () => {
		setCurrentStep((prevStep) => prevStep - 1);
	};

	const handleStartRecording = () => {
		setIsRecording(true);
		// Mock recording countdown
		const interval = setInterval(() => {
			setRemainingSeconds((prev) => {
				if (prev === 1) {
					clearInterval(interval);
					handleStopRecording();
					return prev;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const handleStopRecording = () => {
		setIsRecording(false);
		toast.success('Finished recording!');
		handleNextStep();
	};

	const handleCloneVoice = () => {
		toast.success('New voice cloned!');
		handleClose();
		setCurrentStep(1);
		setSelectedLanguage('');
		setVoiceName('');
	};

	const stepData = [
		{
			title: 'Choose the language',
			description: (
				<select
					value={selectedLanguage}
					onChange={(e) => setSelectedLanguage(e.target.value)}
				>
					<option value='' disabled>
						Select a language
					</option>
					<option value='en'>English</option>
					<option value='es'>Spanish</option>
					<option value='zh'>Chinese</option>
					{/* Add more languages as needed */}
				</select>
			),
			footer: (
				<>
					<span>{`Step 1 of 3`}</span>
					<AlertDialogAction
						onClick={handleNextStep}
						disabled={!selectedLanguage}
					>
						Next
					</AlertDialogAction>
				</>
			),
		},
		{
			title: 'Recording',
			description: (
				<textarea readOnly rows={5} cols={33}>
					Please read the following text...
					{/* Include the text to be read for recording */}
				</textarea>
			),
			footer: (
				<>
					<button onClick={handlePreviousStep}>Back</button>
					<span>{`Step 2 of 3`}</span>
					{isRecording ? (
						<AlertDialogAction onClick={handleStopRecording}>
							Stop Recording ({remainingSeconds}s)
						</AlertDialogAction>
					) : (
						<AlertDialogAction onClick={handleStartRecording}>
							Record
						</AlertDialogAction>
					)}
				</>
			),
		},
		{
			title: 'Clone Your Voice',
			description: (
				<div>
					<p>Preview your recorded voice</p>
					{/* Add an audio player to preview the recorded voice */}
					<audio controls>
						<source src='path_to_recorded_voice' type='audio/wav' />
						Your browser does not support the audio element.
					</audio>
					<div>
						<label htmlFor='voiceName'>Voice Name:</label>
						<input
							id='voiceName'
							type='text'
							value={voiceName}
							onChange={(e) => setVoiceName(e.target.value)}
						/>
					</div>
				</div>
			),
			footer: (
				<>
					<button onClick={handlePreviousStep}>Back</button>
					<span>{`Step 3 of 3`}</span>
					<AlertDialogAction onClick={handleCloneVoice} disabled={!voiceName}>
						Clone
					</AlertDialogAction>
				</>
			),
		},
	];

	return (
		<div>
			<ToastContainer />
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogTrigger onClick={handleOpen}>Open</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{stepData[currentStep - 1].title}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{stepData[currentStep - 1].description}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						{stepData[currentStep - 1].footer}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default CloneYourVoiceTutorial;
