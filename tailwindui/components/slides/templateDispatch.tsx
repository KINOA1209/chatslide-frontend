import Slide from '@/models/Slide';
import { SlideKeys } from '@/models/Slide';
import { availableTemplates } from '@/components/slides/slideTemplates';
import { LayoutKeys } from '@/components/slides/slideLayout';
import dynamic from 'next/dynamic';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { loadCustomizableElements } from './SlidesHTML';
import { TemplatesLogos } from './templates_customizable_elements/Templates_logos';
import { isHTML } from '@/components/slides/quillEditorSlide';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import Chart, {Group} from '@/models/Chart';

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
	) => void = () => {}, // Replace with your default function if you have one
	updateImgUrlArray: (slideIndex: number) => (urls: string[], ischart: boolean[]) => void = () =>
		() => {}, // Replace with your default function if you have one
	toggleEditMathMode: () => void = () => {}, // Replace with your default function if you have one

	isCoverPage: boolean = false,
	layoutOptionNonCover: LayoutKeys = 'Col_2_img_1_layout',
	layoutOptionCover: LayoutKeys = 'Cover_img_1_layout',
	isCurrentSlide: boolean = false,
	// templateLogo: string,
	brandingColor?: string,
): JSX.Element => {
	// useEffect(() => {
	// 	console.log('chosen template string:', slide.template);
	// 	console.log('template config:', themeElements);
	// }, []);
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
	const themeElements = loadCustomizableElements(templateKey);
	const processContent = (item: string) => {
		if (isHTML(item)) {
			if (item.trim().startsWith('<li>') && item.trim().endsWith('</li>')) {
				return `<ul>${item}</ul>`;
			} else {
				return item;
			}
		} else {
			return `<ul><li>${item}</li></ul>\n`;
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
							handleSlideEdit(newContent, index, contentTag, contentIndex)
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
							handleSlideEdit(newContent, index, contentTag)
						}
						style={style}
						isVerticalContent={isVerticalContent}
						templateKey={templateKey}
					/>
				);
			}
		}
	};

	let custom_logo = 'Default'
	if (slide.logo && slide.logo.length > 0) {
	  custom_logo = slide.logo
	}
	if (slide.logo_url && slide.logo.length > 0) {
	  custom_logo = slide.logo_url
	}

	const emptyGroup: Group = {
		values: [],
		color: '',
		keys: [],
		legend: ''
	};
	const defaultChartArr = Array.from({ length: 3 }, () => ({
		type: '',
		title: '',
		groups: [emptyGroup],
		axis: { x: '', y: '' }
	}));
	return (
		<Template
			canEdit={canEdit}
			key={keyPrefix + index.toString()}
			user_name={
				<div
					key={0}
					className={`rounded-md outline-2 ${!exportToPdfMode} ${
						index !== 0 ? 'hidden' : ''
					}`}
					contentEditable={false}
					dangerouslySetInnerHTML={{ __html: slide.userName }}
				/>
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
							themeElements.contentFontCSS,
							true,
					  )
					: slide.content.map((content, contentIndex) => (
							<div
								key={
									keyPrefix + index.toString() + '_' + contentIndex.toString()
								}
								className={`${index === 0 ? 'hidden' : ''}`}
							>
								{generateContentElement(
									content,
									'content',
									themeElements.contentFontCSS,
									false,
									contentIndex,
								)}
							</div>
					  ))
			}
			imgs={slide.images as string[]}
			update_callback={updateImgUrlArray(index)}
			isCoverPage={isCoverPage}
			layoutOptionNonCover={layoutOptionNonCover}
			layoutOptionCover={layoutOptionCover}
			brandingColor={brandingColor}
			templateLogo={
				<ChosenTemplateLogo
					isCoverPage={isCoverPage}
          			custom_logo={custom_logo}
				/>
			}
			uploadedLogoUrl={slide.logo_url}
			uploadedBackgroundImageUrl={slide.background_url}
			charts={slide.chart || defaultChartArr}
			ischarts={slide.is_chart}
			handleSlideEdit={handleSlideEdit}
			currentSlideIndex={index}
		/>
	);
	// }
};
