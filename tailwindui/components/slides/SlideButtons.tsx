'use client';

import React, { useState } from 'react';
import {
	LeftSlideNavIcon,
	RightSlideNavIcon,
} from '@/app/(feature)/workflow-review-slides/icons';
import { BigGrayButton } from '../button/DrlambdaButton';
import { GoPlus, GoShare, } from 'react-icons/go';
import { LuTrash2, LuPalette } from 'react-icons/lu';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import Modal from '../ui/Modal';
import ClickableLink from '../ui/ClickableLink';
import PostPlatformConfigs from '@/components/button/PostPlatformConfig';
import Project from '@/models/Project';
import TemplateSelector from '@/app/(feature)/workflow-edit-design/TemplateSelector';
import { FiPlay } from 'react-icons/fi';
import { Explanation, Instruction } from '../ui/Text';
import RadioButton from '../ui/RadioButton';

type SaveButtonProps = {
	saveSlides: () => void;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ saveSlides }) => {
	return (
		<div className='col-span-1'>
			<div className='w-fit h-fit rounded-full overflow-hidden'>
				<button
					className='px-4 py-1 h-11 text-white bg-slate-600/40 hover:bg-slate-400'
					onClick={saveSlides}
				>
					Save
				</button>
			</div>
		</div>
	);
};

type PresentButtonProps = {
	openPresent: () => void;
};

export const PresentButton: React.FC<PresentButtonProps> = ({
	openPresent,
}) => {
	return (
		<ButtonWithExplanation
			button={
				<button
					onClick={openPresent}
				>
					<FiPlay
						style={{
							strokeWidth: '2',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#2943E9',
						}}
					/>
				</button>
			}
			explanation={'Present'}
		/>
	);
};

type ShareButtonProps = {
	share: boolean;
	setShare: null | ((is_shared: boolean, is_public?: boolean) => void);
	project: Project;
	host?: string;
};

export const ShareButton: React.FC<ShareButtonProps> = ({
	share,
	setShare,
	project,
	host = 'https://drlambda.ai',
}) => {
	const [showModal, setShowModal] = useState(false);
	const project_id = project?.id || '';

	const toggleShare = async () => {
		setShare && setShare(true); // updates db as well
		setShowModal(true)
	};

	const platforms = ['twitter', 'facebook', 'reddit', 'linkedin'];

	const keywords = project?.keywords || [];
	const description = project?.description || '';

	const limitedKeywords = keywords.slice(0, 3);
	const truncatedDescription = truncateWithFullWords(description, 100);

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

	return (
		<div>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title='Share / Publish'
			// description='Share your slides with others or on social media'
			>
				<div>
					<Instruction>Share Slides</Instruction>
					{setShare && <RadioButton
						name='share'
						options={[
							{ text: 'Yes', value: 'yes' },
							{ text: 'No', value: 'no' },
						]}
						selectedValue={share ? 'yes' : 'no'}
						setSelectedValue={(value) => {
							setShare(value === 'yes');
						}}
					/>}

					{share && (
						<div>
							<Explanation>View only link:</Explanation>
							<ClickableLink link={`${host}/shared/${project_id || ''}`} />
						</div>
					)}
				</div>

				<div className='flex flex-wrap gap-2'>
					{platforms.map((platform) => (
						<BigGrayButton
							key={platform}
							onClick={() => { handlePost(platform) }}>
							Post to{' '}
							{
								PostPlatformConfigs[platform as keyof typeof PostPlatformConfigs]
									.displayName
							}

						</BigGrayButton>
					))}
				</div>

				{project.is_shared && setShare &&
					<div>
						<Instruction>Publish Slides</Instruction>
						<Explanation>Your slides will be published to DrLambda Discover, people can also find the slides on search engine.</Explanation>
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
					</div>}
			</Modal >
			<ButtonWithExplanation
				button={
					<button
						onClick={toggleShare}
					>
						<GoShare
							style={{
								strokeWidth: '0.8',
								flex: '1',
								width: '1.5rem',
								height: '1.5rem',
								// fontWeight: 'bold',
								color: '#2943E9',
							}}
						/>
					</button>
				}
				explanation={'Share / Publish'}
			/>
		</div>
	);
};

export const SlidePagesIndicator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
}> = ({ currentSlideIndex, slides }) => {
	return (
		<div className='col-span-1'>
			<div className='w-20 h-7 px-4 py-1 bg-indigo-400 rounded-3xl justify-center items-center gap-2 inline-flex'>
				<div className='flex flex-row text-center'>
					<span className='text-zinc-100 text-xs font-bold font-creato-medium leading-tight tracking-wide'>
						{currentSlideIndex + 1}
					</span>
					<span className='text-zinc-100 text-xs font-normal font-creato-medium leading-tight tracking-wide'>
						{' / '}
					</span>
					<span className='text-zinc-100 text-xs font-bold font-creato-medium leading-tight tracking-wide'>
						{slides.length}
					</span>
				</div>
			</div>
		</div>
	);
};

export const SlideLeftNavigator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
	goToSlide: (index: number) => void;
}> = ({ currentSlideIndex, slides, goToSlide }) => {
	return (
		<div className='col-span-1'>
			<div className='w-fit h-fit flex flex-row items-center justify-center mx-auto rounded-full'>
				<button
					disabled={currentSlideIndex === 0}
					className='text-white text-2xl mx-4 my-1 disabled:text-black'
					onClick={() => goToSlide(currentSlideIndex - 1)}
				>
					{/* &#9664; */}
					<LeftSlideNavIcon />
				</button>
			</div>
		</div>
	);
};

export const SlideRightNavigator: React.FC<{
	currentSlideIndex: number;
	slides: any[]; // Replace 'any' with the appropriate type if known
	goToSlide: (index: number) => void;
}> = ({ currentSlideIndex, slides, goToSlide }) => {
	return (
		<div className='col-span-1'>
			<div className='w-fit h-fit flex flex-row items-center justify-center mx-auto rounded-full'>
				<button
					disabled={currentSlideIndex === slides.length - 1}
					className='text-white text-2xl mx-4 my-1 disabled:text-gray-400'
					onClick={() => goToSlide(currentSlideIndex + 1)}
				>
					{/* &#9654; */}
					<RightSlideNavIcon />
				</button>
			</div>
		</div>
	);
};

export const AddSlideButton: React.FC<{
	currentSlideIndex: number;
	addPage: () => void;
}> = ({ currentSlideIndex, addPage }) => {
	return (
		<ButtonWithExplanation
			button={
				<button
					onClick={addPage}
				>
					<GoPlus
						style={{
							strokeWidth: '0.9',
							flex: '1',
							width: '1.7rem',
							height: '1.7rem',
							fontWeight: 'bold',
							color: '#2943E9',
						}}
					/>
				</button>
			}
			explanation={'Add Page'}
		/>
	);
};

export const DeleteSlideButton: React.FC<{
	currentSlideIndex: number;
	deletePage: () => void;
}> = ({ currentSlideIndex, deletePage }) => {
	return (
		<ButtonWithExplanation
			button={
				<button
					onClick={deletePage}
				>
					<LuTrash2
						style={{
							strokeWidth: '2',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#2943E9',
						}}
					/>
				</button>
			}
			explanation={'Delete Page'}
		/>
	);
};

// use to change the template. selection box
// export const ChangeTemplateOptions: React.FC<{
//   templateOptions: string[]
//   onChangeTemplate: (newTemplate: string) => void
// }> = ({ templateOptions, onChangeTemplate }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState('')
//   const handleTemplateChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setSelectedTemplate(event.target.value)
//   }
//   const applyTemplateChange = () => {
//     if (selectedTemplate) {
//       onChangeTemplate(selectedTemplate)
//     }
//   }
//   useEffect(() => console.log('templateOptions are:', templateOptions), [])
//   return (
//     <div className='relative'>
//       <select
//         className='border border-gray-300 rounded-md px-3 py-1 mr-2'
//         onChange={handleTemplateChange}
//         value={selectedTemplate}
//       >
//         <option value='' disabled>
//           Select Template
//         </option>
//         {templateOptions.map((template) => (
//           <option key={template} value={template}>
//             {template}
//           </option>
//         ))}
//       </select>
//       <button
//         className='bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer'
//         onClick={applyTemplateChange}
//       >
//         Apply
//       </button>
//     </div>
//   )
// }
export const ChangeTemplateOptions: React.FC<{
	currentTemplate: string;
	templateOptions: string[];
	onChangeTemplate: (newTemplate: string) => void;
}> = ({ currentTemplate, templateOptions, onChangeTemplate }) => {
	const [selectedTemplate, setSelectedTemplate] =
		useState<string>(currentTemplate);
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title='Change Template'
				description='Select a template for your slides'
				onConfirm={() => { onChangeTemplate(selectedTemplate); setShowModal(false) }}
			>
				<div className='max-w-[60rem]'>
					<TemplateSelector
						template={selectedTemplate}
						setTemplate={setSelectedTemplate}
					/>
				</div>
			</Modal>
			<ButtonWithExplanation
				button={
					<button
						onClick={() => { setShowModal(true) }}
					>
						<LuPalette
							style={{
								strokeWidth: '2',
								flex: '1',
								width: '1.5rem',
								height: '1.5rem',
								fontWeight: 'bold',
								color: '#2943E9',
							}}
						/>
					</button>
				}
				explanation={'Change Template'}
			/>
		</>
	);
};
