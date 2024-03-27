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
import { useLocalImgs } from './slideTemplates';
import { ThemeElements } from './templates_customizable_elements/theme_elements';
// import { LayoutElements } from './templates_customizable_elements/layout_elements';
import { LayoutElements } from '@/components/slides/templates_customizable_elements/layout_elements';
import { Rnd } from 'react-rnd';
import { DraggableEventHandler } from 'react-draggable';
import ImagesPosition from '@/models/ImagesPosition';
import {
	initializeImageData,
	onDragStart,
	onDragStop,
	onResizeStart,
	onResizeStop,
	onMouseLeave,
} from './drag_resize/dragAndResizeFunction';
import { useSlides } from '@/hooks/use-slides';
import ResizeSlider from './drag_resize/resize_slider';
import '@/components/slides/drag_resize/dragAndResizeCSS.css';
import dynamic from 'next/dynamic';
import { isArray } from 'chart.js/dist/helpers/helpers.core';
import Slide, { SlideKeys } from '@/models/Slide';
const QuillEditable = dynamic(
	() => import('@/components/slides/quillEditorSlide'),
	{ ssr: false },
);
// Extend the interface with new fields

export type LayoutKeys =
	| ''
	| 'Cover_img_0_layout'
	| 'Cover_img_1_layout'
	| 'Col_1_img_0_layout'
	| 'Col_2_img_0_layout'
	| 'Col_3_img_0_layout'
	| 'Col_2_img_1_layout'
	| 'Col_1_img_1_layout'
	| 'Col_2_img_2_layout'
	| 'Col_3_img_3_layout';
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

type HandleAddColumnProps = {
	// handleSlideEdit: (
	// 	content: string | string[],
	// 	index: number,
	// 	tag: SlideKeys,
	// 	contentIndex?: number,
	// 	rerender?: boolean,
	// ) => void;
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
		<div
			key={`content_${Date.now()}`}
			className={`${slideIndex === 0 ? 'hidden' : ''}`}
		>
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

interface MainSlideProps extends BaseMainSlideProps {
	brandingColor?: string;
	themeElements: ThemeElements;
	layoutElements: LayoutElements;
	showContentBulletPoint?: boolean;
}

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
	isShowingLogo,
}: MainSlideProps) => {
	// useEffect(() => {
	// 	console.log('LayoutElements canvaCSS:', layoutElements.canvaCSS);
	// }, []);

	return (
		<div className={`SlideCanvas`} style={layoutElements.canvaCSS}>
			<div
				className={`SlideUserNameAndHeadColumn`}
				style={layoutElements.columnCSS}
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
				style={layoutElements.visualElementsCSS}
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
					display: `${isShowingLogo ? 'contents' : 'none'}`,
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
	isShowingLogo,
	images_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagesPosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagesPosition = [...images_position];
			if (index >= newImagesPosition.length)
				newImagesPosition.push(image_position);
			else newImagesPosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagesPosition);
		};

	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

	return (
		<div className={`SlideCanvas`} style={layoutElements.canvaCSS}>
			<div
				className={`SlideUserNameAndHeadColumn`}
				style={layoutElements.columnCSS}
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
					{title}
				</div>
			</div>

			<div
				className={`SlideImageContainer`}
				style={{
					...layoutElements.imageContainerCSS,
					zIndex: imgHigherZIndex ? 100 : 20,
				}}
			>
				<ImgModule
					imgsrc={imgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={0}
					canEdit={canEdit}
					images_position={images_position}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					// additional_images={imgs.slice(3)}
					setImgHigherZIndex={setImgHigherZIndex}
				/>
			</div>

			<div
				className={`SlideVisualElement`}
				style={layoutElements.visualElementsCSS}
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
					display: `${isShowingLogo ? 'contents' : 'none'}`,
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
	isShowingLogo,
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
		<div ref={containerRef} style={layoutElements.canvaCSS}>
			<div
				className={`titleAndSubtopicBox`}
				style={{ ...layoutElements.titleAndSubtopicBoxCSS, zIndex: 50 }}
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
				className='opacity-50 border border-neutral-900 border-opacity-40'
				style={layoutElements.titlesAndContentDividerCSS}
			></div>
			<div style={{ ...layoutElements.columnCSS, zIndex: 40 }}>
				<div
					style={{
						...layoutElements.contentCSS, // Spread the existing styles first
						maxHeight:
							maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
					}}
				>
					{content}
				</div>
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
			<div style={layoutElements.visualElementsCSS}>
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
	isShowingLogo,
	handleSlideEdit,
}: MainSlideProps) => {
	// Ensure content is always an array
	const items = Array.isArray(content) ? content : [content];
	const { slides, slideIndex, updateSlidePage, updateVersion } = useSlides();
	//const filteredContent: JSX.Element[] = filterEmptyLines(content);
	const [updatedContent, setUpdatedContent] = useState(items);

	useEffect(() => {
		console.log('updatedContent on page', slideIndex, updatedContent);
	}, [updatedContent]);

	const [showAddButton, setShowAddButton] = useState(
		// slides[slideIndex].content.length <= 1,
		updatedContent.length <= 1,
	);

	// let updatedContent = [...items];

	// const handleAddColumn = () => {
	// 	// Store the previous number of items

	// 	// Call function to add new content item
	// 	console.log('add a new content item column:');
	// 	const newContentItem = (
	// 		<div
	// 			key={`content_${Date.now()}`}
	// 			className={`${slideIndex === 0 ? 'hidden' : ''}`}
	// 		>
	// 			<QuillEditable
	// 				content={''}
	// 				handleBlur={(newContent) =>
	// 					handleSlideEdit(
	// 						newContent,
	// 						slideIndex,
	// 						'content',
	// 						slides[slideIndex].content.length === 0 ? 0 : 1,
	// 						true,
	// 					)
	// 				}
	// 				style={{
	// 					...themeElements.contentFontCSS_non_vertical_content,
	// 					fontSize: '16pt',
	// 				}}
	// 				isVerticalContent={false}
	// 				templateKey={slides[slideIndex].template}
	// 			/>
	// 		</div>
	// 	);
	// 	setUpdatedContent((prevContent) => [...prevContent, newContentItem]);
	// 	// Update showAddButton based on the updated content array
	// 	setShowAddButton(updatedContent.length <= 1);
	// 	// updateSlidePage(slideIndex, slides[slideIndex], false);
	// };
	return (
		<div className={`SlideLayoutCanvas`} style={layoutElements.canvaCSS}>
			<div
				className={`SlideTopicAndSubtopicBox`}
				style={{ ...layoutElements.titleAndSubtopicBoxCSS, zIndex: 50 }}
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
				style={{ ...layoutElements.contentContainerCSS, zIndex: 40 }}
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

					{updatedContent.length === 0 && showAddButton && (
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
					)}
					{updatedContent.slice(0, 1).map((item, index) => (
						<React.Fragment key={`contentText_${index}_${Date.now()}`}>
							<ul
								key={`contentText_${index}_${Date.now()}`}
								className={`SlideContentText`}
								style={layoutElements.contentTextCSS}
							>
								<li style={{ width: '100%' }}>{item}</li>
							</ul>
						</React.Fragment>
					))}
				</div>

				{
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
						{updatedContent.length === 1 && showAddButton && (
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
						)}
						{updatedContent.slice(1, 2).map((item, index) => (
							<React.Fragment key={`contentText_${index + 1}_${Date.now()}`}>
								<ul
									key={`contentText_${index}_${Date.now()}`}
									className={`SlideContentText`}
									style={layoutElements.contentTextCSS}
								>
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</React.Fragment>
						))}
					</div>
				}
			</div>
			<div
				className={`SlideLogo`}
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
			<div
				className={`SlideVisualElements`}
				style={layoutElements.visualElementsCSS}
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
	isShowingLogo,
	handleSlideEdit,
}: MainSlideProps) => {
	//const filteredContent: JSX.Element[] = filterEmptyLines(content);

	// Ensure content is always an array
	const items = Array.isArray(content) ? content : [content];
	const { slides, slideIndex, updateSlidePage, updateVersion } = useSlides();
	//const filteredContent: JSX.Element[] = filterEmptyLines(content);
	const [updatedContent, setUpdatedContent] = useState(items);

	useEffect(() => {
		console.log('updatedContent on page', slideIndex, updatedContent);
	}, [updatedContent]);

	const [showAddButton, setShowAddButton] = useState(
		// slides[slideIndex].content.length <= 1,
		updatedContent.length <= 1,
	);

	return (
		<div style={layoutElements.canvaCSS}>
			<div style={{ ...layoutElements.titleAndSubtopicBoxCSS, zIndex: 50 }}>
				<div style={layoutElements.topicCSS}>{topic}</div>
				<div style={layoutElements.subtopicCSS}>{subtopic}</div>
			</div>

			<div style={{ ...layoutElements.contentContainerCSS, zIndex: 40 }}>
				{Array.isArray(content) &&
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
					))}
			</div>

			{/* <div style={layoutElements.contentContainerCSS}>
				{Array.isArray(content) &&
					content
						.filter((item) => React.isValidElement(item))
						.filter((item) => {
							const spanText = React.Children.toArray(item.props.children)
								.filter((child) => {
									if (React.isValidElement(child) && child.type === 'span') {
										return typeof child.props.children === 'string';
									}
									return typeof child === 'string';
								})
								.map((child) =>
									React.isValidElement(child) ? child.props.children : child,
								)
								.join('');

							return spanText.trim() !== '';
						})
						.map((item, index) => (
							<div
								key={index}
								style={{
									...layoutElements.contentCSS,
									display: item === null || index > 2 ? 'none' : 'flex',
								}}
							>
								<div style={layoutElements.contentIndexCSS}>{index + 1}</div>
								<div style={layoutElements.contentIndexTextDividerCSS}></div>
								<ul style={layoutElements.contentTextCSS}>
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</div>
						))}
			</div> */}

			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
			<div style={layoutElements.visualElementsCSS}>
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
	isShowingLogo,
	images_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagesPosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagesPosition = [...images_position];
			if (index >= newImagesPosition.length)
				newImagesPosition.push(image_position);
			else newImagesPosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagesPosition);
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
			// className='w-full h-full flex flex-row gap-[2rem] justify-start items-start'
			ref={containerRef}
			style={layoutElements.canvaCSS}
		>
			{/* column 1 for text content */}
			<div
				// className={`w-1/2 flex flex-col items-start h-full gap-[0.1rem]`}
				style={layoutElements.columnCSS}
			>
				<div
					// className='flex flex-col'
					// topic subtopic box zindex 40 prevent covering content text
					style={{ ...layoutElements.titleAndSubtopicBoxCSS, zIndex: 50 }}
				>
					<div className={``} ref={topicRef} style={layoutElements.topicCSS}>
						{topic}
					</div>
					<div
						className={``}
						ref={subtopicRef}
						style={layoutElements.subtopicCSS}
					>
						{subtopic}
					</div>
				</div>

				{/* contents */}
				<div
					className='w-full flex'
					style={{ ...layoutElements.contentContainerCSS, zIndex: 40 }}
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
				// className={`w-1/2 h-[90%] rounded-md overflow-hidden items-center`}
				style={{ ...layoutElements.imageContainerCSS, zIndex: imgHigherZIndex ? 100 : 20 }}
			>
				<ImgModule
					imgsrc={imgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					chartArr={charts}
					ischartArr={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					currentContentIndex={0}
					canEdit={canEdit}
					images_position={images_position}
					layoutElements={layoutElements}
					customImageStyle={layoutElements.imageCSS}
					setImgHigherZIndex={setImgHigherZIndex}
				/>
			</div>
			{/* logo section */}
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
			<div style={layoutElements.visualElementsCSS}>
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
	isShowingLogo,
	images_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagesPosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagesPosition = [...images_position];
			if (index >= newImagesPosition.length)
				newImagesPosition.push(image_position);
			else newImagesPosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagesPosition);
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
			className='w-full h-full'
			style={layoutElements.canvaCSS}
		>
			{/* area for topic, subtopic and contents */}
			<div
				// className='w-full grid grid-cols-1'
				style={layoutElements.columnCSS}
			>
				{/* row1 for topic and subtopic */}

				<div
					// className='flex flex-col'
					style={{ ...layoutElements.titleAndSubtopicBoxCSS, zIndex: '50' }}
					ref={topicAndSubtopicRef}
				>
					<div className={``} style={layoutElements.topicCSS}>
						{topic}
					</div>
					<div className={``} style={layoutElements.subtopicCSS}>
						{subtopic}
					</div>
				</div>

				{/* row2 for image */}
				{/* image section */}
				<div
					// className='h-[15rem] grow rounded-md overflow-hidden'
					style={{ ...layoutElements.imageContainerCSS, zIndex: imgHigherZIndex ? 100 : 20 }}
					ref={imgContainerRef}
				>
					<ImgModule
						imgsrc={imgs[0]}
						updateSingleCallback={updateImgAtIndex(0)}
						chartArr={charts}
						ischartArr={ischarts}
						handleSlideEdit={handleSlideEdit}
						currentSlideIndex={currentSlideIndex}
						currentContentIndex={0}
						canEdit={canEdit}
						images_position={images_position}
						layoutElements={layoutElements}
						customImageStyle={layoutElements.imageCSS}
						setImgHigherZIndex={setImgHigherZIndex}
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
					style={{
						...layoutElements.contentContainerCSS,
						maxHeight:
							maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
						zIndex: 40,
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
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
			<div style={layoutElements.visualElementsCSS}>
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
	isShowingLogo,
	images_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagesPosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagesPosition = [...images_position];
			if (index >= newImagesPosition.length)
				newImagesPosition.push(image_position);
			else newImagesPosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagesPosition);
		};

	const [maxContentHeight, setMaxContentHeight] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const topicAndSubtopicRef = useRef<HTMLDivElement>(null);
	const imgContainerRef = useRef<HTMLDivElement>(null);
	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

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
		<div style={layoutElements.canvaCSS}>
			<div
				// className='flex flex-col gap-[0.5rem]'
				style={layoutElements.columnCSS}
				ref={containerRef}
			>
				<div
					// className='flex flex-col justify-center items-center'
					style={{ ...layoutElements.titleAndSubtopicBoxCSS, zIndex: 50 }}
					ref={topicAndSubtopicRef}
				>
					<div className={``} style={layoutElements.topicCSS}>
						{topic}
					</div>
					<div className={``} style={layoutElements.subtopicCSS}>
						{subtopic}
					</div>
				</div>

				{/* two columns of images */}
				<div
					// className='w-full grid grid-cols-2 gap-[2rem]'
					style={{ ...layoutElements.imageContainerCSS, zIndex: imgHigherZIndex ? 100 : 20 }}
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
							imgsrc={imgs[0]}
							updateSingleCallback={updateImgAtIndex(0)}
							chartArr={charts}
							ischartArr={ischarts}
							handleSlideEdit={handleSlideEdit}
							currentSlideIndex={currentSlideIndex}
							currentContentIndex={0}
							canEdit={canEdit}
							images_position={images_position}
							layoutElements={layoutElements}
							customImageStyle={layoutElements.imageCSS}
							setImgHigherZIndex={setImgHigherZIndex}
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
							imgsrc={imgs[1]}
							updateSingleCallback={updateImgAtIndex(1)}
							chartArr={charts}
							ischartArr={ischarts}
							handleSlideEdit={handleSlideEdit}
							currentSlideIndex={currentSlideIndex}
							currentContentIndex={1}
							canEdit={canEdit}
							images_position={images_position}
							layoutElements={layoutElements}
							customImageStyle={layoutElements.imageCSS}
							setImgHigherZIndex={setImgHigherZIndex}
						/>
					</div>
				</div>
				{/* two columns of text */}
				<div
					// className='w-full grid grid-cols-2 gap-[2rem]'
					// style={layoutElements.contentCSS}
					style={{
						...layoutElements.contentCSS,
						maxHeight:
							maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
						zIndex: 40,
					}}
				>
					{Array.isArray(content) &&
						content.map((item, index) => (
							<div
								// className='flex flex-col gap-[0.5rem]'
								key={index}
								style={{
									display: item === null || index > 1 ? 'none' : 'block', // or 'flex' based on your layout
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
								<ul
									key={index}
									// className={`flex flex-row w-full h-full grow `}
								>
									<li style={{ width: '100%' }}>{item}</li>
								</ul>
							</div>
						))}
				</div>
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
			<div style={layoutElements.visualElementsCSS}>
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
	isShowingLogo,
	images_position,
}: MainSlideProps) => {
	const updateImgAtIndex =
		(index: number) =>
		(imgSrc: string, ischart: boolean, image_position: ImagesPosition) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;

			const newImagesPosition = [...images_position];
			if (index >= newImagesPosition.length)
				newImagesPosition.push(image_position);
			else newImagesPosition[index] = image_position;

			update_callback(newImgs, newIsCharts, newImagesPosition);
		};

	const [imgHigherZIndex, setImgHigherZIndex] = useState(false);

	//const filteredContent: JSX.Element[] = filterEmptyLines(content);
	return (
		<div style={layoutElements.canvaCSS}>
			<div
				// className='flex flex-col gap-[0.5rem]'
				style={layoutElements.columnCSS}
			>
				<div
					// className='flex flex-col justify-center items-center'
					style={{ ...layoutElements.titleAndSubtopicBoxCSS, zIndex: 50 }}
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
					style={{ ...layoutElements.imageContainerCSS, zIndex: imgHigherZIndex ? 100 : 20 }}
				>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
					>
						<ImgModule
							imgsrc={imgs[0]}
							updateSingleCallback={updateImgAtIndex(0)}
							chartArr={charts}
							ischartArr={ischarts}
							handleSlideEdit={handleSlideEdit}
							currentSlideIndex={currentSlideIndex}
							currentContentIndex={0}
							canEdit={canEdit}
							images_position={images_position}
							layoutElements={layoutElements}
							customImageStyle={layoutElements.imageCSS}
							setImgHigherZIndex={setImgHigherZIndex}
						/>
					</div>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
					>
						<ImgModule
							imgsrc={imgs[1]}
							updateSingleCallback={updateImgAtIndex(1)}
							chartArr={charts}
							ischartArr={ischarts}
							handleSlideEdit={handleSlideEdit}
							currentSlideIndex={currentSlideIndex}
							currentContentIndex={1}
							canEdit={canEdit}
							images_position={images_position}
							layoutElements={layoutElements}
							customImageStyle={layoutElements.imageCSS}
							setImgHigherZIndex={setImgHigherZIndex}
						/>
					</div>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
					>
						<ImgModule
							imgsrc={imgs[2]}
							updateSingleCallback={updateImgAtIndex(2)}
							chartArr={charts}
							ischartArr={ischarts}
							handleSlideEdit={handleSlideEdit}
							currentSlideIndex={currentSlideIndex}
							currentContentIndex={2}
							canEdit={canEdit}
							images_position={images_position}
							layoutElements={layoutElements}
							customImageStyle={layoutElements.imageCSS}
							setImgHigherZIndex={setImgHigherZIndex}
						/>
					</div>
				</div>
				{/* three columns of text */}
				<div
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
				</div>
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
					zIndex: 30,
					pointerEvents: 'none',
				}}
			>
				{templateLogo}
			</div>
			<div style={layoutElements.visualElementsCSS}>
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
	],
};
