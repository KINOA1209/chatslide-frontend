//import { ImgModule } from '@/components/socialPost/socialPostIllustrationModule';
import { ImgModule } from '@/components/imgModule';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import cover_png from '@/public/images/template/layout/cover.png';
import withimg_png from '@/public/images/template/socialpost_t1_img.png';
import noimg_png from '@/public/images/template/socialpost_t1_no_img.png';
import '@/components/socialPost/templates.css';
import AuthService from '@/services/AuthService';
import { h5Style } from './Styles';
import 'quill/dist/quill.bubble.css';
import '@/components/socialPost/quillEditor.scss';
import Chart from '@/models/Chart';
import ImagePosition from '@/models/ImagePosition';
import { useSocialPosts } from '@/hooks/use-socialpost';
import '@/components/socialPost/socialPostCustomFonts.css';
import { getBrand } from '@/utils/getHost';
import {
	SocialPostLayoutElements,
	SocialPostLayoutKeys,
	SocialPostTemplateKeys,
} from './socialPostLayouts';
import { SocialPostThemeElements } from './templates_customizable_elements/theme_elements';
import { TemplateLogoType } from '../slides/templates_customizable_elements/Templates_logos';
import { LogoPosition } from '@/models/Slide';
import drlambdaLogoBadgeBlackBG from '@/public/images/template/drlambdaLogoBadgeBlackBG.png';
import drlambdaLogoBadgeWhiteBG from '@/public/images/template/drlambdaLogoBadgeWhiteBG.png';
import classicTemplateThemeLastPageIndicator from '@/public/images/socialpost/classicTemplateThemeLastPageIndicator.png';
import {
	templateThemeKeyAndIndicatorImgMapCoverPage,
	templateThemeKeyAndIndicatorImgMapLastPage,
	templateThemeKeyAndIndicatorImgMapNonCoverPage,
} from './socialPostTemplateDispatch';
interface MainSlidePropsSocialPost {
	subtopic: JSX.Element;
	keywords: JSX.Element[] | JSX.Element;
	content: JSX.Element[];
	original_title: JSX.Element;
	English_title: JSX.Element;
	section_title: JSX.Element;
	brief: JSX.Element;
	imgs: string[];
	icon: JSX.Element;
	illustration: string[];
	title: JSX.Element;
	quote: JSX.Element;
	source: JSX.Element;
	update_callback: (
		imgs: string[],
		ischart: boolean[],
		image_positions: ImagePosition[],
	) => void;
	canEdit: boolean;
	//autoSave: Function;
	border_start?: string;
	border_end?: string;
	cover_start?: string;
	cover_end?: string;
	topic: JSX.Element;
	charts: Chart[];
	ischarts: boolean[];
	image_positions: ImagePosition[];
	handleSlideEdit: Function;
	layoutElements: SocialPostLayoutElements;
	themeElements: SocialPostThemeElements;
	last_page_title: JSX.Element;
	last_page_content: JSX.Element[];
	social_post_template_logo: JSX.Element;
	user_name: JSX.Element;
	page_turn_indicator: JSX.Element;
	page_index_number: number;
	last_page_like_indicator: JSX.Element;
	useIllustraion?: boolean;
}

const socialPostTemplateLogoPositionConfig = {
	position: 'absolute',
	inset: 0,
	width: '100%',
	height: '14px',
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	gap: '7px',
	paddingLeft: '12px',
	paddingBottom: '12px',
	zIndex: 40,
	paddingRight: '12px',
	top: '90%',
	left: '83%',
};

export type socialPostTemplateLogoType = {
	logoWidth?: number;
	logoHeight?: number;
	// lightBGLogo?: StaticImageData;
	// darkBGLogo?: StaticImageData;
	logoBadge?: StaticImageData;
	indicatorCoverPage?: StaticImageData;
	indicatorNonCoverPage?: StaticImageData;
	indicatorLastPage?: StaticImageData;
	// isLogoLeftSide?: boolean;
	logoPosition?: LogoPosition;
	logoStyleConfig?: React.CSSProperties;
	isLastPage?: boolean;
	template_theme?: SocialPostTemplateKeys;
	currPageIndex?: number;
	logoMode?: 'no' | 'default' | 'custom';
	customLogoUrl?: string;
};

export const generateSocialPostTemplateLogo = ({
	logoWidth = 30,
	logoHeight = 30,
	logoBadge,
	logoStyleConfig,
	logoMode,
	customLogoUrl,
}: socialPostTemplateLogoType) => {
	if (logoMode === 'no') {
		return <></>;
	} else
		return (
			<div style={{ ...logoStyleConfig, maxWidth: '45px' }}>
				<Image
					// onClick={openBrandingModal}
					unoptimized={true}
					// src={isCoverPage ? coverLogo : nonCoverLogo}
					width={logoWidth}
					height={logoHeight}
					// src={logoBadge!.src}
					src={`${logoMode === 'custom' && customLogoUrl ? customLogoUrl : logoBadge!.src}
				`}
					// 'https://dev.drlambda.ai/api/jpg?filename=drlambdaLogoSingle.png&foldername=drlambda-resources/cc10f68d-d2c5-4eee-b49b-691400587da6'
					alt='Template Logo'
					// className={`w-auto h-[${logoHeight}px]`}
					style={{ objectFit: 'contain' }}
					// style={{ width: logoWidth, height: logoHeight }}
				/>
			</div>
		);
};

export const generateSocialPostTemplateIndicatorElement = ({
	logoWidth,
	logoHeight,
	logoStyleConfig,
	isLastPage,
	logoBadge,
	indicatorCoverPage,
	indicatorLastPage,
	indicatorNonCoverPage,
	template_theme,
}: socialPostTemplateLogoType) => {
	const fallbackSrcLastPage =
		templateThemeKeyAndIndicatorImgMapLastPage[template_theme || 'classic'];
	const fallbackSrcCoverPage =
		templateThemeKeyAndIndicatorImgMapCoverPage[template_theme || 'classic'];
	const fallbackSrcNonCoverPage =
		templateThemeKeyAndIndicatorImgMapNonCoverPage[template_theme || 'classic'];

	// console.log(
	// 	'fallbackSrcLastPage, fallbackSrcCoverPage',
	// 	fallbackSrcLastPage,
	// 	fallbackSrcCoverPage,
	// );
	const src = indicatorNonCoverPage
		? indicatorNonCoverPage?.src || fallbackSrcNonCoverPage
		: isLastPage
			? indicatorLastPage?.src || fallbackSrcLastPage
			: indicatorCoverPage?.src || fallbackSrcCoverPage;

	return (
		<div style={{ ...logoStyleConfig }}>
			<Image
				// onClick={openBrandingModal}
				unoptimized={true}
				// src={isCoverPage ? coverLogo : nonCoverLogo}
				width={logoWidth}
				height={logoHeight}
				src={src}
				alt='Template Logo'
				className={`w-[${logoWidth}px] h-auto`}
			/>
		</div>
	);
};

export const First_page_img_1_casual_topic = ({
	topic,
	keywords,
	imgs,
	border_start,
	border_end,
	cover_start,
	cover_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	image_positions,
	handleSlideEdit,
	layoutElements,
	themeElements,
	social_post_template_logo,
	user_name,
	page_turn_indicator,
	useIllustraion,
	illustration,
}: MainSlidePropsSocialPost) => {
	// useEffect(() => {
	// 	// console.log('First_page_img_1 configs: ', layoutElements, themeElements);
	// 	console.log('dispatched user name', user_name);
	// });
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagePosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagePosition = [...image_positions];
			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagePosition);
		};

	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts();
	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{ position: 'relative', ...layoutElements?.canvasCSS }}
		>
			<div
				className='SocialPostImageContainer'
				style={{
					// border: '12px solid transparent',
					backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
					// backgroundOrigin: 'border-box',
					// backgroundClip: 'content-box, border-box',
					zIndex: imgHigherZIndex ? 999 : 2,
					position: 'absolute',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					// zIndex: 20,
					...layoutElements?.imageContainerCSS,
				}}
			>
				<ImgModule
					imgsrc={useIllustraion ? illustration?.[0] : imgs?.[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					canEdit={canEdit}
					currentSlideIndex={socialPostsIndex}
					image_positions={image_positions}
					isSlide={false}
					isSocialPostTemp1Cover={true}
					currentContentIndex={0}
					setImgHigherZIndex={setImgHigherZIndex}
				/>
			</div>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostTopicBox'
					style={{ ...layoutElements?.topicCSS, zIndex: 60 }}
				>
					{topic}
				</div>

				{/* <div className='userNameBox' style={{ ...layoutElements?.userNameCSS }}>
					{user_name}
				</div>
				<div
					className='SocialPostLogoBox'
					style={{ ...layoutElements?.logoCSS }}
				>
					{social_post_template_logo}
				</div>

				<div
					className='pageTurnIndicator'
					style={{ ...layoutElements?.indicatorCSS }}
				>
					{page_turn_indicator}
				</div> */}
				<div
					className='userNameAndLogoAndIndicatorBox'
					style={{
						...layoutElements?.userNameAndLogoAndIndicatorBoxCSS,
					}}
				>
					<div
						className='userNameAndLogoBox'
						style={{
							...layoutElements?.userNameAndLogoBoxCSS,
						}}
					>
						<div
							className='userNameBox'
							style={{ ...layoutElements?.userNameCSS, zIndex: 50 }}
						>
							{user_name}
						</div>
						<div
							className='SocialPostLogoBox'
							style={{
								...layoutElements?.logoCSS,
								zIndex: 30,
								// maxHeight: '30px',
							}}
						>
							{social_post_template_logo}
						</div>
					</div>

					<div
						className='pageIndicator'
						style={{ ...layoutElements?.indicatorCSS }}
					>
						{page_turn_indicator}
					</div>
				</div>
			</div>
		</div>
	);
};

export const Col_1_img_0_casual_topic = ({
	subtopic,
	keywords,
	content,
	icon,
	border_start,
	border_end,
	canEdit,
	layoutElements,
	themeElements,
	social_post_template_logo,
	user_name,
	page_index_number,
}: MainSlidePropsSocialPost) => {
	// return (
	// 	<div
	// 		style={{
	// 			width: '100%',
	// 			height: '100%',
	// 			backgroundSize: 'cover',
	// 			display: 'flex',
	// 			flexDirection: 'column',
	// 			justifyContent: 'flex-start',
	// 			alignItems: 'flex-start',
	// 			boxSizing: 'border-box',
	// 			border: 'none',
	// 			position: 'relative',
	// 			backgroundColor: '#444',
	// 			padding: '5% 6% 0% 6%',
	// 			backgroundImage: `url('/images/socialpost/template1_bg.png')`,
	// 		}}
	// 	>
	// 		<div className='w-full h-full flex flex-col justify-between'>
	// 			<div className='w-full'>{keywords}</div>
	// 			<div className='w-full'>{subtopic}</div>
	// 			<div
	// 				className='h-full w-full flex flex-row rounded-lg'
	// 				style={{
	// 					border: 'double 4px transparent',
	// 					borderRadius: '30px',
	// 					backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
	// 					backgroundOrigin: 'border-box',
	// 					backgroundClip: 'content-box, border-box',
	// 				}}
	// 			>
	// 				<div className='mt-[5%]'>{content}</div>
	// 			</div>
	// 			<div className='w-full h-[7%] mt-[2%]'>
	// 				<div className='flex flex-row justify-center items-center leading-normal tracking-wide text-[15px] text-[white]'>
	// 					{icon}
	// 					{getBrand()}
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{ position: 'relative', ...layoutElements?.canvasCSS }}
		>
			<div
				className='horizontalDivider'
				style={{
					width: '100%',
					height: '1px',
					background: '#333330',
					position: 'absolute',
					top: '32%',
					// left: '50%',
					zIndex: 20,
					...layoutElements?.horizontalDividerCSS,
				}}
			></div>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostSubTopicBox'
					style={{ ...layoutElements?.subtopicCSS, zIndex: 60 }}
				>
					{subtopic}
				</div>

				<div
					className='PageNumberIndexContainer'
					style={{ ...layoutElements?.pageNumberIndexContainerCSS }}
				>
					<div
						className='PageNumberIndex'
						style={{ ...layoutElements?.pageNumberIndexCSS }}
					>
						{page_index_number}
					</div>
				</div>

				<div
					className='contentArea'
					style={{ ...layoutElements?.contentCSS, zIndex: 50 }}
				>
					{content}
				</div>
				<div
					className='SocialPostLogoBox'
					style={{ ...layoutElements?.logoCSS, zIndex: 30 }}
				>
					{social_post_template_logo}
				</div>
			</div>
		</div>
	);
};
// export const Col_1_img_0 = ({
// 	subtopic,
// 	keywords,
// 	content,
// 	icon,
// 	border_start,
// 	border_end,
// 	canEdit,
// 	layoutElements,
// 	themeElements,
// }: MainSlidePropsSocialPost) => {
// 	return (
// 		<div
// 			style={{
// 				width: '100%',
// 				height: '100%',
// 				backgroundSize: 'cover',
// 				display: 'flex',
// 				flexDirection: 'column',
// 				justifyContent: 'flex-start',
// 				alignItems: 'flex-start',
// 				boxSizing: 'border-box',
// 				border: 'none',
// 				position: 'relative',
// 				backgroundColor: '#444',
// 				padding: '5% 6% 0% 6%',
// 				backgroundImage: `url('/images/socialpost/template1_bg.png')`,
// 			}}
// 		>
// 			<div className='w-full h-full flex flex-col justify-between'>
// 				<div className='w-full'>{keywords}</div>
// 				<div className='w-full'>{subtopic}</div>
// 				<div
// 					className='h-full w-full flex flex-row rounded-lg'
// 					style={{
// 						border: 'double 4px transparent',
// 						borderRadius: '30px',
// 						backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
// 						backgroundOrigin: 'border-box',
// 						backgroundClip: 'content-box, border-box',
// 					}}
// 				>
// 					<div className='mt-[5%]'>{content}</div>
// 				</div>
// 				<div className='w-full h-[7%] mt-[2%]'>
// 					<div className='flex flex-row justify-center items-center leading-normal tracking-wide text-[15px] text-[white]'>
// 						{icon}
// 						{getBrand()}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

//casual topic temp1 img layout
export const Col_2_img_1_left_casual_topic = ({
	subtopic,
	content,
	keywords,
	imgs,
	icon,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	image_positions,
	handleSlideEdit,
	layoutElements,
	themeElements,
	social_post_template_logo,
	user_name,
	page_index_number,
	useIllustraion,
	illustration,
}: MainSlidePropsSocialPost) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagePosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagePosition = [...image_positions];
			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagePosition);
		};

	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts();
	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{
				position: 'relative',
				...layoutElements?.canvasCSS,
			}}
		>
			<div
				className='horizontalDivider'
				style={{
					width: '100%',
					height: '1px',
					background: '#333330',
					position: 'absolute',
					top: '32%',
					// left: '50%',
					zIndex: 20,
					...layoutElements?.horizontalDividerCSS,
				}}
			></div>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostSubTopicBox'
					style={{ ...layoutElements?.subtopicCSS, zIndex: 60 }}
				>
					{subtopic}
				</div>

				<div
					className='PageNumberIndexContainer'
					style={{ ...layoutElements?.pageNumberIndexContainerCSS }}
				>
					<div
						className='PageNumberIndex'
						style={{ ...layoutElements?.pageNumberIndexCSS }}
					>
						{page_index_number}
					</div>
				</div>

				<div
					className='ImageAndContentBox'
					style={{ ...layoutElements?.imageAndTextContentContainerCSS }}
				>
					<div
						className='SocialPostImageContainer'
						style={{
							// border: '12px solid transparent',
							backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
							// backgroundOrigin: 'border-box',
							// backgroundClip: 'content-box, border-box',
							zIndex: imgHigherZIndex ? 999 : 2,
							...layoutElements?.imageContainerCSS,
						}}
					>
						{/* <div className='ImageBox' style={{ ...layoutElements?.imageCSS }}> */}
						<ImgModule
							imgsrc={useIllustraion ? illustration?.[0] : imgs?.[0]}
							updateSingleCallback={updateImgAtIndex(0)}
							chartArr={charts}
							ischartArr={ischarts}
							handleSlideEdit={handleSlideEdit}
							canEdit={canEdit}
							layoutElements={layoutElements}
							customImageStyle={layoutElements.imageContainerCSS}
							currentSlideIndex={socialPostsIndex}
							image_positions={image_positions}
							isSlide={false}
							isSocialPostTemp1Cover={true}
							currentContentIndex={0}
							setImgHigherZIndex={setImgHigherZIndex}
						/>
						{/* </div> */}
					</div>
					<div
						className='contentArea'
						style={{ ...layoutElements?.contentCSS, zIndex: 50 }}
					>
						{content}
					</div>
				</div>

				<div
					className='SocialPostLogoBox'
					style={{ ...layoutElements?.logoCSS, zIndex: 30 }}
				>
					{social_post_template_logo}
				</div>
			</div>
		</div>
	);
};
export const Col_2_img_1_Right_casual_topic = ({
	subtopic,
	content,
	keywords,
	imgs,
	icon,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	image_positions,
	handleSlideEdit,
	layoutElements,
	themeElements,
	social_post_template_logo,
	user_name,
	page_index_number,
	useIllustraion,
	illustration,
}: MainSlidePropsSocialPost) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagePosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagesPosition = [...image_positions];
			if (index >= newImagesPosition.length)
				newImagesPosition.push(image_position);
			else newImagesPosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagesPosition);
		};

	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts();
	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{
				position: 'relative',
				...layoutElements?.canvasCSS,
			}}
		>
			<div
				className='horizontalDivider'
				style={{
					width: '100%',
					height: '1px',
					background: '#333330',
					position: 'absolute',
					top: '32%',
					// left: '50%',
					zIndex: 20,
					...layoutElements?.horizontalDividerCSS,
				}}
			></div>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostSubTopicBox'
					style={{ ...layoutElements?.subtopicCSS, zIndex: 60 }}
				>
					{subtopic}
				</div>

				<div
					className='PageNumberIndexContainer'
					style={{ ...layoutElements?.pageNumberIndexContainerCSS }}
				>
					<div
						className='PageNumberIndex'
						style={{ ...layoutElements?.pageNumberIndexCSS }}
					>
						{page_index_number}
					</div>
				</div>

				<div
					className='ImageAndContentBox'
					style={{ ...layoutElements?.imageAndTextContentContainerCSS }}
				>
					<div
						className='SocialPostImageContainer'
						style={{
							// border: '12px solid transparent',
							backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
							// backgroundOrigin: 'border-box',
							// backgroundClip: 'content-box, border-box',
							zIndex: imgHigherZIndex ? 999 : 2,
							...layoutElements?.imageContainerCSS,
						}}
					>
						{/* <div className='ImageBox' style={{ ...layoutElements?.imageCSS }}> */}
						<ImgModule
							imgsrc={useIllustraion ? illustration?.[0] : imgs?.[0]}
							updateSingleCallback={updateImgAtIndex(0)}
							chartArr={charts}
							ischartArr={ischarts}
							handleSlideEdit={handleSlideEdit}
							canEdit={canEdit}
							layoutElements={layoutElements}
							customImageStyle={layoutElements.imageContainerCSS}
							currentSlideIndex={socialPostsIndex}
							image_positions={image_positions}
							isSlide={false}
							isSocialPostTemp1Cover={true}
							currentContentIndex={0}
							setImgHigherZIndex={setImgHigherZIndex}
						/>
						{/* </div> */}
					</div>
					<div
						className='contentArea'
						style={{ ...layoutElements?.contentCSS, zIndex: 50 }}
					>
						{content}
					</div>
				</div>

				<div
					className='SocialPostLogoBox'
					style={{ ...layoutElements?.logoCSS, zIndex: 30 }}
				>
					{social_post_template_logo}
				</div>
			</div>
		</div>
	);
};

// serious subject layouts
// original_title,
// 	imgs,
// 	icon,
// 	update_callback,
// 	canEdit,
// 	charts,
// 	ischarts,
// 	images_position,
// 	handleSlideEdit,
// 	layoutElements,
// 	themeElements,
export const First_page_img_1_serious_subject = ({
	original_title,
	imgs,
	icon,
	update_callback,
	canEdit,
	charts,
	ischarts,
	image_positions,
	handleSlideEdit,
	layoutElements,
	themeElements,
	user_name,
	social_post_template_logo,
	page_turn_indicator,
}: MainSlidePropsSocialPost) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagePosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagePosition = [...image_positions];
			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagePosition);
		};

	const [username, setUsername] = useState(null);
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts();
	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		try {
	// 			const username = await AuthService.getCurrentUserDisplayName();
	// 			setUsername(username);
	// 		} catch (error) {
	// 			console.log('No authenticated user.');
	// 		}
	// 	};

	// 	fetchUser();
	// }, []);

	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{ position: 'relative', ...layoutElements?.canvasCSS }}
		>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostTopicBox'
					style={{ ...layoutElements?.originalTitleCSS, zIndex: 60 }}
				>
					{original_title}
				</div>

				{/* <div className='userNameBox' style={{ ...layoutElements?.userNameCSS }}>
					{user_name}
				</div>
				<div
					className='SocialPostLogoBox'
					style={{ ...layoutElements?.logoCSS }}
				>
					{social_post_template_logo}
				</div>

				<div
					className='pageTurnIndicator'
					style={{ ...layoutElements?.indicatorCSS }}
				>
					{page_turn_indicator}
				</div> */}
				<div
					className='userNameAndLogoAndIndicatorBox'
					style={{
						...layoutElements?.userNameAndLogoAndIndicatorBoxCSS,
					}}
				>
					<div
						className='userNameAndLogoBox'
						style={{
							...layoutElements?.userNameAndLogoBoxCSS,
						}}
					>
						<div
							className='userNameBox'
							style={{ ...layoutElements?.userNameCSS, zIndex: 50 }}
						>
							{user_name}
						</div>
						<div
							className='SocialPostLogoBox'
							style={{
								...layoutElements?.logoCSS,
								zIndex: 30,
								// maxHeight: '30px',
							}}
						>
							{social_post_template_logo}
						</div>
					</div>

					<div
						className='LastPageLikeIndicator'
						style={{ ...layoutElements?.indicatorCSS }}
					>
						{page_turn_indicator}
					</div>
				</div>
			</div>
		</div>
	);
};

export const img_0_serious_subject = ({
	section_title,
	original_title,
	brief,
	content,
	icon,
	update_callback,
	canEdit,
	layoutElements,
	themeElements,
	page_index_number,
	social_post_template_logo,
}: MainSlidePropsSocialPost) => {
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{ position: 'relative', ...layoutElements?.canvasCSS }}
		>
			<div
				className='horizontalDivider'
				style={{
					width: '100%',
					height: '1px',
					background: '#333330',
					position: 'absolute',
					top: '35%',
					// left: '50%',
					zIndex: 20,
				}}
			></div>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostSubTopicBox'
					// style={{ ...layoutElements?.subtopicCSS }}
					style={{ ...layoutElements?.sectionTitleCSS, zIndex: 60 }}
				>
					{section_title}
					{/* {subtopic} */}
				</div>

				<div
					className='PageNumberIndexContainer'
					style={{ ...layoutElements?.pageNumberIndexContainerCSS }}
				>
					<div
						className='PageNumberIndex'
						style={{ ...layoutElements?.pageNumberIndexCSS }}
					>
						{page_index_number}
					</div>
				</div>

				<div
					className='contentArea'
					style={{ ...layoutElements?.contentCSS, zIndex: 50 }}
				>
					{brief}
					{content}
				</div>
				<div
					className='SocialPostLogoBox'
					style={{ ...layoutElements?.logoCSS, zIndex: 30 }}
				>
					{social_post_template_logo}
				</div>
			</div>
		</div>
	);
};

// reading notes type layouts
export const First_page_img_1_reading_notes = ({
	illustration,
	title,
	user_name,
	social_post_template_logo,
	page_turn_indicator,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	image_positions,
	handleSlideEdit,
	layoutElements,
	themeElements,
	useIllustraion,
}: MainSlidePropsSocialPost) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagePosition) => {
			const newImgs = [...illustration];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagePosition = [...image_positions];
			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagePosition);
		};
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts();
	// useEffect(() => {
	// 	console.log('reading note use illustration?', useIllustraion);
	// }, []);
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{ position: 'relative', ...layoutElements?.canvasCSS }}
		>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostReadingNotesTitleBox'
					style={{ ...layoutElements?.readingTitleCSS, zIndex: 60 }}
				>
					{title}
				</div>

				{/* <div className='userNameBox' style={{ ...layoutElements?.userNameCSS }}>
					{user_name}
				</div>
				<div
					className='SocialPostLogoBox'
					style={{ ...layoutElements?.logoCSS }}
				>
					{social_post_template_logo}
				</div>

				<div
					className='pageTurnIndicator'
					style={{ ...layoutElements?.indicatorCSS }}
				>
					{page_turn_indicator}
				</div> */}
				<div
					className='userNameAndLogoAndIndicatorBox'
					style={{
						...layoutElements?.userNameAndLogoAndIndicatorBoxCSS,
					}}
				>
					<div
						className='userNameAndLogoBox'
						style={{
							...layoutElements?.userNameAndLogoBoxCSS,
						}}
					>
						<div
							className='userNameBox'
							style={{ ...layoutElements?.userNameCSS, zIndex: 50 }}
						>
							{user_name}
						</div>
						<div
							className='SocialPostLogoBox'
							style={{
								...layoutElements?.logoCSS,
								zIndex: 30,
								// maxHeight: '30px',
							}}
						>
							{social_post_template_logo}
						</div>
					</div>

					<div
						className='LastPageLikeIndicator'
						style={{ ...layoutElements?.indicatorCSS }}
					>
						{page_turn_indicator}
					</div>
				</div>
			</div>
		</div>
	);
	// return (
	// 	<div
	// 		style={{
	// 			width: '100%',
	// 			height: '100%',
	// 			backgroundSize: 'cover',
	// 			display: 'flex',
	// 			flexDirection: 'row',
	// 			justifyContent: 'flex-start',
	// 			alignItems: 'flex-start',
	// 			boxSizing: 'border-box',
	// 			border: 'none',
	// 			position: 'relative',
	// 			backgroundColor: 'white',
	// 		}}
	// 	>
	// 		<div
	// 			className='w-full h-full flex flex-col justify-between'
	// 			style={{
	// 				border: '8px solid transparent',
	// 				backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
	// 				backgroundOrigin: 'border-box',
	// 				backgroundClip: 'content-box, border-box',
	// 			}}
	// 		>
	// 			<div className='mx-[auto]'>{title}</div>
	// 			<div
	// 				className='w-full h-1/2 flex'
	// 				style={{
	// 					borderRadius: '20px',
	// 				}}
	// 			>
	// 				<ImgModule
	// 					imgsrc={illustration[0]}
	// 					updateSingleCallback={updateImgAtIndex(0)}
	// 					chartArr={charts}
	// 					ischartArr={ischarts}
	// 					handleSlideEdit={handleSlideEdit}
	// 					canEdit={canEdit}
	// 					currentSlideIndex={socialPostsIndex}
	// 					image_positions={image_positions}
	// 					isSlide={false}
	// 					currentContentIndex={0}
	// 					search_illustration={true}
	// 				/>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export const Col_1_img_0_reading_notes = ({
	illustration,
	imgs,
	quote,
	source,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	image_positions,
	handleSlideEdit,
	layoutElements,
	themeElements,
	social_post_template_logo,
	page_index_number,
	page_turn_indicator,
}: MainSlidePropsSocialPost) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagePosition) => {
			const newImgs = [...illustration];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagesPosition = [...image_positions];
			if (index >= newImagesPosition.length)
				newImagesPosition.push(image_position);
			else newImagesPosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagesPosition);
		};
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts();
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{ position: 'relative', ...layoutElements?.canvasCSS }}
		>
			<div
				className='horizontalDivider'
				style={{
					width: '100%',
					height: '1px',
					background: '#333330',
					position: 'absolute',
					top: '61%',
					// left: '50%',
					zIndex: 20,
				}}
			></div>
			<div
				className='NonCoverPageIndicator'
				style={{ ...layoutElements?.indicatorCSS, zIndex: 30 }}
			>
				{page_turn_indicator}
			</div>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostQuoteSharingQuoteBox'
					style={{ ...layoutElements?.quoteCSS, zIndex: 60 }}
				>
					{quote}
				</div>

				<div
					className='QuoteSourceAndLogoBox'
					style={{
						...layoutElements?.sourceAndLogoBoxCSS,
					}}
				>
					<div
						className='SocialPostQuoteSharingSourceBox'
						style={{ ...layoutElements?.sourceCSS, zIndex: 50 }}
					>
						{source}
					</div>
					<div
						className='SocialPostLogoBox'
						style={{
							...layoutElements?.logoCSS,
							zIndex: 30,
							// maxHeight: '30px',
						}}
					>
						{social_post_template_logo}
					</div>
				</div>
			</div>
		</div>
	);
	// return (
	// 	<div
	// 		style={{
	// 			width: '100%',
	// 			height: '100%',
	// 			backgroundSize: 'cover',
	// 			display: 'flex',
	// 			flexDirection: 'row',
	// 			justifyContent: 'flex-start',
	// 			alignItems: 'flex-start',
	// 			boxSizing: 'border-box',
	// 			border: 'none',
	// 			position: 'relative',
	// 			backgroundColor: 'white',
	// 		}}
	// 	>
	// 		<div
	// 			className='w-full h-full flex flex-col justify-between'
	// 			style={{
	// 				border: '8px solid transparent',
	// 				backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
	// 				backgroundOrigin: 'border-box',
	// 				backgroundClip: 'content-box, border-box',
	// 				fontFamily: 'Cormorant, sans-serif',
	// 			}}
	// 		>
	// 			<div
	// 				className='w-full h-1/2 flex'
	// 				style={{
	// 					borderRadius: '20px',
	// 					overflow: 'hidden',
	// 				}}
	// 			>
	// 				<ImgModule
	// 					imgsrc={illustration[0]}
	// 					updateSingleCallback={updateImgAtIndex(0)}
	// 					chartArr={charts}
	// 					ischartArr={ischarts}
	// 					handleSlideEdit={handleSlideEdit}
	// 					canEdit={canEdit}
	// 					currentSlideIndex={socialPostsIndex}
	// 					image_positions={image_positions}
	// 					isSlide={false}
	// 					currentContentIndex={0}
	// 				/>
	// 			</div>
	// 			<div id='asterisk_section' className='mx-[auto] text-center'>
	// 				*
	// 			</div>
	// 			<div className='px-[7%]'>{quote}</div>
	// 			<div id='source_section' className='mb-[10%]'>
	// 				{source}
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export const Col_1_img_1_reading_notes = ({
	illustration,
	imgs,
	quote,
	source,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	image_positions,
	handleSlideEdit,
	layoutElements,
	themeElements,
	page_index_number,
	social_post_template_logo,
	useIllustraion,
	page_turn_indicator,
}: MainSlidePropsSocialPost) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagePosition) => {
			const newImgs = [...illustration];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagePosition = [...image_positions];
			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagePosition);
		};
	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);
	const { socialPostsIndex, setSocialPostsIndex } = useSocialPosts();
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{ position: 'relative', ...layoutElements?.canvasCSS }}
		>
			<div
				className='horizontalDivider'
				style={{
					width: '100%',
					height: '1px',
					background: '#333330',
					position: 'absolute',
					top: '61%',
					// left: '50%',
					zIndex: 20,
				}}
			></div>
			<div
				className='SocialPostImageContainer'
				style={{
					// border: '12px solid transparent',
					backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
					// backgroundOrigin: 'border-box',
					// backgroundClip: 'content-box, border-box',
					zIndex: imgHigherZIndex ? 999 : 20,

					// zIndex: 20,
					...layoutElements?.imageContainerCSS,
				}}
			>
				<ImgModule
					imgsrc={useIllustraion ? illustration?.[0] : imgs?.[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					canEdit={canEdit}
					customImageStyle={layoutElements.imageContainerCSS}
					currentSlideIndex={socialPostsIndex}
					image_positions={image_positions}
					isSlide={false}
					isSocialPostTemp1Cover={true}
					currentContentIndex={0}
					setImgHigherZIndex={setImgHigherZIndex}
				/>
			</div>

			<div
				className='NonCoverPageIndicator'
				style={{ ...layoutElements?.indicatorCSS, zIndex: 30 }}
			>
				{page_turn_indicator}
			</div>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='SocialPostQuoteSharingQuoteBox'
					style={{ ...layoutElements?.quoteCSS, zIndex: 60 }}
				>
					{quote}
				</div>

				<div
					className='QuoteSourceAndLogoBox'
					style={{
						...layoutElements?.sourceAndLogoBoxCSS,
					}}
				>
					<div
						className='SocialPostQuoteSharingSourceBox'
						style={{ ...layoutElements?.sourceCSS, zIndex: 50 }}
					>
						{source}
					</div>
					<div
						className='SocialPostLogoBox'
						style={{
							...layoutElements?.logoCSS,
							zIndex: 30,
							// maxHeight: '30px',
						}}
					>
						{social_post_template_logo}
					</div>
				</div>
			</div>
		</div>
	);
	// return (
	// 	<div
	// 		style={{
	// 			width: '100%',
	// 			height: '100%',
	// 			backgroundSize: 'cover',
	// 			display: 'flex',
	// 			flexDirection: 'row',
	// 			justifyContent: 'flex-start',
	// 			alignItems: 'flex-start',
	// 			boxSizing: 'border-box',
	// 			border: 'none',
	// 			position: 'relative',
	// 			backgroundColor: 'white',
	// 		}}
	// 	>
	// 		<div
	// 			className='w-full h-full flex flex-col justify-between'
	// 			style={{
	// 				border: '8px solid transparent',
	// 				backgroundImage: `linear-gradient(white, white), radial-gradient(circle at top left, ${border_start}, ${border_end})`,
	// 				backgroundOrigin: 'border-box',
	// 				backgroundClip: 'content-box, border-box',
	// 				fontFamily: 'Cormorant, sans-serif',
	// 			}}
	// 		>
	// 			<div
	// 				className='w-full h-1/2 flex'
	// 				style={{
	// 					borderRadius: '20px',
	// 					overflow: 'hidden',
	// 				}}
	// 			>
	// 				<ImgModule
	// 					imgsrc={illustration[0]}
	// 					updateSingleCallback={updateImgAtIndex(0)}
	// 					chartArr={charts}
	// 					ischartArr={ischarts}
	// 					handleSlideEdit={handleSlideEdit}
	// 					canEdit={canEdit}
	// 					currentSlideIndex={socialPostsIndex}
	// 					image_positions={image_positions}
	// 					isSlide={false}
	// 					currentContentIndex={0}
	// 				/>
	// 			</div>
	// 			<div id='asterisk_section' className='mx-[auto] text-center'>
	// 				*
	// 			</div>
	// 			<div className='px-[7%]'>{quote}</div>
	// 			<div id='source_section' className='mb-[10%]'>
	// 				{source}
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export const last_page_layout = ({
	content,
	illustration,
	quote,
	source,
	border_start,
	border_end,
	update_callback,
	canEdit,
	charts,
	ischarts,
	image_positions,
	handleSlideEdit,
	layoutElements,
	themeElements,
	last_page_content,
	last_page_title,
	last_page_like_indicator,
	user_name,
	social_post_template_logo,
}: MainSlidePropsSocialPost) => {
	return (
		<div
			// className='relative gap-[32px] flex justify-center items-center'
			className='SocialPostCanvas'
			style={{ position: 'relative', ...layoutElements?.canvasCSS }}
		>
			<div
				className='SocialPostColumn'
				style={{ ...layoutElements?.columnCSS }}
			>
				<div
					className='LastPageTitleBox'
					style={{ ...layoutElements?.lastPageTitleCSS }}
				>
					{last_page_title}
				</div>

				{/* <div
					className='LastPageContentBox'
					style={{ ...layoutElements?.lastPageContentCSS }}
				>
					{last_page_content}
				</div> */}
				<div
					className='LastPageContentBox'
					style={{ ...layoutElements?.lastPageContentCSS }}
				>
					{/* {content} */}
					{last_page_content}
				</div>
				<div
					className='userNameAndLogoAndIndicatorBox'
					style={{
						...layoutElements?.userNameAndLogoAndIndicatorBoxCSS,
					}}
				>
					<div
						className='userNameAndLogoBox'
						style={{
							...layoutElements?.userNameAndLogoBoxCSS,
						}}
					>
						<div
							className='userNameBox'
							style={{ ...layoutElements?.userNameCSS }}
						>
							{user_name}
						</div>
						<div
							className='SocialPostLogoBox'
							style={{
								...layoutElements?.logoCSS,
								// maxHeight: '30px',
							}}
						>
							{social_post_template_logo}
						</div>
					</div>

					<div
						className='LastPageLikeIndicator'
						style={{ ...layoutElements?.indicatorCSS }}
					>
						{last_page_like_indicator}
					</div>
				</div>
			</div>
		</div>
	);
};

type SocialPostLayoutFunction = (
	props: MainSlidePropsSocialPost,
) => JSX.Element;
export const socialPostAvailableLayouts: Record<
	SocialPostLayoutKeys,
	SocialPostLayoutFunction
> = {
	// casual topic layouts
	Col_1_img_0_casual_topic: Col_1_img_0_casual_topic,
	First_page_img_1_casual_topic: First_page_img_1_casual_topic,
	Col_2_img_1_left_casual_topic: Col_2_img_1_left_casual_topic,
	Col_2_img_1_right_casual_topic: Col_2_img_1_Right_casual_topic,
	// template2 serious subject
	First_page_img_1_serious_subject: First_page_img_1_serious_subject,
	img_0_serious_subject: img_0_serious_subject,
	// template3 reading notes
	First_page_img_1_reading_notes: First_page_img_1_reading_notes,
	Col_1_img_0_reading_notes: Col_1_img_0_reading_notes,
	Col_1_img_1_reading_notes: Col_1_img_1_reading_notes,
	//last page
	last_page_layout: last_page_layout,
};

// export const templateSamples = {
// 	cover: [
// 		{
// 			name: 'First_page_img_1',
// 			img: cover_png.src,
// 		},
// 	],
// 	main: [
// 		{
// 			name: 'Col_1_img_0',
// 			img: noimg_png.src,
// 		},
// 		{
// 			name: 'Col_2_img_1',
// 			img: withimg_png.src,
// 		},
// 	],
// };
