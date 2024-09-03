import React from 'react';
import {
	ClonedVoicesProvider,
	useClonedVoices,
} from '@/components/language/ClonedVoicesContext';
import {
	BigTitle,
	Instruction,
	Explanation,
	WarningMessage,
} from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import VoiceSelector from '@/components/language/VoiceSelector';
import { DropDown } from '@/components/button/DrlambdaButton';
import AvatarSelector from '@/components/language/AvatarSelector';
import { GrayLabel } from '@/components/ui/GrayLabel';
import { bgmDisplayNames } from '@/components/language/bgmData';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { FiPlay } from 'react-icons/fi';
import RangeSlider from '@/components/ui/RangeSlider';
import { WrappableRow } from '@/components/layout/WrappableRow';
import { isClonedVoice, isOpenaiVoice } from '@/components/language/voiceData';
import Toggle from '@/components/button/Toggle';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import CloneYourVoiceTutorial from './CloneYourVoiceTutorialDialog';
import { AVATAR_ID } from '@/components/language/avatarData';

interface AudioVideoDetailSettingsSectionProps {
	voice: string;
	setVoice: React.Dispatch<React.SetStateAction<string>>;
	gender: 'female' | 'male';
	setGender: React.Dispatch<React.SetStateAction<'female' | 'male'>>;
	voiceIsHD: boolean;
	setVoiceIsHD: React.Dispatch<React.SetStateAction<boolean>>;
	selectedLanguage: string;
	setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
	style: string;
	setStyle: React.Dispatch<React.SetStateAction<string>>;
	bgm: string;
	setBgm: React.Dispatch<React.SetStateAction<string>>;
	bgmVolume: number;
	setBgmVolume: React.Dispatch<React.SetStateAction<number>>;
	transitionType: string;
	setTransitionType: React.Dispatch<React.SetStateAction<string>>;
	withSubtitle: boolean;
	setWithSubtitle: React.Dispatch<React.SetStateAction<boolean>>;
	avatar?: AVATAR_ID;
	setAvatar: React.Dispatch<React.SetStateAction<AVATAR_ID | undefined>>;
	posture: string;
	setPosture: React.Dispatch<React.SetStateAction<string>>;
	size: string;
	setSize: React.Dispatch<React.SetStateAction<string>>;
	position: string;
	setPosition: React.Dispatch<React.SetStateAction<string>>;
}

const AudioVideoDetailSettingsSection: React.FC<
	AudioVideoDetailSettingsSectionProps
> = ({
	voice,
	setVoice,
  gender,
  setGender,
	voiceIsHD,
	setVoiceIsHD,
	selectedLanguage,
	setSelectedLanguage,
	style,
	setStyle,
	bgm,
	setBgm,
	bgmVolume,
	setBgmVolume,
	transitionType,
	setTransitionType,
	withSubtitle,
	setWithSubtitle,
	avatar,
	setAvatar,
	posture,
	setPosture,
	size,
	setSize,
	position,
	setPosition,
}) => {
	return (
		<>
			<Card>
				<Accordion type='single' collapsible className='w-full' value='item-1'>
					<AccordionItem value='item-1'>
						<AccordionTrigger>
							<WrappableRow type='flex' justify='between'>
								<BigTitle>🎙️ Voice</BigTitle>
							</WrappableRow>
						</AccordionTrigger>
						<AccordionContent>
							{!isOpenaiVoice(voice) && (
								<Toggle
									isLeft={!voiceIsHD}
									setIsLeft={(value: boolean) => setVoiceIsHD(!value)}
									leftText='Standard'
									rightText='Hi-Fi 🎧'
								/>
							)}
							<Instruction>
								<span>
									Voice cloning is now available for PRO and ULTIMATE users.{' '}
									{/* <a className='text-blue-600' href='/studio' target='_blank'>
										Clone voice .
									</a>{' '} */}
									<CloneYourVoiceTutorial></CloneYourVoiceTutorial>
								</span>
							</Instruction>

							<Instruction>
								Select the voice you want to use for your video.
							</Instruction>
							<ClonedVoicesProvider>
								<VoiceSelector
                  selectedGender={gender}
                  setSelectedGender={setGender}
									selectedVoice={voice}
									setSelectedVoice={setVoice}
									selectedLanguage={selectedLanguage}
									setSelectedLanguage={setSelectedLanguage}
									style={style}
									setStyle={setStyle}
									isHD={voiceIsHD}
								/>
							</ClonedVoicesProvider>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</Card>

			<Card>
				<Accordion type='single' collapsible className='w-full'>
					<AccordionItem value='item-2'>
						<AccordionTrigger>
							<BigTitle>🎥 Video Effects</BigTitle>
						</AccordionTrigger>
						<AccordionContent>
							<WrappableRow type='grid' cols={2}>
								<div>
									<Instruction>Background Music:</Instruction>
									<div className='flex flex-row gap-4 items-center'>
										<DropDown
											width='12rem'
											onChange={(e) => setBgm(e.target.value)}
											value={bgm}
											style='input'
										>
											{Object.entries(bgmDisplayNames).map(([key, value]) => (
												<option key={key} value={key}>
													{value}
												</option>
											))}
										</DropDown>
										{bgm && (
											<ButtonWithExplanation
												explanation='Preview'
												button={
													<a href={`/bgm/${bgm}.mp3`} target='_blank'>
														<FiPlay
															style={{
																strokeWidth: '2',
																flex: '1',
																width: '1.5rem',
																height: '1.5rem',
																fontWeight: 'bold',
																color: '#344054',
															}}
														/>
													</a>
												}
											/>
										)}
									</div>
								</div>
								{bgm && (
									<div>
										<Instruction>Volume: {bgmVolume * 100}</Instruction>
										<RangeSlider
											onChange={(value: number) => {
												if (value !== 0) {
													console.log(value);
													setBgmVolume(value);
												}
											}}
											value={bgmVolume}
											minValue={0.05}
											choices={[0, 0.05, 0.1, 0.2, 0.3, 0.4]}
										/>
									</div>
								)}
							</WrappableRow>

							<div>
								<Instruction>Transition Between Slides:</Instruction>
								<WrappableRow type='grid' cols={2}>
									<DropDown
										onChange={(e) => setTransitionType(e.target.value)}
										value={transitionType}
									>
										<option value=''>⏹️ None</option>
										<option value='crossfade'>🌫️ Fade</option>
										<option value='slide'>➡️ Slide In</option>
									</DropDown>
									{transitionType && (
										<img
											src={`/images/script/${transitionType}.gif`}
											alt='Transition'
											className='h-24'
										/>
									)}
								</WrappableRow>
							</div>

							<div className='flex flex-row items-center gap-x-2'>
								<input
									type='checkbox'
									checked={withSubtitle}
									onChange={() => setWithSubtitle(!withSubtitle)}
								/>{' '}
								<Instruction>Add subtitle to video.</Instruction>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</Card>

			<Card>
				<Accordion type='single' collapsible className='w-full'>
					<AccordionItem value='item-3'>
						<AccordionTrigger>
							<BigTitle>🦹‍♂️ Avatar</BigTitle>
						</AccordionTrigger>
						<AccordionContent>
							{isOpenaiVoice(voice) || isClonedVoice(voice) ? (
								<WarningMessage>
									The voice you selected does not support avatars yet.
								</WarningMessage>
							) : (
								<>
									<Instruction>
										Select the avatar you want to use for your video.
										{/* <GrayLabel>Beta</GrayLabel> */}
									</Instruction>
									<Explanation>
										Due to the limitation of our resources, we can only provide
										a limited number of video generations with avatars. <br />
										This feature will cost more credits. <br />
										The credit cost for videos with avatar is 400⭐️ per video.
										This may change in the future.
									</Explanation>
									<AvatarSelector
                    gender={gender}
										avatar={avatar}
										setAvatar={setAvatar}
										posture={posture}
										setPosture={setPosture}
										size={size}
										setSize={setSize}
										position={position}
										setPosition={setPosition}
									/>
								</>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</Card>
		</>
	);
};

export default AudioVideoDetailSettingsSection;
