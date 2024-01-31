import React, { useEffect, useState, useMemo, useRef } from 'react';
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
}: MainSlideProps) => {
	// useEffect(() => {
	// 	console.log('LayoutElements canvaCSS:', layoutElements.canvaCSS);
	// }, []);

	return (
		<>
			<div style={layoutElements.canvaCSS}>
				<div
					className={`${themeElements.userNameFont} ${themeElements.userNameFontColor}`}
					style={layoutElements.userNameCSS}
				>
					{user_name}
				</div>
				<div
					className={`pl-[2rem] basis-0 opacity-50 border
		        border-black border-opacity-40 mt-4`}
				></div>
				<div style={layoutElements.titleCSS}>{title}</div>
			</div>
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
		</>

		// <>
		// 	<div
		// 		className={`pt-[1rem] px-[2rem] w-full flex flex-col justify-start h-full gap-[2rem]`}
		// 	>
		// 		<div
		// 			className={`${themeElements.userNameFont} ${themeElements.userNameFontColor}`}
		// 		>
		// 			{user_name}
		// 		</div>
		// 		<div
		// 			className={`pl-[2rem] basis-0 opacity-50 border
		// 	border-black border-opacity-40 mt-4`}
		// 		></div>
		// 		<div className={`pl-[2rem] z-50`}>{title}</div>
		// 	</div>
		// 	{templateLogo}
		// </>
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
}: MainSlideProps) => {

  const updateImgAtIndex = (index: number) => (imgSrc: string) => {
    const newImgs = [...imgs];
    if(index >= newImgs.length) 
      newImgs.push(imgSrc);
    else 
      newImgs[index] = imgSrc;
    update_callback(newImgs);
  }

	return (
		<>
			<div style={layoutElements.columnCSS}>
				<div
					className={`${themeElements.userNameFont} ${themeElements.userNameFontColor}`}
				>
					{user_name}
				</div>
				<div
					className={`pl-[2rem] basis-0 opacity-50 border
		        border-black border-opacity-40 mt-4`}
				></div>
				<div style={layoutElements.titleCSS}>{title}</div>
			</div>
			<div style={layoutElements.imageContainerCSS}>
				<ImgModule
					imgsrc={imgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					canEdit={canEdit}
				/>
			</div>
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
		</>
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
		<div ref={containerRef} style={layoutElements.canvaCSS}>
			<div ref={topicRef} className={``} style={layoutElements.topicCSS}>
				{topic}
			</div>
			<div className={``} ref={subtopicRef} style={layoutElements.subtopicCSS}>
				{subtopic}
			</div>
			<div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
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
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
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
}: MainSlideProps) => {
	return (
		<>
			<div className={``}>{topic}</div>
			<div className={``}>{subtopic}</div>
			<div className='h-full w-full grid grid-cols-2 gap-[2rem]'>
				{Array.isArray(content) &&
					content.map((item, index) => (
						<div className='flex flex-col gap-[0.5rem]' key={index}>
							<div className='mix-blend-hard-light text-neutral-900 text-opacity-25 text-4xl font-bold font-creato-medium uppercase leading-10 tracking-widest pt-[2rem]'>
								{index + 1}
							</div>
							<div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
							<ul key={index} className={`flex flex-row w-full h-full grow `}>
								<li>{item}</li>
							</ul>
						</div>
					))}
			</div>
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
		</>
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
}: MainSlideProps) => {
	return (
		<>
			<div className={``}>{topic}</div>
			<div className={``}>{subtopic}</div>
			<div className='h-full w-full grid grid-cols-3 gap-[2rem] overflow-y-scroll'>
				{Array.isArray(content) &&
					content.map((item, index) => (
						<div className='flex flex-col gap-[0.5rem]' key={index}>
							<div className='mix-blend-hard-light text-neutral-900 text-opacity-25 text-4xl font-bold font-creato-medium uppercase leading-10 tracking-widest pt-[2rem]'>
								{index + 1}
							</div>
							<div className='opacity-50 border border-neutral-900 border-opacity-40'></div>
							<ul
								key={index}
								className={`flex flex-row w-full h-full grow pl-2 `}
							>
								<li>{item}</li>
							</ul>
						</div>
					))}
			</div>
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
		</>
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
}: MainSlideProps) => {

  const updateImgAtIndex = (index: number) => (imgSrc: string) => {
    const newImgs = [...imgs];
    if (index >= newImgs.length)
      newImgs.push(imgSrc);
    else
      newImgs[index] = imgSrc;
    update_callback(newImgs);
  }

	return (
		<>
			{/* area for topic, subtopic and contents */}
			<div className='h-1/3 w-full grid grid-cols-2 gap-[2rem]'>
				{/* col1 for topic and subtopic */}
				<div className='flex flex-col gap-[0.1rem]'>
					<div className={`z-50`}>{topic}</div>
					<div className={`z-50`}>{subtopic}</div>
				</div>
				{/* col 2 for contents */}
				<div className='h-full w-full flex flex-row gap-[2rem]'>
					<div className='flex flex-col gap-[0.2rem]'>
						<div className='opacity-50'></div>
						<div className='w-full h-full'>
							{Array.isArray(content) &&
								content.map((item, index) => (
									<div className='py-[0.2rem]' key={index}>
										{/* <div className='opacity-50 border border-neutral-900 border-opacity-40'></div> */}
										<ul
											key={index}
											className={`flex flex-row w-full h-full grow pl-4  `}
										>
											<li>{item}</li>
										</ul>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>

			{/* image section */}
			<div className='mt-[3rem] h-[15rem] grow rounded-md overflow-hidden'>
				<ImgModule
					imgsrc={imgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					canEdit={canEdit}
				/>
			</div>
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
		</>
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
}: MainSlideProps) => {

  const updateImgAtIndex = (index: number) => (imgSrc: string) => {
    const newImgs = [...imgs];
    if (index >= newImgs.length)
      newImgs.push(imgSrc);
    else
      newImgs[index] = imgSrc;
    update_callback(newImgs);
  }

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
			className='w-full h-full flex flex-row gap-[2rem] justify-start items-start'
			ref={containerRef}
		>
			<div className={`w-1/2 flex flex-col items-start h-full gap-[0.1rem]`}>
				<div className={`z-50`} ref={topicRef}>
					{topic}
				</div>
				<div className={``} ref={subtopicRef}>
					{subtopic}
				</div>
				{/* contents */}
				<div className='w-full flex'>
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
			<div className={`w-1/2 h-[90%] rounded-md overflow-hidden items-center`}>
				<ImgModule
					imgsrc={imgs[0]}
					updateSingleCallback={updateImgAtIndex(0)}
					canEdit={canEdit}
				/>
			</div>
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
		</div>
		// two columns layout (left is text and right is one image)
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
}: MainSlideProps) => {

  const updateImgAtIndex = (index: number) => (imgSrc: string) => {
    const newImgs = [...imgs];
    if (index >= newImgs.length)
      newImgs.push(imgSrc);
    else
      newImgs[index] = imgSrc;
    update_callback(newImgs);
  }

	return (
		<>
			<div className='flex flex-col justify-center items-center gap-[0.5rem]'>
				<div className={``}>{topic}</div>
				<div className={``}>{subtopic}</div>
				{/* two columns of images */}
				<div className='w-full grid grid-cols-2 gap-[2rem]'>
					<div className='h-[11rem] grow rounded-md overflow-hidden relative'>
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
							canEdit={canEdit}
						/>
					</div>
					<div className='h-[11rem] grow rounded-md overflow-hidden  relative'>
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
							canEdit={canEdit}
						/>
					</div>
				</div>
				{/* two columns of text */}
				<div className='w-full grid grid-cols-2 gap-[2rem]'>
					{Array.isArray(content) &&
						content.map((item, index) => (
							<div className='flex flex-col gap-[0.5rem]' key={index}>
								{/* <div className='opacity-50 border border-neutral-900 border-opacity-40'></div> */}
								<ul key={index} className={`flex flex-row w-full h-full grow `}>
									<li>{item}</li>
								</ul>
							</div>
						))}
				</div>
			</div>
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
		</>
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
}: MainSlideProps) => {

  const updateImgAtIndex = (index: number) => (imgSrc: string) => {
    const newImgs = [...imgs];
    if (index >= newImgs.length)
      newImgs.push(imgSrc);
    else
      newImgs[index] = imgSrc;
    update_callback(newImgs);
  }

	return (
		<>
			<div className='flex flex-col justify-center items-center gap-[0.5rem]'>
				<div className={``}>{topic}</div>
				<div className={``}>{subtopic}</div>
				{/* three columns of images */}
				<div className='w-full grid grid-cols-3 gap-[2rem] '>
					<div className='h-[11rem] grow rounded-md overflow-hidden'>
						<ImgModule
							imgsrc={imgs[0]}
							updateSingleCallback={updateImgAtIndex(0)}
							canEdit={canEdit}
						/>
					</div>
					<div className='h-[11rem] grow rounded-md overflow-hidden'>
						<ImgModule
							imgsrc={imgs[1]}
							updateSingleCallback={updateImgAtIndex(1)}
							canEdit={canEdit}
						/>
					</div>
					<div className='h-[11rem] grow rounded-md overflow-hidden'>
						<ImgModule
							imgsrc={imgs[2]}
							updateSingleCallback={updateImgAtIndex(2)}
							canEdit={canEdit}
						/>
					</div>
				</div>
				{/* three columns of text */}
				<div className='w-full grid grid-cols-3 gap-[2rem]'>
					{Array.isArray(content) &&
						content.map((item, index) => (
							<div className='flex flex-col gap-[0.5rem]' key={index}>
								{/* <div className='opacity-50 border border-neutral-900 border-opacity-40'></div> */}
								<ul key={index} className={`flex flex-row w-full h-full grow `}>
									<li>{item}</li>
								</ul>
							</div>
						))}
				</div>
			</div>
			<div style={layoutElements.logoCSS}>{templateLogo}</div>
		</>
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
