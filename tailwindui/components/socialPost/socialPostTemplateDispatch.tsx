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
	socialPostTemplateOptions,
} from './socialPostLayouts';
import layoutConfigData from '../slides/templates_customizable_elements/layout_elements';
import drlambdaLogoBadgeWhiteBG from '@/public/images/template/drlambdaLogoBadgeWhiteBG.png';
import drLambdaSquareLogoWhiteBGBlackText from '@/public/images/logo/drLambdaSquareLogo.png';
import { useUser } from '@/hooks/use-user';
import AuthService from '@/services/AuthService';
const QuillEditable = dynamic(
	() => import('@/components/slides/quillEditorSlide'),
	{ ssr: false },
);
import classicTemplateThemeCoverPageIndicator from '@/public/images/socialpost/classicTemplateThemeCoverPageIndicator.png';
import classicTemplateThemeLastPageIndicator from '@/public/images/socialpost/classicTemplateThemeLastPageIndicator.png';
import classicTemplateThemeNonCoverPageIndicator from '@/public/images/socialpost/classicTemplateThemeNonCoverPageIndicator.png';
import { StaticImageData } from 'next/image';

export const templateThemeKeyAndIndicatorImgMapCoverPage: Record<
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

export const templateThemeKeyAndIndicatorImgMapNonCoverPage: Record<
	SocialPostTemplateKeys,
	StaticImageData
> = {
	classic: classicTemplateThemeNonCoverPageIndicator,
	default: classicTemplateThemeNonCoverPageIndicator, // placeholder for now
	bold: classicTemplateThemeNonCoverPageIndicator, // placeholder for now
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
		// SocialPostThemeConfigData['default'] || // for testing only
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
		// SocialPostLayoutConfigData['default'] || // for testing only
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
	logoMode: 'no' | 'default' | 'custom' = 'default',
	customLogoUrl: string = '',
): JSX.Element => {
	const { isPaidUser, token, username } = useUser();
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
	const { project } = useProject();
	const post_type: PostTypeKeys =
		(project?.post_type as PostTypeKeys) || 'casual_topic';

	let keyPrefix = '';
	if (exportToPdfMode) {
		keyPrefix = 'exportToPdf';
	} else if (!canEdit) {
		keyPrefix = 'preview';
	}

	// make sure slide.template_theme is valid otherwise use default value
	// Normalize slide.layout to ensure it's always a string

	let validTemplate_theme: SocialPostTemplateKeys =
		slide.template_theme &&
		socialPostTemplateOptions.includes(
			slide.template_theme as SocialPostTemplateKeys,
		)
			? (slide.template_theme as SocialPostTemplateKeys)
			: 'classic';
	// console.log(
	// 	'slide.template_theme',
	// 	slide.template_theme,
	// 	socialPostTemplateOptions,
	// 	socialPostTemplateOptions.includes(
	// 		slide.template_theme as SocialPostTemplateKeys,
	// 	)
	// );
	// Normalize slide.layout to ensure it's always a string
	let currLayout: SocialPostLayoutKeys = Array.isArray(slide.layout)
		? slide.layout[0]
		: slide.layout;

	// to solve overflow problem for quote sharing for default templayte by use different layout according to word counting
	let ModifiedSlideQuote = slide.quote;
	if (
		!isLastPage &&
		index !== 0 &&
		validTemplate_theme === 'default' &&
		post_type === 'reading_notes'
	) {
		// console.log(slide.quote);
		// add quote marks to slide quote for default template only
		ModifiedSlideQuote = `"${ModifiedSlideQuote}"`;
		const wordCount = slide.quote.split(' ').length;
		if (wordCount > 15) {
			currLayout = 'Col_1_img_0_reading_notes';
		} else {
			currLayout = 'Col_1_img_1_reading_notes';
		}
	}

	// useEffect(() => {
	// 	console.log('slide.quote', slide.quote);
	// }, []);

	// console.log('current layout: ', currLayout);
	// const layoutKey: SocialPostLayoutKeys =
	// 	socialPostAvailableLayouts.hasOwnProperty(currLayout)
	// 		? currLayout
	// 		: // : 'Col_1_img_0_casual_topic';
	// 			'Col_2_img_1_left_casual_topic';
	// console.log('normalize layout: ', layoutKey);

	// correct layout for template if current index is 0 or slides.length-1 but layout is not corresponding to current index layout
	if (index === 0) {
		if (
			post_type === 'casual_topic' &&
			currLayout !== 'First_page_img_1_casual_topic'
		) {
			currLayout = 'First_page_img_1_casual_topic';
		} else if (
			post_type === 'serious_subject' &&
			currLayout !== 'First_page_img_1_serious_subject'
		) {
			currLayout = 'First_page_img_1_serious_subject';
		} else if (
			post_type === 'reading_notes' &&
			currLayout !== 'First_page_img_1_reading_notes'
		) {
			currLayout = 'First_page_img_1_reading_notes';
		}
	} else if (isLastPage) {
		if (currLayout !== 'last_page_layout') {
			currLayout = 'last_page_layout';
		}
	} else {
		if (post_type === 'casual_topic') {
			currLayout = socialPostAvailableLayouts.hasOwnProperty(currLayout)
				? currLayout
				: // : 'Col_1_img_0_casual_topic';
					'Col_2_img_1_left_casual_topic';
		} else if (post_type === 'serious_subject') {
			currLayout = socialPostAvailableLayouts.hasOwnProperty(currLayout)
				? currLayout
				: // : 'Col_1_img_0_casual_topic';
					'img_0_serious_subject';
		} else if (post_type === 'reading_notes') {
			currLayout = socialPostAvailableLayouts.hasOwnProperty(currLayout)
				? currLayout
				: // : 'Col_1_img_0_casual_topic';
					'Col_1_img_1_reading_notes';
		}
	}
	const ChosenLayout =
		socialPostAvailableLayouts[
			currLayout as keyof typeof socialPostAvailableLayouts
		];
	// console.log('slide.layout', slide.layout);

	const lastPageContentArray = Array.isArray(slide.last_page_content)
		? slide.last_page_content
		: slide.last_page_content
			? [slide.last_page_content]
			: [''];

	const currUserName = username || 'Created using DrLambda';

	// TODO: change the hardcode to real social post template name passed in
	const themeElements =
		loadSocialPostCustomizableElements(validTemplate_theme, post_type) ||
		Classic_SocialPost_TemplateThemeConfig[post_type];
	// loadSocialPostCustomizableElements('default', post_type); // testing only

	const socialPostLayoutElements =
		loadSocialPostLayoutConfigElements(
			validTemplate_theme as SocialPostTemplateKeys,
			// 'default', // testing only
			currLayout as SocialPostLayoutKeys,
		) || Classis_SocialPost_TemplateLayoutsConfig[currLayout];

	const willUseIllustraion: boolean = themeElements?.useIllustraion || false;

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
			const key = `${keyPrefix}-${contentTag}-${index}-${contentIndex ?? ''}`;
			if (contentIndex !== undefined) {
				return (
					<QuillEditable
						key={key}
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
						key={key}
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
				image_positions={slide.image_positions || [{}, {}, {}]}
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
								textAlign: socialPostLayoutElements.userNameCSS
									? socialPostLayoutElements.userNameCSS.textAlign
									: 'left',
							},
						)
					) : (
						<div
							key={0}
							className={`rounded-md outline-2 ${!exportToPdfMode} ${
								index !== 0 ? 'hidden' : ''
							}`}
							style={{
								...(themeElements?.userNameCSS || {}),
								textAlign: socialPostLayoutElements.userNameCSS
									? socialPostLayoutElements.userNameCSS.textAlign
									: 'left',
							}}
							contentEditable={false}
							dangerouslySetInnerHTML={{ __html: currUserName }}
						/>
					)
				}
				update_callback={getUpdateCallback(
					project?.post_type || 'casual_topic',
					index,
				)}
				topic={generateContentElement(slide.topic, 'topic', {
					...(themeElements?.topicCSS || {}),
					textAlign: socialPostLayoutElements.topicCSS
						? socialPostLayoutElements.topicCSS.textAlign
						: 'left',
				})}
				keywords={generateContentElement(
					Array.isArray(slide.keywords)
						? slide.keywords.join(' | ')
						: slide.keywords,
					'keywords',
					{
						...(themeElements?.keywordCoverCSS || {}),
						textAlign: socialPostLayoutElements.keywordsCSS
							? socialPostLayoutElements.keywordsCSS.textAlign
							: 'left',
					},
				)}
				original_title={generateContentElement(
					slide.original_title,
					'original_title',
					{
						...(themeElements?.originalTitleCoverCSS || {}),
						textAlign: socialPostLayoutElements.originalTitleCSS
							? socialPostLayoutElements.originalTitleCSS.textAlign
							: 'left',
					},
				)}
				title={generateContentElement(slide.title, 'title', {
					...(themeElements?.readingtitleCSS || {}),
					textAlign: socialPostLayoutElements.readingTitleCSS
						? socialPostLayoutElements.readingTitleCSS.textAlign
						: 'left',
				})}
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
					logoHeight: 30,
					logoBadge: drLambdaSquareLogoWhiteBGBlackText,
					logoStyleConfig: socialPostLayoutElements?.logoCSS || {},
					logoMode: logoMode || 'default',
					customLogoUrl: customLogoUrl || '',
				})}
				page_turn_indicator={generateSocialPostTemplateIndicatorElement({
					logoWidth: 65,
					logoHeight: 65,
					indicatorNonCoverPage: isLastPage
						? undefined
						: templateThemeKeyAndIndicatorImgMapNonCoverPage[
								validTemplate_theme
							],
					indicatorCoverPage:
						templateThemeKeyAndIndicatorImgMapCoverPage[validTemplate_theme],
					indicatorLastPage:
						templateThemeKeyAndIndicatorImgMapLastPage[validTemplate_theme],
					logoStyleConfig: socialPostLayoutElements?.indicatorCSS || {},
					isLastPage: isLastPage,
				})}
				page_index_number={index}
				last_page_like_indicator={generateSocialPostTemplateIndicatorElement({
					logoWidth: 65,
					logoHeight: 65,
					indicatorNonCoverPage: isLastPage
						? undefined
						: templateThemeKeyAndIndicatorImgMapNonCoverPage[
								validTemplate_theme
							],
					indicatorCoverPage:
						templateThemeKeyAndIndicatorImgMapCoverPage[validTemplate_theme],
					indicatorLastPage:
						templateThemeKeyAndIndicatorImgMapLastPage[validTemplate_theme],
					logoStyleConfig: socialPostLayoutElements?.indicatorCSS || {},
					isLastPage: isLastPage,
				})}
				useIllustraion={willUseIllustraion}
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
								textAlign: socialPostLayoutElements.userNameCSS
									? socialPostLayoutElements.userNameCSS.textAlign
									: 'left',
							},
						)
					) : (
						<div
							key={0}
							className={`rounded-md outline-2 ${!exportToPdfMode} ${
								index !== 0 ? 'hidden' : ''
							}`}
							style={{
								...(themeElements?.userNameCSS || {}),
								textAlign: socialPostLayoutElements.userNameCSS
									? socialPostLayoutElements.userNameCSS.textAlign
									: 'left',
							}}
							contentEditable={false}
							dangerouslySetInnerHTML={{ __html: currUserName }}
						/>
					)
				}
				imgs={slide.images as string[]}
				illustration={slide.illustration as string[]}
				charts={slide.chart || defaultChartArr}
				ischarts={slide.is_chart}
				image_positions={slide.image_positions || [{}, {}, {}]}
				handleSlideEdit={handleSlideEdit}
				update_callback={getUpdateCallback(
					project?.post_type || 'casual_topic',
					index,
				)}
				border_start={slide.theme?.border_start || '#937C67'}
				border_end={slide.theme?.border_end || '#4F361F'}
				cover_start={slide.theme?.cover_start || '#725947 0%'}
				cover_end={slide.theme?.cover_end || 'rgba(0, 0, 0, 0.00) 100%'}
				subtopic={generateContentElement(slide.subtopic, 'subtopic', {
					...(themeElements?.subtopicCSS || {}),
					textAlign: socialPostLayoutElements.subtopicCSS
						? socialPostLayoutElements.subtopicCSS.textAlign
						: 'left',
				})}
				keywords={generateContentElement(
					slide.keywords,
					'keywords',
					{
						...(themeElements?.keywordCSS || {}),
						textAlign: socialPostLayoutElements.keywordsCSS
							? socialPostLayoutElements.keywordsCSS.textAlign
							: 'left',
					},
					undefined,
					false,
				)}
				section_title={generateContentElement(
					slide.section_title,
					'section_title',
					{
						...(themeElements?.sectionTitleCSS || {}),
						textAlign: socialPostLayoutElements.sectionTitleCSS
							? socialPostLayoutElements.sectionTitleCSS.textAlign
							: 'left',
					},
				)}
				original_title={generateContentElement(
					slide.original_title,
					'original_title',
					{
						...(themeElements?.originalTitleCSS || {}),
						textAlign: socialPostLayoutElements.originalTitleCSS
							? socialPostLayoutElements.originalTitleCSS.textAlign
							: 'left',
					},
				)}
				brief={generateContentElement(slide.brief, 'brief', {
					...(themeElements?.briefCSS || {}),
					textAlign: socialPostLayoutElements.briefCSS
						? socialPostLayoutElements.briefCSS.textAlign
						: 'left',
				})}
				quote={generateContentElement(ModifiedSlideQuote, 'quote', {
					...(themeElements?.quoteCSS || {}),
					textAlign: socialPostLayoutElements.quoteCSS
						? socialPostLayoutElements.quoteCSS.textAlign
						: 'left',
				})}
				source={generateContentElement(slide.source, 'source', {
					...(themeElements?.sourceCSS || {}),
					textAlign: socialPostLayoutElements.sourceCSS
						? socialPostLayoutElements.sourceCSS.textAlign
						: 'left',
				})}
				content={slide.content.map((content: string, contentIndex: number) => {
					// console.log('content, contentIndex: ', content, contentIndex);
					return (
						<div
							key={keyPrefix + index.toString() + '_' + contentIndex.toString()}
						>
							{generateContentElement(
								content,
								'content',
								isLastPage && currLayout === 'last_page_layout'
									? {
											...(themeElements?.lastPageContentCSS || {}),
											textAlign: socialPostLayoutElements.lastPageContentCSS
												? socialPostLayoutElements.lastPageContentCSS.textAlign
												: 'left',
										}
									: {
											...(themeElements?.contentCSS || {}),
											textAlign: socialPostLayoutElements.contentCSS
												? socialPostLayoutElements.contentCSS.textAlign
												: 'left',
										},
								contentIndex,
							)}
						</div>
					);
				})}
				title={<></>}
				English_title={<></>}
				topic={generateContentElement(slide.topic, 'topic', {
					...(themeElements?.lastPageTitleCSS || {}),
					textAlign: socialPostLayoutElements.lastPageTitleCSS
						? socialPostLayoutElements.lastPageTitleCSS.textAlign
						: 'left',
				})}
				layoutElements={socialPostLayoutElements}
				themeElements={themeElements}
				last_page_title={generateContentElement(
					slide.last_page_title,
					'last_page_title',
					{
						...(themeElements?.lastPageTitleCSS || {}),
						textAlign: socialPostLayoutElements.lastPageTitleCSS
							? socialPostLayoutElements.lastPageTitleCSS.textAlign
							: 'left',
					},
				)}
				last_page_content={lastPageContentArray.map(
					(content: string, contentIndex: number) => {
						// console.log(
						// 	'last page content, contentIndex: ',
						// 	content,
						// 	contentIndex,
						// );
						return (
							<div
								// key={
								// 	keyPrefix +
								// 	'_last_page_content' +
								// 	index.toString() +
								// 	'_' +
								// 	contentIndex.toString()
								// }
								key={`${keyPrefix}_last_page_content_${index}_${contentIndex}`}
							>
								{generateContentElement(
									content,
									'last_page_content',
									{
										...(themeElements?.lastPageContentCSS || {}),
										textAlign: socialPostLayoutElements.lastPageContentCSS
											? socialPostLayoutElements.lastPageContentCSS.textAlign
											: 'left',
									},
									contentIndex,
								)}
							</div>
						);
					},
				)}
				social_post_template_logo={generateSocialPostTemplateLogo({
					logoWidth: 90,
					logoHeight: 30,
					logoBadge: drLambdaSquareLogoWhiteBGBlackText,
					logoStyleConfig: socialPostLayoutElements?.logoCSS || {},
					logoMode: logoMode || 'default',
					customLogoUrl: customLogoUrl || '',
				})}
				page_turn_indicator={generateSocialPostTemplateIndicatorElement({
					logoWidth: 65,
					logoHeight: 65,
					indicatorNonCoverPage: isLastPage
						? undefined
						: templateThemeKeyAndIndicatorImgMapNonCoverPage[
								validTemplate_theme
							],
					indicatorCoverPage:
						templateThemeKeyAndIndicatorImgMapCoverPage[validTemplate_theme],
					indicatorLastPage:
						templateThemeKeyAndIndicatorImgMapLastPage[validTemplate_theme],
					logoStyleConfig: socialPostLayoutElements?.indicatorCSS || {},
					isLastPage: isLastPage,
				})}
				page_index_number={index}
				last_page_like_indicator={generateSocialPostTemplateIndicatorElement({
					logoWidth: 65,
					logoHeight: 65,
					indicatorNonCoverPage: isLastPage
						? undefined
						: templateThemeKeyAndIndicatorImgMapNonCoverPage[
								validTemplate_theme
							],
					indicatorCoverPage:
						templateThemeKeyAndIndicatorImgMapCoverPage[validTemplate_theme],
					indicatorLastPage:
						templateThemeKeyAndIndicatorImgMapLastPage[validTemplate_theme],
					logoStyleConfig: socialPostLayoutElements?.indicatorCSS || {},
					isLastPage: isLastPage,
				})}
				useIllustraion={willUseIllustraion}
			/>
		);
	}
};
