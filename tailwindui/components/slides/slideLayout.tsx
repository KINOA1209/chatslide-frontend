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
import ImagePosition from '@/models/ImagePosition';
import { useSlides } from '@/hooks/use-slides';
import ResizeSlider from './drag_resize/resize_slider';
import '@/components/slides/drag_resize/dragAndResizeCSS.css';
import Draggable from 'react-draggable';
import dynamic from 'next/dynamic';
import Slide, { Media, SlideKeys } from '@/models/Slide';
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

enum ElementType {
	TextEdit,
	ImageView,
}

interface DragElementProps {
	content: JSX.Element;
	type: ElementType;
	scale: number;
}

export const DragElement = ({ content, type, scale }: DragElementProps) => {
	const isDragDisable = useRef(true);
	const [isOverHandler, setIsOverHandler] = useState<boolean>(false);

	const handleDragStart = (e: any) => {
		if (isDragDisable.current) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const isVisible = useMemo(
		() => isOverHandler || !isDragDisable.current,
		[isOverHandler, isDragDisable],
	);

	const handlerCSS: React.CSSProperties = useMemo(
		() => ({
			background: 'rgba(0, 0, 0, 0.25)',
			width: '20px',
			height: '30px',
			position: 'absolute',
			left: '-20px',
			zIndex: '120',
			borderTopLeftRadius: '5px',
			borderBottomLeftRadius: '5px',
			visibility: `${isVisible ? 'visible' : 'hidden'}`,
		}),
		[isVisible],
	);

	const elementCSS: React.CSSProperties = useMemo(
		() => ({
			borderStyle: 'solid',
			borderColor: 'rgba(0, 0, 0, 0.25)',
			borderRadius: '5px',
			borderWidth: `${isVisible ? '2px' : '0px'}`,
		}),
		[isVisible],
	);

	const dropHandler = () => {
		isDragDisable.current = true;
	};

	useEffect(() => {
		document.addEventListener('mouseup', dropHandler);
	}, []);

	return (
		<Draggable onStart={handleDragStart}>
			<div
				className={`DraggableElement ${type === ElementType.ImageView ? 'w-full h-full' : ''}`}
				onMouseEnter={() => {
					setIsOverHandler(true);
				}}
				onMouseLeave={() => {
					setIsOverHandler(false);
				}}
			>
				<div
					className={'ElementHandler'}
					style={handlerCSS}
					onMouseDown={(e) => {
						isDragDisable.current = false;
					}}
					onMouseUp={(e) => {
						isDragDisable.current = true;
					}}
				>
					<div>
						<svg
							className='svg-small'
							fill='var(--theme-caption-color)'
							viewBox='0 0 12 16'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M9 5.99988C9 6.55216 9.44772 6.99988 10 6.99988C10.5523 6.99988 11 6.55216 11 5.99988C11 5.44759 10.5523 4.99988 10 4.99988C9.44772 4.99988 9 5.44759 9 5.99988Z'></path>
							<path d='M9 9.99988C9 10.5522 9.44772 10.9999 10 10.9999C10.5523 10.9999 11 10.5522 11 9.99988C11 9.44759 10.5523 8.99988 10 8.99988C9.44772 8.99988 9 9.44759 9 9.99988Z'></path>
							<path d='M10 14.9999C9.44772 14.9999 9 14.5522 9 13.9999C9 13.4476 9.44772 12.9999 10 12.9999C10.5523 12.9999 11 13.4476 11 13.9999C11 14.5522 10.5523 14.9999 10 14.9999Z'></path>
							<path d='M9 2C9 2.55228 9.44772 3 10 3C10.5523 3 11 2.55228 11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2Z'></path>
							<path d='M5 5.99988C5 6.55216 5.44772 6.99988 6 6.99988C6.55229 6.99988 7 6.55216 7 5.99988C7 5.44759 6.55229 4.99988 6 4.99988C5.44772 4.99988 5 5.44759 5 5.99988Z'></path>
							<path d='M5 9.99988C5 10.5522 5.44772 10.9999 6 10.9999C6.55228 10.9999 7 10.5522 7 9.99988C7 9.44759 6.55229 8.99988 6 8.99988C5.44772 8.99988 5 9.44759 5 9.99988Z'></path>
							<path d='M6 14.9999C5.44772 14.9999 5 14.5522 5 13.9999C5 13.4476 5.44772 12.9999 6 12.9999C6.55228 12.9999 7 13.4476 7 13.9999C7 14.5522 6.55228 14.9999 6 14.9999Z'></path>
							<path d='M5 2C5 2.55228 5.44772 3 6 3C6.55229 3 7 2.55228 7 2C7 1.44772 6.55229 1 6 1C5.44772 1 5 1.44772 5 2Z'></path>
						</svg>
					</div>
				</div>
				<div className={`ElementContent w-full h-full`} style={elementCSS}>
					{content}
				</div>
			</div>
		</Draggable>
	);
};

export const Cover_img_0_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	brandingColor,
	themeElements,
	layoutElements,
	templateLogo,
}: MainSlideProps) => {
	// useEffect(() => {
	// 	console.log('LayoutElements canvaCSS:', layoutElements.canvaCSS);
	// }, []);

	return (
		<div
			className={`SlideCanvas`}
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<div
				className={`SlideUserNameAndHeadColumn`}
				style={{
					...layoutElements.columnCSS,
					backgroundColor: themeElements.userNamaAndHeadColumnBackgroundColor
						? themeElements.userNamaAndHeadColumnBackgroundColor
						: '',
				}}
			>
				<div
					// className={`${themeElements.userNameFont} ${themeElements.userNameFontColor}`}
					className={`SlideUserName`}
					style={{ ...layoutElements.userNameCSS, zIndex: 60 }}
				>
					{user_name}
				</div>
				<div
					className={`SlideUserNameTextDivider pl-[2rem] basis-0 opacity-50 border
		        border-black border-opacity-40 mt-4`}
					style={layoutElements.userNameTextDividerCSS}
				></div>
				<div
					className={`SlideHead`}
					style={{ ...layoutElements.titleCSS, zIndex: 50 }}
				>
					{title}
				</div>
			</div>
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
			<div
				className={`SlideLogo`}
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
		</div>
	);
};

export const Cover_img_1_layout = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	scale,
	imgs,
	update_callback,
	canEdit,
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
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: ImagePosition,
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

	return (
		<div
			className={`SlideCanvas`}
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<div
				className={`SlideUserNameAndHeadColumn`}
				style={{
					...layoutElements.columnCSS,
					backgroundColor: themeElements.userNamaAndHeadColumnBackgroundColor
						? themeElements.userNamaAndHeadColumnBackgroundColor
						: '',
				}}
			>
				<div
					className={`SlideUserName`}
					style={{ ...layoutElements.userNameCSS, zIndex: 60 }}
				>
					{user_name}
				</div>
				<div
					className={`SlideUserNameHead`}
					style={{ ...layoutElements.titleCSS, zIndex: 50 }}
				>
					<DragElement
						content={title}
						type={ElementType.TextEdit}
						scale={scale}
					/>
				</div>
			</div>

			<div
				className={`SlideImageContainer`}
				style={{
					...layoutElements.imageContainerCSS,
					zIndex: imgHigherZIndex ? 100 : 20,
				}}
			>
				<DragElement
					content={
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
					}
					type={ElementType.ImageView}
					scale={scale}
				/>
			</div>

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
			<div
				className={`SlideLogo`}
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
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
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	brandingColor,
	themeElements,
	layoutElements,
	templateLogo,
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
			<div
				style={{
					display: 'flex',
					flexDirection: 'column', // Equivalent to flex-col
					...layoutElements.titleAndContentColumnCSS,
					backgroundColor: themeElements.slideColumnBackgroundColor
						? themeElements.slideColumnBackgroundColor
						: '',
				}}
			>
				{' '}
				<div
					className={`SlideTitleAndSubtopicBox`}
					style={{
						...layoutElements.titleAndSubtopicBoxCSS,
						zIndex: 50,
						backgroundColor: themeElements.titleAndSubtopicBoxBackgroundColor
							? themeElements.titleAndSubtopicBoxBackgroundColor
							: '',
					}}
				>
					<div
						ref={topicRef}
						className={`topicBox`}
						style={layoutElements.topicCSS}
					>
						{topic}
					</div>
					<div
						className={`subtopicBox`}
						ref={subtopicRef}
						style={layoutElements.subtopicCSS}
					>
						{subtopic}
					</div>
				</div>
				<div
					className='SlideTitlesAndCOntentDivider opacity-50 border border-neutral-900 border-opacity-40'
					style={layoutElements.titlesAndContentDividerCSS}
				></div>
				<div
					className='SlideColumn'
					style={{ ...layoutElements.columnCSS, zIndex: 40 }}
				>
					<div
						className='SlideContent'
						style={{
							...layoutElements.contentCSS, // Spread the existing styles first
							maxHeight:
								maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
						}}
					>
						{content}
					</div>
				</div>
			</div>

			<div
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
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
				{/* {themeElements.backgroundUrlDividerCol_1_img_0 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlDividerCol_1_img_0}
						alt='Background Image'
						unoptimized={true}
					/>
				)} */}
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
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	handleSlideEdit,
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

	// useEffect(() => {
	// 	console.log('contentItemsFor2Col', contentItemsFor2Col);
	// }, [updatedContent]);

	// const [showAddButton, setShowAddButton] = useState(
	// 	// slides[slideIndex].content.length <= 1,
	// 	updatedContent.length <= 1,
	// );

	// const [showEditorBoxCol3, setShowEditorBoxCol3] = useState(
	// 	updatedContent.length === 2,
	// );

	return (
		<div
			className={`SlideLayoutCanvas`}
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<div
				className='SlideTitleSubtitleContentColumn'
				style={{
					display: 'flex',
					flexDirection: 'column', // Equivalent to flex-col
					...layoutElements.titleAndContentColumnCSS,
					backgroundColor: themeElements.slideColumnBackgroundColor
						? themeElements.slideColumnBackgroundColor
						: '',
				}}
			>
				<div
					className={`SlideTopicAndSubtopicBox`}
					style={{
						...layoutElements.titleAndSubtopicBoxCSS,
						zIndex: 50,
						backgroundColor: themeElements.titleAndSubtopicBoxBackgroundColor
							? themeElements.titleAndSubtopicBoxBackgroundColor
							: '',
					}}
				>
					<div className={`SlideTopic`} style={layoutElements.topicCSS}>
						{topic}
					</div>
					<div className={`SlideSubtopic`} style={layoutElements.subtopicCSS}>
						{subtopic}
					</div>
				</div>

				<div
					className={`w-full flex SlideContentContainer`}
					style={{
						...layoutElements.contentContainerCSS,
						zIndex: 40,
						gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
						// backgroundColor: themeElements.slideContentContainerBackgroundColor
						// 	? themeElements.slideContentContainerBackgroundColor
						// 	: '',
					}}
				>
					<div className='Column1' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={layoutElements.contentIndexCSS}
						>
							{1}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>

						{showEditorBoxCol1 && (
							<>
								{setUpdatedContentCol1((prevContent: JSX.Element[]) => [
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 0,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol1(false)}
							</>
						)}
						{/* {updatedContent.length === 0 && showAddButton && (
				<div
					className={`btn btn-primary ${addButtonStyle} ${addButtonHoverStyle}`}
					// onClick={handleAddTextColumn}
					onClick={() =>
						handleAddTextColumn({
							handleSlideEdit: handleSlideEdit,
							isVerticalContent: false,
							themeElements: themeElements,
							fontSize: '16pt',
							contentIndex: 0,
							slideIndex: slideIndex,
							slides: slides,
							setUpdatedContent: setUpdatedContent,
							setShowAddButton: setShowAddButton,
							shouldShowAddButton: updatedContent.length <= 1,
						})
					}
				>
					<RiAddLine className={addIconStyle} />
					Add One Column of text
				</div>
			)} */}
						{/* {updatedContent.slice(0, 1).map((item, index) => ( */}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>

					<div className='Column2' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={layoutElements.contentIndexCSS}
						>
							{2}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						{/* {updatedContent.length === 1 && showAddButton && (
				<div
					className={`btn btn-primary ${addButtonStyle} ${addButtonHoverStyle}`}
					// onClick={handleAddColumn}
					onClick={() =>
						handleAddTextColumn({
							handleSlideEdit: handleSlideEdit,
							isVerticalContent: false,
							themeElements: themeElements,
							fontSize: '16pt',
							contentIndex: 1,
							slideIndex: slideIndex,
							slides: slides,
							setUpdatedContent: setUpdatedContent,
							setShowAddButton: setShowAddButton,
							shouldShowAddButton: updatedContent.length <= 1,
						})
					}
				>
					<div
						className={`SlideContentIndexTextDivider`}
						style={layoutElements.contentIndexTextDividerCSS}
					></div>
					<RiAddLine className={addIconStyle} />
					Add One Column of text
				</div>
			)} */}
						{showEditorBoxCol2 && (
							<>
								{setUpdatedContentCol2((prevContent: JSX.Element[]) => [
									// ...prevContent.slice(0, 1),
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 1,
										slideIndex: slideIndex,
										slides: slides,
									}),
									// ...prevContent.slice(2),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol2(false)}
							</>
						)}
						{/* {updatedContent.slice(1, 2).map((item, index) => ( */}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>

			<div
				className={`SlideLogo`}
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
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
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	handleSlideEdit,
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
	// const [showEditorBox, setShowEditorBox] = useState(
	// 	// slides[slideIndex].content.length <= 2, for three columns
	// 	updatedContent.length < 3,
	// );
	// Determine if the editor box should be shown
	// const shouldShowEditorBox = updatedContent.length < 3; // Assuming there are three columns

	// Update the showEditorBox state
	// useEffect(() => {
	// 	setShowEditorBox(shouldShowEditorBox);
	// }, [shouldShowEditorBox]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<div
				className='SlideTitleSubtitleContentColumn'
				style={{
					display: 'flex',
					flexDirection: 'column', // Equivalent to flex-col
					...layoutElements.titleAndContentColumnCSS,
					backgroundColor: themeElements.slideColumnBackgroundColor
						? themeElements.slideColumnBackgroundColor
						: '',
				}}
			>
				<div
					style={{
						...layoutElements.titleAndSubtopicBoxCSS,
						zIndex: 50,
						backgroundColor: themeElements.titleAndSubtopicBoxBackgroundColor
							? themeElements.titleAndSubtopicBoxBackgroundColor
							: '',
					}}
				>
					<div style={layoutElements.topicCSS}>{topic}</div>
					<div style={layoutElements.subtopicCSS}>{subtopic}</div>
				</div>

				<div
					className={`w-full flex SlideContentContainer`}
					style={{
						...layoutElements.contentContainerCSS,
						zIndex: 40,
						gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
						// backgroundColor: themeElements.slideContentContainerBackgroundColor
						// 	? themeElements.slideContentContainerBackgroundColor
						// 	: '',
					}}
				>
					{/* {Array.isArray(content) &&
				content.map((item, index) => (
					<div
						// className='flex flex-col gap-[0.5rem]'
						key={index}
						style={{
							...layoutElements.contentCSS,
							display: item === null || index > 2 ? 'none' : 'flex', // or 'flex' based on your layout
						}}
					>
						<div style={layoutElements.contentIndexCSS}>{index + 1}</div>
						<div
							// className='opacity-50 border border-neutral-900 border-opacity-40'
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						<ul
							key={index}
							// className={`flex flex-row w-full h-full grow `}
							style={layoutElements.contentTextCSS}
						>
							<li className='contentBulletPoint' style={{ width: '100%' }}>
								{item}
							</li>
						</ul>
					</div>
				))} */}
					<div className='Column1' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={layoutElements.contentIndexCSS}
						>
							{1}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>

						{showEditorBoxCol1 && (
							<>
								{setUpdatedContentCol1((prevContent: JSX.Element[]) => [
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 0,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol1(false)}
							</>
						)}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>

					<div className='Column2' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={layoutElements.contentIndexCSS}
						>
							{2}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						{/* {updatedContent.length === 1 && showAddButton && (
					<div
						className={`btn btn-primary ${addButtonStyle} ${addButtonHoverStyle}`}
						// onClick={handleAddColumn}
						onClick={() =>
							handleAddTextColumn({
								handleSlideEdit: handleSlideEdit,
								isVerticalContent: false,
								themeElements: themeElements,
								fontSize: '16pt',
								contentIndex: 1,
								slideIndex: slideIndex,
								slides: slides,
								setUpdatedContent: setUpdatedContent,
								setShowAddButton: setShowAddButton,
								shouldShowAddButton: updatedContent.length <= 2,
							})
						}
					>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						<RiAddLine className={addIconStyle} />
						Add One Column of text
					</div>
				)} */}
						{/* {updatedContent.length === 1 && (
					// Update the state and show/hide button
					<>
						{setUpdatedContent((prevContent: JSX.Element[]) => [
							...prevContent,
							<div
								key={`content_${Date.now()}`}
								className={`${slideIndex === 0 ? 'hidden' : ''}`}
							>
								<QuillEditable
									content={''}
									handleBlur={(newContent: string | string[]) =>
										handleSlideEdit(
											newContent,
											slideIndex,
											'content',
											1,
											true,
										)
									}
									style={{
										...themeElements.contentFontCSS_non_vertical_content,
										fontSize: '16pt',
									}}
									isVerticalContent={false}
									templateKey={slides[slideIndex].template}
								/>
							</div>,
						])}
					</>
				)} */}
						{showEditorBoxCol2 && (
							<>
								{setUpdatedContentCol2((prevContent: JSX.Element[]) => [
									// ...prevContent.slice(0, 1),
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 1,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol2(false)}
							</>
						)}

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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>

					<div className='Column3' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={layoutElements.contentIndexCSS}
						>
							{3}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						{/* {updatedContent.length === 2 && showAddButton && (
					<div
						className={`btn btn-primary ${addButtonStyle} ${addButtonHoverStyle}`}
						// onClick={handleAddColumn}
						onClick={() =>
							handleAddTextColumn({
								handleSlideEdit: handleSlideEdit,
								isVerticalContent: false,
								themeElements: themeElements,
								fontSize: '16pt',
								contentIndex: 2,
								slideIndex: slideIndex,
								slides: slides,
								setUpdatedContent: setUpdatedContent,
								setShowAddButton: setShowAddButton,
								shouldShowAddButton: updatedContent.length <= 2,
							})
						}
					>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						<RiAddLine className={addIconStyle} />
						Add One Column of text
					</div>
				)} */}
						{/* Editor Box for Column 3 */}
						{showEditorBoxCol3 && (
							<>
								{setUpdatedContentCol3((prevContent: JSX.Element[]) => [
									// ...prevContent.slice(0, 2),
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 2,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol3(false)}
							</>
						)}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>

			<div
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
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
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: ImagePosition,
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

	return (
		<div
			className='SlideCanvas'
			ref={containerRef}
			style={{ ...layoutElements.canvaCSS, position: 'relative' }}
		>
			{/* column 1 for text content */}
			<div
				className={`SlideTopicSubtopicContentContainer`}
				style={{
					...layoutElements.columnCSS,
					// backgroundColor: themeElements.slideColumnBackgroundColor
					// 	? themeElements.slideColumnBackgroundColor
					// 	: '',
				}}
			>
				<div
					className='SlideTopicSubtopicContainer'
					// topic subtopic box zindex 40 prevent covering content text
					style={{
						...layoutElements.titleAndSubtopicBoxCSS,
						zIndex: 50,
						backgroundColor: themeElements.titleAndSubtopicBoxBackgroundColor
							? themeElements.titleAndSubtopicBoxBackgroundColor
							: '',
						width: '100%',
					}}
				>
					<div
						className={`SlideTopic`}
						ref={topicRef}
						style={layoutElements.topicCSS}
					>
						{topic}
					</div>
					<div
						className={`SlideSubTopic`}
						ref={subtopicRef}
						style={layoutElements.subtopicCSS}
					>
						{subtopic}
					</div>
				</div>

				{/* contents */}
				<div
					className='w-full flex SlideContentContainer'
					style={{
						...layoutElements.contentContainerCSS,
						zIndex: 40,
						backgroundColor: themeElements.slideContentContainerBackgroundColor
							? themeElements.slideContentContainerBackgroundColor
							: '',
					}}
				>
					<div
						className={`w-full`}
						style={{
							maxHeight:
								maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
						}}
					>
						<div style={layoutElements.contentCSS}>{content}</div>
					</div>
				</div>
			</div>
			{/* column 2 for img container */}
			<div
				className={`SlideImageContainer`}
				style={{
					...layoutElements.imageContainerCSS,
					zIndex: imgHigherZIndex ? 100 : 20,
				}}
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
			</div>
			{/* logo section */}
			<div
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
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
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: ImagePosition,
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

	return (
		<div
			ref={containerRef}
			className='SlideCanvas w-full h-full'
			style={{ ...layoutElements.canvaCSS, position: 'relative' }}
		>
			{/* area for topic, subtopic and contents */}
			<div
				className='SlideColumn'
				style={{
					...layoutElements.columnCSS,
					// backgroundColor: themeElements.slideColumnBackgroundColor
					// 	? themeElements.slideColumnBackgroundColor
					// 	: '',
				}}
			>
				{/* row1 for topic and subtopic */}

				<div
					className='SlideTopicAndSubtopic'
					style={{
						...layoutElements.titleAndSubtopicBoxCSS,
						zIndex: '50',
						backgroundColor: themeElements.titleAndSubtopicBoxBackgroundColor
							? themeElements.titleAndSubtopicBoxBackgroundColor
							: '',
					}}
					ref={topicAndSubtopicRef}
				>
					<div className={`SlideTopic`} style={layoutElements.topicCSS}>
						{topic}
					</div>
					<div className={`SlideSubtopic`} style={layoutElements.subtopicCSS}>
						{subtopic}
					</div>
				</div>

				{/* row2 for image */}
				{/* image section */}
				<div
					className='SlideImgaeContainer'
					style={{
						...layoutElements.imageContainerCSS,
						zIndex: imgHigherZIndex ? 100 : 20,
					}}
					ref={imgContainerRef}
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
				</div>
				{/* row3 for contents */}
				{/* <div
					style={{
						zIndex: 30,
					}}
				> */}
				<div
					// className='py-[0.5rem] h-full w-full flex flex-col gap-[0.5rem]'
					className={`SlideContentContainer`}
					style={{
						...layoutElements.contentContainerCSS,
						maxHeight:
							maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
						zIndex: 40,
						backgroundColor: themeElements.slideContentContainerBackgroundColor
							? themeElements.slideContentContainerBackgroundColor
							: '',
					}}
				>
					{/* {Array.isArray(content) &&
							content.map((item, index) => (
								<div key={index} style={layoutElements.contentCSS}>
									<ul
										key={index}
										// className={`flex flex-row w-full h-full grow pl-4 `}
										style={layoutElements.contentTextCSS}
									>
										<li>{item}</li>
									</ul>
								</div>
							))} */}
					<div style={layoutElements.contentCSS}>{content}</div>
				</div>
				{/* <div
					className='w-full flex'
					style={{
						maxHeight:
							maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
					}}
				>
					<div className={`w-full`}>{content}</div>
				</div> */}
				{/* </div> */}
			</div>

			<div
				className={`SlideLogo`}
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
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
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: ImagePosition,
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

	// const [showEditorBoxCol1, setShowEditorBoxCol1] = useState(
	// 	updatedContent.length === 0,
	// );
	// const [showEditorBoxCol2, setShowEditorBoxCol2] = useState(
	// 	updatedContent.length === 1,
	// );
	// const [showEditorBoxCol3, setShowEditorBoxCol3] = useState(
	// 	updatedContent.length === 2,
	// );

	// useEffect(() => {
	// 	console.log('updatedContent on page', slideIndex, updatedContent);
	// }, [updatedContent]);

	// const [showAddButton, setShowAddButton] = useState(
	// 	// slides[slideIndex].content.length <= 2, for three columns
	// 	updatedContent.length <= 1,
	// );

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

	//const filteredContent: JSX.Element[] = filterEmptyLines(content);

	return (
		<div
			className={'SlideCanvas'}
			style={{
				width: '100%',
				height: '100%',
				// display: 'flex',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<div
				className='SlideColumn'
				style={layoutElements.columnCSS}
				ref={containerRef}
			>
				<div
					className='slideTopicAndSubtopic'
					style={{
						...layoutElements.titleAndSubtopicBoxCSS,
						zIndex: 50,
						backgroundColor: themeElements.titleAndSubtopicBoxBackgroundColor
							? themeElements.titleAndSubtopicBoxBackgroundColor
							: '',
					}}
					ref={topicAndSubtopicRef}
				>
					<div className={`SlideTopic`} style={layoutElements.topicCSS}>
						{topic}
					</div>
					<div className={`SlideSubtopic`} style={layoutElements.subtopicCSS}>
						{subtopic}
					</div>
				</div>

				{/* two columns of images */}
				<div
					className='SlideImageContainer'
					style={{
						...layoutElements.imageContainerCSS,
						zIndex: imgHigherZIndex ? 100 : 20,
					}}
					ref={imgContainerRef}
				>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden relative'
						style={layoutElements.imageCSS}
					>
						{/* Gradient Background */}
						{/* <div
							className='absolute inset-0 z-50'
							style={{
								background:
									'linear-gradient(107deg, rgba(27, 108, 201, 0.70) 0%, rgba(176, 32, 199, 0.70) 103.12%)',
								pointerEvents: 'none', // Allow click events to pass through
							}}
						></div> */}
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
					</div>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden  relative'
						style={layoutElements.imageCSS}
					>
						{/* Gradient Background */}
						{/* <div
							className='absolute inset-0 z-50'
							style={{
								background:
									'linear-gradient(107deg, rgba(27, 108, 201, 0.70) 0%, rgba(176, 32, 199, 0.70) 103.12%)',
								pointerEvents: 'none', // Allow click events to pass through
							}}
						></div> */}
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
					</div>
				</div>
				{/* two columns of text */}

				<div
					className={`w-full flex SlideContentContainer`}
					style={{
						...layoutElements.contentContainerCSS,
						zIndex: 40,
						gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
						backgroundColor: themeElements.slideContentContainerBackgroundColor
							? themeElements.slideContentContainerBackgroundColor
							: '',
					}}
				>
					<div className='Column1' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={
								layoutElements.contentIndexCSS !== undefined
									? { ...layoutElements.contentIndexCSS }
									: { display: 'none' }
							}
						>
							{1}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>

						{showEditorBoxCol1 && (
							<>
								{setUpdatedContentCol1((prevContent: JSX.Element[]) => [
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 0,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol1(false)}
							</>
						)}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>

					<div className='Column2' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={
								layoutElements.contentIndexCSS !== undefined
									? { ...layoutElements.contentIndexCSS }
									: { display: 'none' }
							}
						>
							{2}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						{showEditorBoxCol2 && (
							<>
								{setUpdatedContentCol2((prevContent: JSX.Element[]) => [
									// ...prevContent.slice(0, 1),
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 1,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol2(false)}
							</>
						)}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
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
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: ImagePosition,
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
	//const filteredContent: JSX.Element[] = filterEmptyLines(content);
	// const [updatedContent, setUpdatedContent] = useState(items);

	// const [showEditorBoxCol1, setShowEditorBoxCol1] = useState(
	// 	updatedContent.length === 0,
	// );
	// const [showEditorBoxCol2, setShowEditorBoxCol2] = useState(
	// 	updatedContent.length === 1,
	// );
	// const [showEditorBoxCol3, setShowEditorBoxCol3] = useState(
	// 	updatedContent.length === 2,
	// );
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
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				...layoutElements.canvaCSS,
				position: 'relative',
			}}
		>
			<div
				// className='flex flex-col gap-[0.5rem]'
				style={layoutElements.columnCSS}
			>
				<div
					// className='flex flex-col justify-center items-center'
					style={{
						...layoutElements.titleAndSubtopicBoxCSS,
						zIndex: 50,
						backgroundColor: themeElements.titleAndSubtopicBoxBackgroundColor
							? themeElements.titleAndSubtopicBoxBackgroundColor
							: '',
					}}
				>
					<div className={``} style={layoutElements.topicCSS}>
						{topic}
					</div>
					<div className={``} style={layoutElements.subtopicCSS}>
						{subtopic}
					</div>
				</div>
				{/* three columns of images */}
				<div
					// className='w-full grid grid-cols-3 gap-[2rem] '
					style={{
						...layoutElements.imageContainerCSS,
						zIndex: imgHigherZIndex ? 100 : 20,
					}}
				>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
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
					</div>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
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
					</div>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
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
					</div>
				</div>
				{/* three columns of text */}
				{/* <div
					// className='w-full grid grid-cols-3 gap-[2rem]'
					style={{ ...layoutElements.contentCSS, zIndex: 40 }}
				>
					{Array.isArray(content) &&
						content.map((item, index) => (
							<div
								// className='flex flex-col gap-[0.5rem]'
								key={index}
								style={{
									display: item === null || index > 2 ? 'none' : 'block', // or 'flex' based on your layout
								}}
							>
								<div
									style={
										layoutElements.contentIndexCSS !== undefined
											? { ...layoutElements.contentIndexCSS }
											: { display: 'none' }
									}
								>
									{index + 1}
								</div>
								<div
									// className='opacity-50 border border-neutral-900 border-opacity-40'
									style={layoutElements.contentIndexTextDividerCSS}
								></div>
								<ul key={index} className={`flex flex-row w-full h-full grow`}>
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</div>
						))}
				</div> */}
				<div
					className={`w-full flex SlideContentContainer`}
					style={{
						...layoutElements.contentContainerCSS,
						zIndex: 40,
						gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
						backgroundColor: themeElements.slideContentContainerBackgroundColor
							? themeElements.slideContentContainerBackgroundColor
							: '',
					}}
				>
					{/* {Array.isArray(content) &&
					content.map((item, index) => (
						<div
							// className='flex flex-col gap-[0.5rem]'
							key={index}
							style={{
								...layoutElements.contentCSS,
								display: item === null || index > 2 ? 'none' : 'flex', // or 'flex' based on your layout
							}}
						>
							<div style={layoutElements.contentIndexCSS}>{index + 1}</div>
							<div
								// className='opacity-50 border border-neutral-900 border-opacity-40'
								style={layoutElements.contentIndexTextDividerCSS}
							></div>
							<ul
								key={index}
								// className={`flex flex-row w-full h-full grow `}
								style={layoutElements.contentTextCSS}
							>
								<li className='contentBulletPoint' style={{ width: '100%' }}>
									{item}
								</li>
							</ul>
						</div>
					))} */}
					<div className='Column1' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={
								layoutElements.contentIndexCSS !== undefined
									? { ...layoutElements.contentIndexCSS }
									: { display: 'none' }
							}
						>
							{1}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>

						{showEditorBoxCol1 && (
							<>
								{setUpdatedContentCol1((prevContent: JSX.Element[]) => [
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 0,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol1(false)}
							</>
						)}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>

					<div className='Column2' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={
								layoutElements.contentIndexCSS !== undefined
									? { ...layoutElements.contentIndexCSS }
									: { display: 'none' }
							}
						>
							{2}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						{showEditorBoxCol2 && (
							<>
								{setUpdatedContentCol2((prevContent: JSX.Element[]) => [
									// ...prevContent.slice(0, 1),
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 1,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol2(false)}
							</>
						)}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>

					<div className='Column3' style={layoutElements.contentCSS}>
						<div
							className={`SlideContentIndex`}
							style={
								layoutElements.contentIndexCSS !== undefined
									? { ...layoutElements.contentIndexCSS }
									: { display: 'none' }
							}
						>
							{3}
						</div>
						<div
							className={`SlideContentIndexTextDivider`}
							style={layoutElements.contentIndexTextDividerCSS}
						></div>
						{/* Editor Box for Column 3 */}
						{showEditorBoxCol3 && (
							<>
								{setUpdatedContentCol3((prevContent: JSX.Element[]) => [
									// ...prevContent.slice(0, 2),
									addANewEditorBox({
										handleSlideEdit: handleSlideEdit,
										isVerticalContent: false,
										themeElements: themeElements,
										fontSize: '16pt',
										contentIndex: 2,
										slideIndex: slideIndex,
										slides: slides,
									}),
									...prevContent.slice(1),
								])}
								{setShowEditorBoxCol3(false)}
							</>
						)}
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
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
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
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(
			imgSrc: string,
			ischart: boolean,
			image_position: ImagePosition,
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

	return (
		<div style={layoutElements.canvaCSS}>
			{/* three columns of images */}
			<div
				// className='w-full grid grid-cols-3 gap-[2rem] '
				style={{
					...layoutElements.imageContainerCSS,
					zIndex: imgHigherZIndex ? 100 : 20,
				}}
			>
				<div
					style={{
						...layoutElements.imageCSS,
					}}
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
				</div>
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
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
