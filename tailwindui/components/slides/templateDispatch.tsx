import { h1Style, h2Style, h3Style, h4Style, listStyle } from './Styles';
import { Slide, SlideKeys } from '@/components/slides/SlidesHTML';
import { availableTemplates } from '@/components/slides/slideTemplates';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { LayoutKeys } from '@/components/slides/slideLayout';
import dynamic from 'next/dynamic';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { loadCustomizableElements } from './SlidesHTML';
const QuillEditable = dynamic(
	() => import('@/components/socialPost/quillEditor'),
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
	brandingColor?: string,
): JSX.Element => {
	let keyPrefix = '';
	if (exportToPdfMode) {
		keyPrefix = 'exportToPdf';
	} else if (!canEdit) {
		keyPrefix = 'preview';
	}
	useEffect(() => {
		console.log('chosen template string:', slide.template);
		console.log('template config:', customizableElements);
	}, []);
	const Template =
		availableTemplates[slide.template as keyof typeof availableTemplates];

	const customizableElements = loadCustomizableElements(slide.template);
	const generateContentElement = (
		content: string,
		contentTag: SlideKeys,
		style: CSSProperties,
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
			)}
			topic={
				// <div className={`${index === 0 ? 'hidden' : ''}`}>
				generateContentElement(
					slide.title,
					'title',
					customizableElements.titleFontCSS,
				)
				// </div>
			}
			subtopic={generateContentElement(
				slide.subtopic,
				'subtopic',
				customizableElements.subtopicFontCSS,
			)}
			content={slide.content.map((content: string, contentIndex: number) => {
				// math mode
				if (content.includes('$$') || content.includes('\\(')) {
					if (editMathMode) {
						return (
							<>
								<div
									key={
										keyPrefix + index.toString() + '_' + contentIndex.toString()
									}
									className={`rounded-md outline-2  ${!exportToPdfMode} ${
										canEdit
											? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
											: ''
									}${index === 0 ? 'hidden' : ''}  px-2 py-1`}
									contentEditable={canEdit}
									// style={listStyle}
									onFocus={() => {
										if (canEdit) {
											setIsEditMode(true);
										}
									}}
									onBlur={(e) => {
										const modifiedContent = [...slide.content];
										modifiedContent[contentIndex] = e.target.innerText;
										handleSlideEdit(modifiedContent, index, 'content');
									}}
								>
									{content}
								</div>
							</>
						);
					} else {
						return (
							<div className={`${index === 0 ? 'hidden' : ''}`}>
								{' '}
								<MathJaxContext
									key={
										keyPrefix + index.toString() + '_' + contentIndex.toString()
									}
								>
									<MathJax>
										<div
											onClick={toggleEditMathMode}
											className={`rounded-md outline-2 ${!exportToPdfMode} ${
												canEdit
													? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
													: ''
											}  px-2 py-1`}
											// style={listStyle}
										>
											{content}
										</div>
									</MathJax>
								</MathJaxContext>
							</div>
						);
					}
				}
				return (
					<div
						key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
						className={`${index === 0 ? 'hidden' : ''}`}
					>
						{generateContentElement(
							content,
							'content',
							customizableElements.contentFontCSS,
							contentIndex,
						)}
					</div>
				);
			})}
			imgs={slide.images as string[]}
			update_callback={updateImgUrlArray(index)}
			isCoverPage={isCoverPage}
			layoutOptionNonCover={layoutOptionNonCover}
			layoutOptionCover={layoutOptionCover}
			brandingColor={brandingColor}
		/>
	);
	// }
};
