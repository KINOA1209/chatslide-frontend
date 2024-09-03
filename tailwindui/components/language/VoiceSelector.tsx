import React, { useEffect, useState } from 'react';
import AZURE_VOICE_OPTIONS, {
	OAI_VOICE_OPTIONS,
	STYLE_DISPLAY_NAMES,
	TONE_DISPLAY_NAMES,
	AZURE_VOICE_STYLES,
	isOpenaiVoice,
	AZURE_MULTILINGUAL_VOICE_OPTIONS,
	isMultilingualVoice,
	isClonedVoice,
} from './voiceData';
import LANGUAGES, { LANGUAGES_WITH_ACCENTS } from './languageData';
import {
	ErrorMessage,
	Explanation,
	Instruction,
	WarningMessage,
} from '../ui/Text';
import { DropDown, InversedBigBlueButton } from '../button/DrlambdaButton';
import { useProject } from '@/hooks/use-project';
import { WrappableRow } from '../layout/WrappableRow';
import { useUser } from '@/hooks/use-user';
import { useClonedVoices } from '@/components/language/ClonedVoicesContext';
import VoiceProfile from '@/models/VoiceProfile';
import VoiceCloneService from '@/services/VoiceService';

export const previewVoice = async (
	voice: string,
	language: string = 'en-US',
	clonedVoices?: VoiceProfile[],
	token?: string,
) => {
	try {
		let audio_url = `/voice/${voice}.mp3`;
		console.log('previewing voice:', voice);
		
		if (isClonedVoice(voice) && clonedVoices && token) {
			const clonedVoiceProfile = clonedVoices.find(profile => `cloned_${profile.voice_id}` === voice);
			if (clonedVoiceProfile && clonedVoiceProfile.preview_url) {
				try {
					audio_url = await VoiceCloneService.downloadAudio(clonedVoiceProfile.preview_url, token);
				  } catch (error: any) {
					console.error('Error downloading audio:', error.message);
				  }
			}
		} else if (voice.includes('Multilingual') || isOpenaiVoice(voice)) {
			if (
				['en', 'fr', 'de', 'es', 'zh', 'it', 'pt', 'ru'].includes(
					language.split('-')[0],
				)
			) {
				audio_url = `/voice/${voice}/${language.split('-')[0]}.mp3`;
			} else {
				audio_url = `/voice/${voice}/en.mp3`;
			}
		}

		const audioElement = new Audio(audio_url);
		audioElement.play(); // Play the voice
		console.log('playing audio:', audioElement);
	} catch (error) {
		console.error('Error playing script audio:', error);
	}
};

export const getVoiceStyles = (voice: string): string[] => {
	const styles = AZURE_VOICE_STYLES[voice] ?? [];
	return ['', ...styles];
};

const VoiceSelector: React.FC<{
  selectedGender: 'female' | 'male';
  setSelectedGender: (gender: 'female' | 'male') => void;
	selectedVoice: string;
	setSelectedVoice: (language: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
	style: string;
	setStyle: (style: string) => void;
	isHD: boolean;
}> = ({ selectedGender, setSelectedGender, selectedVoice, setSelectedVoice, selectedLanguage, setSelectedLanguage, style, setStyle, isHD }) => {
	const getCodeFromLanguage = (language: string | undefined): string => {
		const selectedLanguage = LANGUAGES.find(
			(lang) => lang.englishName === language,
		);
		return selectedLanguage?.code ?? 'en-US';
	};

	const { project } = useProject();
	const originalLanguageCode = getCodeFromLanguage(project?.language);
	const [voiceOptions, setVoiceOptions] = useState<string[]>([]);
	const { clonedVoices } = useClonedVoices();
	const { token } = useUser();

  useEffect(() => {
    setSelectedLanguage(originalLanguageCode);
  }, [originalLanguageCode]);
  
	// Update voice options based on selected language and gender
	useEffect(() => {
		const voices = AZURE_VOICE_OPTIONS[selectedLanguage]?.[selectedGender] ?? [
			'Default',
		];
		const clonedVoiceNames = clonedVoices.map(
			(voiceProfile) => `cloned_${voiceProfile.voice_id}`,
		);
		setVoiceOptions([...clonedVoiceNames, ...voices]);
		setSelectedVoice(clonedVoiceNames[0] ?? voices[0]);
	}, [selectedLanguage, selectedGender, clonedVoices]);

	const formatVoiceName = (voiceName: string): string => {
		const isCloned = voiceName.startsWith('cloned_');
		const formattedName = isCloned
			? clonedVoices.find((voice) => `cloned_${voice.voice_id}` === voiceName)
					?.name
			: voiceName;
		if (isCloned) {
			return formattedName + ' 🔄';
		}

		if (isOpenaiVoice(voiceName)) {
			return voiceName.charAt(0).toUpperCase() + voiceName.slice(1) + ' 🌐 🎧';
		}

		const styleAvailableText = AZURE_VOICE_STYLES[voiceName] ? ' 😊' : '';

		if (voiceName.length > 12) {
			let formattedName = voiceName.substring(6, voiceName.length - 6);
			formattedName =
				formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
			formattedName = TONE_DISPLAY_NAMES[formattedName] ?? formattedName;
			return formattedName + styleAvailableText;
		}

		return voiceName;
	};

	return (
		<>
			<WrappableRow type='grid' cols={4}>
				<div>
					<Instruction>Language: </Instruction>
					<DropDown
						value={selectedLanguage}
						onChange={(e) => setSelectedLanguage(e.target.value)}
					>
						{LANGUAGES_WITH_ACCENTS.map((option) => (
							<option key={option.code} value={option.code}>
								{option.displayName}
							</option>
						))}
						<option key={'None'} value={'None'}>
							❌ None
						</option>
					</DropDown>
				</div>

				{selectedLanguage != 'None' && (
					<>
						<div>
							<Instruction>Gender: </Instruction>
							<DropDown
								value={selectedGender}
								onChange={(e) =>
									setSelectedGender(e.target.value as 'female' | 'male')
								}
							>
								<option key='female' value='female'>
									👩 Female
								</option>
								<option key='male' value='male'>
									👨 Male
								</option>
							</DropDown>
						</div>

						<div>
							<Instruction>Tone: </Instruction>
							<DropDown
								value={selectedVoice}
								onChange={(e) => {
									previewVoice(e.target.value, selectedLanguage, clonedVoices, token);
									setSelectedVoice(e.target.value);
								}}
							>
								{/* Grouping voice options */}
								<optgroup label="Cloned Voices">
									{voiceOptions.filter(isClonedVoice).map((voice) => (
										<option key={voice} value={voice}>
											{formatVoiceName(voice)}
										</option>
									))}
								</optgroup>
								<optgroup label="Default Voices">
									{voiceOptions.filter((voice) => !isClonedVoice(voice)).map((voice) => (
										<option key={voice} value={voice}>
											{formatVoiceName(voice)}
										</option>
									))}
									{selectedLanguage !== 'en-GB' &&
									AZURE_MULTILINGUAL_VOICE_OPTIONS[selectedGender].map(
										(voice) => (
											<option key={voice} value={voice}>
												{formatVoiceName(voice)}
											</option>
										),
									)}
								{selectedLanguage !== 'en-GB' &&
									OAI_VOICE_OPTIONS[selectedGender].map((voice) => (
										<option key={voice} value={voice}>
											{formatVoiceName(voice)}
										</option>
									))}
								</optgroup>
							</DropDown>
						</div>
						<div>
							<Instruction>Style: </Instruction>
							<DropDown
								value={style}
								onChange={(e) => setStyle(e.target.value)}
							>
								{getVoiceStyles(selectedVoice).map((style) => (
									<option key={style} value={style}>
										{STYLE_DISPLAY_NAMES[style]}
									</option>
								))}
							</DropDown>
						</div>
					</>
				)}
			</WrappableRow>
			{isMultilingualVoice(selectedVoice) && (
				<Explanation>
					🌐 This is a multilingual voice. The language it speaks depends on the
					text you provide.
				</Explanation>
			)}
			{AZURE_VOICE_STYLES[selectedVoice] && (
				<Explanation>
					😊 This voice has different styles to express different emotions.
				</Explanation>
			)}
			{isOpenaiVoice(selectedVoice) && (
				<Explanation>
					🎧 This is a real-time AI voice, and it is Hi-Fi only. Everytime you
					play it, it may sound a little bit different.
				</Explanation>
			)}
			{(isOpenaiVoice(selectedVoice) || isHD) && (
				<Explanation>
					🎧 Hi-Fi voices have a much better voice quality. It will cost 100⭐️
					per video. If you use avatar, the total cost is 400⭐️ per video. This
					may change in the future.
				</Explanation>
			)}
			{isClonedVoice(selectedVoice) && (
				<Explanation>
					🔄 This voice is a clone of your voice. It will cost 300⭐️ per video.
				</Explanation>
			)}
			{selectedLanguage !== originalLanguageCode &&
				selectedLanguage !== 'None' && (
					<WarningMessage>
						If your scripts and voice are in different languages, you may get
						suboptimal results.
					</WarningMessage>
				)}
			{selectedLanguage === 'None' && (
				<WarningMessage>
					Your video will not have any voiceover, each slide will play for 5
					seconds silently.
				</WarningMessage>
			)}
		</>
	);
};

export default VoiceSelector;
