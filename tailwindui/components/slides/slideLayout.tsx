import React, { useEffect, useState, useMemo, useRef, useLayoutEffect, useCallback } from 'react';
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
import { Rnd } from 'react-rnd'
import { DraggableEventHandler } from 'react-draggable';
import ImagesPosition from '@/models/ImagesPosition';
import { initializeImageData, onDragStart, onDragStop, onResizeStart, onResizeStop,onMouseLeave } from './dragAndResizeFunction';
import { useSlides } from '@/hooks/use-slides';
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

// Extend the interface with new fields
interface MainSlideProps extends BaseMainSlideProps {
	brandingColor?: string;
	themeElements: ThemeElements;
	layoutElements: LayoutElements;
	showContentBulletPoint?: boolean;
}

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
		<div style={layoutElements.canvaCSS}>
			<div style={layoutElements.columnCSS}>
				<div
					className={`${themeElements.userNameFont} ${themeElements.userNameFontColor}`}
					style={layoutElements.userNameCSS}
				>
					{user_name}
				</div>
				<div
					className={`pl-[2rem] basis-0 opacity-50 border
		        border-black border-opacity-40 mt-4`}
					style={layoutElements.userNameTextDividerCSS}
				></div>
				<div style={layoutElements.titleCSS}>{title}</div>
			</div>
			<div style={layoutElements.visualElementsCSS}>
				{themeElements.backgroundUrlCoverImg0 && (
					<Image
						style={{ objectFit: 'cover', height: '100%' }}
						width={960}
						height={540}
						src={themeElements.backgroundUrlCoverImg0}
						alt='Background Image for cover'
					/>
				)}
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
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
		(index: number) => (imgSrc: string, ischart: boolean) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;
			update_callback(newImgs, newIsCharts);
		};
	const { slideIndex, slides } = useSlides();
	const imageRefs = Array(3).fill(null).map(() => useRef<HTMLDivElement>(null));
	const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false); //distinguish openModal and drag
	const [hasInteracted, setHasInteracted] = useState(false);
	const [imagesDimensions, setImagesDimensions] = 
		useState<(ImagesPosition | { x?: number; y?: number; height?: number; width?: number })[]>([]);
	const [startPos, setStartPos] = useState<Array<{ x: number; y: number }>>(Array(3).fill({ x: 0, y: 0 }));

	//handler for drag and resize also autosave
	const handleMouseLeave = onMouseLeave(slideIndex, imagesDimensions, hasInteracted, setHasInteracted, handleSlideEdit)
	const handleDragStart = onDragStart(setIsDraggingOrResizing, startPos, setStartPos, setHasInteracted)
	const handleResizeStart = onResizeStart(setIsDraggingOrResizing, setHasInteracted)
	const handleDragStop = 
		onDragStop(imagesDimensions, setImagesDimensions, startPos, setIsDraggingOrResizing)
	const handleResizeStop = 
		onResizeStop(imagesDimensions, setImagesDimensions, setIsDraggingOrResizing)
	
	useEffect(() => {
		const initializedData = initializeImageData(images_position, imageRefs);
		setImagesDimensions(initializedData);
	  }, [images_position]);
	return (
		<div style={layoutElements.canvaCSS}>
			<div style={layoutElements.columnCSS}>
				<div
					className={`${themeElements.userNameFont} ${themeElements.userNameFontColor}`}
					style={layoutElements.userNameCSS}
					// style={
					// 	// ...layoutElements.userNameCSS,
					// 	themeElements.userNameFont,
					// 	// ...themeElements.userNameFontColor,
					// }
				>
					{user_name}
				</div>
				<div style={layoutElements.titleCSS}>{title}</div>
			</div>

			<div style={layoutElements.imageContainerCSS}>
				<div style={layoutElements.rndContainerCSS} ref={imageRefs[0]}>
					<Rnd
						style={layoutElements.rndCSS}
						size={{ 
							width: imagesDimensions[0]?.width ?? imageRefs[0]?.current?.clientWidth ?? '100%',
							height: imagesDimensions[0]?.height ?? imageRefs[0]?.current?.clientHeight ?? '100%',
						}}
						position={{ 
							x: imagesDimensions[0]?.x ?? 0, 
							y: imagesDimensions[0]?.y ?? 0 
						}}
						onDragStart={handleDragStart(0)}
						onDragStop={handleDragStop(0)}
						onResizeStart={handleResizeStart}
						onResizeStop={handleResizeStop(0)}
						onMouseLeave={handleMouseLeave}
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
							isDraggingOrResizing={isDraggingOrResizing}
						/>
					</Rnd>
				</div>
			</div>

			<div style={layoutElements.visualElementsCSS}>
				{themeElements.backgroundUrlCoverImg1 && (
					<Image
						width={960}
						height={540}
						src={themeElements.backgroundUrlCoverImg1}
						alt='Background Image for cover'
						className='w-[960px] h-[540px]'
					/>
				)}
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
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
			<div style={layoutElements.titleAndSubtopicBoxCSS}>
				<div ref={topicRef} className={``} style={layoutElements.topicCSS}>
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

			<div
				className='opacity-50 border border-neutral-900 border-opacity-40'
				style={layoutElements.titlesAndContentDividerCSS}
			></div>
			<div style={layoutElements.columnCSS}>
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
						alt='Background Image for cover'
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
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	themeElements,
	layoutElements,
	templateLogo,
	isShowingLogo,
}: MainSlideProps) => {
	//console.log('content: ' + Array(content));

	return (
		<div style={layoutElements.canvaCSS}>
			<div style={layoutElements.titleAndSubtopicBoxCSS}>
				<div className={``}>{topic}</div>
				<div className={``}>{subtopic}</div>
			</div>

			<div style={layoutElements.contentContainerCSS}>
				{Array.isArray(content) &&
					content.map((item, index) => (
						<div
							// className='flex flex-col gap-[0.5rem]'
							key={index}
							style={{
								...layoutElements.contentCSS,
								display: item === null || index > 1 ? 'none' : 'flex', // or 'flex' based on your layout
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
								<li>{item}</li>
							</ul>
						</div>
					))}
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
				}}
			>
				{templateLogo}
			</div>
			<div style={layoutElements.visualElementsCSS}>
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
}: MainSlideProps) => {
	return (
		<div style={layoutElements.canvaCSS}>
			<div style={layoutElements.titleAndSubtopicBoxCSS}>
				<div className={``}>{topic}</div>
				<div className={``}>{subtopic}</div>
			</div>

			<div style={layoutElements.contentContainerCSS}>
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
								<li>{item}</li>
							</ul>
						</div>
					))}
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
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
						alt='Background Image for cover'
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
		(index: number) => (imgSrc: string, ischart: boolean) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;
			update_callback(newImgs, newIsCharts);
		};

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

	const { slideIndex, slides } = useSlides();
	const imageRefs = Array(3).fill(null).map(() => useRef<HTMLDivElement>(null));
	const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false); //distinguish openModal and drag
	const [hasInteracted, setHasInteracted] = useState(false);
	const [imagesDimensions, setImagesDimensions] = 
		useState<(ImagesPosition | { x?: number; y?: number; height?: number; width?: number })[]>([]);
	const [startPos, setStartPos] = useState<Array<{ x: number; y: number }>>(Array(3).fill({ x: 0, y: 0 }));

	//handler for drag and resize also autosave
	const handleMouseLeave = onMouseLeave(slideIndex, imagesDimensions, hasInteracted, setHasInteracted, handleSlideEdit)
	const handleDragStart = onDragStart(setIsDraggingOrResizing, startPos, setStartPos, setHasInteracted)
	const handleResizeStart = onResizeStart(setIsDraggingOrResizing, setHasInteracted)
	const handleDragStop = 
		onDragStop(imagesDimensions, setImagesDimensions, startPos, setIsDraggingOrResizing)
	const handleResizeStop = 
		onResizeStop(imagesDimensions, setImagesDimensions, setIsDraggingOrResizing)
	
	useEffect(() => {
		const initializedData = initializeImageData(images_position, imageRefs);
		setImagesDimensions(initializedData);
	  }, [images_position]);

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
					style={layoutElements.titleAndSubtopicBoxCSS}
				>
					<div className={`z-50`} ref={topicRef}>
						{topic}
					</div>
					<div className={``} ref={subtopicRef}>
						{subtopic}
					</div>
				</div>

				{/* contents */}
				<div className='w-full flex' style={layoutElements.contentContainerCSS}>
					<div
						className={`w-full`}
						style={{
							maxHeight:
								maxContentHeight !== null ? `${maxContentHeight}px` : 'none',
						}}
					>
						{content}
					</div>
				</div>
			</div>
			{/* column 2 for img container */}
			<div
				// className={`w-1/2 h-[90%] rounded-md overflow-hidden items-center`}
				style={layoutElements.imageContainerCSS}
			>
					<div style={layoutElements.rndContainerCSS} ref={imageRefs[0]}>
					<Rnd
						style={layoutElements.rndCSS}
						size={{ 
							width: imagesDimensions[0]?.width ?? imageRefs[0]?.current?.clientWidth ?? '100%',
							height: imagesDimensions[0]?.height ?? imageRefs[0]?.current?.clientHeight ?? '100%',
						}}
						position={{ 
							x: imagesDimensions[0]?.x ?? 0, 
							y: imagesDimensions[0]?.y ?? 0 
						}}
						onDragStart={handleDragStart(0)}
						onDragStop={handleDragStop(0)}
						onResizeStart={handleResizeStart}
						onResizeStop={handleResizeStop(0)}
						onMouseLeave={handleMouseLeave}
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
							customImageStyle={layoutElements.imageCSS}
							isDraggingOrResizing={isDraggingOrResizing}
						/>
					</Rnd>
				</div>
			</div>
			{/* logo section */}
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
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
						alt='Background Image for cover'
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
		(index: number) => (imgSrc: string, ischart: boolean) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;
			update_callback(newImgs, newIsCharts);
		};

	const [maxContentHeight, setMaxContentHeight] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const topicAndSubtopicRef = useRef<HTMLDivElement>(null);
	// const subtopicRef = useRef<HTMLDivElement>(null);
	//const imgContainerRef = useRef<HTMLDivElement>(null);

	const { slideIndex, slides } = useSlides();
	const imageRefs = Array(3).fill(null).map(() => useRef<HTMLDivElement>(null));
	const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false); //distinguish openModal and drag
	const [hasInteracted, setHasInteracted] = useState(false);
	const [imagesDimensions, setImagesDimensions] = 
		useState<(ImagesPosition | { x?: number; y?: number; height?: number; width?: number })[]>([]);
	const [startPos, setStartPos] = useState<Array<{ x: number; y: number }>>(Array(3).fill({ x: 0, y: 0 }));

	//handler for drag and resize also autosave
	const handleMouseLeave = onMouseLeave(slideIndex, imagesDimensions, hasInteracted, setHasInteracted, handleSlideEdit)
	const handleDragStart = onDragStart(setIsDraggingOrResizing, startPos, setStartPos, setHasInteracted)
	const handleResizeStart = onResizeStart(setIsDraggingOrResizing, setHasInteracted)
	const handleDragStop = 
		onDragStop(imagesDimensions, setImagesDimensions, startPos, setIsDraggingOrResizing)
	const handleResizeStop = 
		onResizeStop(imagesDimensions, setImagesDimensions, setIsDraggingOrResizing)
	
	useEffect(() => {
		const initializedData = initializeImageData(images_position, imageRefs);
		setImagesDimensions(initializedData);
	  }, [images_position]);

	useEffect(() => {
		const calculateMaxHeight = () => {
			const containerElement = containerRef.current;
			const topicAndSubtopicElement = topicAndSubtopicRef.current;
			const imgContainerElement = imageRefs[0].current;
			// const subtopicElement = subtopicRef.current;

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
					style={layoutElements.titleAndSubtopicBoxCSS}
					ref={topicAndSubtopicRef}
				>
					<div className={`z-50`}>{topic}</div>
					<div className={`z-50`}>{subtopic}</div>
				</div>

				{/* row2 for image */}
				{/* image section */}
				<div
					// className='h-[15rem] grow rounded-md overflow-hidden'
					style={layoutElements.imageContainerCSS}
				>
					<div style={layoutElements.rndContainerCSS} ref={imageRefs[0]}>
						<Rnd
							style={layoutElements.rndCSS}
							size={{ 
								width: imagesDimensions[0]?.width ?? imageRefs[0]?.current?.clientWidth ?? '100%',
								height: imagesDimensions[0]?.height ?? imageRefs[0]?.current?.clientHeight ?? '100%',
							}}
							position={{ 
								x: imagesDimensions[0]?.x ?? 0, 
								y: imagesDimensions[0]?.y ?? 0 
							}}
							onDragStart={handleDragStart(0)}
							onDragStop={handleDragStop(0)}
							onResizeStart={handleResizeStart}
							onResizeStop={handleResizeStop(0)}
							onMouseLeave={handleMouseLeave}
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
								isDraggingOrResizing={isDraggingOrResizing}
								customImageStyle={layoutElements.imageCSS}
							/>
						</Rnd>
					</div>
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
					{content}
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
						alt='Background Image for cover'
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
		(index: number) => (imgSrc: string, ischart: boolean) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;
			update_callback(newImgs, newIsCharts);
		};

	const [maxContentHeight, setMaxContentHeight] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const topicAndSubtopicRef = useRef<HTMLDivElement>(null);
	const imgContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const calculateMaxHeight = () => {
			const containerElement = containerRef.current;
			const topicAndSubtopicElement = topicAndSubtopicRef.current;
			const imgContainerElement = imageRefs[0].current;
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

	const { slideIndex, slides } = useSlides();
	const imageRefs = Array(3).fill(null).map(() => useRef<HTMLDivElement>(null));
	const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false); //distinguish openModal and drag
	const [hasInteracted, setHasInteracted] = useState(false);
	const [imagesDimensions, setImagesDimensions] = 
		useState<(ImagesPosition | { x?: number; y?: number; height?: number; width?: number })[]>([]);
	const [startPos, setStartPos] = useState<Array<{ x: number; y: number }>>(Array(3).fill({ x: 0, y: 0 }));

	//handler for drag and resize also autosave
	const handleMouseLeave = onMouseLeave(slideIndex, imagesDimensions, hasInteracted, setHasInteracted, handleSlideEdit)
	const handleDragStart = onDragStart(setIsDraggingOrResizing, startPos, setStartPos, setHasInteracted)
	const handleResizeStart = onResizeStart(setIsDraggingOrResizing, setHasInteracted)
	const handleDragStop = 
		onDragStop(imagesDimensions, setImagesDimensions, startPos, setIsDraggingOrResizing)
	const handleResizeStop = 
		onResizeStop(imagesDimensions, setImagesDimensions, setIsDraggingOrResizing)
	
	useEffect(() => {
		const initializedData = initializeImageData(images_position, imageRefs);
		//console.log(initializedData, canEdit, slideIndex)
		setImagesDimensions(initializedData);
	  }, [images_position]);

	return (
		<div style={layoutElements.canvaCSS}>
			<div
				// className='flex flex-col gap-[0.5rem]'
				style={layoutElements.columnCSS}
				ref={containerRef}
			>
				<div
					// className='flex flex-col justify-center items-center'
					style={layoutElements.titleAndSubtopicBoxCSS}
					ref={topicAndSubtopicRef}
				>
					<div className={``}>{topic}</div>
					<div className={``}>{subtopic}</div>
				</div>

				{/* two columns of images */}
				<div
					// className='w-full grid grid-cols-2 gap-[2rem]'
					style={layoutElements.imageContainerCSS}
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
						<div style={layoutElements.rndContainerCSS} ref={imageRefs[0]}>
							<Rnd
								style={layoutElements.rndCSS}
								size={{ 
									width: imagesDimensions[0]?.width ?? imageRefs[0]?.current?.clientWidth ?? '100%',
									height: imagesDimensions[0]?.height ?? imageRefs[0]?.current?.clientHeight ?? '100%',
								}}
								position={{ 
									x: imagesDimensions[0]?.x ?? 0, 
									y: imagesDimensions[0]?.y ?? 0 
								}}
								onDragStart={handleDragStart(0)}
								onDragStop={handleDragStop(0)}
								onResizeStart={handleResizeStart}
								onResizeStop={handleResizeStop(0)}
								onMouseLeave={handleMouseLeave}
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
									isDraggingOrResizing={isDraggingOrResizing}
								/>
							</Rnd>
						</div>
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
						<div style={layoutElements.rndContainerCSS} ref={imageRefs[1]}>
							<Rnd
								style={layoutElements.rndCSS}
								size={{ 
									width: imagesDimensions[1]?.width ?? imageRefs[1]?.current?.clientWidth ?? '100%',
									height: imagesDimensions[1]?.height ?? imageRefs[1]?.current?.clientHeight ?? '100%',
								}}
								position={{ 
									x: imagesDimensions[1]?.x ?? 0, 
									y: imagesDimensions[1]?.y ?? 0 
								}}
								onDragStart={handleDragStart(1)}
								onDragStop={handleDragStop(1)}
								onResizeStart={handleResizeStart}
								onResizeStop={handleResizeStop(1)}
								onMouseLeave={handleMouseLeave}
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
									isDraggingOrResizing={isDraggingOrResizing}
								/>
							</Rnd>
						</div>
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
								<ul
									key={index}
									// className={`flex flex-row w-full h-full grow `}
								>
									<li>{item}</li>
								</ul>
							</div>
						))}
				</div>
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
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
						alt='Background Image for cover'
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
		(index: number) => (imgSrc: string, ischart: boolean) => {
			const newImgs = [...imgs];
			if (index >= newImgs.length) newImgs.push(imgSrc);
			else newImgs[index] = imgSrc;

			const newIsCharts = [...ischarts];
			if (index >= newIsCharts.length) newIsCharts.push(ischart);
			else newIsCharts[index] = ischart;
			update_callback(newImgs, newIsCharts);
		};
	
	const { slideIndex, slides } = useSlides();
	const imageRefs = Array(3).fill(null).map(() => useRef<HTMLDivElement>(null));
	const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false); //distinguish openModal and drag
	const [hasInteracted, setHasInteracted] = useState(false);
	const [imagesDimensions, setImagesDimensions] = 
		useState<(ImagesPosition | { x?: number; y?: number; height?: number; width?: number })[]>([]);
	const [startPos, setStartPos] = useState<Array<{ x: number; y: number }>>(Array(3).fill({ x: 0, y: 0 }));

	//handler for drag and resize also autosave
	const handleMouseLeave = onMouseLeave(slideIndex, imagesDimensions, hasInteracted, setHasInteracted, handleSlideEdit)
	const handleDragStart = onDragStart(setIsDraggingOrResizing, startPos, setStartPos, setHasInteracted)
	const handleResizeStart = onResizeStart(setIsDraggingOrResizing, setHasInteracted)
	const handleDragStop = 
		onDragStop(imagesDimensions, setImagesDimensions, startPos, setIsDraggingOrResizing)
	const handleResizeStop = 
		onResizeStop(imagesDimensions, setImagesDimensions, setIsDraggingOrResizing)
	
	useEffect(() => {
		const initializedData = initializeImageData(images_position, imageRefs);
		setImagesDimensions(initializedData);
	  }, [images_position]);

	return (
		<div style={layoutElements.canvaCSS}>
			<div
				// className='flex flex-col gap-[0.5rem]'
				style={layoutElements.columnCSS}
			>
				<div
					// className='flex flex-col justify-center items-center'
					style={layoutElements.titleAndSubtopicBoxCSS}
				>
					<div className={``}>{topic}</div>
					<div className={``}>{subtopic}</div>
				</div>
				{/* three columns of images */}
				<div
					// className='w-full grid grid-cols-3 gap-[2rem] '
					style={layoutElements.imageContainerCSS}
				>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
					>
						<div style={layoutElements.rndContainerCSS} ref={imageRefs[0]}>
							<Rnd
								style={layoutElements.rndCSS}
								size={{ 
									width: imagesDimensions[0]?.width ?? imageRefs[0]?.current?.clientWidth ?? '100%',
									height: imagesDimensions[0]?.height ?? imageRefs[0]?.current?.clientHeight ?? '100%',
								}}
								position={{ 
									x: imagesDimensions[0]?.x ?? 0, 
									y: imagesDimensions[0]?.y ?? 0 
								}}
								onDragStart={handleDragStart(0)}
								onDragStop={handleDragStop(0)}
								onResizeStart={handleResizeStart}
								onResizeStop={handleResizeStop(0)}
								onMouseLeave={handleMouseLeave}
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
									isDraggingOrResizing={isDraggingOrResizing}
								/>
							</Rnd>
						</div>
					</div>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
					>
						<div style={layoutElements.rndContainerCSS} ref={imageRefs[1]}>
							<Rnd
								style={layoutElements.rndCSS}
								size={{ 
									width: imagesDimensions[1]?.width ?? imageRefs[1]?.current?.clientWidth ?? '100%',
									height: imagesDimensions[1]?.height ?? imageRefs[1]?.current?.clientHeight ?? '100%',
								}}
								position={{ 
									x: imagesDimensions[1]?.x ?? 0, 
									y: imagesDimensions[1]?.y ?? 0 
								}}
								onDragStart={handleDragStart(1)}
								onDragStop={handleDragStop(1)}
								onResizeStart={handleResizeStart}
								onResizeStop={handleResizeStop(1)}
								onMouseLeave={handleMouseLeave}
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
									isDraggingOrResizing={isDraggingOrResizing}
								/>
							</Rnd>
						</div>
					</div>
					<div
						// className='h-[11rem] grow rounded-md overflow-hidden'
						style={layoutElements.imageCSS}
					>
						<div style={layoutElements.rndContainerCSS} ref={imageRefs[2]}>
							<Rnd
								style={layoutElements.rndCSS}
								size={{ 
									width: imagesDimensions[2]?.width ?? imageRefs[2]?.current?.clientWidth ?? '100%',
									height: imagesDimensions[2]?.height ?? imageRefs[2]?.current?.clientHeight ?? '100%',
								}}
								position={{ 
									x: imagesDimensions[2]?.x ?? 0, 
									y: imagesDimensions[2]?.y ?? 0 
								}}
								onDragStart={handleDragStart(2)}
								onDragStop={handleDragStop(2)}
								onResizeStart={handleResizeStart}
								onResizeStop={handleResizeStop(2)}
								onMouseLeave={handleMouseLeave}
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
									isDraggingOrResizing={isDraggingOrResizing}
								/>
							</Rnd>
						</div>
					</div>
				</div>
				{/* three columns of text */}
				<div
					// className='w-full grid grid-cols-3 gap-[2rem]'
					style={layoutElements.contentCSS}
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
								<ul key={index} className={`flex flex-row w-full h-full grow`}>
									<li>{item}</li>
								</ul>
							</div>
						))}
				</div>
			</div>
			<div
				style={{
					...layoutElements.logoCSS,
					display: `${isShowingLogo ? 'contents' : 'none'}`,
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
						alt='Background Image for cover'
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
