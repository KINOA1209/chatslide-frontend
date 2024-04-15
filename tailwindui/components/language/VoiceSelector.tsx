'use client';

import React, { useEffect, useState } from 'react';
import VOICE_OPTIONS, { STYLE_DISPLAY_NAMES, TONE_DISPLAY_NAMES, VOICE_STYLES } from './voiceData';
import LANGUAGES from './languageData';
import { ErrorMessage, Instruction, WarningMessage } from '../ui/Text';
import { DropDown } from '../button/DrlambdaButton';
import { useProject } from '@/hooks/use-project';

export const previewVoice = async (voice: string) => {
	try {
		const audio_url = `/voice/${voice}.mp3`;
		const audioElement = new Audio(audio_url);
		audioElement.play(); // Play the voice
		console.log('playing audio:', audioElement);
	} catch (error) {
		console.error("Error playing script audio:", error);
	}
};

export const getVoiceStyles = (voice: string): string[] => {
	const styles = VOICE_STYLES[voice] ?? [];
	return ['', ...styles];
}

const VoiceSelector: React.FC<{
	selectedVoice: string;
	setSelectedVoice: (language: string) => void;
	style: string;
	setStyle: (style: string) => void;
}> = ({
	selectedVoice,
	setSelectedVoice,
	style,
	setStyle,
}) => {
		const getCodeFromLanguage = (language: string | undefined): string => {
			const selectedLanguage = LANGUAGES.find((lang) => lang.englishName === language);
			return selectedLanguage?.code ?? 'en-US';
		}
		const { project } = useProject();
		const originalLanguageCode = getCodeFromLanguage(project?.language);
		const [selectedLanguage, setSelectedLanguage] = useState<string>(originalLanguageCode);
		const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
		const [voiceOptions, setVoiceOptions] = useState<string[]>([]);

		// Update voice options based on selected language and gender
		useEffect(() => {
			const voices = VOICE_OPTIONS[selectedLanguage]?.[selectedGender] ?? ['Default'];
			setVoiceOptions(voices);
			setSelectedVoice(voices[0]);
		}, [selectedLanguage, selectedGender]);

		const formatVoiceName = (voiceName: string): string => {
			const styleAvailableText = VOICE_STYLES[voiceName] ? ' (styles ✅)' : '';

			// Ensure the string is long enough to avoid negative substring indices
			if (voiceName.length > 12) {
				let formattedName = voiceName.substring(6, voiceName.length - 6);
				// Capitalize the first letter and return
				formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
				// replace Multilingual with `-Mulilingual`
				if (formattedName.includes('Multilingual')) {
					return formattedName.replace('Multilingual', '-Multilingual') + styleAvailableText;
				}

				formattedName = TONE_DISPLAY_NAMES[formattedName] ?? formattedName;
				return formattedName + styleAvailableText;
			}

			// If the name is not in the expected format, return it as is or handle accordingly
			return voiceName;
		};

		return (
			<>
				<div className='flex flex-row flex-wrap justify-start gap-4'>
					<div>
						<Instruction>Language: </Instruction>
						<DropDown value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
							{LANGUAGES.map((option) => (
								<option key={option.code} value={option.code}>{option.displayName}</option>
							))}
							<option key={'None'} value={'None'}>❌ None</option>
						</DropDown>

					</div>

					{selectedLanguage != 'None' && <>
						<div>
							<Instruction>Gender: </Instruction>
							<DropDown value={selectedGender} onChange={(e) => setSelectedGender(e.target.value as 'female' | 'male')}>
								<option key='female' value='female'>👩 Female</option>
								<option key='male' value='male'>👨 Male</option>
							</DropDown>
						</div>

						<div>
							<Instruction>Tone: </Instruction>
							<DropDown value={selectedVoice} onChange={(e) => {
								previewVoice(e.target.value)
								setSelectedVoice(e.target.value)
							}}>
								{voiceOptions.map((voice) => (
									<option key={voice} value={voice}>{formatVoiceName(voice)}</option>
								))}
							</DropDown>
						</div>

						<div>
							<Instruction>Style: </Instruction>
							<DropDown value={style} onChange={(e) => setStyle(e.target.value)}>
								{getVoiceStyles(selectedVoice).map((style) => (
									<option key={style} value={style}>{STYLE_DISPLAY_NAMES[style]}</option>
								))}
							</DropDown>
						</div>
					</>}
				</div>
				{
					selectedLanguage !== originalLanguageCode && selectedLanguage !== 'None' &&
					<WarningMessage>If your scripts and voice are in different languages, you may get suboptimal results.</WarningMessage>
				}
				{
					selectedLanguage === 'None' &&
					<WarningMessage>Your video will not have any voiceover, each slide will play for 5 seconds silently.</WarningMessage>
				}
			</>
		);
	};

export default VoiceSelector;