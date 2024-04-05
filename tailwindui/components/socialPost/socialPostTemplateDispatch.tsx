import templates from '@/components/socialPost/socialPostTemplates';
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
import processContent from '@/components/slides/quillEditorSlide'

const QuillEditable = dynamic(() => import('@/components/slides/quillEditorSlide'), { ssr: false });

export const templateDispatch = (
	slide: SocialPostSlide,
	index: number,
	canEdit: boolean = true,
	exportToPdfMode: boolean = false,
	editMathMode: boolean = false,
	setIsEditMode: (isEditMode: boolean) => void = () => { }, // Replace with your default function if you have one
	handleSlideEdit: (
		content: string | string[],
		index: number,
		tag: SlideKeys,
		contentIndex?: number,
		rerender?: boolean,
	) => void = () => { }, // Replace with your default function if you have one
	updateImgUrlArray: (
		slideIndex: number
	) => (
		urls: string[],
		ischart: boolean[],
		images_position: ImagesPosition[],
	) => void = () => () => { }, // Replace with your default function if you have one
	updateIllustrationUrlArray: (
		slideIndex: number,
	) => (
		urls: string[],
		ischart: boolean[],
		images_position: ImagesPosition[],
	) => void = () => () => { },
	toggleEditMathMode: () => void = () => { }, // Replace with your default function if you have one
): JSX.Element => {
	let keyPrefix = '';
	if (exportToPdfMode) {
		keyPrefix = 'exportToPdf';
	} else if (!canEdit) {
		keyPrefix = 'preview';
	}
	const Template = templates[slide.template as keyof typeof templates];
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
		need_placeholder: boolean = true,
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
							handleSlideEdit(newContent, index, contentTag, contentIndex, true)
						}
						style={style}
						isVerticalContent={false}
						need_placeholder={need_placeholder}
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
						isVerticalContent={false}
						need_placeholder={need_placeholder}
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
	console.log(slide.keywords)

	if (index === 0) {
		return (
			<Template
				//autoSave={saveSlides}
				key={keyPrefix + index.toString()}
				handleSlideEdit={handleSlideEdit}
				illustration={slide.illustration as string[]}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				images_position={slide.images_position || [{}, {}, {}]}
				canEdit={canEdit}
				imgs={slide.images}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				icon={post_type === 'casual_topic' ? <CompanyIconWhite /> : <CompanyIconBlack />}
				update_callback={getUpdateCallback(project?.post_type || 'casual_topic', index)}
				topic={generateContentElement(
					slide.topic,
					'topic',
					themeElements.topicCSS || {}
				)}
				keywords={generateContentElement(
					Array.isArray(slide.keywords)
						? slide.keywords.join(' | ')
						: slide.keywords,
					'keywords',
					themeElements.keywordCoverCSS || {}
				)}
				original_title={generateContentElement(
					slide.original_title,
					'original_title',
					themeElements.originalTitleCoverCSS || {},
				)}
				title={generateContentElement(
					slide.title,
					'title',
					themeElements.readingtitleCSS || {}
				)}
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
				icon={post_type === 'casual_topic' ? <CompanyIconWhite /> : <CompanyIconBlack />}
				imgs={slide.images as string[]}
				illustration={slide.illustration as string[]}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				images_position={slide.images_position || [{}, {}, {}]}
				handleSlideEdit={handleSlideEdit}
				update_callback={getUpdateCallback(project?.post_type || 'casual_topic', index)}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				subtopic={generateContentElement(
					slide.subtopic,
					'subtopic',
					themeElements.subtopicCSS || {}
				)}
				keywords={generateContentElement(
					slide.keywords,
					'keywords',
					themeElements.keywordCSS || {},
					undefined,
					false
				)}
				section_title={generateContentElement(
					slide.section_title,
					'section_title',
					themeElements.sectionTitleCSS || {}
				)}
				original_title={generateContentElement(
					slide.original_title,
					'original_title',
					themeElements.originalTitleCSS || {}
				)}
				brief={generateContentElement(
					slide.brief,
					'brief', 
					themeElements.briefCSS || {}
				)}
				quote={generateContentElement(
					slide.quote,
					'quote',
					themeElements.quoteCSS || {}
				)}
				source={generateContentElement(
					slide.source, 
					'source',
					themeElements.sourceCSS || {}
				)}
				content={slide.content.map((content: string, contentIndex: number) => {
					return (
						<div
							key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
						>
							{generateContentElement(
								content,
								'content',
								themeElements.contentCSS || {},
								contentIndex,
							)}
							{post_type === 'casual_topic' && (<hr className='my-[15px]'></hr>)}
						</div>
					);
				})}
				title={<></>}
				English_title={<></>}
				topic={<></>}
			/>
		);
	}
};
