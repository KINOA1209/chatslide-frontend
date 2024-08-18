'use client';

import {
	BigBlueButton,
	DropDown,
	InversedBigBlueButton,
} from '@/components/button/DrlambdaButton';
import Card from '@/components/ui/Card';
import { NewInputBox } from '@/components/ui/InputBox';
import {
	BigTitle,
	Instruction,
	Title,
	WarningMessage,
} from '@/components/ui/Text';
import { WrappableRow } from '@/components/layout/WrappableRow';
import { FaClone, FaTrash, FaMicrophone, FaStop } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';
import PaywallModal from '@/components/paywallModal';
import useHydrated from '@/hooks/use-hydrated';
import { Column } from '@/components/layout/Column';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVoiceCloning } from '../scripts/useVoiceCloning';
import LANGUAGES, {
	LANGUAGES_WITH_ACCENTS,
} from '@/components/language/languageData';

import {
	MIN_AUDIO_LENGTH,
	MAX_AUDIO_LENGTH,
	MIN_CONSENT_LENGTH,
	MAX_CONSENT_LENGTH,
} from '../scripts/useVoiceCloning';
import { useUser } from '@/hooks/use-user';
import { BlueLabel } from '@/components/ui/GrayLabel';
const VoiceCloning = () => {
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

	const { isProUser } = useUser();

	if (!useHydrated()) return <></>;

	const upgradeButton = (
		<BigBlueButton onClick={() => setShowPaywallModal(true)} width='8rem'>
			Upgrade
		</BigBlueButton>
	);

	return (
		<>
			<ToastContainer />
			<PaywallModal
				showModal={showPaywallModal}
				setShowModal={setShowPaywallModal}
				message='Upgrade to clone your voice!'
				trigger='studio/voice_cloning'
			/>
			<Card>
				<BigTitle>🎙️ Create a New Voice Profile</BigTitle>
				<Instruction>
					You can create a new voice profile by recording your voice and consent
					message. This can be used for generating videos with your voice.
					<br />
					This voice is only accessible to you and will not be shared with
					anyone else. You can also delete your voice profile at any time.
				</Instruction>

				{!isProUser ? (
					<BigBlueButton onClick={() => setShowPaywallModal(true)} width='16rem'>
						<div className='flex flex-row items-center'>
							<FaMicrophone className='mr-2 h-4 w-4' />{' '}
							<span className='whitespace-nowrap'>Clone your voice</span>
							<span className='ml-2'>
								<BlueLabel>PRO</BlueLabel>
							</span>
						</div>
					</BigBlueButton>
				) : (
					// step 1
					<Column width='100%'>
						<Title>Step 1</Title>
						<Instruction>
							Please also record the consent message below (English only):
						</Instruction>

						<NewInputBox
							onChange={(e) => setConsentText(e)}
							value={consentText}
							maxLength={2000}
							textarea
						/>
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

						{consentAudio && (
							<WrappableRow type='grid' cols={2}>
								<Instruction>Preview your consent recording:</Instruction>
								<audio controls className='mx-auto h-[36px] w-[16rem]'>
									<source
										src={URL.createObjectURL(consentAudio)}
										type='audio/wav'
									/>
								</audio>
							</WrappableRow>
						)}

						{consentAudio && (
							<BigBlueButton
								onClick={submitConsent}
								isSubmitting={isSubmittingConsent}
								disabled={isRecordingRecord || cloning || isRecordingConsent}
							>
								{isSubmittingConsent ? 'Verifying...' : 'Verify and Continue'}
							</BigBlueButton>
						)}
					</Column>
				)}

				{/* step 2 */}
				{consentId && (
					<Column width='100%'>
						<Title>Step 2</Title>
						<Instruction>
							Click the record button, and read the text below for at least{' '}
							{MIN_AUDIO_LENGTH}
							s. You can also edit the text if you want. You don't have to
							finish the whole text.
						</Instruction>

						<WrappableRow type='grid' cols={2}>
							<Instruction>Select a language:</Instruction>
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
						</WrappableRow>

						<NewInputBox
							onChange={handleInputBoxChange}
							value={inputBoxText}
							maxLength={2000}
							textarea
						/>
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

						{recordedAudio && (
							<WrappableRow type='grid' cols={2}>
								<Instruction>Preview your recording:</Instruction>
								<audio controls className='mx-auto h-[36px] w-[16rem]'>
									<source
										src={URL.createObjectURL(recordedAudio)}
										type='audio/wav'
									/>
								</audio>
							</WrappableRow>
						)}
					</Column>
				)}

				{audioLength >= MIN_AUDIO_LENGTH && consentId && (
					<Column width='100%'>
						<Title>Step 3</Title>
						<Instruction>
							Name your voice profile and click the clone button.
						</Instruction>
						<div className='flex flex-row items-center justify-center gap-x-2'>
							<NewInputBox
								placeholder='Enter a name'
								value={voiceName}
								maxLength={20}
								onChange={setVoiceName}
							/>
							<BigBlueButton
								width='8rem'
								onClick={handleCloneVoice}
								isSubmitting={cloning}
								disabled={
									audioLength < MIN_AUDIO_LENGTH ||
									cloning ||
									isRecordingConsent ||
									isRecordingRecord
								}
							>
								{cloning ? 'Cloning...' : 'Clone'}
							</BigBlueButton>
						</div>
					</Column>
				)}
			</Card>

			<Card>
				<BigTitle>📂 Existing Voice Profiles</BigTitle>

				<Instruction>
					Here is a list of all your voice profiles. You can select one voice
					profile when you are generating video.
				</Instruction>

				{voiceProfiles.length > 0 && (
					<WrappableRow type='grid' cols={2}>
						<Instruction> Select a voice profile:</Instruction>
						<WrappableRow type='flex'>
							<DropDown
								onChange={handleProfileChange}
								value={selectedProfile?.name || ''}
							>
								{voiceProfiles.map((profile) => (
									<option key={profile.voice_id} value={profile.name}>
										{profile.name}
									</option>
								))}
							</DropDown>
							<InversedBigBlueButton
								onClick={handleDeleteProfile}
								disabled={loading}
								width='4rem'
							>
								Delete
							</InversedBigBlueButton>
						</WrappableRow>
					</WrappableRow>
				)}

				{selectedProfile ? (
					<>
						<WrappableRow type='grid' cols={2}>
							<Instruction> Select a language:</Instruction>
							<WrappableRow type='flex'>
								<DropDown
									value={selectedTestLanguageCode}
									onChange={(e) => {
										setSelectedTestLanguageCode(e.target.value);
										setCustomRecording('');
									}}
								>
									{LANGUAGES.map((lang) => (
										<option key={lang.code} value={lang.code}>
											{lang.displayName}
										</option>
									))}
								</DropDown>
							</WrappableRow>
						</WrappableRow>

						<Instruction>Add some example text to test the voice:</Instruction>
						<NewInputBox
							placeholder='Enter text to preview voice'
							value={customerInput}
							maxLength={2000}
							onChange={(element) => {
								setCustomRecording('');
								setCustomerInput(element);
							}}
							textarea
						/>
						<BigBlueButton onClick={handleGenerateVoice} disabled={generating}>
							{generating ? (
								<>Generating...</>
							) : (
								<>
									<FiPlay /> Test
								</>
							)}
						</BigBlueButton>
						{customRecording && (
							<audio controls className='mx-auto h-[36px] w-[16rem]'>
								<source src={customRecording} type='audio/webm' />
							</audio>
						)}
					</>
				) : (
					<p>
						🤔️ No voice profiles found. Please create a voice profile using the
						section above.
					</p>
				)}
			</Card>
		</>
	);
};

export default VoiceCloning;
