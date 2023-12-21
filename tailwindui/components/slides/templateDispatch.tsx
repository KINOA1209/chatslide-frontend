import { h1Style, h2Style, h3Style, h4Style, listStyle } from './Styles';
import { Slide, SlideKeys } from '@/components/slides/SlidesHTML';
import { availableTemplates } from '@/components/slides/slideTemplates';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { LayoutKeys } from '@/components/slides/slideLayout';
import dynamic from 'next/dynamic';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { loadCustomizableElements } from './SlidesHTML';
import { TemplatesLogos } from './templates_customizable_elements/Templates_logos';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import ReactDOMServer from 'react-dom/server';
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
	saveSlides: (slides: Slide[]) => void = () => {}, // Replace with your default function if you have one
	setIsEditMode: (isEditMode: boolean) => void = () => {}, // Replace with your default function if you have one
	handleSlideEdit: (
		content: string | string[],
		index: number,
		tag: SlideKeys,
		contentIndex?: number,
	) => void = () => {}, // Replace with your default function if you have one
	updateImgUrlArray: (slideIndex: number) => (urls: string[]) => void = () =>
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
	// 	console.log('template config:', customizableElements);
	// }, []);
	let keyPrefix = '';
	if (exportToPdfMode) {
		keyPrefix = 'exportToPdf';
	} else if (!canEdit) {
		keyPrefix = 'preview';
	}
	const Template =
		availableTemplates[slide.template as keyof typeof availableTemplates];
	const ChosenTemplateLogo =
		TemplatesLogos[slide.template as keyof typeof TemplatesLogos];
	// const ChosenTemplateLogo =
	// 	TemplatesLogos[templateLogo as keyof typeof TemplatesLogos];
	const customizableElements = loadCustomizableElements(slide.template);
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
					dangerouslySetInnerHTML={{ __html: content }}
				/>
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
					/>
				);
			}
		}
	};

	return (
		<Template
			autoSave={saveSlides}
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
				customizableElements.headFontCSS,
				false,
			)}
			topic={generateContentElement(
				slide.title,
				'title',
				customizableElements.titleFontCSS,
				false,
			)}
			subtopic={generateContentElement(
				slide.subtopic,
				'subtopic',
				customizableElements.subtopicFontCSS,
				false,
			)}
			content={
				slide.layout === 'Col_1_img_0_layout' ||
				slide.layout === 'Col_2_img_1_layout'
					? generateContentElement(
							slide.content,
							'content',
							customizableElements.contentFontCSS,
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
									customizableElements.contentFontCSS_non_vertical_content,
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
			templateLogo={<ChosenTemplateLogo isCoverPage={isCoverPage} />}
		/>
	);
	// }
};
