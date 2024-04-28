'use client';

import React, { useEffect, useState } from 'react';
import AZURE_VOICE_OPTIONS, { OAI_VOICE_OPTIONS, STYLE_DISPLAY_NAMES, TONE_DISPLAY_NAMES, AZURE_VOICE_STYLES, isOpenaiVoice, AZURE_MULTILINGUAL_VOICE_OPTIONS, isMultilingualVoice } from './voiceData';
import LANGUAGES, { LANGUAGES_WITH_ACCENTS } from './languageData';
import { ErrorMessage, Explanation, Instruction, WarningMessage } from '../ui/Text';
import { DropDown } from '../button/DrlambdaButton';
import { useProject } from '@/hooks/use-project';
import { WrappableRow } from '../layout/WrappableRow';

export const previewVoice = async (voice: string, language: string = 'en-US') => {
  try {
    let audio_url = `/voice/${voice}.mp3`;
    console.log('previewing voice:', voice);
    if(voice.includes('Multilingual') || isOpenaiVoice(voice)) {
      if (['en', 'fr', 'de', 'es', 'zh', 'it', 'pt', 'ru'].includes(language.split('-')[0])) {
        audio_url = `/voice/${voice}/${language.split('-')[0]}.mp3`;
      } else {
        audio_url = `/voice/${voice}/en.mp3`;
      }
    }
    const audioElement = new Audio(audio_url);
    audioElement.play(); // Play the voice
    console.log('playing audio:', audioElement);
  } catch (error) {
    console.error("Error playing script audio:", error);
  }
};

export const getVoiceStyles = (voice: string): string[] => {
  const styles = AZURE_VOICE_STYLES[voice] ?? [];
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
      const voices = AZURE_VOICE_OPTIONS[selectedLanguage]?.[selectedGender] ?? ['Default'];
      setVoiceOptions(voices);
      setSelectedVoice(voices[0]);
    }, [selectedLanguage, selectedGender]);

    const formatVoiceName = (voiceName: string): string => {
      if (isOpenaiVoice(voiceName)) {
        // capitalize the first letter and return
        return voiceName.charAt(0).toUpperCase() + voiceName.slice(1) + ' 🌐 🎧';
      }

      const styleAvailableText = AZURE_VOICE_STYLES[voiceName] ? ' 😊' : '';

      // Ensure the string is long enough to avoid negative substring indices
      if (voiceName.length > 12) {
        // remove `en-US-` and `Neural` from the voice name
        let formattedName = voiceName.substring(6, voiceName.length - 6);
        // Capitalize the first letter and return
        formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

        formattedName = TONE_DISPLAY_NAMES[formattedName] ?? formattedName;
        return formattedName + styleAvailableText;
      }

      // If the name is not in the expected format, return it as is or handle accordingly
      return voiceName;
    };

    return (
      <>
        <WrappableRow type='grid' cols={4}>
          <div>
            <Instruction>Language: </Instruction>
            <DropDown value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              {LANGUAGES_WITH_ACCENTS.map((option) => (
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
                previewVoice(e.target.value, selectedLanguage);
                setSelectedVoice(e.target.value)
              }}>
                {voiceOptions.map((voice) => (
                  <option key={voice} value={voice}>{formatVoiceName(voice)}</option>
                ))}
                {AZURE_MULTILINGUAL_VOICE_OPTIONS[selectedGender].map((voice) => (
                  <option key={voice} value={voice}>{formatVoiceName(voice)}</option>
                ))}
                {OAI_VOICE_OPTIONS[selectedGender].map((voice) => (
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
        </WrappableRow>
        {
          isMultilingualVoice(selectedVoice) &&
          <Explanation>
            🌐 This is a multilingual voice. The language it speaks depends on the text you provide.
          </Explanation>
        }
        {
          AZURE_VOICE_STYLES[selectedVoice] &&
          <Explanation>
            😊 This voice has different styles to express different emotions.
          </Explanation>
        }
        {
          isOpenaiVoice(selectedVoice) &&
          <Explanation>
            🎧 This is a Hi-Fi only voice. 
          </Explanation>
        }
        {
          selectedLanguage !== originalLanguageCode && selectedLanguage !== 'None' &&
          <WarningMessage>If your scripts and voice are in different languages, you may get suboptimal results.</WarningMessage>
        }
        {
          selectedLanguage === 'None' &&
          <WarningMessage>Your video will not have any voiceover, each slide will play for 5 seconds silently.</WarningMessage>
        }
        {
          isOpenaiVoice(selectedVoice) &&
          <WarningMessage>The voice you selected does not support avatars yet.</WarningMessage>
        }
      </>
    );
  };

export default VoiceSelector;