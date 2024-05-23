'use client';

import { BigBlueButton, DropDown } from '@/components/button/DrlambdaButton';
import Card from '@/components/ui/Card';
import { NewInputBox } from '@/components/ui/InputBox';
import { BigTitle } from '@/components/ui/Text';
import { useState, useRef } from 'react';
import { readingData } from './readingData';
import { LANGUAGES_WITH_ACCENTS } from '@/components/language/languageData';

// Filter for English and Chinese languages
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
      setRecordedAudio(null); // Clear previous recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = []; // Clear previous chunks
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const handleCloneVoice = () => {
    // Implement voice cloning logic here
    if (recordedAudio) {
      console.log('Cloning voice...');
    } else {
      console.log('Please record your voice first.');
    }
  };

  return (
    <>
      <Card>
        <BigTitle>Create New Voice Profile</BigTitle>
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
        <BigTitle>Existing Voice Profiles</BigTitle>
        {/* Add components to display and manage existing voice profiles */}
      </Card>
    </>
  );
};

export default VoiceCloning;
