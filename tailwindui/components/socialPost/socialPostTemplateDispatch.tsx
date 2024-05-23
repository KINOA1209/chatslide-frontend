import {
	socialPostAvailableLayouts,
	generateSocialPostTemplateLogo,
	generateSocialPostTemplateIndicatorElement,
} from '@/components/socialPost/socialPostTemplates';
import {
	CompanyIconWhite,
	CompanyIconBlack,
} from '@/components/socialPost/socialPostIcons';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';
import { SocialPostSlide, SlideKeys } from '@/models/SocialPost';
import Chart, { Group } from '@/models/Chart';
import ImagePosition from '@/models/ImagePosition';
import { useProject } from '@/hooks/use-project';
import SocialPostThemeConfigData, {
	SocialPostThemeConfig,
	SocialPostThemeElements,
} from './templates_customizable_elements/theme_elements';
import { PostTypeKeys } from './templates_customizable_elements/theme_elements';
import processContent from '@/components/slides/quillEditorSlide';
import { Classic_SocialPost_TemplateThemeConfig } from './templates_customizable_elements/classic_template/theme_config';
import { Classis_SocialPost_TemplateLayoutsConfig } from './templates_customizable_elements/classic_template/layout_config';
import {
	SocialPostLayoutConfigData,
	SocialPostLayoutKeys,
	SocialPostTemplateKeys,
} from './socialPostLayouts';
import layoutConfigData from '../slides/templates_customizable_elements/layout_elements';
import drlambdaLogoBadgeWhiteBG from '@/public/images/template/drlambdaLogoBadgeWhiteBG.png';
import { useUser } from '@/hooks/use-user';
import AuthService from '@/services/AuthService';
const QuillEditable = dynamic(
	() => import('@/components/slides/quillEditorSlide'),
	{ ssr: false },
);
import classicTemplateThemeCoverPageIndicator from '@/public/images/socialpost/classicTemplateThemeCoverPageIndicator.png';
import classicTemplateThemeLastPageIndicator from '@/public/images/socialpost/classicTemplateThemeLastPageIndicator.png';
import { StaticImageData } from 'next/image';

export const templateThemeKeyAndIndicatorImgMap: Record<
	SocialPostTemplateKeys,
	StaticImageData
> = {
	classic: classicTemplateThemeCoverPageIndicator,
	default: classicTemplateThemeCoverPageIndicator, // placeholder for now
	bold: classicTemplateThemeCoverPageIndicator, // placeholder for now
};

export const templateThemeKeyAndIndicatorImgMapLastPage: Record<
	SocialPostTemplateKeys,
	StaticImageData
> = {
	classic: classicTemplateThemeLastPageIndicator,
	default: classicTemplateThemeLastPageIndicator, // placeholder for now
	bold: classicTemplateThemeLastPageIndicator, // placeholder for now
};

export const loadSocialPostCustomizableElements = (
	templateName: string,
	post_type: string,
) => {
	// return (
	// 	themeConfigData[templateName as keyof ThemeConfig] ||
	// 	Default_TemplateThemeConfig
	// );
	const themeElements =
		SocialPostThemeConfigData[templateName as SocialPostTemplateKeys] ||
		Classic_SocialPost_TemplateThemeConfig;
	let selectedThemeElements =
		themeElements[post_type as PostTypeKeys] ||
		Classic_SocialPost_TemplateThemeConfig[post_type as PostTypeKeys] ||
		{};
	// console.log('loaded theme configurations is:', selectedThemeElements);

	return selectedThemeElements;
};

export const loadSocialPostLayoutConfigElements = (
	templateName: string,
	layoutOption: string,
) => {
	const templateElements =
		SocialPostLayoutConfigData[templateName as keyof SocialPostThemeConfig] ||
		Classis_SocialPost_TemplateLayoutsConfig;
	const selectedLayoutOptionElements =
		templateElements[layoutOption as SocialPostLayoutKeys] ||
		Classis_SocialPost_TemplateLayoutsConfig[
			layoutOption as SocialPostLayoutKeys
		] ||
		{};
	return selectedLayoutOptionElements;
};

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
		slideIndex: number,
	) => (
		urls: string[],
		ischart: boolean[],
		image_positions: ImagePosition[],
	) => void = () => () => {}, // Replace with your default function if you have one
	updateIllustrationUrlArray: (
		slideIndex: number,
	) => (
		urls: string[],
		ischart: boolean[],
		image_positions: ImagePosition[],
	) => void = () => () => {},
	toggleEditMathMode: () => void = () => {}, // Replace with your default function if you have one
	isLastPage: boolean = false,
): JSX.Element => {
	const { isPaidUser, token } = useUser();
	// const [currUserName, setCurrUserName] = useState('');
	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		try {
	// 			const username = await AuthService.getCurrentUserDisplayName();
	// 			setCurrUserName(username);
	// 		} catch (error) {
	// 			console.log('No authenticated user.');
	// 		}
	// 	};

	// 	fetchUser();
	// }, []);
	let keyPrefix = '';
	if (exportToPdfMode) {
		keyPrefix = 'exportToPdf';
	} else if (!canEdit) {
		keyPrefix = 'preview';
	}

	// Normalize slide.layout to ensure it's always a string
	const currLayout = Array.isArray(slide.layout)
		? slide.layout[0]
		: slide.layout;
	// console.log('current layout: ', currLayout);
	const layoutKey: SocialPostLayoutKeys =
		socialPostAvailableLayouts.hasOwnProperty(currLayout)
			? currLayout
			: // : 'Col_1_img_0_casual_topic';
				'Col_2_img_1_left_casual_topic';
	// console.log('normalize layout: ', layoutKey);
	const ChosenLayout =
		socialPostAvailableLayouts[
			layoutKey as keyof typeof socialPostAvailableLayouts
		];
	// console.log('slide.layout', slide.layout);

	const lastPageContentArray = Array.isArray(slide.last_page_content)
		? slide.last_page_content
		: slide.last_page_content
			? [slide.last_page_content]
			: [];

	const currUserName = slide.user_name || 'Created using DrLambda';

	const { project } = useProject();
	const post_type: PostTypeKeys =
		(project?.post_type as PostTypeKeys) || 'casual_topic';

	// TODO: change the hardcode to real social post template name passed in
	const themeElements =
		// SocialPostThemeConfigData['classic'][post_type] ||
		// Default_SocialPost_TemplateThemeConfig;
		loadSocialPostCustomizableElements(slide.template_theme, post_type) ||
		Classic_SocialPost_TemplateThemeConfig[post_type];

	const socialPostLayoutElements =
		loadSocialPostLayoutConfigElements(
			slide.template_theme as SocialPostTemplateKeys,
			// slide.layout as SocialPostLayoutKeys,
			layoutKey as SocialPostLayoutKeys,
		) || Classis_SocialPost_TemplateLayoutsConfig[layoutKey];

	const getUpdateCallback = (post_type: string, slideIndex: number) => {
		return post_type === 'reading_notes'
			? updateIllustrationUrlArray(slideIndex)
			: updateImgUrlArray(slideIndex);
	};
	// useEffect(() => {
	// 	console.log(
	// 		'slide.template:',
	// 		slide.template,
	// 		SocialPostLayoutConfigData['classic'][slide.template] || {},
	// 	);
	// }, []);

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
					className='ql-editor non-editable-ql-editor-socialpost'
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

	if (index === 0) {
		return (
			<ChosenLayout
				//autoSave={saveSlides}
				key={keyPrefix + index.toString()}
				handleSlideEdit={handleSlideEdit}
				illustration={slide.illustration as string[]}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				image_positions={slide.image_positions || ['contain', 'contain', 'contain']}
				canEdit={canEdit}
				imgs={slide.images}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				icon={
					post_type === 'casual_topic' ? (
						<CompanyIconWhite />
					) : (
						<CompanyIconBlack />
					)
				}
				user_name={
					isPaidUser ? (
						generateContentElement(
							currUserName,
							// currUserName,
							'user_name',
							{
								...(themeElements?.userNameCSS || {}),
							},
						)
					) : (
						<div
							key={0}
							className={`rounded-md outline-2 ${!exportToPdfMode} ${
								index !== 0 ? 'hidden' : ''
							}`}
							style={themeElements?.userNameCSS || {}}
							contentEditable={false}
							dangerouslySetInnerHTML={{ __html: currUserName }}
						/>
					)
				}
				update_callback={getUpdateCallback(
					project?.post_type || 'casual_topic',
					index,
				)}
				topic={generateContentElement(
					slide.topic,
					'topic',
					themeElements?.topicCSS || {},
				)}
				keywords={generateContentElement(
					Array.isArray(slide.keywords)
						? slide.keywords.join(' | ')
						: slide.keywords,
					'keywords',
					themeElements?.keywordCoverCSS || {},
				)}
				original_title={generateContentElement(
					slide.original_title,
					'original_title',
					themeElements?.originalTitleCoverCSS || {},
				)}
				title={generateContentElement(
					slide.title,
					'title',
					themeElements?.readingtitleCSS || {},
				)}
				subtopic={<></>}
				quote={<></>}
				source={<></>}
				English_title={<></>}
				content={[<></>]}
				brief={<></>}
				section_title={<></>}
				layoutElements={socialPostLayoutElements}
				themeElements={themeElements}
				last_page_title={<></>}
				last_page_content={[<></>]}
				social_post_template_logo={generateSocialPostTemplateLogo({
					logoWidth: 90,
					logoHeight: 35,
					logoBadge: drlambdaLogoBadgeWhiteBG,
					logoStyleConfig: socialPostLayoutElements?.logoCSS || {},
				})}
				page_turn_indicator={generateSocialPostTemplateIndicatorElement({
					logoWidth: 65,
					logoHeight: 65,
					indicatorCoverPage:
						templateThemeKeyAndIndicatorImgMap[slide.template_theme],
					indicatorLastPage:
						templateThemeKeyAndIndicatorImgMap[slide.template_theme],
					logoStyleConfig: socialPostLayoutElements?.indicatorCSS || {},
					isLastPage: false,
				})}
				page_index_number={index}
				last_page_like_indicator={generateSocialPostTemplateIndicatorElement({
					logoWidth: 65,
					logoHeight: 65,
					indicatorCoverPage:
						templateThemeKeyAndIndicatorImgMap[slide.template_theme],
					indicatorLastPage:
						templateThemeKeyAndIndicatorImgMap[slide.template_theme],
					logoStyleConfig: socialPostLayoutElements?.indicatorCSS || {},
					isLastPage: false,
				})}
			/>
		);
	} else {
		return (
			<ChosenLayout
				canEdit={canEdit}
				key={keyPrefix + index.toString()}
				icon={
					post_type === 'casual_topic' ? (
						<CompanyIconWhite />
					) : (
						<CompanyIconBlack />
					)
				}
				user_name={
					isPaidUser ? (
						generateContentElement(
							// slide.user_name,
							currUserName,
							'user_name',
							{
								...(themeElements?.userNameCSS || {}),
							},
						)
					) : (
						<div
							key={0}
							className={`rounded-md outline-2 ${!exportToPdfMode} ${
								index !== 0 ? 'hidden' : ''
							}`}
							style={themeElements?.userNameCSS || {}}
							contentEditable={false}
							dangerouslySetInnerHTML={{ __html: currUserName }}
						/>
					)
				}
				imgs={slide.images as string[]}
				illustration={slide.illustration as string[]}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				image_positions={slide.image_positions || ['contain', 'contain', 'contain']}
				handleSlideEdit={handleSlideEdit}
				update_callback={getUpdateCallback(
					project?.post_type || 'casual_topic',
					index,
				)}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				subtopic={generateContentElement(
					slide.subtopic,
					'subtopic',
					themeElements?.subtopicCSS || {},
				)}
				keywords={generateContentElement(
					slide.keywords,
					'keywords',
					themeElements?.keywordCSS || {},
					undefined,
					false,
				)}
				section_title={generateContentElement(
					slide.section_title,
					'section_title',
					themeElements?.sectionTitleCSS || {},
				)}
				original_title={generateContentElement(
					slide.original_title,
					'original_title',
					themeElements?.originalTitleCSS || {},
				)}
				brief={generateContentElement(
					slide.brief,
					'brief',
					themeElements?.briefCSS || {},
				)}
				quote={generateContentElement(
					slide.quote,
					'quote',
					themeElements?.quoteCSS || {},
				)}
				source={generateContentElement(
					slide.source,
					'source',
					themeElements?.sourceCSS || {},
				)}
				content={slide.content.map((content: string, contentIndex: number) => {
					return (
						<div
							key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
						>
							{generateContentElement(
								content,
								'content',
								isLastPage
									? themeElements?.lastPageContentCSS || {}
									: themeElements?.contentCSS || {},
								contentIndex,
							)}
						</div>
					);
				})}
				title={<></>}
				English_title={<></>}
				topic={generateContentElement(
					slide.topic,
					'topic',
					themeElements?.lastPageTitleCSS || {},
				)}
				layoutElements={socialPostLayoutElements}
				themeElements={themeElements}
				last_page_title={generateContentElement(
					slide.last_page_title,
					'last_page_title',
					themeElements?.lastPageTitleCSS || {},
				)}
				last_page_content={lastPageContentArray.map(
					(content: string, contentIndex: number) => {
						return (
							<div
								key={
									keyPrefix + index.toString() + '_' + contentIndex.toString()
								}
							>
								{generateContentElement(
									content,
									'last_page_content',
									themeElements?.contentCSS || {},
									contentIndex,
								)}
							</div>
						);
					},
				)}
				social_post_template_logo={generateSocialPostTemplateLogo({
					logoWidth: 90,
					logoHeight: 35,
					logoBadge: drlambdaLogoBadgeWhiteBG,
					logoStyleConfig: socialPostLayoutElements?.logoCSS || {},
				})}
				page_turn_indicator={generateSocialPostTemplateIndicatorElement({
					logoWidth: 65,
					logoHeight: 65,
					logoBadge: templateThemeKeyAndIndicatorImgMap[slide.template_theme],
					logoStyleConfig: socialPostLayoutElements?.indicatorCSS || {},
				})}
				page_index_number={index}
				last_page_like_indicator={generateSocialPostTemplateIndicatorElement({
					logoWidth: 65,
					logoHeight: 65,
					indicatorCoverPage:
						templateThemeKeyAndIndicatorImgMap[slide.template_theme],
					indicatorLastPage:
						templateThemeKeyAndIndicatorImgMapLastPage[slide.template_theme],
					logoStyleConfig: socialPostLayoutElements?.indicatorCSS || {},
					isLastPage: true,
				})}
			/>
		);
	}
};
