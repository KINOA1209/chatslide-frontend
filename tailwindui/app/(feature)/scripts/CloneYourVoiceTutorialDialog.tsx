import React, { useState } from 'react';
// import {
// 	AlertDialog,
// 	AlertDialogContent,
// 	AlertDialogDescription,
// 	AlertDialogFooter,
// 	AlertDialogHeader,
// 	AlertDialogTitle,
// 	AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { FaChevronLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { useVoiceCloning } from './useVoiceCloning';
import {
	MIN_AUDIO_LENGTH,
	MAX_AUDIO_LENGTH,
	MIN_CONSENT_LENGTH,
	MAX_CONSENT_LENGTH,
} from '../scripts/useVoiceCloning';
import LANGUAGES, {
	LANGUAGES_WITH_ACCENTS,
} from '@/components/language/languageData';
import { NewInputBox } from '@/components/ui/InputBox';
import {
	BigBlueButton,
	DropDown,
	InversedBigBlueButton,
} from '@/components/button/DrlambdaButton';
import { WrappableRow } from '@/components/layout/WrappableRow';
import { Instruction } from '@/components/ui/Text';
import { FiPlay } from 'react-icons/fi';
import CustomAudioPlayer from './CustomAudioPlayer';
import { BlueLabel } from '@/components/ui/GrayLabel';
import { useUser } from '@/hooks/use-user';
import { getTierDisplayName } from '@/components/layout/SideBar';
function CloneYourVoiceTutorial() {
	const [isOpen, setIsOpen] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const { token, credits, tier, userStatus, expirationDate } = useUser();

	const {
		selectedLanguageCode,
		selectedTestLanguageCode,
		inputBoxText,
		recordedAudio,
		consentAudio,
		isRecordingRecord,
		isRecordingConsent,
		recordTimeLeft,
		consentTimeLeft,
		audioLength,
		voiceProfiles,
		selectedProfile,
		voiceName,
		customRecording,
		customerInput,
		loading,
		generating,
		cloning,
		showPaywallModal,
		isSubmittingConsent,
		consentId,
		consentText,
		handleLanguageChange,
		handleInputBoxChange,
		handleRecordAudio,
		submitConsent,
		handleCloneVoice,
		handleGenerateVoice,
		handleProfileChange,
		handleDeleteProfile,
		setVoiceName,
		setCustomerInput,
		setShowPaywallModal,
		setConsentText,
		setSelectedTestLanguageCode,
		setCustomRecording,
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
			title: 'Record consent message',
			description: (
				// <select value={selectedLanguageCode} onChange={handleLanguageChange}>
				// 	<option value='' disabled>
				// 		Select a language
				// 	</option>
				// 	<option value='en'>English</option>
				// 	<option value='es'>Spanish</option>
				// 	<option value='zh'>Chinese</option>
				// 	{/* Add more languages as needed */}
				// </select>
				<>
					<NewInputBox
						onChange={(e) => setConsentText(e)}
						value={consentText}
						maxLength={2000}
						textarea
						textStyle={{
							color: '#000000',
							fontFamily: 'Inter Medium',
							fontSize: '12px',
							fontStyle: 'normal',
							fontWeight: 'normal',
							lineHeight: '18px',
						}}
					/>
				</>
			),
			footer: (
				<>
					{/* back and step display */}
					<div className='flex flex-row gap-[32px] items-center'>
						<BigBlueButton
							disabled={
								isRecordingRecord ||
								cloning ||
								isSubmittingConsent ||
								(isRecordingConsent &&
									consentTimeLeft > MAX_CONSENT_LENGTH - MIN_CONSENT_LENGTH)
							}
							onClick={() => handleRecordAudio(true)}
						>
							{isRecordingConsent ? (
								<span className='flex flex-row gap-x-2 items-center whitespace-nowrap'>
									<FaStop /> Stop Recording ({consentTimeLeft}s)
								</span>
							) : (
								<>
									<FaMicrophone /> Record
								</>
							)}
						</BigBlueButton>
						<span
							style={{
								color: 'var(--colors-text-text-quaternary-500, #667085)',
								fontFamily: 'Inter Medium',
								fontSize: '14px',
								fontStyle: 'normal',
								fontWeight: 'normal',
								lineHeight: '20px',
								whiteSpace: 'nowrap',
							}}
						>{`1 of 4`}</span>
					</div>

					<Button
						disabled={!consentAudio}
						onClick={handleNextStep}
						variant={'DrLambdaPrimary'}
						className='text-sm'
					>
						Next
					</Button>
				</>
			),
		},
		{
			title: 'Preview and Verify consent recording',
			description: (
				<> {consentAudio && <CustomAudioPlayer audioFile={consentAudio} />}</>
			),
			footer: (
				<>
					{/* <Button onClick={handlePreviousStep}>Back</Button>
					<span>{`Step 2 of 3`}</span>
					{isRecordingRecord ? (
						<Button onClick={() => handleRecordAudio(false)}>
							Stop Recording ({recordTimeLeft}s)
						</Button>
					) : (
						<Button onClick={() => handleRecordAudio(false)}>
							<FaMicrophone /> Record
						</Button>
					)} */}
					<>
						<div className='flex flex-row gap-[32px] items-center'>
							{consentAudio && (
								<BigBlueButton
									onClick={submitConsent}
									isSubmitting={isSubmittingConsent}
									disabled={isRecordingRecord || cloning || isRecordingConsent}
								>
									{isSubmittingConsent ? 'Verifying...' : 'Verify and Continue'}
								</BigBlueButton>
							)}
							<Button
								onClick={handlePreviousStep}
								variant={'defaultWhiteBgNoBorder'}
							>
								<FaChevronLeft className='text-[#344054]' />
							</Button>
							<span
								style={{
									color: 'var(--colors-text-text-quaternary-500, #667085)',
									fontFamily: 'Inter Medium',
									fontSize: '14px',
									fontStyle: 'normal',
									fontWeight: 'normal',
									lineHeight: '20px',
									whiteSpace: 'nowrap',
								}}
							>{`2 of 4`}</span>
						</div>

						<Button
							disabled={!consentId}
							onClick={handleNextStep}
							variant={'DrLambdaPrimary'}
							className='text-sm'
						>
							Next
						</Button>
					</>
				</>
			),
		},
		{
			title: 'Record your voice',
			description: (
				<>
					{consentId && (
						<div className='flex flex-col gap-[16px]'>
							<Instruction>
								Click the record button, and read the text below for at least{' '}
								{MIN_AUDIO_LENGTH}
								s. You can also edit the text if you want. You don't have to
								finish the whole text.
							</Instruction>

							{/* <WrappableRow type='flex'> */}
							<div className='flex flex-col gap-[8px]'>
								{' '}
								<p
									style={{
										color: 'var(--colors-text-text-secondary-700, #344054)',
										fontFamily: 'Inter Semibold',
										fontSize: '14px',
										fontStyle: 'normal',
										fontWeight: 'bold',
										lineHeight: '20px',
									}}
								>
									Select a language:
								</p>
								<DropDown
									value={selectedLanguageCode}
									onChange={handleLanguageChange}
								>
									{LANGUAGES.map((lang) => (
										<option key={lang.code} value={lang.code}>
											{lang.displayName}
										</option>
									))}
								</DropDown>
							</div>

							{/* </WrappableRow> */}

							<NewInputBox
								onChange={handleInputBoxChange}
								value={inputBoxText}
								maxLength={2000}
								textarea
								textStyle={{
									color: '#000000',
									fontFamily: 'Inter Medium',
									fontSize: '12px',
									fontStyle: 'normal',
									fontWeight: 'normal',
									lineHeight: '18px',
								}}
							/>
						</div>
					)}
				</>
			),
			footer: (
				<>
					<div className='flex flex-row gap-[32px] items-center'>
						<BigBlueButton
							disabled={
								isRecordingConsent ||
								cloning ||
								isSubmittingConsent ||
								(isRecordingRecord &&
									MAX_AUDIO_LENGTH - recordTimeLeft < MIN_AUDIO_LENGTH)
							}
							onClick={() => handleRecordAudio(false)}
						>
							{isRecordingRecord ? (
								<span className='flex flex-row gap-x-2 items-center whitespace-nowrap'>
									<FaStop /> Stop Recording ({recordTimeLeft}s)
								</span>
							) : (
								<>
									<FaMicrophone /> Record
								</>
							)}
						</BigBlueButton>
						<Button
							onClick={handlePreviousStep}
							variant={'defaultWhiteBgNoBorder'}
						>
							<FaChevronLeft className='text-[#344054]' />
						</Button>
						<span
							style={{
								color: 'var(--colors-text-text-quaternary-500, #667085)',
								fontFamily: 'Inter Medium',
								fontSize: '14px',
								fontStyle: 'normal',
								fontWeight: 'normal',
								lineHeight: '20px',
								whiteSpace: 'nowrap',
							}}
						>{`3 of 4`}</span>
					</div>

					<Button
						disabled={!(audioLength >= MIN_AUDIO_LENGTH && consentId)}
						onClick={handleNextStep}
						variant={'DrLambdaPrimary'}
						className='text-sm'
					>
						Next
					</Button>
				</>
			),
		},
		{
			title: 'Preview your recording, and clone the voice.',
			description: (
				<>
					{recordedAudio && <CustomAudioPlayer audioFile={recordedAudio} />}

					<NewInputBox
						placeholder='Name your voice'
						value={voiceName}
						maxLength={20}
						onChange={setVoiceName}
						textStyle={{
							color: '#000000',
							fontFamily: 'Inter Medium',
							fontSize: '12px',
							fontStyle: 'normal',
							fontWeight: 'normal',
							lineHeight: '18px',
						}}
					/>
				</>
			),
			footer: (
				<>
					<div className='flex flex-row gap-[32px] items-center'>
						<Button
							onClick={handlePreviousStep}
							variant={'defaultWhiteBgNoBorder'}
							className='text-sm'
						>
							<FaChevronLeft className='text-[#344054]' />
						</Button>
						<span
							style={{
								color: 'var(--colors-text-text-quaternary-500, #667085)',
								fontFamily: 'Inter Medium',
								fontSize: '14px',
								fontStyle: 'normal',
								fontWeight: 'normal',
								lineHeight: '20px',
								whiteSpace: 'nowrap',
							}}
						>{`4 of 4`}</span>
					</div>

					{/* <Button disabled={!(audioLength >= MIN_AUDIO_LENGTH && consentId)}>
						Clone
					</Button> */}
					<BigBlueButton
						width='8rem'
						onClick={handleCloneVoice}
						isSubmitting={cloning}
						disabled={
							audioLength < MIN_AUDIO_LENGTH ||
							cloning ||
							isRecordingConsent ||
							isRecordingRecord ||
							!voiceName
						}
					>
						{cloning ? 'Cloning...' : 'Clone'}
					</BigBlueButton>
				</>
			),
		},
		// {
		// 	title: 'Test voices',
		// 	description: (
		// 		<>
		// 			<Instruction> Select a voice profile:</Instruction>
		// 			<WrappableRow type='flex'>
		// 				<DropDown
		// 					onChange={handleProfileChange}
		// 					value={selectedProfile?.name || ''}
		// 				>
		// 					{voiceProfiles.map((profile) => (
		// 						<option key={profile.voice_id} value={profile.name}>
		// 							{profile.name}
		// 						</option>
		// 					))}
		// 				</DropDown>
		// 				<InversedBigBlueButton
		// 					onClick={handleDeleteProfile}
		// 					disabled={loading}
		// 					width='4rem'
		// 				>
		// 					Delete
		// 				</InversedBigBlueButton>
		// 			</WrappableRow>
		// 			{selectedProfile ? (
		// 				<>
		// 					<WrappableRow type='grid' cols={2}>
		// 						<Instruction> Select a language:</Instruction>
		// 						<WrappableRow type='flex'>
		// 							<DropDown
		// 								value={selectedTestLanguageCode}
		// 								onChange={(e) => {
		// 									setSelectedTestLanguageCode(e.target.value);
		// 									setCustomRecording('');
		// 								}}
		// 							>
		// 								{LANGUAGES.map((lang) => (
		// 									<option key={lang.code} value={lang.code}>
		// 										{lang.displayName}
		// 									</option>
		// 								))}
		// 							</DropDown>
		// 						</WrappableRow>
		// 					</WrappableRow>

		// 					<Instruction>
		// 						Add some example text to test the voice:
		// 					</Instruction>
		// 					<NewInputBox
		// 						placeholder='Enter text to preview voice'
		// 						value={customerInput}
		// 						maxLength={2000}
		// 						onChange={(element) => {
		// 							setCustomRecording('');
		// 							setCustomerInput(element);
		// 						}}
		// 						textarea
		// 					/>
		// 					<BigBlueButton
		// 						onClick={handleGenerateVoice}
		// 						disabled={generating}
		// 					>
		// 						{generating ? (
		// 							<>Generating...</>
		// 						) : (
		// 							<>
		// 								<FiPlay /> Test
		// 							</>
		// 						)}
		// 					</BigBlueButton>
		// 					{customRecording && (
		// 						<audio controls className='mx-auto h-[36px] w-[16rem]'>
		// 							<source src={customRecording} type='audio/webm' />
		// 						</audio>
		// 					)}
		// 				</>
		// 			) : (
		// 				<p>
		// 					🤔️ No voice profiles found. Please create a voice profile using
		// 					the section above.
		// 				</p>
		// 			)}
		// 		</>
		// 	),
		// 	footer: (
		// 		<>
		// 			<Button onClick={handlePreviousStep}>Back</Button>
		// 			<span>{`Step 5 of 5`}</span>
		// 			<BigBlueButton width='8rem' onClick={handleClose}>
		// 				<span>Finish</span>
		// 			</BigBlueButton>
		// 		</>
		// 	),
		// },
	];

	return (
		<div>
			<ToastContainer />
			{/* <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogTrigger asChild>
					<Button onClick={handleOpen}>
						<FaMicrophone className='mr-2 h-4 w-4' /> Clone your voice
						<FaMicrophone className='ml-2 h-4 w-4' />
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
			</AlertDialog> */}
			<Dialog>
				<DialogTrigger asChild>
					<Button onClick={handleOpen} variant={'DrLambdaPrimary'}>
						<div className='flex flex-row items-center'>
							<FaMicrophone className='mr-2 h-4 w-4' />{' '}
							<span>Clone your voice</span>
							<span className='ml-2'>
								<BlueLabel>{getTierDisplayName(tier, false)}</BlueLabel>
							</span>
						</div>
					</Button>
				</DialogTrigger>
				{currentStep > 0 && (
					<DialogContent>
						<p
							className='border-b-2'
							style={{
								color: 'var(--colors-text-text-secondary-700, #344054)',
								fontFamily: 'Inter Semibold',
								fontSize: '14px',
								fontStyle: 'normal',
								fontWeight: 'bold',
								lineHeight: '20px',
								paddingBottom: '16px',
							}}
						>
							🎙️ Clone your voice
						</p>
						<DialogHeader className=''>
							<DialogTitle>
								<span
									style={{
										color: 'var(--colors-text-text-secondary-700, #344054)',
										fontFamily: 'Inter Semibold',
										fontSize: '14px',
										fontStyle: 'normal',
										fontWeight: 'bold',
										lineHeight: '20px',
										paddingTop: '16px',
									}}
								>
									{stepData[currentStep - 1]?.title}
								</span>
							</DialogTitle>
							<DialogDescription>
								{stepData[currentStep - 1]?.description}
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className='sm:justify-between items-center'>
							{stepData[currentStep - 1]?.footer}
						</DialogFooter>
					</DialogContent>
				)}
			</Dialog>
		</div>
	);
}

export default CloneYourVoiceTutorial;
