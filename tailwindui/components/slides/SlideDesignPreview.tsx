import React, { useRef, useEffect, useState } from 'react';
import Slide from '@/models/Slide';
import { templateDispatch } from './templateDispatch';
import {
	PaletteKeys,
	TemplateKeys,
	availableTemplates,
} from '@/components/slides/slideTemplates';
import { layoutOptions } from './slideLayout';
import SlideContainer from './SlideContainer';
import '@/components/slides/overflowScrollbar.css';
import themeConfigData from './templates_customizable_elements/theme_elements';
import layoutConfigData from './templates_customizable_elements/layout_elements';
import { Explanation } from '../ui/Text';
import { ScrollBar } from '../ui/ScrollBar';
import { useProject } from '@/hooks/use-project';
type SlideDesignPreviewProps = {
	selectedTemplate: string;
	selectedPalette: string;
};

const SlideDesignPreview: React.FC<SlideDesignPreviewProps> = ({
	selectedTemplate,
	selectedPalette,
}) => {
	const [slides, setSlides] = useState<Slide[]>([]);
	const { project } = useProject();
	// const template = isValidTemplateKey(selectedTemplate) ? selectedTemplate : 'Default';
	// const slides = Object.keys(layoutOptions).map((layoutKey) => {
	//     const newSlide = new Slide();
	//     newSlide.template = template;
	//     newSlide.layout = layoutKey as keyof typeof layoutOptions;
	//     if(layoutKey === 'Col_2_img_0_layout' || layoutKey === 'Col_2_img_2_layout'){
	//         newSlide.content = ['Some content here', 'Some more content here']
	//     }
	//     newSlide.images = ["https://img.freepik.com/free-photo/beatiful-blue-sky-with-clouds-sunny-day_839833-5069.jpg","https://upload.wikimedia.org/wikipedia/commons/0/07/Beatiful_kunar_Afghanistan.jpg","https://img.freepik.com/free-photo/roof-building-covered-snow-against-cloudy-sky_181624-37509.jpg"]
	//     return newSlide;
	// });

	useEffect(() => {
		const isValidTemplateKey = (key: string): key is TemplateKeys => {
			return key in availableTemplates;
		};

		const template = isValidTemplateKey(selectedTemplate)
			? selectedTemplate
			: 'Default';

		// const color_theme =
		// 	typeof selectedPalette === 'string'
		// 		? (selectedPalette as PaletteKeys)
		// 		: ('Original' as PaletteKeys);
		const color_theme = selectedPalette as PaletteKeys;

		const newSlides = Object.keys(layoutOptions).map((layoutKey) => {
			const newSlide = new Slide();
			newSlide.head = project?.topic || 'New Slide';
			newSlide.title = project?.topic || 'New Slide';
			newSlide.subtopic = project?.topic || 'New Slide';
			newSlide.template = template;
			newSlide.palette = color_theme;
			newSlide.layout = layoutKey as keyof typeof layoutOptions;

			if (
				layoutKey === 'Col_2_img_0_layout' ||
				layoutKey === 'Col_2_img_2_layout'
			) {
				newSlide.content = ['Some content here', 'Some more content here'];
			}

			newSlide.images = [
				'https://img.freepik.com/free-photo/beatiful-blue-sky-with-clouds-sunny-day_839833-5069.jpg',
				'https://upload.wikimedia.org/wikipedia/commons/0/07/Beatiful_kunar_Afghanistan.jpg',
				'https://img.freepik.com/free-photo/roof-building-covered-snow-against-cloudy-sky_181624-37509.jpg',
			];
			return newSlide;
		});

		setSlides(newSlides);
	}, [selectedTemplate, selectedPalette]);

	const layoutNameArray = [
		'Cover page without image',
		'Cover page with image',
		'1 column without image',
		'2 columns without image',
		'3 columns without image',
		'1 column with 1 image',
		'2 column with 1 image',
		'2 columns with 2 images',
		'3 columns with 3 images',
	];

	const editableTemplateDispatch = (
		slide: Slide,
		index: number,
		canEdit: boolean,
		exportToPdfMode: boolean = false,
	) =>
		templateDispatch(
			slide,
			index,
			canEdit,
			exportToPdfMode,
			false,
			() => { },
			() => { },
			() => () => { },
			() => { },
			// slide.palette,
			index === 0 || index === 1,
			slide.layout,
			slide.layout,
			true,
		);
	return (
		<ScrollBar>
			{slides.map((slide, index) => (
				<div
					className='flex flex-col items-center gap-1 p-2'
					key={`DesignpreviewContainer` + index.toString()}
				>
					{/* {index + 1} */}
					<SlideContainer
						slide={slide}
						index={index}
						scale={0.2}
						isViewing={true}
						templateDispatch={editableTemplateDispatch}
					/>
					<Explanation>{layoutNameArray[index]}</Explanation>
				</div>
			))}
		</ScrollBar>
	);
};

export default SlideDesignPreview;
