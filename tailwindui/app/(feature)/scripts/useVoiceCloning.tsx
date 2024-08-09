import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import VoiceCloneService from '@/services/VoiceService';
import { convertToWav } from '@/utils/wav';
import { useUser } from '@/hooks/use-user';
import VoiceProfile from '@/models/VoiceProfile';
import { readingData } from '../studio/readingData';
import LANGUAGES from '@/components/language/languageData';
import { getBrand } from '@/utils/getHost';

export const MIN_AUDIO_LENGTH = 10;
export const MAX_AUDIO_LENGTH = 120;
export const MIN_CONSENT_LENGTH = 5;
export const MAX_CONSENT_LENGTH = 20;

export const useVoiceCloning = () => {
	const { username, token, tier } = useUser();
	const [selectedLanguageCode, setSelectedLanguageCode] =
		useState<string>('en-US');
	const [selectedTestLanguageCode, setSelectedTestLanguageCode] =
		useState<string>('en-US');
	const [inputBoxText, setInputBoxText] = useState<string>(
		readingData['en-US'],
	);
	const [recordedAudio, setRecordedAudio] = useState<null | Blob>(null);
	const [consentAudio, setConsentAudio] = useState<null | Blob>(null);
	const [isRecordingRecord, setIsRecordingRecord] = useState<boolean>(false);
	const [isRecordingConsent, setIsRecordingConsent] = useState<boolean>(false);
	const [recordTimeLeft, setRecordTimeLeft] =
		useState<number>(MAX_AUDIO_LENGTH);
	const [consentTimeLeft, setConsentTimeLeft] =
		useState<number>(MAX_CONSENT_LENGTH);
	const [audioLength, setAudioLength] = useState<number>(0); // only applies to recordedAudio
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

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

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

	const handleRecordAudio = async (
		isConsentAudio = false,
		isTutorialDialog = false,
	) => {
		const setIsRecording = isConsentAudio
			? setIsRecordingConsent
			: setIsRecordingRecord;
		const isRecording = isConsentAudio ? isRecordingConsent : isRecordingRecord;
		const setTimeLeft = isConsentAudio ? setConsentTimeLeft : setRecordTimeLeft;
		const maxTime = isConsentAudio ? MAX_CONSENT_LENGTH : MAX_AUDIO_LENGTH;

		if (isRecording) {
			mediaRecorderRef.current?.stop();
			mediaRecorderRef.current?.stream
				.getTracks()
				.forEach((track) => track.stop()); // Stop all tracks
			setIsRecording(false);
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
				setAudioLength(
					maxTime - (isConsentAudio ? consentTimeLeft : recordTimeLeft),
				);
			}
			setTimeLeft(maxTime);
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
				if (isTutorialDialog) {
					toast.success('Finished recording!');
				}
			};
			mediaRecorderRef.current.start();
			setIsRecording(true);

			timerRef.current = setInterval(() => {
				setTimeLeft((prevTime) => {
					if (prevTime <= 1) {
						mediaRecorderRef.current?.stop();
						if (!isConsentAudio) setRecordedAudio(null);
						else setConsentAudio(null);
						setIsRecording(false);
						clearInterval(timerRef.current!);
						timerRef.current = null;
						setTimeLeft(maxTime);
						setAudioLength(maxTime);
						return maxTime;
					}
					return prevTime - 1;
				});
			}, 1000);
		}
	};

	const submitConsent = async () => {
		if (!consentAudio) return;

		setIsSubmittingConsent(true);
		const consentAudioFile = new File([consentAudio], 'consent.wav', {
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
				toast.error(`${error.message}`);
			})
			.finally(() => {
				setIsSubmittingConsent(false);
				setAudioLength(0); // for the next audio
			});
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
			const trainingRecordFile = new File([recordedAudio], 'training.wav', {
				type: 'audio/wav',
			});
			const response = await VoiceCloneService.cloneVoice(
				consentId,
				trainingRecordFile,
				voiceName,
				token,
			);
			toast.success(
				'Voice cloned successfully!, you can proceed to select voice profile and test',
			);
			await fetchVoiceProfiles();
		} catch (error: any) {
			console.error('Error cloning voice:', error.message);
			toast.error(`${error.message}`);
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

	return {
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
	};
};
