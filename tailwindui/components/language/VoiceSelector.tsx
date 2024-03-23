'use client';

import React, { useEffect, useState } from 'react';
import VOICE_OPTIONS from './voiceData';
import LANGUAGES from './languageData';
import { ErrorMessage, Instruction, WarningMessage } from '../ui/Text';
import { DropDown } from '../button/DrlambdaButton';
import { useProject } from '@/hooks/use-project';

const VoiceSelector: React.FC<{
  selectedVoice: string;
  setSelectedVoice: (language: string) => void;
}> = ({
  selectedVoice,
  setSelectedVoice,
}) => {
    const getCodeFromLanguage = (language: string | undefined): string => {
      const selectedLanguage = LANGUAGES.find((lang) => lang.englishName === language);
      return selectedLanguage?.code ?? 'en-US';
    }

    const { project } = useProject();
    const originalLanguageCode = getCodeFromLanguage(project?.language);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(originalLanguageCode);
    const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
    const genderOptions = ['female', 'male'];
    const [voiceOptions, setVoiceOptions] = useState<string[]>([]);

    // Update voice options based on selected language and gender
    useEffect(() => {
      const voices = VOICE_OPTIONS[selectedLanguage]?.[selectedGender] ?? ['Default'];
      setVoiceOptions(voices);
      setSelectedVoice(voices[0]);
    }, [selectedLanguage, selectedGender]);

    const formatVoiceName = (voiceName: string): string => {
      // Ensure the string is long enough to avoid negative substring indices
      if (voiceName.length > 12) {
        let formattedName = voiceName.substring(6, voiceName.length - 6);
        // Capitalize the first letter and return
        formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
        // replace Multilingual with `-Mulilingual`
        if (formattedName.includes('Multilingual')) {
          return formattedName.replace('Multilingual', '-Multilingual');
        }
        return formattedName;
      }

      // If the name is not in the expected format, return it as is or handle accordingly
      return voiceName;
    };


    return (
      <>
        <div className='flex flex-row flex-wrap justify-between'>
          <div>
            <Instruction>Language: </Instruction>
            <DropDown value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} width='16rem'>
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
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</option>
                ))}
              </DropDown>
            </div>

            <div>
              <Instruction>Voice: </Instruction>
              <DropDown value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
                {voiceOptions.map((voice) => (
                  <option key={voice} value={voice}>{formatVoiceName(voice)}</option>
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