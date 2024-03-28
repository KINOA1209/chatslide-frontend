'use client';

import React, { useEffect, useState } from 'react';
import { BigGrayButton } from '../button/DrlambdaButton';
import { GoPlus, GoShare } from 'react-icons/go';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import Modal from '../ui/Modal';
import ClickableLink from '../ui/ClickableLink';
import PostPlatformConfigs from '@/components/button/PostPlatformConfig';
import Project from '@/models/Project';
import { Explanation, Instruction } from '../ui/Text';
import RadioButton from '../ui/RadioButton';


type ShareButtonProps = {
	share: boolean;
	setShare: null | ((is_shared: boolean, is_public?: boolean) => void);
	project: Project;
	host?: string;
	isSocialPost?: boolean;
	currentSlideIndex?: number;
};

const ShareButton: React.FC<ShareButtonProps> = ({
	share,
	setShare,
	project,
	host = 'https://drlambda.ai',
	isSocialPost = false,
	currentSlideIndex = 0,
}) => {
	const [showModal, setShowModal] = useState(false);
	const project_id = project?.id || '';

	const toggleShare = async () => {
		setShare && setShare(true); // updates db as well
		setShowModal(true);
	};

	const platforms = ['twitter', 'facebook', 'reddit', 'linkedin'];

	const keywords = project?.keywords || [];
	const description = project?.description || '';

	const limitedKeywords = keywords.slice(0, 3);
	const truncatedDescription = truncateWithFullWords(description, 100);

	const iframe = `<iframe src="${host}/embed/${project_id}?page=${currentSlideIndex + 1
		}" width="100%" height="600px" frameborder="0"></iframe>`;

	function truncateWithFullWords(str: string, maxLength: number) {
		if (str.length <= maxLength) return str;
		return str.substring(0, str.lastIndexOf(' ', maxLength)) + '...';
	}

	const handlePost = async (platform: string) => {
		try {
			setShare && setShare(true);
			const shareLink = `${host}/shared/${project_id}`;
			const hashTags = limitedKeywords
				.map((keyword) => `#${keyword}`)
				.join(' ');
			const postText = `${truncatedDescription}. Learn more at drlambda.ai!\n${hashTags}\n`;
			const platformConfig =
				PostPlatformConfigs[platform as keyof typeof PostPlatformConfigs];
			const text = platformConfig.textTemplate(postText, shareLink);
			const url = `${platformConfig.shareUrl}${text}`;
			window.open(url, '_blank');
		} catch (error) {
			console.error('Failed to process Twitter post:', error);
		}
	};

	useEffect(() => {
		document.addEventListener('share_slide', (e) => {
			setShowModal(true);
		});

		return () => document.removeEventListener('share_slide', (e) => {
			setShowModal(true);
		});
	}, []);

	return (
		<div>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title='Share / Publish'
			// description='Share your slides with others or on social media'
			>
				<div className='flex flex-col gap-2'>
					<Instruction>
						Share {isSocialPost ? ' Social Post' : ' Slides'}
					</Instruction>
					{setShare && (
						<RadioButton
							name='share'
							options={[
								{ text: 'Yes', value: 'yes' },
								{ text: 'No', value: 'no' },
							]}
							selectedValue={share ? 'yes' : 'no'}
							setSelectedValue={(value) => {
								setShare(value === 'yes');
							}}
						/>
					)}

					{share && (
						<div>
							<Explanation>View only link:</Explanation>
							<ClickableLink link={`${host}/shared/${project_id || ''}`} />
						</div>
					)}

					<div className='flex flex-wrap gap-2'>
						{platforms.map((platform) => (
							<BigGrayButton
								key={platform}
								onClick={() => {
									handlePost(platform);
								}}
							>
								Post to{' '}
								{
									PostPlatformConfigs[
										platform as keyof typeof PostPlatformConfigs
									].displayName
								}
							</BigGrayButton>
						))}
					</div>
				</div>

				{!isSocialPost && (
					<div>
						<Instruction>Embed this Page</Instruction>
						<Explanation>
							Copy the code below and put it on your webpage, the content will
							be updated as you update your slides.
						</Explanation>
						<ClickableLink link={iframe} />
					</div>
				)}

				{project.is_shared && setShare && !isSocialPost && (
					<div>
						<Instruction>Publish Slides</Instruction>
						<Explanation>
							Your slides will be published to DrLambda Discover, people can
							also find the slides on search engine.
						</Explanation>
						<RadioButton
							name='publish'
							options={[
								{ text: 'Yes', value: 'yes' },
								{ text: 'No', value: 'no' },
							]}
							selectedValue={project.is_public ? 'yes' : 'no'}
							setSelectedValue={(value) => {
								setShare(true, value === 'yes');
							}}
						/>
					</div>
				)}
			</Modal>
			<ButtonWithExplanation
				button={
					<button onClick={toggleShare}>
						<GoShare
							style={{
								strokeWidth: '0.8',
								flex: '1',
								width: '1.5rem',
								height: '1.5rem',
								// fontWeight: 'bold',
								color: '#344054',
							}}
						/>
					</button>
				}
				explanation={'Share / Publish'}
			/>
		</div>
	);
};

export default ShareButton;
