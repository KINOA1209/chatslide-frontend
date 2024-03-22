import React, { useRef, useEffect, useState } from 'react';
import Slide from '@/models/Slide';
import { templateDispatch } from './templateDispatch';
import {
	ColorThemeKeys,
	TemplateKeys,
	availableColorThemes,
	availableTemplates,
} from '@/components/slides/slideTemplates';
import { layoutOptions } from './slideLayout';
import SlideContainer from './SlideContainer';
import '@/components/slides/overflowScrollbar.css';
import themeConfigData from './templates_customizable_elements/theme_elements';
import layoutConfigData from './templates_customizable_elements/layout_elements';
import { Explanation } from '../ui/Text';
import { ScrollBar } from '../ui/ScrollBar';
type SlideDesignPreviewProps = {
	selectedTemplate: string;
	selectedColorTheme: string;
};

const SlideDesignPreview: React.FC<SlideDesignPreviewProps> = ({
	selectedTemplate,
	selectedColorTheme,
}) => {
	const [slides, setSlides] = useState<Slide[]>([]);
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
		// 	typeof selectedColorTheme === 'string'
		// 		? (selectedColorTheme as ColorThemeKeys)
		// 		: ('Original' as ColorThemeKeys);
		const color_theme = selectedColorTheme as ColorThemeKeys;

		const newSlides = Object.keys(layoutOptions).map((layoutKey) => {
			const newSlide = new Slide();
			newSlide.template = template;
			newSlide.color_theme = color_theme;
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
	}, [selectedTemplate, selectedColorTheme]);

	const layoutNameArray = [
		'Cover Page without image',
		'Cover Page with image',
		'1 column without image',
		'2 columns without image',
		'3 columns without image',
		'1 column with 1 image',
		'2 column with 1 image',
		'2 columns with 2 image',
		'3 columns with 3 image',
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
			() => {},
			() => {},
			() => () => {},
			() => {},
			slide.color_theme,
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
