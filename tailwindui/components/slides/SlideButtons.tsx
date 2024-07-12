'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GoPlus, GoShare } from 'react-icons/go';
import { LuTrash2, LuPalette } from 'react-icons/lu';
import ButtonWithExplanation from '../button/ButtonWithExplanation';
import Modal from '../ui/Modal';
import TemplateSelector from '@/app/(feature)/design/TemplateSelector';
import { FiPlay } from 'react-icons/fi';
import { FaRegClone } from 'react-icons/fa';
import { PaletteKeys, TemplateKeys } from './slideTemplates';
import availablePalettes from './palette';
import { useProject } from '@/hooks/use-project';
import { useSlides } from '@/hooks/use-slides';
import Slide from '@/models/Slide';
import brandingIcon from 'public/icons/button/show_logo.svg';
import Image from 'next/image';
import { SocialPostSlide } from '@/models/SocialPost';
import Resource from '@/models/Resource';
import { DropDown } from '../button/DrlambdaButton';
import { Menu, MenuItem } from '../button/Menu';

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
				<button onClick={openPresent}>
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
				</button>
			}
			explanation={'Present'}
		/>
	);
};


export const AddSlideButton: React.FC<{
  currentSlideIndex: number;
  addPage: () => void;
  duplicatePage: () => void;
}> = ({ currentSlideIndex, addPage, duplicatePage }) => {

	return (
		<Menu
      align='left'
			icon={
				<GoPlus
					style={{
						strokeWidth: '0.9',
						flex: '1',
						width: '1.7rem',
						height: '1.7rem',
						fontWeight: 'bold',
						color: '#344054',
					}}
				/>
			}
      iconPadding='0'
			mode='hover'
		>
			<MenuItem label='Add Page' icon={<GoPlus />} onClick={addPage} />
			<MenuItem
				label='Duplicate Page'
				icon={<FaRegClone />}
				onClick={duplicatePage}
			/>
		</Menu>
	);
};

// moved to add page
// export const DuplicateSlidePageButton: React.FC<{
// 	currentSlideIndex: number;
// 	duplicatePage: () => void;
// }> = ({ currentSlideIndex, duplicatePage }) => {
// 	return (
// 		<ButtonWithExplanation
// 			button={
// 				<button onClick={duplicatePage}>
// 					<FaRegClone
// 						style={{
// 							strokeWidth: '1',
// 							flex: '1',
// 							width: '1.3rem',
// 							height: '1.3rem',
// 							fontWeight: 'bold',
// 							color: '#344054',
// 						}}
// 					/>
// 				</button>
// 			}
// 			explanation={'Duplicate Page'}
// 		/>
// 	);
// };

export const SlidesBrandingButton: React.FC<{
	currentSlideIndex: number;
	slides: Slide[] | SocialPostSlide[];
	onToggleBrandingButton: () => void;
}> = ({ currentSlideIndex, slides, onToggleBrandingButton }) => {
	return (
		<ButtonWithExplanation
			button={
				<button className='w-[24px]' onClick={onToggleBrandingButton}>
					<Image src={brandingIcon} alt='Branding' width={24} height={24} />
				</button>
			}
			explanation={'Branding'}
		></ButtonWithExplanation>
	);
};

export const ChangeSlideTemplateButton: React.FC<{
	currentSlideIndex: number;
	slides: Slide[] | SocialPostSlide[];
	onToggleChangeTemplateButton: () => void;
}> = ({ currentSlideIndex, slides, onToggleChangeTemplateButton }) => {
	return (
		<ButtonWithExplanation
			button={
				<button onClick={onToggleChangeTemplateButton}>
					<LuPalette
						style={{
							strokeWidth: '2',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#344054',
						}}
					/>
				</button>
			}
			explanation={'Change Template'}
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
				<button onClick={deletePage}>
					<LuTrash2
						style={{
							strokeWidth: '2',
							flex: '1',
							width: '1.5rem',
							height: '1.5rem',
							fontWeight: 'bold',
							color: '#344054',
						}}
					/>
				</button>
			}
			explanation={'Delete Page'}
		/>
	);
};

export const ChangeTemplateOptions: React.FC<{}> = ({}) => {
	// const { project } = useProject();
	const {
		slides,
		hasSelectedCustomTemplateBgColor,
		updateCustomBgColorForTemplate,
		customTemplateBgColor,
		updateCustomizedTitleFontFamilyForTemplate,
		updateCustomizedSubtitleFontFamilyForTemplate,
		updateCustomizedContentFontFamilyForTemplate,
	} = useSlides();
	const { outlines, project, updateProject, bulkUpdateProject } = useProject();
	const { changeTemplateAndPaletteAndBgColorAndFontFamilyAndColor } =
		useSlides();
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateKeys>(
		slides[0]?.template || 'Default',
	);
	const [showModal, setShowModal] = useState(false);
	// Assert the type of selectedTemplate as TemplateKeys
	// const paletteOption =
	// 	availablePalettes[
	// 		selectedTemplate as keyof typeof availablePalettes
	// 	] || [];
	// layoutOptions[layoutOptionCover as keyof typeof layoutOptions];
	const [selectedPaletteOption, setSelectedPaletteOption] =
		useState<PaletteKeys>(slides[0]?.palette || 'Original');

	const [selectedTemplateBgColor, setSelectedTemplateBgColor] = useState(
		slides[0]?.background_color || '#FFFFFF',
	);
	const [selectedTemplateTitleFontColor, setSelectedTemplateTitleFontColor] =
		useState(slides[0]?.titleFontColor || '#000000');
	const [
		selectedTemplateSubtitleFontColor,
		setSelectedTemplateSubtitleFontColor,
	] = useState(slides[0]?.subtitleFontColor || '#000000');
	const [
		selectedTemplateContentFontColor,
		setSelectedTemplateContentFontColor,
	] = useState(slides[0]?.contentFontColor || '#000000');
	const [selectedTemplateTitleFontFamily, setSelectedTemplateTitleFontFamily] =
		useState(slides[0]?.titleFontFamily || 'Arial');
	const [
		selectedTemplateSubtitleFontFamily,
		setSelectedTemplateSubtitleFontFamily,
	] = useState(slides[0]?.subtitleFontFamily || 'Arial');
	const [
		selectedTemplateContentFontFamily,
		setSelectedTemplateContentFontFamily,
	] = useState(slides[0]?.contentFontFamily || 'Arial');

	const [selectedLogo, setSelectedLogo] = useState<Resource[]>(
		project?.selected_logo || [],
	);
	const [selectedBackground, setSelectedBackground] = useState<Resource[]>(
		project?.selected_background || [],
	);

	const handleConfirm = () => {
		// console.log('selectedTemplate all configs:', selectedTemplate, selectedPaletteOption, selectedTemplateBgColor, selectedTemplateTitleFontFamily, selectedTemplateSubtitleFontFamily, selectedTemplateContentFontFamily);
		// if (!hasSelectedCustomTemplateBgColor) {
		changeTemplateAndPaletteAndBgColorAndFontFamilyAndColor(
			selectedTemplate,
			selectedPaletteOption,
			selectedTemplateBgColor,
			selectedTemplateTitleFontFamily,
			selectedTemplateSubtitleFontFamily,
			selectedTemplateContentFontFamily,
			selectedTemplateTitleFontColor,
			selectedTemplateSubtitleFontColor,
			selectedTemplateContentFontColor,
		);
		// }
		// when confirm, set the selected palette color code to background color
		// updateCustomBgColorForTemplate(
		// 	colorPreviews[selectedPaletteOption as PaletteKeys],
		// );
		setShowModal(false);
	};
	// inconsistent?
	// useEffect(() => {
	// 	console.log(
	// 		'selcetedTemplate, selectedPalette',
	// 		selectedTemplate,
	// 		selectedPaletteOption,
	// 	);
	// }, [selectedTemplate]);

	useEffect(() => {
		document.addEventListener('change_template', (e) => {
			setShowModal(true);
		});

		return () =>
			document.removeEventListener('change_template', (e) => {
				setShowModal(true);
			});
	}, []);

	return (
		<>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				// title='Change Template'
				title='Theme Template'
				// description='Select a template for your slides'
				onConfirm={handleConfirm}
			>
				<div className='max-w-[60rem]'>
					<TemplateSelector
						// paletteOptions={paletteOption}
						paletteOptions={
							availablePalettes[
								selectedTemplate as keyof typeof availablePalettes
							] || ['Original']
						}
						template={selectedTemplate}
						palette={selectedPaletteOption}
						setTemplate={setSelectedTemplate}
						setPalette={setSelectedPaletteOption}
						showCustomColorPicker={true}
						setCustomizedTemplateBgColorCallback={setSelectedTemplateBgColor}
						setCustomizedTemplateContentFontFamilyCallback={
							setSelectedTemplateContentFontFamily
						}
						setCustomizedTemplateSubtitleFontFamilyCallback={
							setSelectedTemplateSubtitleFontFamily
						}
						setCustomizedTemplateTitleFontFamilyCallback={
							setSelectedTemplateTitleFontFamily
						}
						setCustomizedTemplateContentFontColorCallback={
							setSelectedTemplateContentFontColor
						}
						setCustomizedTemplateSubtitleFontColorCallback={
							setSelectedTemplateSubtitleFontColor
						}
						setCustomizedTemplateTitleFontColorCallback={
							setSelectedTemplateTitleFontColor
						}
						selectedSlideBackgroundImgResource={selectedBackground}
						selectedSlideLogoUrlResource={selectedLogo}
					/>
				</div>
			</Modal>
			<ButtonWithExplanation
				button={
					<button
						onClick={() => {
							setShowModal(true);
						}}
					>
						<LuPalette
							style={{
								strokeWidth: '2',
								flex: '1',
								width: '1.5rem',
								height: '1.5rem',
								fontWeight: 'bold',
								color: '#344054',
							}}
						/>
					</button>
				}
				explanation={'Change Template'}
			/>
		</>
	);
};
