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
	SlideKeys,
} from '@/components/socialPost/socialPostHTML';
import templates, {
	templateSamples,
} from '@/components/socialPost/socialPostTemplates';
import {
	CompanyIconBlack,
	CompanyIconWhite,
} from '@/components/socialPost/socialPostIcons';
import dynamic from 'next/dynamic';
import React, { CSSProperties, useEffect, useRef } from 'react';
import SocialPostSlide from '@/models/SocialPost';
import Chart, { Group } from '@/models/Chart';
import ImagesPosition from '@/models/ImagesPosition';

const QuillEditable = dynamic(() => import('./quillEditor'), { ssr: false });

export const templateDispatch = (
	slide: SocialPostSlide,
	index: number,
	canEdit: boolean = true,
	exportToPdfMode: boolean = false,
	editMathMode: boolean = false,
	//saveSlides: (slides: SocialPostSlide[]) => void = () => {}, // Replace with your default function if you have one
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
				update_callback={updateIllustrationUrlArray(index)}
				canEdit={canEdit}
				imgs={slide.images}
				icon={<CompanyIconWhite />}
				illustration={slide.illustration as string[]}
				title={generateContentElement(slide.title, 'title', {
					color: '#121212',
					fontFamily: 'Cormorant, sans-serif',
				})}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				quote={<></>}
				source={<></>}
				subtopic={<></>}
				keywords={<></>}
				original_title={<></>}
				English_title={<></>}
				content={[<></>]}
				brief={<></>}
				section_title={<></>}
				topic={<></>}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				images_position={slide.images_position || [{}, {}, {}]}
				handleSlideEdit={handleSlideEdit}
			/>
		);
	} else {
		return (
			<Template
				//autoSave={saveSlides}
				canEdit={canEdit}
				key={keyPrefix + index.toString()}
				imgs={[]}
				update_callback={updateIllustrationUrlArray(index)}
				icon={<CompanyIconBlack />}
				illustration={slide.illustration as string[]}
				quote={generateContentElement(slide.quote, 'quote', {
					color: '#1D222A',
					fontFamily: 'Cormorant, sans-serif',
				})}
				source={generateContentElement(slide.source, 'source', {
					color: '#3A3A3A',
					fontFamily: 'Cormorant, sans-serif',
				})}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				subtopic={<></>}
				keywords={<></>}
				content={[<></>]}
				English_title={<></>}
				section_title={<></>}
				original_title={<></>}
				brief={<></>}
				title={<></>}
				topic={<></>}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				images_position={slide.images_position || [{}, {}, {}]}
				handleSlideEdit={handleSlideEdit}
			/>
		);
	}
};
