'use client';

import { BigBlueButton, DropDown, InversedBigBlueButton } from '@/components/button/DrlambdaButton';
import { EarlyAccessButton } from '@/components/button/FunctionalButton';
import { Column } from '@/components/layout/Column';
import { Panel } from '@/components/layout/Panel';
import { UnlimitedUpgrade } from '@/components/slides/card/UnlimitedUpgrade';
import Card from '@/components/ui/Card';
import { ProLabel } from '@/components/ui/GrayLabel';
import { NewInputBox } from '@/components/ui/InputBox';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';
import { useState } from 'react';

function VoiceCloning() {
	const [selectedLanguage, setSelectedLanguage] = useState('English');

	const [inputBoxText, setInputBoxText] = useState('');

	const [voiceRecord, setVoiceRecord] = useState(false);

	return (
		<>
			<Card>
				<BigTitle>Existing Voice Profiles</BigTitle>

				dropdown 
				
				delete voice profile button
				
				text area
				
				play button
			</Card>

			<Card>
				<BigTitle>Create New Voice Profile</BigTitle>
				{/* <DropDown
					options={['English', 'Chinese', 'Japanese', 'Korean']}
					selected='English'
				>
					Language Selection
				</DropDown> */}
				<NewInputBox
					onChange={() => {}}
					value={inputBoxText}
					maxLength={1000}
					textarea
				/>
				Record button Name Input, Clone button
			</Card>

			{!voiceRecord ? (
				<BigBlueButton onClick={() => {}}>Start Voice Recording</BigBlueButton>
			) : (
				<>
				<InversedBigBlueButton onClick={() => {}}>Delete Voice Recording</InversedBigBlueButton>
				<BigBlueButton onClick={() => {}}>Start Voice Cloning</BigBlueButton>
				</>
			)}
		</>
	);
}
