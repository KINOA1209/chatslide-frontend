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
import templates, {
	templateSamples,
} from '@/components/socialPost/socialPostTemplates';
import { CompanyIconWhite, CompanyIconBlack } from '@/components/socialPost/socialPostIcons';
import React, { CSSProperties, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';
import SocialPostSlide, { SlideKeys } from '@/models/SocialPost';
import Chart, { Group } from '@/models/Chart';
import ImagesPosition from '@/models/ImagesPosition';
import { useProject } from '@/hooks/use-project';
import themeConfigData from './templates_customizable_elements/theme_elements';
import { PostTypeKeys } from './templates_customizable_elements/theme_elements';

const QuillEditable = dynamic(() => import('./quillEditor'), { ssr: false });

export const templateDispatch = (
	slide: SocialPostSlide,
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
		slideIndex: number
	) => (
		urls: string[],
		ischart: boolean[],
		images_position: ImagesPosition[],
	) => void = () => () => {}, // Replace with your default function if you have one
	updateIllustrationUrlArray: (
		slideIndex: number,
	) => (
		urls: string[],
		ischart: boolean[],
		images_position: ImagesPosition[],
	) => void = () => () => {},
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
	const { project } = useProject()
	const post_type: PostTypeKeys = project?.post_type as PostTypeKeys || 'casual_topic';
	const themeElements = themeConfigData[post_type]
	
	const getUpdateCallback = (post_type: string, slideIndex: number) => {
		return post_type === 'reading_notes'
			? updateIllustrationUrlArray(slideIndex)
			: updateImgUrlArray(slideIndex)
	}

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

	if (index === 0) {
		return (
			<Template
				//autoSave={saveSlides}
				key={keyPrefix + index.toString()}
				icon={post_type === 'casual_topic' ? <CompanyIconWhite /> : <CompanyIconBlack />}
				update_callback={getUpdateCallback(project?.post_type || 'casual_topic', index)}
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
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				original_title={generateContentElement(
					slide.original_title,
					'original_title',
					h6Style,
				)}
				illustration={slide.illustration as string[]}
				title={generateContentElement(slide.title, 'title', {
					color: '#121212',
					fontFamily: 'Cormorant, sans-serif',
				})}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				images_position={slide.images_position || [{}, {}, {}]}
				handleSlideEdit={handleSlideEdit}
				subtopic={<></>}
				quote={<></>}
				source={<></>}
				English_title={<></>}
				content={[<></>]}
				brief={<></>}
				section_title={<></>}
			/>
		);
	} else {
		return (
			<Template
				canEdit={canEdit}
				key={keyPrefix + index.toString()}
				icon={<CompanyIconWhite />}
				imgs={slide.images as string[]}
				update_callback={getUpdateCallback(project?.post_type || 'casual_topic', index)}
				subtopic={generateContentElement(slide.subtopic, 'subtopic', h2Style)}
				keywords={generateContentElement(slide.keywords, 'keywords', h1Style)}
				content={slide.content.map((content: string, contentIndex: number) => {
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
				section_title={generateContentElement(
					slide.section_title,
					'section_title',
					h8Style,
				)}
				original_title={generateContentElement(
					slide.original_title,
					'original_title',
					h7Style,
				)}
				illustration={slide.illustration as string[]}
				brief={generateContentElement(slide.brief, 'brief', h9Style)}
				quote={generateContentElement(slide.quote, 'quote', {
					color: '#1D222A',
					fontFamily: 'Cormorant, sans-serif',
				})}
				source={generateContentElement(slide.source, 'source', {
					color: '#3A3A3A',
					fontFamily: 'Cormorant, sans-serif',
				})}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				images_position={slide.images_position || [{}, {}, {}]}
				handleSlideEdit={handleSlideEdit}
				title={<></>}
				English_title={<></>}
				topic={<></>}
			/>
		);
	}
};
