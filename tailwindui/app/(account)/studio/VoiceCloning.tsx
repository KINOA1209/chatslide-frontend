'use client';

import { BigBlueButton, DropDown } from '@/components/button/DrlambdaButton';
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

const SUPPORTED_LANGUAGES = LANGUAGES_WITH_ACCENTS.filter(
	lang => lang.code === 'en-US' || lang.code === 'zh-CN'
);

const VoiceCloning = () => {
	const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>('en-US');
	const [inputBoxText, setInputBoxText] = useState<string>(readingData['en-US']);
	const [recordedAudio, setRecordedAudio] = useState<null | Blob>(null);
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const { token, uid } = useUser();
	const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>([]);
	const [selectedProfile, setSelectedProfile] = useState<VoiceProfile | null>(null);

	const fetchVoiceProfiles = async () => {
		try {
			const profiles = await VoiceCloneService.getVoiceProfiles(token);
			setVoiceProfiles(profiles);
			console.log('Voice profiles:', profiles);
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
			// Stop recording
			mediaRecorderRef.current?.stop();
			setIsRecording(false);
		} else {
			// Start recording
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
		}
	};

	const handleCloneVoice = async () => {
		if (recordedAudio) {
			const formData = new FormData();
			formData.append('file', recordedAudio, 'recording.mp3');
			formData.append('name', 'User Voice Clone' + Date.now());
			formData.append('description', 'A description of the voice clone');
			formData.append('labels', JSON.stringify({ genre: 'narrative', age: '30s' }));

			try {
				const result = await VoiceCloneService.cloneVoice(formData, token);
				console.log('Voice clone created successfully:', result.voice_id);
				await fetchVoiceProfiles();
			} catch (error: any) {
				console.error('Error cloning voice:', error.message);
			}
		} else {
			console.log('Please record your voice first.');
		}
	};

	const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const profile = voiceProfiles.find(profile => profile.name === event.target.value);
		setSelectedProfile(profile || null);
	};

	return (
		<>
			<Card>
				<BigTitle>Create New Voice Profile <ProLabel /> </BigTitle>
				<Instruction> Please select a language, read the provided text aloud, and click the Record button to start recording. After recording, click the Clone button to create your voice clone. </Instruction>
				<DropDown
					value={selectedLanguageCode}
					onChange={handleLanguageChange}
				>
					{SUPPORTED_LANGUAGES.map(lang => (
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
					{isRecording ? 'Stop Recording' : 'Record'}
				</BigBlueButton>
				<BigBlueButton onClick={handleCloneVoice}>Clone</BigBlueButton>
				{recordedAudio && (
					<audio controls>
						<source src={URL.createObjectURL(recordedAudio)} type="audio/wav" />
					</audio>
				)}
			</Card>
			<Card>
				<BigTitle>Existing Voice Profiles <ProLabel /> </BigTitle>
				<Instruction> Select a voice profile to view details and listen to the training file and preview. </Instruction>
				<DropDown
					onChange={handleProfileChange}
					value={selectedProfile?.name || ''}
				>
					{voiceProfiles.map(profile => (
						<option key={profile.id} value={profile.name}>
							{profile.name}
						</option>
					))}
				</DropDown>
				{selectedProfile && (
					<>
						<p>Name: {selectedProfile.name}</p>
						<p>Traning Voice:</p>
						<audio key={selectedProfile.training_file_path} controls>
							<source src={`/api/voice/download?filename=${encodeURIComponent(selectedProfile.training_file_path)}&foldername=${encodeURIComponent(uid)}`} type="audio/mp3" />
						</audio>
						<p>Preview Voice:</p>
						<audio key={selectedProfile.preview_url} controls>
							<source src={`/api/voice/download?filename=${encodeURIComponent(selectedProfile.preview_url)}&foldername=${encodeURIComponent(uid)}`} type="audio/mp3" />
						</audio>
					</>
				)}
			</Card>
		</>
	);
};

export default VoiceCloning;
