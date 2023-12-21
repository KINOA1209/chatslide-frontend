import {
	h1Style,
	h2Style,
	h3Style,
	h4Style,
	h5Style,
	h6Style,
	h7Style,
	h8Style,
	h9Style,
	listStyle,
} from '@/components/socialPost/Styles';
import {
	SocialPostSlide,
	SlideKeys,
} from '@/components/socialPost/socialPostHTML';
import templates, {
	templateSamples,
} from '@/components/socialPost/socialPostTemplates';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { CompanyIconWhite } from '@/components/socialPost/socialPostIcons';
import React, { CSSProperties, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';

const QuillEditable = dynamic(() => import('./quillEditor'), { ssr: false });

export const templateDispatch = (
	slide: SocialPostSlide,
	index: number,
	canEdit: boolean = true,
	exportToPdfMode: boolean = false,
	editMathMode: boolean = false,
	saveSlides: (slides: SocialPostSlide[]) => void = () => {}, // Replace with your default function if you have one
	setIsEditMode: (isEditMode: boolean) => void = () => {}, // Replace with your default function if you have one
	handleSlideEdit: (
		content: string | string[],
		index: number,
		tag: SlideKeys,
		contentIndex?: number,
	) => void = () => {}, // Replace with your default function if you have one
	updateImgUrlArray: (slideIndex: number) => (urls: string[]) => void = () =>
		() => {}, // Replace with your default function if you have one
	updateIllustrationUrlArray: (
		slideIndex: number,
	) => (urls: string[]) => void = () => () => {},
	toggleEditMathMode: () => void = () => {}, // Replace with your default function if you have one
): JSX.Element => {
	let keyPrefix = '';
	if (exportToPdfMode) {
		keyPrefix = 'exportToPdf';
	} else if (!canEdit) {
		keyPrefix = 'preview';
	}
	const Template = templates[slide.template as keyof typeof templates];
	const arrayToHtml = (contentArray: Array<string>) => {
		return contentArray.map((item) => `<p>${item}</p>`).join('');
	};

	const generateContentElement = (
		content: string,
		contentTag: SlideKeys,
		style: CSSProperties,
		contentIndex?: number,
	) => {
		if (!canEdit) {
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

	if (index === 0) {
		return (
			<Template
				autoSave={saveSlides}
				key={keyPrefix + index.toString()}
				icon={<CompanyIconWhite />}
				update_callback={updateImgUrlArray(index)}
				canEdit={canEdit}
				imgs={slide.images}
				topic={generateContentElement(slide.topic, 'topic', h3Style)}
				keywords={generateContentElement(
					Array.isArray(slide.keywords)
						? arrayToHtml(slide.keywords)
						: slide.keywords,
					'keywords',
					h4Style,
				)}
				subtopic={<></>}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				original_title={<></>}
				English_title={<></>}
				content={[<></>]}
				brief={<></>}
				section_title={<></>}
				illustration={['']}
				title={<></>}
				quote={<></>}
				source={<></>}
			/>
		);
	} else {
		return (
			<Template
				autoSave={saveSlides}
				canEdit={canEdit}
				key={keyPrefix + index.toString()}
				icon={<CompanyIconWhite />}
				imgs={slide.images as string[]}
				update_callback={updateImgUrlArray(index)}
				subtopic={generateContentElement(slide.subtopic, 'subtopic', h2Style)}
				keywords={generateContentElement(slide.keywords, 'keywords', h1Style)}
				content={slide.content.map((content: string, contentIndex: number) => {
					if (content.includes('$$') || content.includes('\\(')) {
						if (editMathMode) {
							return (
								<div
									key={
										keyPrefix + index.toString() + '_' + contentIndex.toString()
									}
									className={`${!exportToPdfMode && 'overflow-hidden'} ${
										canEdit
											? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
											: ''
									}`}
									contentEditable={canEdit}
									style={listStyle}
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
							);
						} else {
							return (
								<MathJaxContext
									key={
										keyPrefix + index.toString() + '_' + contentIndex.toString()
									}
								>
									<MathJax>
										<div
											onClick={toggleEditMathMode}
											className={`${!exportToPdfMode && 'overflow-hidden'} ${
												canEdit
													? 'hover:outline-[#CAD0D3] focus:hover:outline-black hover:outline'
													: ''
											}`}
											style={listStyle}
										>
											{content}
										</div>
									</MathJax>
								</MathJaxContext>
							);
						}
					}
					return (
						<div
							key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
						>
							{generateContentElement(
								content,
								'content',
								listStyle,
								contentIndex,
							)}
							<hr className='my-[15px]'></hr>
						</div>
					);
				})}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				section_title={<></>}
				original_title={<></>}
				illustration={['']}
				brief={<></>}
				title={<></>}
				quote={<></>}
				source={<></>}
				English_title={<></>}
				topic={<></>}
			/>
		);
	}
};
