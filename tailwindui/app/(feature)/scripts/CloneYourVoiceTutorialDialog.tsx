import React, { useState } from 'react';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { useVoiceCloning } from './useVoiceCloning';

function CloneYourVoiceTutorial() {
	const [isOpen, setIsOpen] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	const {
		selectedLanguageCode,
		inputBoxText,
		recordedAudio,
		isRecordingRecord,
		recordTimeLeft,
		voiceName,
		handleLanguageChange,
		handleInputBoxChange,
		handleRecordAudio,
		handleCloneVoice,
		setVoiceName,
	} = useVoiceCloning();

	const handleOpen = () => {
		setIsOpen(true);
		setCurrentStep(1);
	};

	const handleClose = () => {
		setIsOpen(false);
		setCurrentStep(0);
	};

	const handleNextStep = () => {
		if (currentStep < stepData.length) {
			setCurrentStep((prevStep) => prevStep + 1);
		} else {
			handleClose();
		}
	};

	const handlePreviousStep = () => {
		if (currentStep > 1) {
			setCurrentStep((prevStep) => prevStep - 1);
		}
	};

	const stepData = [
		{
			title: 'Choose the language',
			description: (
				<select value={selectedLanguageCode} onChange={handleLanguageChange}>
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
					<Button onClick={handleNextStep} disabled={!selectedLanguageCode}>
						Next
					</Button>
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
					<Button onClick={handlePreviousStep}>Back</Button>
					<span>{`Step 2 of 3`}</span>
					{isRecordingRecord ? (
						<Button onClick={() => handleRecordAudio(false)}>
							Stop Recording ({recordTimeLeft}s)
						</Button>
					) : (
						<Button onClick={() => handleRecordAudio(false)}>
							<FaMicrophone /> Record
						</Button>
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
					<Button onClick={handlePreviousStep}>Back</Button>
					<span>{`Step 3 of 3`}</span>
					<Button onClick={handleCloneVoice} disabled={!voiceName}>
						Clone
					</Button>
				</>
			),
		},
	];

	return (
		<div>
			<ToastContainer />
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogTrigger asChild>
					<Button onClick={handleOpen}>
						<FaMicrophone className='mr-2 h-4 w-4' /> Clone your voice
					</Button>
				</AlertDialogTrigger>
				{currentStep > 0 && (
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{stepData[currentStep - 1]?.title}
							</AlertDialogTitle>
							<AlertDialogDescription>
								{stepData[currentStep - 1]?.description}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							{stepData[currentStep - 1]?.footer}
						</AlertDialogFooter>
					</AlertDialogContent>
				)}
			</AlertDialog>
		</div>
	);
}

export default CloneYourVoiceTutorial;
