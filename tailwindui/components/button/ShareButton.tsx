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
import { MdOutlineShare } from 'react-icons/md';
import { getBrand, getOrigin } from '@/utils/getHost';
type ShareButtonProps = {
	share: boolean;
	setShare: null | ((is_shared: boolean, is_public?: boolean) => void);
	showShareModal: boolean; // Accept showCloneModal as prop
	setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>; // Accept setShowCloneModal as prop
	isDropdownVisible?: boolean;
	setIsDropdownVisible?: React.Dispatch<React.SetStateAction<boolean>>;
	project: Project;
	host?: string;
	shareEntry?: string; // slides, socialPosts, video
	currentSlideIndex?: number;
	width?: string;
	height?: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({
	share,
	setShare,
	project,
	showShareModal,
	setShowShareModal,
	isDropdownVisible,
	setIsDropdownVisible,
	host = getOrigin(),
	shareEntry = 'slides',
	currentSlideIndex = 0,
	width,
	height,
}) => {
	// const [showModal, setShowModal] = useState(false);
	const project_id = project?.id || '';
	const [isPublic, setIsPublic] = useState(project.is_public);

	const toggleShare = async () => {
		setShare && setShare(true, isPublic); // updates db as well
		setShowShareModal && setShowShareModal(true);
		setIsDropdownVisible && setIsDropdownVisible(false);
	};

	const platforms = ['twitter', 'facebook', 'reddit', 'linkedin'];

	const keywords = project?.keywords || [];
	const description = project?.description || '';

	const limitedKeywords = keywords.slice(0, 3);
	const truncatedDescription = truncateWithFullWords(description, 100);

	const iframe = `<iframe src="${host}/embed/${project_id}?page=${currentSlideIndex + 1
		}" width="960px" height="540px"></iframe>`;

	function truncateWithFullWords(str: string, maxLength: number) {
		if (str.length <= maxLength) return str;
		return str.substring(0, str.lastIndexOf(' ', maxLength)) + '...';
	}

	const handlePost = async (platform: string, shareEntry: string) => {
		try {
			setShare && setShare(true, isPublic);
			const shareLink = shareEntry === 'video' ? `${host}/shared_video/${project_id}` : `${host}/shared/${project_id}`;
			const hashTags = limitedKeywords
				.map((keyword) => `#${keyword}`)
				.join(' ');
			const postText = `${truncatedDescription}. Learn more at ${getOrigin()}!\n${hashTags}\n`;
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
			setShowShareModal && setShowShareModal(true);
		});

		return () =>
			document.removeEventListener('share_slide', (e) => {
				setShowShareModal && setShowShareModal(true);
			});
	}, []);

	useEffect(() => {
		console.log('isDropdownvisible:', isDropdownVisible);
	}, [setIsDropdownVisible]);

	return (
		<div>
			<Modal
				showModal={showShareModal}
				setShowModal={setShowShareModal}
				title='Share / Publish'
			// description='Share your slides with others or on social media'
			>
				<div className='flex flex-col gap-2'>
					<Instruction>
						Share {shareEntry === 'socialPosts' ? 'Social Post' : shareEntry === 'slides' ? 'Slides' : 'Video'}
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
								setShare(value === 'yes', isPublic);
							}}
						/>
					)}

					{share && (
						<div>
							<Explanation>View only link:</Explanation>
							{shareEntry === 'video' ? <ClickableLink link={`${host}/shared_video/${project_id || ''}`} /> :
								<ClickableLink link={`${host}/shared/${project_id || ''}`} />
							}

						</div>
					)}

					<div className='flex flex-wrap gap-2'>
						{platforms.map((platform) => (
							<BigGrayButton
								key={platform}
								onClick={() => {
									handlePost(platform, shareEntry);
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

				{shareEntry === 'slides' && share && (
					<div>
						<Instruction>Embed this Page</Instruction>
						<Explanation>
							Copy the code below and put it on your webpage, the content will
							be updated as you update your slides. &nbsp;
							<a className='text-blue-600' href='/embed_example'>Learn More.</a>
						</Explanation>
						<ClickableLink link={iframe} />
					</div>
				)}

				{project.is_shared && setShare && shareEntry === 'slides' && (
					<div>
						<Instruction>Publish Slides</Instruction>
						<Explanation>
							Your slides will be published to {getBrand()} Discover, people can
							also find the slides on search engine.
						</Explanation>
						<RadioButton
							name='publish'
							options={[
								{ text: 'Yes', value: 'yes' },
								{ text: 'No', value: 'no' },
							]}
							selectedValue={isPublic ? 'yes' : 'no'}
							setSelectedValue={(value) => {
								setIsPublic(value === 'yes');
								setShare(true, value === 'yes');
							}}
						/>
					</div>
				)}
			</Modal>
			<ButtonWithExplanation
				button={
					<button onClick={toggleShare}>
						{/* <GoShare
							style={{
								strokeWidth: '0.8',
								flex: '1',
								width: `${width ? width : '24px'}`,
								height: `${height ? height : '24px'}`,
								// fontWeight: 'bold',
								color: '#344054',
							}}
						/> */}
						<MdOutlineShare
							style={{
								// strokeWidth: '0.8',
								// flex: '1',
								width: `${width ? width : '24px'}`,
								height: `${height ? height : '24px'}`,
								// fontWeight: 'bold',
								color: 'var(--colors-text-text-secondary-700, #344054)',
							}}
						></MdOutlineShare>
					</button>
				}
				explanation={'Share / Publish'}
			/>
		</div>
	);
};

export default ShareButton;
