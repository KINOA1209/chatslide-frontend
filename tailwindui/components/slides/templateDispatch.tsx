import Slide from '@/models/Slide';
import { SlideKeys } from '@/models/Slide';
import {
	availableTemplates,
	PaletteKeys,
} from '@/components/slides/slideTemplates';
import { useUser } from '@/hooks/use-user';
import {
	Col_1_img_1_layout,
	LayoutKeys,
} from '@/components/slides/slideLayout';
import dynamic from 'next/dynamic';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { loadCustomizableElements } from './SlidesHTML';
import { TemplatesLogos } from './templates_customizable_elements/Templates_logos';
import { isHTML } from '@/components/slides/quillEditorSlide';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import Chart, { Group } from '@/models/Chart';
import ImagesPosition from '@/models/ImagesPosition';
import { lightColorPalette, darkColorPalette } from './palette';

const QuillEditable = dynamic(
	() => import('@/components/slides/quillEditorSlide'),
	{ ssr: false },
);

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
		images_position: ImagesPosition[],
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
	// 	console.log('chosen template string:', slide.template);
	// 	console.log('template config:', themeElements);
	// }, []);
	const { isPaidUser, token } = useUser();
	let keyPrefix = '';
	if (exportToPdfMode) {
		keyPrefix = 'exportToPdf';
	} else if (!canEdit) {
		keyPrefix = 'preview';
	}
	// console.log('slide.template is :', slide.template);
	// console.log('availableTemplates are:', availableTemplates);

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
	const layoutKeysArray: LayoutKeys[] = [
		'',
		'Cover_img_0_layout',
		'Cover_img_1_layout',
		'Col_1_img_0_layout',
		'Col_2_img_0_layout',
		'Col_3_img_0_layout',
		'Col_2_img_1_layout',
		'Col_1_img_1_layout',
		'Col_2_img_2_layout',
		'Col_3_img_3_layout',
	];

	const isLayoutOptionValid = layoutKeysArray.includes(layoutOptionCover);

	// whether has light background, to decide which version of logo to dispatch according to palette
	const isLightBackground = lightColorPalette.includes(slide.palette);

	const finalLayoutKey = isLayoutOptionValid
		? layoutOptionCover
		: index === 0
		? 'Cover_img_1_layout'
		: 'Col_1_img_0_layout';

	// console.log(
	// 	`availableTemplates has template key ${slide.template}`,
	// 	availableTemplates.hasOwnProperty(slide.template),
	// );
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
	);
	const processContent = (item: string) => {
		if (isHTML(item)) {
			if (item.trim().startsWith('<li') && item.trim().endsWith('</li>')) {
				return `<ol>${item}</ol>`;
			} else {
				return item;
			}
		} else {
			return `<ol><li>${item}</li></ol>\n`;
		}
	};
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
					style={{ ...style, outline: 'none' }}
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
							handleSlideEdit(
								newContent,
								index,
								contentTag,
								contentIndex,
								false,
							)
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
							handleSlideEdit(newContent, index, contentTag, undefined, false)
						}
						style={style}
						isVerticalContent={isVerticalContent}
						templateKey={templateKey}
					/>
				);
			}
		}
	};

	let custom_logo = 'Default';
	if (slide.template && slide.template.length > 0) {
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
	return (
		<Template
			canEdit={canEdit}
			key={keyPrefix + index.toString()}
			user_name={
				isShowingLogo ? (
					isPaidUser ? (
						generateContentElement(
							slide.userName,
							'userName',
							themeElements.userNameFontCSS,
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
				) : (
					<></>
				)
			}
			title={generateContentElement(
				slide.head,
				'head',
				themeElements.headFontCSS,
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
							slide.layout === 'Col_2_img_1_layout' ||
								slide.layout === 'Col_1_img_1_layout'
								? { ...themeElements.contentFontCSS, fontSize: '14pt' }
								: themeElements.contentFontCSS,
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
									// themeElements.contentFontCSS_non_vertical_content,
									slide.layout === 'Col_2_img_0_layout' ||
										slide.layout === 'Col_3_img_0_layout'
										? {
												...themeElements.contentFontCSS_non_vertical_content,
												fontSize: '16pt',
										  }
										: themeElements.contentFontCSS_non_vertical_content,
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
			images_position={slide.images_position || [{}, {}, {}]}
			palette={slide.palette}
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
