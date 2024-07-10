'use client';
import React, { useEffect, useState } from 'react';
import Slide from '@/models/Slide';
import { templateDispatch } from './templateDispatch';
import {
	PaletteKeys,
	TemplateKeys,
	availableTemplates,
} from '@/components/slides/slideTemplates';
import { layoutOptions } from './slideLayout';
import SlideContainer from './SlideContainer';
import { Explanation, Instruction } from '../ui/Text';
import { ScrollBar } from '../ui/ScrollBar';
import { useProject } from '@/hooks/use-project';
import { useSlides } from '@/hooks/use-slides';
import Resource from '@/models/Resource';

type SlideDesignPreviewProps = {
	selectedTemplate: string;
	selectedPalette: string;
	axial?: 'x' | 'y';
	useGridLayout?: boolean;
	gridCols?: number;
	slideContainerScale?: number;
	selectedSlideBackgroundImgResource?: Resource[];
	selectedSlideLogoResource?: Resource[];
	selectedLayouts: string[];
  setSelectedLayouts: Function;
};

const SlideDesignPreview: React.FC<SlideDesignPreviewProps> = ({
	selectedTemplate,
	selectedPalette,
	axial = 'x',
	useGridLayout = false,
	gridCols = 2,
	slideContainerScale = 0.2,
	selectedSlideBackgroundImgResource,
	selectedSlideLogoResource,
  selectedLayouts,
  setSelectedLayouts
}) => {
	const { slides, version } = useSlides();
	const [previewSlides, setPreviewSlides] = useState<Slide[]>([]);
	const { project } = useProject();

	useEffect(() => {
		console.log('current project', project);
		const isValidTemplateKey = (key: string): key is TemplateKeys => {
			return key in availableTemplates;
		};

		const template = isValidTemplateKey(selectedTemplate)
			? selectedTemplate
			: 'Default';

		const color_theme = selectedPalette as PaletteKeys;

		const newSlides = Object.keys(layoutOptions).map((layoutKey) => {
			const newSlide = new Slide();
			newSlide.head = slides[0]?.head || 'Slide Deck Title';
			newSlide.userName = slides[0]?.userName || 'Created with DrLambda';
			newSlide.title = slides[1]?.title || 'New Slide';
			newSlide.subtopic = slides[1]?.subtopic || 'New Slide';
			newSlide.template = template;
			newSlide.palette = color_theme;
			newSlide.layout = layoutKey as keyof typeof layoutOptions;
			newSlide.image_positions = slides[0]?.image_positions;
			newSlide.background_url =
				selectedSlideBackgroundImgResource?.[0]?.thumbnail_url || '';
			newSlide.logo_url = selectedSlideLogoResource?.[0]?.thumbnail_url || '';
			newSlide.logo = project?.logo || '';
			newSlide.logo_position = project?.logo_position || 'BottomLeft';

			if (
				layoutKey === 'Col_2_img_0_layout' ||
				layoutKey === 'Col_2_img_2_layout'
			) {
				newSlide.content = ['Some content here', 'Some more content here'];
			}

			if (
				layoutKey === 'Col_1_img_1_layout' ||
				layoutKey === 'Col_2_img_1_layout' ||
				layoutKey === 'Col_2_img_2_layout' ||
				layoutKey === 'Col_3_img_3_layout' ||
				layoutKey === 'Cover_img_1_layout' ||
				layoutKey === 'Full_img_only_layout'
			) {
				let slideWithImages = Object.values(slides).find(
					(slide) => slide.layout === layoutKey && slide.images.length > 0,
				);

				if (!slideWithImages) {
					slideWithImages = Object.values(slides).find(
						(slide) =>
							slide.layout === 'Col_3_img_3_layout' && slide.images.length > 0,
					);
				}

				if (slideWithImages) {
					newSlide.images = slideWithImages.images;
				} else {
					newSlide.images = [
						'https://img.freepik.com/free-photo/beatiful-blue-sky-with-clouds-sunny-day_839833-5069.jpg',
						'https://upload.wikimedia.org/wikipedia/commons/0/07/Beatiful_kunar_Afghanistan.jpg',
						'https://img.freepik.com/free-photo/roof-building-covered-snow-against-cloudy-sky_181624-37509.jpg',
					];
				}
			} else {
				newSlide.images = [''];
			}
			return newSlide;
		});

		setPreviewSlides(newSlides);
	}, [
		selectedTemplate,
		selectedPalette,
		selectedSlideLogoResource,
		selectedSlideBackgroundImgResource,
	]);

	const handleCheckboxChange = (layoutKey: string) => {
		if (
			layoutKey === 'Cover_img_0_layout' ||
			layoutKey === 'Col_1_img_0_layout'
		) {
			return; // Prevent these layouts from being unselected
		}
		setSelectedLayouts((prevSelectedLayouts: string[]) =>
			prevSelectedLayouts.includes(layoutKey)
				? prevSelectedLayouts.filter((key) => key !== layoutKey)
				: [...prevSelectedLayouts, layoutKey],
		);
	};

	const layoutNameArray = [
		'Cover page without image',
		'Cover page with image',
		'1 column without image',
		'2 columns without image',
		'3 columns without image',
		'1 column with 1 image',
		'2 columns with 1 image',
		'2 columns with 2 images',
		'3 columns with 3 images',
		'1 Full image or chart only',
	];

	const unEditableTemplateDispatch = (
		slide: Slide,
		index: number,
		canEdit: boolean,
		exportToPdfMode: boolean = false,
	) =>
		templateDispatch(
			slide,
			index,
			false,
			exportToPdfMode,
			1,
			false,
			() => {},
			() => {},
			() => () => {},
			() => {},
			index === 0,
			slide.layout,
			slide.layout,
			true,
		);

	return (
		<>
			<Instruction>
				(Optional) Please select the layouts you would like to initialize your
				slides. You can also add new layouts back in the next step.
			</Instruction>
			<ScrollBar
				axial={axial}
				useGridLayout={useGridLayout}
				gridCols={gridCols}
			>
				{previewSlides.map((slide, index) => (
					<div
						className='DesignpreviewContainer flex flex-col items-center gap-1 p-2'
						key={`DesignpreviewContainer` + index.toString()}
					>
						<label className='flex items-center gap-2'>
							<input
								type='checkbox'
								checked={selectedLayouts.includes(slide.layout)}
								onChange={() => handleCheckboxChange(slide.layout)}
								disabled={
									slide.layout === 'Cover_img_0_layout' ||
									slide.layout === 'Col_1_img_0_layout'
								}
								className={`
								${
									slide.layout === 'Cover_img_0_layout' ||
									slide.layout === 'Col_1_img_0_layout'
										? 'text-gray-500 cursor-not-allowed'
										: ''
								}
							`}
							/>
							<Explanation>{layoutNameArray[index]}</Explanation>
						</label>
						{selectedLayouts.includes(slide.layout) && (
							<SlideContainer
								slide={slide}
								index={index}
								scale={slideContainerScale}
								isViewing={true}
								templateDispatch={unEditableTemplateDispatch}
								key={version}
							/>
						)}
					</div>
				))}
			</ScrollBar>
		</>
	);
};

export default SlideDesignPreview;
