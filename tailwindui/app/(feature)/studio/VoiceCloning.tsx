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
import { BetaLabel, GrayLabel, ProLabel } from '@/components/ui/GrayLabel';
import { useState, useRef, useEffect } from 'react';
import { readingData } from './readingData';
import LANGUAGES, {
	LANGUAGES_WITH_ACCENTS,
} from '@/components/language/languageData';
import VoiceCloneService from '@/services/VoiceService';
import { useUser } from '@/hooks/use-user';
import VoiceProfile from '@/models/VoiceProfile';
import { toast } from 'react-toastify';
import { WrappableRow } from '@/components/layout/WrappableRow';
import { FaClone, FaTrash, FaMicrophone, FaStop } from 'react-icons/fa';
import PaywallModal from '@/components/paywallModal';
import useHydrated from '@/hooks/use-hydrated';
import { FiPlay } from 'react-icons/fi';
import { getBrand } from '@/utils/getHost';
import { Column } from '@/components/layout/Column';
import { convertToWav } from '@/utils/wav';

const MIN_AUDIO_LENGTH = 10;

const VoiceCloning = () => {
	const [selectedLanguageCode, setSelectedLanguageCode] =
		useState<string>('en-US');
	const [selectedTestLanguageCode, setSelectedTestLanguageCode] =
		useState<string>('en-US');
	const [inputBoxText, setInputBoxText] = useState<string>(
		readingData['en-US'],
	);
	const { username } = useUser();
	const [recordedAudio, setRecordedAudio] = useState<null | Blob>(null);
	const [consentAudio, setConsentAudio] = useState<null | Blob>(null);
	const [isRecordingRecord, setIsRecordingRecord] = useState<boolean>(false);
	const [isRecordingConsent, setIsRecordingConsent] = useState<boolean>(false);
	const [recordTimeLeft, setRecordTimeLeft] = useState<number>(60);
	const [consentTimeLeft, setConsentTimeLeft] = useState<number>(20);
	const [audioLength, setAudioLength] = useState<number>(0); // only applies to recordedAudio
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const { token, tier } = useUser();
	const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>([]);
	const [selectedProfile, setSelectedProfile] = useState<VoiceProfile | null>(
		null,
	);
	const [voiceName, setVoiceName] = useState<string>('');
	const [customRecording, setCustomRecording] = useState<string>('');
	const [customerInput, setCustomerInput] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [generating, setGenerating] = useState(false);
	const [cloning, setCloning] = useState(false);
	const [showPaywallModal, setShowPaywallModal] = useState(false);

	const [isSubmittingConsent, setIsSubmittingConsent] =
		useState<boolean>(false);
	const [consentId, setConsentId] = useState<string>('');

	const [consentText, setConsentText] = useState<string>(
		`I, ${username}, am aware that the recording of my voice will be used by ${getBrand()} to create and use a synthetic version of my voice.`,
	);

	async function submitConsent() {
		setIsSubmittingConsent(true);
		const consentAudioBlob = await convertToWav(consentAudio!);
		const consentAudioFile = new File([consentAudioBlob], 'consent.wav', {
			type: 'audio/wav',
		});
		VoiceCloneService.submitConsent(username, consentAudioFile, token)
			.then((consentId) => {
				toast.success('Consent verified successfully!');
				setConsentId(consentId);
				console.log('Consent ID:', consentId);
			})
			.catch((error: any) => {
				console.error('Error submitting consent:', error.message);
				toast.error(`Failed to submit consent: ${error.message}`);
			})
			.finally(() => {
				setIsSubmittingConsent(false);
				setAudioLength(0); // for the next audio
			});
	}

	const fetchVoiceProfiles = async () => {
		try {
			const profiles = await VoiceCloneService.getVoiceProfiles(token);
			setVoiceProfiles(profiles);
			if (profiles.length > 0) {
				setSelectedProfile(profiles[0]);
			}
		} catch (error: any) {
			console.error('Error fetching voice profiles:', error.message);
		}
	};

	useEffect(() => {
		fetchVoiceProfiles();
	}, [token]);

	const handleLanguageChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const code = event.target.value;
		setSelectedLanguageCode(code);
		setInputBoxText(readingData[code]);
	};

	const handleInputBoxChange = (value: string) => {
		setInputBoxText(value);
	};

	const handleRecordAudio = async (isConsentAudio = false) => {
		if (isRecordingRecord) {
			mediaRecorderRef.current?.stop();
			mediaRecorderRef.current?.stream
				.getTracks()
				.forEach((track) => track.stop()); // Stop all tracks
			setIsRecordingRecord(false);
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
				setAudioLength(60 - recordTimeLeft);
			}
			setRecordTimeLeft(60);
		} else if (isRecordingConsent) {
			mediaRecorderRef.current?.stop();
			mediaRecorderRef.current?.stream
				.getTracks()
				.forEach((track) => track.stop()); // Stop all tracks
			setIsRecordingConsent(false);
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
				setAudioLength(20 - consentTimeLeft);
			}
			setConsentTimeLeft(20);
		} else {
			if (!isConsentAudio) setRecordedAudio(null);
			else setConsentAudio(null);
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorderRef.current = new MediaRecorder(stream);
			audioChunksRef.current = [];
			mediaRecorderRef.current.ondataavailable = (event) => {
				audioChunksRef.current.push(event.data);
			};
			mediaRecorderRef.current.onstop = async () => {
				const audioBlob = new Blob(audioChunksRef.current, {
					type: 'audio/webm',
				});
				const audioBlobWav = await convertToWav(audioBlob);
				if (!isConsentAudio) setRecordedAudio(audioBlobWav);
				else setConsentAudio(audioBlobWav);
				audioChunksRef.current = [];
				stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
			};
			mediaRecorderRef.current.start();
			if (!isConsentAudio) setIsRecordingRecord(true);
			else setIsRecordingConsent(true);

			timerRef.current = setInterval(() => {
				if (isConsentAudio) {
					setConsentTimeLeft((prevTime) => {
						if (prevTime <= 1) {
							mediaRecorderRef.current?.stop();
							setConsentAudio(null);
							setIsRecordingConsent(false);
							clearInterval(timerRef.current!);
							timerRef.current = null;
							setConsentTimeLeft(20);
							return 20;
						}
						return prevTime - 1;
					});
				} else {
					setRecordTimeLeft((prevTime) => {
						if (prevTime <= 1) {
							mediaRecorderRef.current?.stop();
							setRecordedAudio(null);
							setIsRecordingRecord(false);
							clearInterval(timerRef.current!);
							timerRef.current = null;
							setRecordTimeLeft(60);
							return 60;
						}
						return prevTime - 1;
					});
				}
			}, 1000);
		}
	};

	const handleCloneVoice = async () => {
		if (voiceName.trim() === '') {
			toast.error('Please enter a name for the voice profile.');
			return;
		}

		if (!tier.includes('ULTIMATE') && !tier.includes('PRO')) {
			setShowPaywallModal(true);
			return;
		}

		if (!recordedAudio) {
			toast.error('Please record both your voice and consent audio.');
			return;
		}

		if (audioLength < MIN_AUDIO_LENGTH) {
			toast.error(
				`Please record at least ${MIN_AUDIO_LENGTH} seconds of audio.`,
			);
			return;
		}

		try {
			setCloning(true);
			const trainingAudioBlob = await convertToWav(recordedAudio);
			const trainingRecordFile = new File([trainingAudioBlob], 'training.wav', {
				type: 'audio/wav',
			});
			const response = await VoiceCloneService.cloneVoice(
				consentId,
				trainingRecordFile,
				voiceName,
				token,
			);
			toast.success('Voice cloned successfully!');
			await fetchVoiceProfiles();
		} catch (error: any) {
			console.error('Error cloning voice:', error.message);
			toast.error(`Failed to clone voice: ${error.message}`);
		} finally {
			setCloning(false);
		}
	};

	const handleGenerateVoice = async () => {
		setGenerating(true);
		try {
			setCustomRecording('');
			const result = await VoiceCloneService.generateVoice(
				selectedProfile?.voice_id || '',
				customerInput,
				selectedTestLanguageCode,
				token,
			);
			setCustomRecording(result.audio_url);
		} catch (error: any) {
			console.error('Error generating voice:', error.message);
		} finally {
			setGenerating(false);
		}
	};

	const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const profile = voiceProfiles.find(
			(profile) => profile.name === event.target.value,
		);
		setSelectedProfile(profile || null);
		setCustomRecording('');
	};

	const handleDeleteProfile = async () => {
		if (selectedProfile) {
			setVoiceProfiles(
				voiceProfiles.filter(
					(profile) => profile.voice_id !== selectedProfile.voice_id,
				),
			);
			try {
				setLoading(true);
				await VoiceCloneService.deleteVoiceProfile(
					selectedProfile.voice_id,
					token,
				);
				setSelectedProfile(null);
				setCustomRecording('');
				await fetchVoiceProfiles();
			} catch (error: any) {
				console.error('Error deleting voice profile:', error.message);
			} finally {
				setLoading(false);
			}
		}
	};

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<>
			<PaywallModal
				showModal={showPaywallModal}
				setShowModal={setShowPaywallModal}
				message='Upgrade to get an early access to Beta features. 🚀'
			/>
			<Card>
				<BigTitle>🎙️ Create a New Voice Profile</BigTitle>
				<Instruction>
					You can create a new voice profile by recording your voice and consent
					message. This can be used for generating videos with your voice.{' '}
					<br />
					This voice is only accessible to you and will not be shared with
					anyone else. You can also delete your voice profile at any time.
				</Instruction>

				<Column>
					<Title>Step 1</Title>
					<Instruction>
						Please also record the consent message below (English only):
					</Instruction>

					<NewInputBox
						onChange={(e) => {
							setConsentText(e);
						}}
						value={consentText}
						maxLength={2000}
						textarea
					/>
					<BigBlueButton
						disabled={
							isRecordingRecord ||
							cloning ||
							isSubmittingConsent ||
							(isRecordingConsent && consentTimeLeft > 20 - MIN_AUDIO_LENGTH)
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
							<audio controls className='mx-auto h-[36px]'>
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
						>
							{isSubmittingConsent ? 'Verifying...' : 'Verify and Continue'}
						</BigBlueButton>
					)}
				</Column>

				{consentId && (
					<Column>
						<Title>Step 2</Title>
						<Instruction>
							Click the record button, and read the text below for at least{' '}
							{MIN_AUDIO_LENGTH}
							s. You can also edit the text if you want.
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
								(isRecordingRecord && 60 - recordTimeLeft < MIN_AUDIO_LENGTH)
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
								<audio controls className='mx-auto h-[36px]'>
									<source
										src={URL.createObjectURL(recordedAudio)}
										type='audio/wav'
									/>
								</audio>
							</WrappableRow>
						)}
					</Column>
				)}

				{/* if the audio is not 60s, show an error */}
				{audioLength >= MIN_AUDIO_LENGTH && consentId && (
					<Column>
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
							<audio controls className='mx-auto h-[36px]'>
								<source src={customRecording} type='audio/webm' />
							</audio>
						)}
					</>
				) : (
					<p>
						🤔️ No voice profiles found. Please create a voice profile using the
						section above.{' '}
					</p>
				)}
			</Card>
		</>
	);
};

export default VoiceCloning;
