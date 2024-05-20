import Slide, { Media } from '@/models/Slide';
import { SlideKeys } from '@/models/Slide';
import {
	availableTemplates,
	PaletteKeys,
} from '@/components/slides/slideTemplates';
import { useUser } from '@/hooks/use-user';
import { layoutOptions } from '@/components/slides/slideLayout';
import {
	Col_1_img_1_layout,
	LayoutKeys,
} from '@/components/slides/slideLayout';
import dynamic from 'next/dynamic';
import React, { CSSProperties, useEffect, useRef } from 'react';
import {
	loadCustomizableElements,
	loadLayoutConfigElements,
} from './SlidesHTML';
import { TemplatesLogos } from './templates_customizable_elements/Templates_logos';
import { isHTML } from '@/components/slides/quillEditorSlide';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import Chart, { Group } from '@/models/Chart';
import ImagePosition from '@/models/ImagePosition';
import { lightColorPalette, darkColorPalette } from './palette';
import { useSlides } from '@/hooks/use-slides';
import '@/components/socialPost/quillEditor.scss';

const QuillEditable = dynamic(
	() => import('@/components/slides/quillEditorSlide'),
	{ ssr: false },
);

const processContent = (item: string) => {
	if (isHTML(item)) {
		if (item.trim().startsWith('<li') && item.trim().endsWith('</li>')) {
			return `<ul>${item}</ul>`;
		} else {
			return item;
		}
	} else {
		return `<ul><li>${item}</li></ul>\n`;
	}
};

export const templateDispatch = (
	slide: Slide,
	index: number,
	canEdit: boolean = true,
	exportToPdfMode: boolean = false,
	editMathMode: boolean = false,
	setIsEditMode: (isEditMode: boolean) => void = () => {}, // Replace with your default function if you have one
	handleSlideEdit: (
		content: string | string[],
		index: number,
		tag: SlideKeys,
		contentIndex?: number,
		rerender?: boolean,
	) => void = () => {}, // Replace with your default function if you have one
	updateImgUrlArray: (
		slideIndex: number,
	) => (
		urls: string[],
		ischart: boolean[],
		image_positions: ImagePosition[],
		embed_code: string[],
		media_types: Media[],
	) => void = () => () => {}, // Replace with your default function if you have one
	toggleEditMathMode: () => void = () => {}, // Replace with your default function if you have one
	// palette: PaletteKeys = 'Original',
	isCoverPage: boolean = false,
	layoutOptionNonCover: LayoutKeys = 'Col_2_img_1_layout',
	layoutOptionCover: LayoutKeys = 'Cover_img_1_layout',
	isCurrentSlide: boolean = false,
	// templateLogo: string,
	// brandingColor?: string,
	isShowingLogo: boolean = true,
): JSX.Element => {
	// useEffect(() => {
	// 	console.log('current slide palette', index, slide.palette);
	// }, []);
	const {
		customTemplateBgColor,
		updateCustomBgColorForTemplate,
		setInitialLoadedTitleFontFamily,
		hasSelectedCustomTemplateBgColor,
		customizedTemplateTitleFontFamily,
		HasSelectedCustomizedTemplateTitleFontFamily,
		customizedTemplateSubtitleFontFamily,
		HasSelectedCustomizedTemplateSubtitleFontFamily,
		customizedTemplateContentFontFamily,
		HasSelectedCustomizedTemplateContentFontFamily,
		customizedTemplateTitleFontColor,
		hasSelectedCustomizedTemplateTitleFontColor,
		customizedTemplateSubtitleFontColor,
		hasSelectedCustomizedTemplateSubtitleFontColor,
		customizedTemplateContentFontColor,
		hasSelectedCustomizedTemplateContentFontColor,
	} = useSlides();
	const { isPaidUser, token } = useUser();

	// for col1img1 layout, maxHeight would be 160px, for col2img2 140px; for col2img1 it's 280px, for col3img3 it's 130px; for col1img0 280px; for col2img0 280px; for col3img0 280px
	const maxContentTextAreaHeight = (layout: LayoutKeys) => {
		switch (layout) {
			case 'Col_2_img_1_layout':
				return '280px';
			case 'Col_1_img_1_layout':
				return '160px';
			case 'Col_1_img_0_layout':
				return '280px';
			case 'Col_2_img_0_layout':
				return '280px';
			case 'Col_3_img_0_layout':
				return '280px';
			case 'Col_2_img_2_layout':
				return '140px';
			case 'Col_3_img_3_layout':
				return '130px';
			default:
				return '160px'; // Default maxHeight
		}
	};

	const dynamicCalculateContentFontSize = (
		layout: LayoutKeys,
		maxContentLength: number,
		totalContentLength: number,
	) => {
		switch (layout) {
			case 'Col_2_img_1_layout':
				return maxContentLength > 85 ? '13pt' : '14pt';
			case 'Col_1_img_1_layout':
				return maxContentLength > 95 ? '13pt' : '14pt';
			case 'Col_1_img_0_layout':
				return maxContentLength > 95 || totalContentLength > 350
					? '14pt'
					: '16pt';
			case 'Col_2_img_0_layout':
				return maxContentLength > 180 ? '14pt' : '16pt';
			case 'Col_3_img_0_layout':
				return maxContentLength > 140 ? '14pt' : '16pt';
			case 'Col_2_img_2_layout':
				return maxContentLength > 120 ? '13pt' : '14pt';
			case 'Col_3_img_3_layout':
				return maxContentLength > 110 ? '13pt' : '14pt';
			default:
				return '14pt'; // Default font size
		}
	};
	let totalContentLength = 0;
	let maxContentLength = 0;
	if (slide.content) {
		Array.from(slide.content).forEach((sentence) => {
			if (sentence) {
				totalContentLength += sentence.length;
				if (sentence.length > maxContentLength) {
					maxContentLength = sentence.length;
				}
			}
		});
	}

	// slide.content.forEach((sentence) => {
	// 	totalContentLength += sentence.length;
	// 	if (sentence.length > maxContentLength) {
	// 		maxContentLength = sentence.length;
	// 	}
	// });

	let keyPrefix = '';
	if (exportToPdfMode) {
		keyPrefix = 'exportToPdf';
	} else if (!canEdit) {
		keyPrefix = 'preview';
	}

	// prevent old projects still have 'Default_template' as template rather than new 'Default'
	// const templateKey =
	// 	slide.template === 'Default_template' ? 'Default' : slide.template;
	const templateKey = availableTemplates.hasOwnProperty(slide.template)
		? slide.template
		: 'Default';

	//TODO: when backenis available
	// const paletteKey = availablePalettes.hasOwnProperty(slide.color_theme)
	// 	? slide.color_theme
	// 	: 'Original';

	// check for layout keys validity, make sure layoutKeys are valid

	const allLayoutKeys: Record<LayoutKeys, boolean> = {
		'': true,
		Cover_img_0_layout: true,
		Cover_img_1_layout: true,
		Col_1_img_0_layout: true,
		Col_2_img_0_layout: true,
		Col_3_img_0_layout: true,
		Col_2_img_1_layout: true,
		Col_1_img_1_layout: true,
		Col_2_img_2_layout: true,
		Col_3_img_3_layout: true,
		Full_img_only_layout: true,
	};

	const layoutKeysArray: LayoutKeys[] = Object.keys(
		allLayoutKeys,
	) as LayoutKeys[];

	const isLayoutOptionValid = layoutKeysArray.includes(layoutOptionCover);

	// whether has light background, to decide which version of logo to dispatch according to palette
	const isLightBackground = lightColorPalette.includes(slide.palette);

	const finalLayoutKey = isLayoutOptionValid
		? layoutOptionCover
		: index === 0
			? 'Cover_img_1_layout'
			: 'Col_1_img_0_layout';

	const Template =
		availableTemplates[templateKey as keyof typeof availableTemplates];
	const ChosenTemplateLogo =
		TemplatesLogos[templateKey as keyof typeof TemplatesLogos];
	// const ChosenTemplateLogo =
	// 	TemplatesLogos[templateLogo as keyof typeof TemplatesLogos];
	const userUploadedLogo = slide?.logo_url;
	const userUploadedBackgroundImage = slide?.background_url;
	// this decide which themeelement to use
	const themeElements = loadCustomizableElements(
		templateKey as TemplateKeys,
		slide.palette as PaletteKeys,
		customTemplateBgColor,
		hasSelectedCustomTemplateBgColor,
		customizedTemplateTitleFontFamily,
		HasSelectedCustomizedTemplateTitleFontFamily,
		customizedTemplateSubtitleFontFamily,
		HasSelectedCustomizedTemplateSubtitleFontFamily,
		customizedTemplateContentFontFamily,
		HasSelectedCustomizedTemplateContentFontFamily,
		customizedTemplateTitleFontColor,
		hasSelectedCustomizedTemplateTitleFontColor,
		customizedTemplateSubtitleFontColor,
		hasSelectedCustomizedTemplateSubtitleFontColor,
		customizedTemplateContentFontColor,
		hasSelectedCustomizedTemplateContentFontColor,
	);

	// const initialTemplateTitleFontFamily =
	// 	themeElements?.titleFontCSS?.fontFamily;

	// useEffect(() => {
	// 	// everytime change template we reload the initial themeelement of current template for initial display
	// 	const initialCurrentTemplateTitleFontFamily = loadCustomizableElements(
	// 		templateKey as TemplateKeys,
	// 		slide.palette as PaletteKeys,
	// 	);
	// 	console.log(
	// 		'initialCurrentTemplateTitleFontFamily',
	// 		templateKey,
	// 		slide.palette,
	// 		initialCurrentTemplateTitleFontFamily,
	// 	);
	// 	setInitialLoadedTitleFontFamily(
	// 		initialCurrentTemplateTitleFontFamily?.titleFontCSS?.fontFamily,
	// 	);
	// }, [templateKey]);

	const layoutElements = loadLayoutConfigElements(
		templateKey as TemplateKeys,
		slide.layout as keyof typeof layoutOptions,
	);
	const generateContentElement = (
		content: string | string[],
		contentTag: SlideKeys,
		style: CSSProperties,
		isVerticalContent: boolean,
		contentIndex?: number,
	) => {
		if (!canEdit || !isCurrentSlide) {
			return (
				<div
					className='ql-editor non-editable-ql-editor'
					style={{
						...style,
						outline: 'none',
					}}
				>
					{Array.isArray(content) ? (
						content.map((item, index) => (
							<div
								key={index}
								dangerouslySetInnerHTML={{ __html: processContent(item) }}
							/>
						))
					) : (
						<div dangerouslySetInnerHTML={{ __html: content }} />
					)}
				</div>
			);
		} else {
			if (contentIndex !== undefined) {
				return (
					<QuillEditable
						content={content}
						handleBlur={(newContent) =>
							handleSlideEdit(newContent, index, contentTag, contentIndex, true)
						}
						style={style}
						isVerticalContent={isVerticalContent}
						templateKey={templateKey}
					/>
				);
			} else {
				return (
					<QuillEditable
						content={content}
						handleBlur={(newContent) =>
							handleSlideEdit(newContent, index, contentTag, undefined, true)
						}
						style={style}
						isVerticalContent={isVerticalContent}
						templateKey={templateKey}
					/>
				);
			}
		}
	};

	let custom_logo = slide.logo;
	if (
		slide.template &&
		slide.template.length > 0 &&
		custom_logo === 'Default'
	) {
		custom_logo = slide.template;
	}
	if (slide.logo_url && slide.logo_url.length > 0) {
		custom_logo = slide.logo_url;
	}

	const emptyGroup: Group = {
		values: [],
		color: '',
		keys: [],
		legend: '',
	};
	const defaultChartArr = Array.from({ length: 3 }, () => ({
		type: '',
		title: '',
		groups: [emptyGroup],
		axis: { x: '', y: '' },
	}));

	// useEffect(() => {
	// 	console.log('current theme element is', themeElements.backgroundColorCover);
	// });

	return (
		<Template
			canEdit={canEdit}
			key={keyPrefix + index.toString()}
			user_name={
				isPaidUser ? (
					generateContentElement(
						slide.userName,
						'userName',
						{
							...themeElements.userNameFontCSS,
							textAlign:
								themeElements.userNameAlignment &&
								slide.layout === 'Cover_img_0_layout'
									? themeElements.userNameAlignment.textAlign
									: 'left',
						},
						false,
					)
				) : (
					<div
						key={0}
						className={`rounded-md outline-2 ${!exportToPdfMode} ${
							index !== 0 ? 'hidden' : ''
						}`}
						style={themeElements.userNameFontCSS}
						contentEditable={false}
						dangerouslySetInnerHTML={{ __html: slide.userName }}
					/>
				)
			}
			title={generateContentElement(
				slide.head,
				'head',
				{
					...themeElements.headFontCSS,
					textAlign:
						themeElements.headFontAlignment &&
						slide.layout === 'Cover_img_0_layout'
							? themeElements.headFontAlignment.textAlign
							: 'left',
				},
				false,
			)}
			topic={generateContentElement(
				slide.title,
				'title',
				themeElements.titleFontCSS,
				false,
			)}
			subtopic={generateContentElement(
				slide.subtopic,
				'subtopic',
				themeElements.subtopicFontCSS,
				false,
			)}
			content={
				slide.layout === 'Col_1_img_0_layout' ||
				slide.layout === 'Col_2_img_1_layout' ||
				slide.layout === 'Col_1_img_1_layout'
					? generateContentElement(
							slide.content,
							'content',

							{
								...themeElements.contentFontCSS,
								fontSize: dynamicCalculateContentFontSize(
									slide.layout,
									maxContentLength,
									totalContentLength,
								),
								// maxHeight: maxContentTextAreaHeight(slide.layout),
							},
							true,
						)
					: slide.content.map((item, contentIndex) => (
							<div
								key={
									keyPrefix + index.toString() + '_' + contentIndex.toString()
								}
								className={`${index === 0 ? 'hidden' : ''}`}
							>
								{generateContentElement(
									item,
									'content',

									{
										...themeElements.contentFontCSS_non_vertical_content,
										fontSize: dynamicCalculateContentFontSize(
											slide.layout,
											maxContentLength,
											totalContentLength,
										),
										// maxHeight: maxContentTextAreaHeight(slide.layout),
									},
									false,
									contentIndex,
								)}
							</div>
						))
			}
			imgs={slide.images as string[]}
			update_callback={updateImgUrlArray(index)}
			isCoverPage={isCoverPage}
			layoutOptionNonCover={finalLayoutKey}
			layoutOptionCover={finalLayoutKey}
			// brandingColor={brandingColor}
			templateLogo={
				isShowingLogo ? (
					<ChosenTemplateLogo
						isCoverPage={isCoverPage}
						custom_logo={custom_logo}
						template_name={slide.template}
						isLightBackground={isLightBackground}
						// isLogoLeftSide={slide.is_logo_left}
						logoPosition={slide.logo_position}
					/>
				) : (
					<></>
				)
			}
			uploadedLogoUrl={slide.logo_url}
			uploadedBackgroundImageUrl={slide.background_url}
			charts={slide.chart || defaultChartArr}
			ischarts={slide.is_chart}
			handleSlideEdit={handleSlideEdit}
			currentSlideIndex={index}
			isShowingLogo={isShowingLogo}
			image_positions={slide.image_positions || ['contain', 'contain', 'contain']}
			palette={slide.palette}
			template={slide.template}
			themeElements={themeElements}
			layoutElements={layoutElements}
			embed_code={slide.embed_code || ['', '', '']}
			// initialTemplateTitleFontFamily={initialTemplateTitleFontFamily}
			media_types={slide.media_types}
		/>
	);
	// }
};

export const uneditableTemplateDispatch = (
	slide: Slide,
	index: number,
	exportToPdfMode: boolean = false,
) =>
	templateDispatch(
		slide,
		index,
		false, // canEdit
		exportToPdfMode, //exportToPdfMode
		false, //editMathMode
		() => {}, //setIsEditMode
		() => {}, // handleSlideEdit
		() => () => {}, // updateImgUrlArray,
		() => {}, // toggleEditMode,
		index === 0, // isCoverPage
		slide.layout, // layoutOptionNonCover
		slide.layout, // layoutOptionCover
		false, // isCurrentSlide
	);
