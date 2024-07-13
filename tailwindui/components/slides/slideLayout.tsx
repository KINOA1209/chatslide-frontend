import React, {
	useEffect,
	useState,
	useMemo,
	useRef,
	useLayoutEffect,
	useCallback,
} from 'react';
import { RiAddLine } from 'react-icons/ri'; // Import the Add icon from React Icons
import Image from 'next/image';
import { ImgModule } from '@/components/imgModule';
import { MainSlideProps as BaseMainSlideProps } from './slideTemplates';
import coverimg0_png from '@/public/images/template/layout/coverimg0.png';
import coverimg1_png from '@/public/images/template/layout/coverimg1.png';
import col1img0_png from '@/public/images/template/layout/col1img0.png';
import col2img0_png from '@/public/images/template/layout/col2img0.png';
import col3img0_png from '@/public/images/template/layout/col3img0.png';
import col2img1_png from '@/public/images/template/layout/col2img1.png';
import col1img1_png from '@/public/images/template/layout/col1img1.png';
import col3img3_png from '@/public/images/template/layout/col3img3.png';
import col2img2_png from '@/public/images/template/layout/col2img2.png';
import Full_img_only_png from '@/public/images/template/layout/Full_img_only.png';
import { useLocalImgs } from './slideTemplates';
import { ThemeElements } from './templates_customizable_elements/theme_elements';
// import { LayoutElements } from './templates_customizable_elements/layout_elements';
import { LayoutElements } from '@/components/slides/templates_customizable_elements/layout_elements';
import Position from '@/types/Position';
import { useSlides } from '@/hooks/use-slides';
import ResizeSlider from './drag_resize/resize_slider';
import '@/components/slides/drag_resize/dragAndResizeCSS.css';
import Draggable from 'react-draggable';
import dynamic from 'next/dynamic';
import Slide, { LogoPosition, Media, SlideKeys } from '@/models/Slide';
import { DragElement, ElementType } from '../DragElement';
const QuillEditable = dynamic(
	() => import('@/components/slides/quillEditorSlide'),
	{ ssr: false },
);
// Extend the interface with new fields

// for cover:default image position is on the right side

// for col1img1 image layout, default is on the bottom side
// for col2img1 image layout, default is on the right side
// for col2img2 image layout, default is on the bottom side
// for col3img3 image layout, default is on the top side

interface MainSlideProps extends BaseMainSlideProps {
	brandingColor?: string;
	themeElements: ThemeElements;
	layoutElements: LayoutElements;
	showContentBulletPoint?: boolean;
}

export type LayoutKeys =
	| ''
	| 'Cover_img_0_layout'
	| 'Cover_img_1_layout'
	// | 'Cover_img_1_top_layout' // new
	// | 'Cover_img_1_left_layout' // new
	// | 'Cover_img_1_bottom_layout' // new
	| 'Col_1_img_0_layout'
	| 'Col_2_img_0_layout'
	| 'Col_3_img_0_layout'
	| 'Col_2_img_1_layout'
	// | 'Col_2_img_1_left_layout' // new
	| 'Col_1_img_1_layout'
	// | 'Col_1_img_1_top_layout' // new
	// | 'Col_1_img_1_full_layout' // new
	| 'Col_2_img_2_layout'
	// | 'Col_2_img_2_top_layout' // new
	| 'Col_3_img_3_layout'
	// | 'Col_3_img_3_bottom_layout' // new
	| 'Full_img_only_layout';
// for add column of text button style
const addButtonStyle = `
flex items-center justify-center
w-auto h-12
bg-gray-100 border-2 border-gray-300
text-gray-600 font-medium
px-6 py-2
text-base
cursor-pointer
rounded-md
shadow-md
transition duration-300 ease-in-out
`;

const addButtonHoverStyle = `
hover:bg-gray-200
hover:text-gray-800
hover:border-gray-400
hover:shadow-lg
`;

const addIconStyle = `
mr-2
`;

type AddANewEditorBoxProps = {
	handleSlideEdit: Function;
	isVerticalContent: boolean;
	themeElements: ThemeElements; // Update the type accordingly
	fontSize: string;
	contentIndex: number;
	slideIndex: number;
	slides: Slide[];
	// contentText: string;
	// setUpdatedContent: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
	// setShowEditorBox: React.Dispatch<React.SetStateAction<boolean>>;
	// shouldShowEditorBox: boolean;
};

type HandleAddColumnProps = {
	handleSlideEdit: Function;
	isVerticalContent: boolean;
	themeElements: ThemeElements; // Update the type accordingly
	fontSize: string;
	contentIndex: number;
	slideIndex: number;
	slides: Slide[];
	setUpdatedContent: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
	setShowAddButton: React.Dispatch<React.SetStateAction<boolean>>;
	shouldShowAddButton: boolean;
};

// export const changingTemplateContent = (content: string[], col_num: number) => {
// 	const totalItems = content.length;
// 	const minItemsPerCol = Math.floor(totalItems / col_num);
// 	const extraItems = totalItems % col_num;

// 	let res: string[][] = [];
// 	let curr_idx = 0;
// 	for (let i = 0; i < col_num; i++) {
// 		// Calculate how many items this column should have
// 		const itemsCount = minItemsPerCol + (i < extraItems ? 1 : 0);
// 		res.push(content.slice(curr_idx, curr_idx + itemsCount));
// 		curr_idx += itemsCount;
// 	}
// 	return res
// }
export const changingTemplateContent = <T extends string | JSX.Element>(
	content: T[],
	col_num: number,
): T[][] => {
	const totalItems = content.length;
	const minItemsPerCol = Math.floor(totalItems / col_num);
	const extraItems = totalItems % col_num;

	let res: T[][] = [];
	let curr_idx = 0;
	for (let i = 0; i < col_num; i++) {
		// Calculate how many items this column should have
		const itemsCount = minItemsPerCol + (i < extraItems ? 1 : 0);
		res.push(content.slice(curr_idx, curr_idx + itemsCount));
		curr_idx += itemsCount;
	}
	return res;
};

//console.log(changingTemplateContent(['1','2','3','4','5','6','7','8','9','10','11'], 3))

export const addANewEditorBox = ({
	handleSlideEdit,
	isVerticalContent,
	themeElements,
	fontSize,
	contentIndex,
	slideIndex,
	slides,
}: // setShowEditorBox,
// shouldShowEditorBox,
// contentText,
AddANewEditorBoxProps) => {
	console.log('add a new content item column:');
	// const newContentItem = (
	return (
		<div key={`content_add`} className={`${slideIndex === 0 ? 'hidden' : ''}`}>
			<QuillEditable
				content={''}
				handleBlur={(newContent: string | string[]) =>
					handleSlideEdit(newContent, slideIndex, 'content', contentIndex, true)
				}
				style={{
					...themeElements.contentFontCSS_non_vertical_content,
					fontSize: fontSize,
				}}
				isVerticalContent={isVerticalContent}
				templateKey={slides[slideIndex].template}
			/>
		</div>
	);

	// setUpdatedContent((prevContent: JSX.Element[]) => [
	// 	...prevContent,
	// 	newContentItem,
	// ]);
	// setShowAddButton(shouldShowAddButton);
};

export const handleAddTextColumn = ({
	handleSlideEdit,
	isVerticalContent,
	themeElements,
	fontSize,
	contentIndex,
	slideIndex,
	slides,
	setUpdatedContent,
	setShowAddButton,
	shouldShowAddButton,
}: HandleAddColumnProps) => {
	console.log('add a new content item column:');
	const newContentItem = (
		<div key={`content_`} className={`${slideIndex === 0 ? 'hidden' : ''}`}>
			<QuillEditable
				content={''}
				handleBlur={(newContent: string | string[]) =>
					handleSlideEdit(newContent, slideIndex, 'content', contentIndex, true)
				}
				style={{
					...themeElements.contentFontCSS_non_vertical_content,
					fontSize: fontSize,
				}}
				isVerticalContent={isVerticalContent}
				templateKey={slides[slideIndex].template}
			/>
		</div>
	);

	setUpdatedContent((prevContent: JSX.Element[]) => [
		...prevContent,
		newContentItem,
	]);
	setShowAddButton(shouldShowAddButton);
};

const filterEmptyLines = (
	content: JSX.Element[] | JSX.Element,
): JSX.Element[] => {
	const elements = React.Children.toArray(content);
	const nonEmptyElements: JSX.Element[] = [];

	for (const element of elements) {
		if (React.isValidElement(element)) {
			let hasVisibleContent = true;
			const htmlContent =
				element.props?.children?.props?.children?.props?.dangerouslySetInnerHTML
					?.__html || element.props?.children?.props?.content;
			if (htmlContent) {
				const parser = new DOMParser();
				const doc = parser.parseFromString(htmlContent, 'text/html');
				const hasVisibleContent = Array.from(doc.body.childNodes).some(
					(node) => {
						if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
							return true; // Text node with non-whitespace content
						} else if (node.nodeType === Node.ELEMENT_NODE) {
							const elementNode = node as Element;
							return (
								elementNode.textContent?.trim() || // Element with non-whitespace content
								elementNode.querySelectorAll('img, table, iframe').length > 0
							); // Element containing meaningful tags
						}
						return false;
					},
				);

				if (hasVisibleContent) {
					nonEmptyElements.push(element);
				}
			} else {
				// If the element doesn't have dangerouslySetInnerHTML, it's considered as having content
				nonEmptyElements.push(element);
			}
		}
	}

	return nonEmptyElements;
};

const setInitPos = (
	prevPos: Position | Position[],
	initPos: Position | Position[],
): Position | Position[] => {
	if (prevPos === undefined) return initPos;
	if (Array.isArray(prevPos)) {
		if (prevPos.length === 0) return initPos;
		if (prevPos.filter((pos) => Object.keys(pos).length !== 0).length > 0)
			return prevPos;
		return initPos;
	} else return Object.keys(prevPos).length !== 0 ? prevPos : initPos;
};

const defaultLogoPos = {
	BottomLeft: { x: 12, y: 470, width: 58, height: 58 },
	BottomRight: { x: 890, y: 470, width: 58, height: 58 },
	TopLeft: { x: 12, y: 12, width: 58, height: 58 },
	TopRight: { x: 890, y: 12, width: 58, height: 58 },
};

const setInitLogoPos = (
	logo_position: LogoPosition,
	logo_numeric_position: Position,
): Position => {
	if (logo_numeric_position === undefined) return defaultLogoPos[logo_position];
	return Object.keys(logo_numeric_position).length !== 0
		? logo_numeric_position
		: defaultLogoPos[logo_position];
};

export const Cover_img_0_layout = ({
	user_name,
	username_position,
	title,
	title_position,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	handleSlideEdit,
	currentSlideIndex,
	layoutOptionNonCover,
	layoutOptionCover,
	brandingColor,
	themeElements,
	layoutElements,
	templateLogo,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	const initTitlePos = setInitPos(
		title_position,
		layoutElements.titlePos as Position,
	) as Position;
	const initUserNamePos = setInitPos(
		username_position,
		layoutElements.usernamePos as Position,
	) as Position;
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={`SlideCanvas`}
			style={{
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initUserNamePos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='username_position'
				defaultPos={[layoutElements.usernamePos as Position]}
				elementIndex={2}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{user_name}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTitlePos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='title_position'
				defaultPos={[layoutElements.titlePos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{title}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				className={`SlideVisualElement`}
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCoverImg0 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCoverImg0}
						alt='Background Image'
						unoptimized={true}
					/>
				)}
			</div>
		</div>
	);
};

export const Cover_img_1_layout = ({
	user_name,
	username_position,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	brandingColor,
	themeElements,
	layoutElements,
	templateLogo,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	image_positions,
	embed_code,
	media_types,
	title_position,
	image_container_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: Position,
			embed_code_single: string,
			media_type: Media,
		) => {
			// Ensure that the arrays are initialized
			const newImgs = Array.isArray(imgs) ? [...imgs] : [];
			const newIsCharts = Array.isArray(ischarts) ? [...ischarts] : [];
			const newImagePosition = Array.isArray(image_positions)
				? [...image_positions]
				: [];
			const newEmbedCode = Array.isArray(embed_code) ? [...embed_code] : [];
			const newMediaTypes = Array.isArray(media_types) ? [...media_types] : [];

			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			if (index >= newEmbedCode.length) newEmbedCode.push(embed_code_single);
			else newEmbedCode[index] = embed_code_single;

			if (index >= newMediaTypes.length) newMediaTypes.push(media_type);
			else newMediaTypes[index] = media_type;

			update_callback(
				newImgs,
				newIsCharts,
				newImagePosition,
				newEmbedCode,
				newMediaTypes,
			);
		};

	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

	const initUserNamePos = setInitPos(
		username_position,
		layoutElements.usernamePos as Position,
	) as Position;
	const initTitlePos = setInitPos(
		title_position,
		layoutElements.titlePos as Position,
	) as Position;
	const initImgContainerPos = setInitPos(
		image_container_positions,
		layoutElements.imgContainerPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={`SlideCanvas`}
			style={{
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initUserNamePos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='username_position'
				defaultPos={[layoutElements.usernamePos as Position]}
				elementIndex={3}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{user_name}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTitlePos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='title_position'
				defaultPos={[layoutElements.titlePos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{title}
			</DragElement>
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={0}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					// additional_images={imgs.slice(3)}
					setImgHigherZIndex={setImgHigherZIndex}
					embed_code={embed_code}
					embed_code_single={embed_code?.[0]}
					media_types={media_types}
					media_type={media_types?.[0]}
				/>
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={2}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				className={`SlideVisualElement`}
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCoverImg1 && (
					<Image
						width={960}
						height={540}
						src={themeElements.backgroundUrlCoverImg1}
						alt='Background Image'
						unoptimized={true}
						className='w-[960px] h-[540px]'
					/>
				)}
			</div>
		</div>
	);
};
export const Col_1_img_0_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	handleSlideEdit,
	currentSlideIndex,
	layoutOptionNonCover,
	layoutOptionCover,
	brandingColor,
	themeElements,
	layoutElements,
	templateLogo,
	topic_position,
	subtopic_position,
	content_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	const [maxContentHeight, setMaxContentHeight] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const topicRef = useRef<HTMLDivElement>(null);
	const subtopicRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const calculateMaxHeight = () => {
			const containerElement = containerRef.current;
			const topicElement = topicRef.current;
			const subtopicElement = subtopicRef.current;

			if (containerElement && topicElement && subtopicElement) {
				const containerHeight = containerElement.clientHeight;
				const topicHeight = topicElement.clientHeight;
				const subtopicHeight = subtopicElement.clientHeight;
				const logoHeight = containerHeight * 0.1;

				const availableHeight =
					containerHeight - (topicHeight + subtopicHeight + logoHeight);

				//console.log(`Available height: ${availableHeight}`);
				setMaxContentHeight(availableHeight > 0 ? availableHeight : 200);
			}
		};

		calculateMaxHeight();
		window.addEventListener('resize', calculateMaxHeight);

		return () => {
			window.removeEventListener('resize', calculateMaxHeight);
		};
	}, []);

	const initTopicPos = setInitPos(
		topic_position,
		layoutElements.topicPos as Position,
	) as Position;
	const initSubTopicPos = setInitPos(
		subtopic_position,
		layoutElements.subtopicPos as Position,
	) as Position;
	const initContentPos = setInitPos(
		content_positions,
		layoutElements.contentPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			ref={containerRef}
			className={`SlideCanva`}
			style={{
				...layoutElements.canvaCSS,
				position: 'relative',
				// backgroundColor: themeElements.slideCanvasBackgroundColor
				// 	? themeElements.slideCanvasBackgroundColor
				// 	: '',
			}}
		>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='topic_position'
				defaultPos={[layoutElements.topicPos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{topic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initSubTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='subtopic_position'
				defaultPos={[layoutElements.subtopicPos as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{subtopic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={initContentPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='content_position'
				defaultPos={layoutElements.contentPos as Position[]}
				elementIndex={2}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{content}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={3}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				className='SlideVisualElements'
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCol_1_img_0 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCol_1_img_0}
						alt='Background Image'
						unoptimized={true}
					/>
				)}
			</div>
		</div>
	);
};
export const Col_2_img_0_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	handleSlideEdit,
	currentSlideIndex,
	topic_position,
	subtopic_position,
	content_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	// Ensure content is always an array
	const items = Array.isArray(content) ? content : [content];

	const { slides, slideIndex, updateSlidePage, updateVersion } = useSlides();
	//const filteredContent: JSX.Element[] = filterEmptyLines(content);
	// const [updatedContent, setUpdatedContent] = useState(items);
	const contentItemsFor2Col = changingTemplateContent(items, 2);
	const [updatedContentCol1, setUpdatedContentCol1] = useState(
		contentItemsFor2Col[0],
	);
	const [updatedContentCol2, setUpdatedContentCol2] = useState(
		contentItemsFor2Col[1],
	);
	const [showEditorBoxCol1, setShowEditorBoxCol1] = useState(
		updatedContentCol1.length === 0,
	);
	const [showEditorBoxCol2, setShowEditorBoxCol2] = useState(
		updatedContentCol2.length === 0,
	);

	const initTopicPos = setInitPos(
		topic_position,
		layoutElements.topicPos as Position,
	) as Position;
	const initSubTopicPos = setInitPos(
		subtopic_position,
		layoutElements.subtopicPos as Position,
	) as Position;
	const initContentPos = setInitPos(
		content_positions,
		layoutElements.contentPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={`SlideLayoutCanvas`}
			style={{
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='topic_position'
				defaultPos={[layoutElements.topicPos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{topic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initSubTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='subtopic_position'
				defaultPos={[layoutElements.subtopicPos as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{subtopic}
			</DragElement>
			{updatedContentCol1.map((item, index) => (
				<React.Fragment key={`contentText_${index}`}>
					<ul
						key={`contentText_${index}`}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol1.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={0}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={2}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			{updatedContentCol2.map((item, index) => (
				<React.Fragment key={`contentText_${index + 1}`}>
					<ul
						key={`contentText_${index}`}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol2.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={1}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={3}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={4}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				className={`SlideVisualElements`}
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCol_2_img_0 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCol_2_img_0}
						alt='Background Image for cover'
					/>
				)}
			</div>
		</div>
	);
};
export const Col_3_img_0_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	handleSlideEdit,
	currentSlideIndex,
	topic_position,
	subtopic_position,
	content_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	//const filteredContent: JSX.Element[] = filterEmptyLines(content);

	// Ensure content is always an array
	const items = Array.isArray(content) ? content : [content];
	const { slides, slideIndex, updateSlidePage, updateVersion } = useSlides();
	//const filteredContent: JSX.Element[] = filterEmptyLines(content);
	// const [updatedContent, setUpdatedContent] = useState(items);

	// useEffect(() => {
	// 	console.log('updatedContent on page', slideIndex, updatedContent);
	// }, [updatedContent]);

	// const [showAddButton, setShowAddButton] = useState(
	// 	// slides[slideIndex].content.length <= 2, for three columns
	// 	updatedContent.length <= 2,
	// );

	const contentItemsFor3Col = changingTemplateContent(items, 3);
	const [updatedContentCol1, setUpdatedContentCol1] = useState(
		contentItemsFor3Col[0],
	);
	const [updatedContentCol2, setUpdatedContentCol2] = useState(
		contentItemsFor3Col[1],
	);
	const [updatedContentCol3, setUpdatedContentCol3] = useState(
		contentItemsFor3Col[2],
	);
	const [showEditorBoxCol1, setShowEditorBoxCol1] = useState(
		updatedContentCol1.length === 0,
	);
	const [showEditorBoxCol2, setShowEditorBoxCol2] = useState(
		updatedContentCol2.length === 0,
	);
	const [showEditorBoxCol3, setShowEditorBoxCol3] = useState(
		updatedContentCol3.length === 0,
	);

	const initTopicPos = setInitPos(
		topic_position,
		layoutElements.topicPos as Position,
	) as Position;
	const initSubTopicPos = setInitPos(
		subtopic_position,
		layoutElements.subtopicPos as Position,
	) as Position;
	const initContentPos = setInitPos(
		content_positions,
		layoutElements.contentPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='topic_position'
				defaultPos={[layoutElements.topicPos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{topic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initSubTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='subtopic_position'
				defaultPos={[layoutElements.subtopicPos as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{subtopic}
			</DragElement>
			{updatedContentCol1.map((item, index) => (
				<React.Fragment key={`contentText_${index}`}>
					<ul
						key={`contentText_${index}`}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol1.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={0}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={2}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			{updatedContentCol2.map((item, index) => (
				<React.Fragment key={`contentText_${index + 1} `}>
					<ul
						key={`contentText_${index} `}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol2.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={1}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={3}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			{updatedContentCol3.map((item, index) => (
				<React.Fragment key={`contentText_${index + 2} `}>
					<ul
						key={`contentText_${index} `}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol3.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={2}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={4}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={5}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCol_3_img_0 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCol_3_img_0}
						alt='Background Image'
						unoptimized={true}
					/>
				)}
			</div>
		</div>
	);
};
export const Col_2_img_1_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	image_positions,
	embed_code,
	media_types,
	topic_position,
	subtopic_position,
	content_positions,
	image_container_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: Position,
			embed_code_single: string,
			media_type: Media,
		) => {
			// Ensure that the arrays are initialized
			const newImgs = Array.isArray(imgs) ? [...imgs] : [];
			const newIsCharts = Array.isArray(ischarts) ? [...ischarts] : [];
			const newImagePosition = Array.isArray(image_positions)
				? [...image_positions]
				: [];
			const newEmbedCode = Array.isArray(embed_code) ? [...embed_code] : [];
			const newMediaTypes = Array.isArray(media_types) ? [...media_types] : [];

			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			if (index >= newEmbedCode.length) newEmbedCode.push(embed_code_single);
			else newEmbedCode[index] = embed_code_single;

			if (index >= newMediaTypes.length) newMediaTypes.push(media_type);
			else newMediaTypes[index] = media_type;

			update_callback(
				newImgs,
				newIsCharts,
				newImagePosition,
				newEmbedCode,
				newMediaTypes,
			);
		};

	const [maxContentHeight, setMaxContentHeight] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const topicRef = useRef<HTMLDivElement>(null);
	const subtopicRef = useRef<HTMLDivElement>(null);
	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

	useEffect(() => {
		const calculateMaxHeight = () => {
			const containerElement = containerRef.current;
			const topicElement = topicRef.current;
			const subtopicElement = subtopicRef.current;

			if (containerElement && topicElement && subtopicElement) {
				const containerHeight = containerElement.clientHeight;
				const topicHeight = topicElement.clientHeight;
				const subtopicHeight = subtopicElement.clientHeight;
				const logoHeight = containerHeight * 0.2;

				const availableHeight =
					containerHeight - (topicHeight + subtopicHeight + logoHeight);

				//console.log(`Available height: ${availableHeight}`);
				setMaxContentHeight(availableHeight > 0 ? availableHeight : 200);
			}
		};

		calculateMaxHeight();
		window.addEventListener('resize', calculateMaxHeight);
		// console.log(`Calculating max height`, maxContentHeight);

		return () => {
			window.removeEventListener('resize', calculateMaxHeight);
		};
	}, []);

	const initTopicPos: Position = setInitPos(
		topic_position,
		layoutElements.topicPos as Position,
	) as Position;
	const initSubTopicPos: Position = setInitPos(
		subtopic_position,
		layoutElements.subtopicPos as Position,
	) as Position;
	const initContentPos: Position[] = setInitPos(
		content_positions,
		layoutElements.contentPos as Position[],
	) as Position[];
	const initImgContainerPos: Position[] = setInitPos(
		image_container_positions,
		layoutElements.imgContainerPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className='SlideCanvas'
			ref={containerRef}
			style={{ ...layoutElements.canvaCSS, position: 'relative' }}
		>
			{/* column 1 for text content */}
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='topic_position'
				defaultPos={[layoutElements.topicPos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{topic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initSubTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='subtopic_position'
				defaultPos={[layoutElements.subtopicPos as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{subtopic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={initContentPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='content_position'
				defaultPos={layoutElements.contentPos as Position[]}
				elementIndex={2}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{content}
			</DragElement>

			{/* column 2 for img container */}
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={3}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={0}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
					embed_code={embed_code}
					embed_code_single={embed_code?.[0]}
					media_types={media_types}
					media_type={media_types?.[0]}
				/>
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={5}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCol_2_img_1 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCol_2_img_1}
						alt='Background Image'
						unoptimized={true}
					/>
				)}
			</div>
		</div>
		// two columns layout (left is text and right is one image)
	);
};
export const Col_1_img_1_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	image_positions,
	embed_code,
	media_types,
	topic_position,
	subtopic_position,
	content_positions,
	image_container_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: Position,
			embed_code_single: string,
			media_type: Media,
		) => {
			// Ensure that the arrays are initialized
			const newImgs = Array.isArray(imgs) ? [...imgs] : [];
			const newIsCharts = Array.isArray(ischarts) ? [...ischarts] : [];
			const newImagePosition = Array.isArray(image_positions)
				? [...image_positions]
				: [];
			const newEmbedCode = Array.isArray(embed_code) ? [...embed_code] : [];
			const newMediaTypes = Array.isArray(media_types) ? [...media_types] : [];

			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			if (index >= newEmbedCode.length) newEmbedCode.push(embed_code_single);
			else newEmbedCode[index] = embed_code_single;

			if (index >= newMediaTypes.length) newMediaTypes.push(media_type);
			else newMediaTypes[index] = media_type;

			update_callback(
				newImgs,
				newIsCharts,
				newImagePosition,
				newEmbedCode,
				newMediaTypes,
			);
		};

	const [maxContentHeight, setMaxContentHeight] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const topicAndSubtopicRef = useRef<HTMLDivElement>(null);
	// const subtopicRef = useRef<HTMLDivElement>(null);
	const imgContainerRef = useRef<HTMLDivElement>(null);
	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

	useEffect(() => {
		const calculateMaxHeight = () => {
			const containerElement = containerRef.current;
			const topicAndSubtopicElement = topicAndSubtopicRef.current;
			//const subtopicElement = subtopicRef.current;
			const imgContainerElement = imgContainerRef.current;

			if (containerElement && topicAndSubtopicElement && imgContainerElement) {
				const containerHeight = containerElement.clientHeight;
				const topicAndSubtopicHeight = topicAndSubtopicElement.clientHeight;
				const imgContainerHeight = imgContainerElement.clientHeight;
				const logoHeight = containerHeight * 0.08;

				const availableHeight =
					containerHeight -
					(topicAndSubtopicHeight + imgContainerHeight + logoHeight);

				//console.log(`Available height: ${availableHeight}`);
				setMaxContentHeight(availableHeight > 0 ? availableHeight : 200);
			}
		};

		calculateMaxHeight();
		window.addEventListener('resize', calculateMaxHeight);
		// console.log(`Calculating max height`, maxContentHeight);

		return () => {
			window.removeEventListener('resize', calculateMaxHeight);
		};
	}, []);

	const initTopicPos = setInitPos(
		topic_position,
		layoutElements.topicPos as Position,
	) as Position;
	const initSubTopicPos = setInitPos(
		subtopic_position,
		layoutElements.subtopicPos as Position,
	) as Position;
	const initContentPos = setInitPos(
		content_positions,
		layoutElements.contentPos as Position[],
	) as Position[];
	const initImgContainerPos = setInitPos(
		image_container_positions,
		layoutElements.imgContainerPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			ref={containerRef}
			className='SlideCanvas w-full h-full'
			style={{ ...layoutElements.canvaCSS, position: 'relative' }}
		>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='topic_position'
				defaultPos={[layoutElements.topicPos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{topic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initSubTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='subtopic_position'
				defaultPos={[layoutElements.subtopicPos as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{subtopic}
			</DragElement>
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={2}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={0}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
					embed_code={embed_code}
					embed_code_single={embed_code?.[0]}
					media_types={media_types}
					media_type={media_types?.[0]}
				/>
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={initContentPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='content_position'
				defaultPos={layoutElements.contentPos as Position[]}
				elementIndex={3}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{content}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={4}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCol_1_img_1 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCol_1_img_1}
						alt='Background Image'
						unoptimized={true}
					/>
				)}
			</div>
		</div>
	);
};

export const Col_2_img_2_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	image_positions,
	embed_code,
	media_types,
	topic_position,
	subtopic_position,
	content_positions,
	image_container_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: Position,
			embed_code_single: string,
			media_type: Media,
		) => {
			// Ensure that the arrays are initialized
			const newImgs = Array.isArray(imgs) ? [...imgs] : [];
			const newIsCharts = Array.isArray(ischarts) ? [...ischarts] : [];
			const newImagePosition = Array.isArray(image_positions)
				? [...image_positions]
				: [];
			const newEmbedCode = Array.isArray(embed_code) ? [...embed_code] : [];
			const newMediaTypes = Array.isArray(media_types) ? [...media_types] : [];

			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			if (index >= newEmbedCode.length) newEmbedCode.push(embed_code_single);
			else newEmbedCode[index] = embed_code_single;

			if (index >= newMediaTypes.length) newMediaTypes.push(media_type);
			else newMediaTypes[index] = media_type;

			update_callback(
				newImgs,
				newIsCharts,
				newImagePosition,
				newEmbedCode,
				newMediaTypes,
			);
		};

	const [maxContentHeight, setMaxContentHeight] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const topicAndSubtopicRef = useRef<HTMLDivElement>(null);
	const imgContainerRef = useRef<HTMLDivElement>(null);
	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

	// Ensure content is always an array
	const items = Array.isArray(content) ? content : [content];
	const { slides, slideIndex, updateSlidePage, updateVersion } = useSlides();
	//const filteredContent: JSX.Element[] = filterEmptyLines(content);
	// const [updatedContent, setUpdatedContent] = useState(items);

	const initTopicPos = setInitPos(
		topic_position,
		layoutElements.topicPos as Position,
	) as Position;
	const initSubTopicPos = setInitPos(
		subtopic_position,
		layoutElements.subtopicPos as Position,
	) as Position;
	const initContentPos = setInitPos(
		content_positions,
		layoutElements.contentPos as Position[],
	) as Position[];
	const initImgContainerPos = setInitPos(
		image_container_positions,
		layoutElements.imgContainerPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const contentItemsFor2Col = changingTemplateContent(items, 2);
	const [updatedContentCol1, setUpdatedContentCol1] = useState(
		contentItemsFor2Col[0],
	);
	const [updatedContentCol2, setUpdatedContentCol2] = useState(
		contentItemsFor2Col[1],
	);
	const [showEditorBoxCol1, setShowEditorBoxCol1] = useState(
		updatedContentCol1.length === 0,
	);
	const [showEditorBoxCol2, setShowEditorBoxCol2] = useState(
		updatedContentCol2.length === 0,
	);

	useEffect(() => {
		const calculateMaxHeight = () => {
			const containerElement = containerRef.current;
			const topicAndSubtopicElement = topicAndSubtopicRef.current;
			const imgContainerElement = imgContainerRef.current;
			// const subtopicElement = subtopicRef.current;

			if (containerElement && topicAndSubtopicElement && imgContainerElement) {
				const containerHeight = containerElement.clientHeight;
				const topicAndSubtopicHeight = topicAndSubtopicElement.clientHeight;
				const imgContainerHeight = imgContainerElement.clientHeight;
				const logoHeight = containerHeight * 0.2;

				const availableHeight =
					containerHeight -
					(topicAndSubtopicHeight + imgContainerHeight + logoHeight);

				//console.log(`Available height: ${availableHeight}`);
				setMaxContentHeight(availableHeight > 0 ? availableHeight : 100);
			}
		};

		calculateMaxHeight();
		window.addEventListener('resize', calculateMaxHeight);
		// console.log(`Calculating max height`, maxContentHeight);

		return () => {
			window.removeEventListener('resize', calculateMaxHeight);
		};
	}, []);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={'SlideCanvas'}
			style={{
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='topic_position'
				defaultPos={[layoutElements.topicPos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{topic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initSubTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='subtopic_position'
				defaultPos={[layoutElements.subtopicPos as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{subtopic}
			</DragElement>
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={2}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={0}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
					columnIndex={0}
					embed_code={embed_code}
					embed_code_single={embed_code?.[0]}
					media_types={media_types}
					media_type={media_types?.[0]}
				/>
			</DragElement>
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={1}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={3}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[1]}
					updateSingleCallback={updateImgAtIndex(1)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={1}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
					columnIndex={1}
					embed_code={embed_code}
					embed_code_single={embed_code?.[1]}
					media_types={media_types}
					media_type={media_types?.[1]}
				/>
			</DragElement>
			{updatedContentCol1.map((item, index) => (
				<React.Fragment key={`contentText_${index} `}>
					<ul
						key={`contentText_${index} `}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol2.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={0}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={4}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			{updatedContentCol2.map((item, index) => (
				<React.Fragment key={`contentText_${index + 1} `}>
					<ul
						key={`contentText_${index} `}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol2.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={1}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={5}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={6}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCol_2_img_2 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCol_2_img_2}
						alt='Background Image'
						unoptimized={true}
					/>
				)}
			</div>
		</div>
	);
};
export const Col_3_img_3_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	image_positions,
	embed_code,
	media_types,
	topic_position,
	subtopic_position,
	content_positions,
	image_container_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: Position,
			embed_code_single: string,
			media_type: Media,
		) => {
			// Ensure that the arrays are initialized
			const newImgs = Array.isArray(imgs) ? [...imgs] : [];
			const newIsCharts = Array.isArray(ischarts) ? [...ischarts] : [];
			const newImagePosition = Array.isArray(image_positions)
				? [...image_positions]
				: [];
			const newEmbedCode = Array.isArray(embed_code) ? [...embed_code] : [];
			const newMediaTypes = Array.isArray(media_types) ? [...media_types] : [];

			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			if (index >= newEmbedCode.length) newEmbedCode.push(embed_code_single);
			else newEmbedCode[index] = embed_code_single;

			if (index >= newMediaTypes.length) newMediaTypes.push(media_type);
			else newMediaTypes[index] = media_type;

			update_callback(
				newImgs,
				newIsCharts,
				newImagePosition,
				newEmbedCode,
				newMediaTypes,
			);
		};

	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

	// Ensure content is always an array
	const items = Array.isArray(content) ? content : [content];
	const { slides, slideIndex, updateSlidePage, updateVersion } = useSlides();

	const initTopicPos = setInitPos(
		topic_position,
		layoutElements.topicPos as Position,
	) as Position;
	const initSubTopicPos = setInitPos(
		subtopic_position,
		layoutElements.subtopicPos as Position,
	) as Position;
	const initContentPos = setInitPos(
		content_positions,
		layoutElements.contentPos as Position[],
	) as Position[];
	const initImgContainerPos = setInitPos(
		image_container_positions,
		layoutElements.imgContainerPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const contentItemsFor3Col = changingTemplateContent(items, 3);
	const [updatedContentCol1, setUpdatedContentCol1] = useState(
		contentItemsFor3Col[0],
	);
	const [updatedContentCol2, setUpdatedContentCol2] = useState(
		contentItemsFor3Col[1],
	);
	const [updatedContentCol3, setUpdatedContentCol3] = useState(
		contentItemsFor3Col[2],
	);
	const [showEditorBoxCol1, setShowEditorBoxCol1] = useState(
		updatedContentCol1.length === 0,
	);
	const [showEditorBoxCol2, setShowEditorBoxCol2] = useState(
		updatedContentCol2.length === 0,
	);
	const [showEditorBoxCol3, setShowEditorBoxCol3] = useState(
		updatedContentCol3.length === 0,
	);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='topic_position'
				defaultPos={[layoutElements.topicPos as Position]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{topic}
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initSubTopicPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='subtopic_position'
				defaultPos={[layoutElements.subtopicPos as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{subtopic}
			</DragElement>
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={2}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={0}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
					columnIndex={0}
					embed_code={embed_code}
					embed_code_single={embed_code?.[0]}
					media_types={media_types}
					media_type={media_types?.[0]}
				/>
			</DragElement>
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={1}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={3}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[1]}
					updateSingleCallback={updateImgAtIndex(1)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={1}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
					columnIndex={1}
					embed_code={embed_code}
					embed_code_single={embed_code?.[1]}
					media_types={media_types}
					media_type={media_types?.[1]}
				/>
			</DragElement>
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={2}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={4}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[2]}
					updateSingleCallback={updateImgAtIndex(2)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={2}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
					columnIndex={2}
					embed_code={embed_code}
					embed_code_single={embed_code?.[2]}
					media_types={media_types}
					media_type={media_types?.[2]}
				/>
			</DragElement>
			{updatedContentCol1.map((item, index) => (
				<React.Fragment key={`contentText_${index} `}>
					<ul
						key={`contentText_${index} `}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol1.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={0}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={5}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			{updatedContentCol2.map((item, index) => (
				<React.Fragment key={`contentText_${index + 1}}`}>
					<ul
						key={`contentText_${index}}`}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol2.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={1}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={6}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			{updatedContentCol3.map((item, index) => (
				<React.Fragment key={`contentText_${index + 2} `}>
					<ul
						key={`contentText_${index} `}
						className={`SlideContentText`}
						style={{
							...layoutElements.contentTextCSS,
							flex: index === updatedContentCol3.length - 1 ? 1 : 0,
						}}
					>
						<li style={{ width: '100%' }}>
							<DragElement
								type={ElementType.TextEdit}
								canEdit={canEdit}
								scale={scale}
								positions={initContentPos}
								contentIndex={2}
								handleSlideEdit={handleSlideEdit}
								currentSlideIndex={currentSlideIndex}
								positionType='content_position'
								defaultPos={layoutElements.contentPos as Position[]}
								elementIndex={7}
								onHover={setHoveredIndex}
								hoveredIndex={hoveredIndex ?? -1}
							>
								{item}
							</DragElement>
						</li>
					</ul>
				</React.Fragment>
			))}
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={8}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
			<div
				style={{ ...layoutElements.visualElementsCSS, position: 'absolute' }}
			>
				{themeElements.backgroundUrlCol_3_img_3 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCol_3_img_3}
						alt='Background Image'
						unoptimized={true}
					/>
				)}
			</div>
		</div>
	);
};

export const Full_img_only_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	scale,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	image_positions,
	embed_code,
	media_types,
	image_container_positions,
	logo_position,
	logo_numeric_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: Position,
			embed_code_single: string,
			media_type: Media,
		) => {
			// Ensure that the arrays are initialized
			const newImgs = Array.isArray(imgs) ? [...imgs] : [];
			const newIsCharts = Array.isArray(ischarts) ? [...ischarts] : [];
			const newImagePosition = Array.isArray(image_positions)
				? [...image_positions]
				: [];
			const newEmbedCode = Array.isArray(embed_code) ? [...embed_code] : [];
			const newMediaTypes = Array.isArray(media_types) ? [...media_types] : [];

			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			if (index >= newImagePosition.length)
				newImagePosition.push(image_position);
			else newImagePosition[index] = image_position;

			if (index >= newEmbedCode.length) newEmbedCode.push(embed_code_single);
			else newEmbedCode[index] = embed_code_single;

			if (index >= newMediaTypes.length) newMediaTypes.push(media_type);
			else newMediaTypes[index] = media_type;

			update_callback(
				newImgs,
				newIsCharts,
				newImagePosition,
				newEmbedCode,
				newMediaTypes,
			);
		};

	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

	// useEffect(() => {
	// 	console.log('current layout is full img only');
	// });

	const initImgContainerPos = setInitPos(
		image_container_positions,
		layoutElements.imgContainerPos as Position[],
	) as Position[];
	const initLogoPos = setInitLogoPos(logo_position, logo_numeric_position);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div style={layoutElements.canvaCSS}>
			<DragElement
				type={ElementType.ImageView}
				canEdit={canEdit}
				scale={scale}
				positions={initImgContainerPos}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='image_container_position'
				defaultPos={layoutElements.imgContainerPos as Position[]}
				elementIndex={0}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				<ImgModule
					imgsrc={imgs?.[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={0}
					canEdit={canEdit}
					image_positions={image_positions}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
					columnIndex={0}
					embed_code={embed_code}
					embed_code_single={embed_code?.[0]}
					media_types={media_types}
					media_type={media_types?.[0]}
				/>
			</DragElement>
			<DragElement
				type={ElementType.TextEdit}
				canEdit={canEdit}
				scale={scale}
				positions={[initLogoPos]}
				contentIndex={0}
				handleSlideEdit={handleSlideEdit}
				currentSlideIndex={currentSlideIndex}
				positionType='logo_numeric_position'
				defaultPos={[defaultLogoPos[logo_position] as Position]}
				elementIndex={1}
				onHover={setHoveredIndex}
				hoveredIndex={hoveredIndex ?? -1}
			>
				{templateLogo}
			</DragElement>
		</div>
	);
};

export const layoutOptions = {
	Cover_img_0_layout: Cover_img_0_layout,
	Cover_img_1_layout: Cover_img_1_layout,
	Col_1_img_0_layout: Col_1_img_0_layout,
	Col_2_img_0_layout: Col_2_img_0_layout,
	Col_3_img_0_layout: Col_3_img_0_layout,
	Col_1_img_1_layout: Col_1_img_1_layout,
	Col_2_img_1_layout: Col_2_img_1_layout,
	Col_2_img_2_layout: Col_2_img_2_layout,
	Col_3_img_3_layout: Col_3_img_3_layout,
	Full_img_only_layout: Full_img_only_layout,
};

export const availableLayouts = {
	cover: [
		{
			name: 'Cover_img_0_layout' as LayoutKeys,
			img: coverimg0_png.src,
		},
		{
			name: 'Cover_img_1_layout' as LayoutKeys,
			img: coverimg1_png.src,
		},
		{
			name: 'Full_img_only_layout' as LayoutKeys,
			img: Full_img_only_png.src,
		},
	],
	main: [
		{
			name: 'Col_1_img_0_layout' as LayoutKeys,
			img: col1img0_png.src,
		},
		{
			name: 'Col_2_img_0_layout' as LayoutKeys,
			img: col2img0_png.src,
		},
		{
			name: 'Col_3_img_0_layout' as LayoutKeys,
			img: col3img0_png.src,
		},
		{
			name: 'Col_2_img_1_layout' as LayoutKeys,
			img: col2img1_png.src,
		},
		{
			name: 'Col_1_img_1_layout' as LayoutKeys,
			img: col1img1_png.src,
		},
		{
			name: 'Col_2_img_2_layout' as LayoutKeys,
			img: col2img2_png.src,
		},
		{
			name: 'Col_3_img_3_layout' as LayoutKeys,
			img: col3img3_png.src,
		},
		{
			name: 'Full_img_only_layout' as LayoutKeys,
			img: Full_img_only_png.src,
		},
	],
};
