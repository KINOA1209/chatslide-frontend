'use client';

import { BigBlueButton, DropDown, InversedBigBlueButton } from '@/components/button/DrlambdaButton';
import Card from '@/components/ui/Card';
import { NewInputBox } from '@/components/ui/InputBox';
import { BigTitle, Instruction } from '@/components/ui/Text';
import { ProLabel } from '@/components/ui/GrayLabel';
import { useState, useRef, useEffect } from 'react';
import { readingData } from './readingData';
import { LANGUAGES_WITH_ACCENTS } from '@/components/language/languageData';
import VoiceCloneService from '@/services/VoiceService';
import { useUser } from '@/hooks/use-user';
import VoiceProfile from '@/models/VoiceProfile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';

const VoiceCloning = () => {
	const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>('en-US');
	const [inputBoxText, setInputBoxText] = useState<string>(readingData['en-US']);
	const [recordedAudio, setRecordedAudio] = useState<null | Blob>(null);
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<number>(60);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const { token, uid } = useUser();
	const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>([]);
	const [selectedProfile, setSelectedProfile] = useState<VoiceProfile | null>(null);
	const [voiceName, setVoiceName] = useState<string>('');
	const [customRecording, setCustomRecording] = useState<string>('');
	const [customerInput, setCustomerInput] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [cloning, setCloning] = useState(false);

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

	const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const code = event.target.value;
		setSelectedLanguageCode(code);
		setInputBoxText(readingData[code]);
	};

	const handleInputBoxChange = (value: string) => {
		setInputBoxText(value);
	};

	const handleRecordAudio = async () => {
		if (isRecording) {
			mediaRecorderRef.current?.stop();
			setIsRecording(false);
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
			setTimeLeft(60);
		} else {
			setRecordedAudio(null);
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorderRef.current = new MediaRecorder(stream);
			audioChunksRef.current = [];
			mediaRecorderRef.current.ondataavailable = (event) => {
				audioChunksRef.current.push(event.data);
			};
			mediaRecorderRef.current.onstop = () => {
				const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
				setRecordedAudio(audioBlob);
				audioChunksRef.current = [];
			};
			mediaRecorderRef.current.start();
			setIsRecording(true);

			timerRef.current = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime <= 1) {
						mediaRecorderRef.current?.stop();
						setIsRecording(false);
						clearInterval(timerRef.current!);
						timerRef.current = null;
						return 60;
					}
					return prevTime - 1;
				});
			}, 1000);
		}
	};

	const handleCloneVoice = async () => {
		if (voiceName.trim() === '') {
			alert('Please enter a name for the voice profile.');
			return;
		}
		if (recordedAudio) {
			const formData = new FormData();
			formData.append('file', recordedAudio, 'recording.mp3');
			formData.append('name', voiceName);
			formData.append('description', 'A description of the voice clone');
			formData.append('labels', JSON.stringify({ genre: 'narrative', age: '30s' }));

			try {
				setCloning(true);
				const result = await VoiceCloneService.cloneVoice(formData, token);
				toast.success('Voice cloned successfully!');
				await fetchVoiceProfiles();
			} catch (error: any) {
				console.error('Error cloning voice:', error.message);
			} finally {
				setCloning(false);
			}
		} else {
			alert('Please record your voice first.');
		}
	};

	const handleGenerateVoice = async () => {
		setLoading(true);
		const requestData = {
			voice_id: selectedProfile?.voice_id || '',
			text: customerInput,
			voice_settings: {
				stability: 0.65,
				similarity_boost: 0.3,
				style: 0.3,
			}
		};
		try {
			const result = await VoiceCloneService.generateVoice(requestData, token);
			setCustomRecording(result.audio_url);
		} catch (error: any) {
			console.error('Error generating voice:', error.message);
		} finally {
			setLoading(false);
		}
	}

	const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const profile = voiceProfiles.find(profile => profile.name === event.target.value);
		setSelectedProfile(profile || null);
	};

	const handleDeleteProfile = async () => {
		if (selectedProfile) {
			try {
				setLoading(true);
				await VoiceCloneService.deleteVoiceProfile(selectedProfile.voice_id, token);
				setSelectedProfile(null);
				setCustomRecording('');
				await fetchVoiceProfiles();
			} catch (error: any) {
				console.error('Error deleting voice profile:', error.message);
			} finally {
				setLoading(false);
			}
		}
	}

	return (
		<>
			<Card>
				<BigTitle>🎙️ Create New Voice Profile <ProLabel /> </BigTitle>
				<Instruction> Please select a language, read the provided text aloud, and click the Record button to start recording. After recording, click the Clone button to create your voice clone. </Instruction>
				<DropDown
					value={selectedLanguageCode}
					onChange={handleLanguageChange}
				>
					{LANGUAGES_WITH_ACCENTS.map(lang => (
						<option key={lang.code} value={lang.code}>{lang.displayName}</option>
					))}
				</DropDown>
				<NewInputBox
					onChange={handleInputBoxChange}
					value={inputBoxText}
					maxLength={2000}
					textarea
				/>
				<BigBlueButton onClick={handleRecordAudio}>
					<i className={isRecording ? 'fas fa-stop' : 'fas fa-microphone'}></i>
					{isRecording ? ` Stop Recording (${timeLeft}s)` : ' Record'}
				</BigBlueButton>
				<NewInputBox
					placeholder="Enter a name for the voice profile"
					value={voiceName}
					maxLength={20}
					onChange={setVoiceName}
				/>
				<InversedBigBlueButton onClick={handleCloneVoice} disabled={cloning}>
					{cloning ? (
						<>
							<i className="fas fa-spin"></i> Cloning...
						</>
					) : (
						<>
							<i className="fas fa-clone"></i> Clone
						</>
					)}
				</InversedBigBlueButton>
				{recordedAudio && (
					<audio controls>
						<source src={URL.createObjectURL(recordedAudio)} type="audio/wav" />
					</audio>
				)}
			</Card>
			<Card>
				<BigTitle>📂 Existing Voice Profiles <ProLabel /> </BigTitle>
				<Instruction> Select a voice profile to view details and listen to the training file and preview. </Instruction>
				<DropDown
					onChange={handleProfileChange}
					value={selectedProfile?.name || ''}
				>
					{voiceProfiles.map(profile => (
						<option key={profile.voice_id} value={profile.name}>
							{profile.name}
						</option>
					))}
				</DropDown>
				{selectedProfile ? (
					<>
						<p>Name: {selectedProfile.name}</p>
						<p>Training Voice:</p>
						<audio key={selectedProfile.training_file_path} controls>
							<source src={`/api/voice/download?filename=${encodeURIComponent(selectedProfile.training_file_path)}&foldername=${encodeURIComponent(uid)}`} type="audio/mp3" />
						</audio>
						<p>Preview Voice:</p>
						<audio key={selectedProfile.preview_url} controls>
							<source src={`/api/voice/download?filename=${encodeURIComponent(selectedProfile.preview_url)}&foldername=${encodeURIComponent(uid)}`} type="audio/mp3" />
						</audio>
						<BigBlueButton onClick={handleDeleteProfile} disabled={loading}>
							{loading ? (
								<>
									<i className="fas fa-spin"></i>
								</>
							) : (
								<>
									<i className="fas fa-trash"></i> Delete
								</>
							)}
						</BigBlueButton>
						<NewInputBox
							placeholder="Enter text to generate voice"
							value={customerInput}
							maxLength={2000}
							onChange={setCustomerInput}
							textarea
						/>
						<BigBlueButton onClick={handleGenerateVoice} disabled={loading}>
							{loading ? (
								<>
									<i className="fas fa-spin"></i>
								</>
							) : (
								<>
									<i className="fas fa-play"></i> Generate
								</>
							)}
						</BigBlueButton>
						{customRecording && (
							<audio controls>
								<source src={customRecording} type="audio/mp3" />
							</audio>
						)}
					</>
				): (
					<p>🤔️ No voice profiles found. Create your own Voice Profile now! </p>
				)}
			</Card>
		</>
	);
};

export default VoiceCloning;
