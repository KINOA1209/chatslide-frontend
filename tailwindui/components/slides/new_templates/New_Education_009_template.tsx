import React, { useEffect } from 'react';
import {
	PaletteKeys,
	MainSlideProps,
	uploadedBackgroundImgStyle,
} from '../slideTemplates';
import Image, { StaticImageData } from 'next/image';
import { LayoutKeys } from '@/components/slides/slideLayout';
import { layoutOptions } from '@/components/slides/slideLayout';
import {
	loadCustomizableElements,
	loadLayoutConfigElements,
} from '@/components/slides/SlidesHTML';
import { TemplateKeys } from '../slideTemplates';
export const New_Education_009_template = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	// autoSave,
	isCoverPage,
	layoutOptionNonCover,
	layoutOptionCover,
	templateLogo,
	uploadedLogoUrl,
	uploadedBackgroundImageUrl,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	isShowingLogo,
	images_position,
	palette,
}: MainSlideProps) => {
	// useEffect(() => {
	// 	console.log('selected color theme is ', palette, themeElements);
	// });
	const ChosenLayoutNonCover =
		layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
	const ChosenLayoutCover =
		layoutOptions[layoutOptionCover as keyof typeof layoutOptions];
	//   console.log('choosing layout option', ChosenLayout)
	// Load customizable elements for the current template
	const themeElements = loadCustomizableElements(
		'New_Education_009' as TemplateKeys,
		palette as PaletteKeys,
	);
	const layoutConfigElements = loadLayoutConfigElements(
		'New_Education_009' as TemplateKeys,
		layoutOptionCover as keyof typeof layoutOptions,
	);

	// useEffect(() => {
	// 	console.log('Business_002_template themeElements:', themeElements);
	// }, []);
	// useEffect(() => {
	// 	console.log(
	// 		'Business_002_template layoutConfigElements for current slide page:',
	// 		layoutConfigElements,
	// 	);
	// }, []);
	// useEffect(() => {
	// 	console.log(
	// 		'Business_002_template layoutConfigElements for cover img 0 bg color',
	// 		layoutConfigElements.canvaCSS?.backgroundColor,
	// 	);
	// }, []);
	return (
		<>
			{/* for not-cover page slides */}
			<div
				className={`${
					!isCoverPage
						? 'rounded-md w-full h-full bg-cover box-border border-none relative'
						: 'hidden '
				} ${themeElements.backgroundColor}`}
			>
				{/* <hr className='border border-[#E7E9EB] w-full mt-[20px] mb-[12px]'></hr> */}
				{/* background picture when user uploaded this  */}
				{uploadedBackgroundImageUrl && (
					<div style={{ ...uploadedBackgroundImgStyle }}>
						<Image
							style={{ objectFit: 'cover', height: '100%' }}
							width={960}
							height={540}
							src={`${uploadedBackgroundImageUrl}`}
							alt='Background Image'
							unoptimized={true}
						/>
					</div>
				)}
				<ChosenLayoutNonCover
					content={content}
					user_name={user_name}
					title={title}
					topic={topic}
					subtopic={subtopic}
					imgs={imgs}
					update_callback={update_callback}
					canEdit={canEdit}
					// autoSave={autoSave}
					isCoverPage={isCoverPage}
					layoutOptionNonCover={layoutOptionNonCover}
					layoutOptionCover={layoutOptionCover}
					themeElements={themeElements}
					layoutElements={layoutConfigElements}
					templateLogo={templateLogo}
					charts={charts}
					ischarts={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					isShowingLogo={isShowingLogo}
					images_position={images_position}
				></ChosenLayoutNonCover>
			</div>
			{/* for cover page */}
			<div
				className={`${
					isCoverPage
						? 'rounded-md w-full h-full bg-cover flex flex-row justify-start items-start box-border border-none relative'
						: 'hidden'
				} ${themeElements.backgroundColorCover}`}
				// style={{
				// 	backgroundColor: themeElements?.backgroundColorCoverImg0,
				// }}
			>
				{/* <div
					style={{ fontSize: '40pt', fontFamily: 'Caveat', fontWeight: 700 }}
				>
					This is Caveat font
				</div> */}
				{/* background picture when user uploaded this  */}
				{uploadedBackgroundImageUrl && (
					<div style={{ ...uploadedBackgroundImgStyle }}>
						<Image
							style={{ objectFit: 'cover', height: '100%' }}
							width={960}
							height={540}
							src={`${uploadedBackgroundImageUrl}`}
							alt='Background Image'
							unoptimized={true}
						/>
					</div>
				)}
				<ChosenLayoutCover
					content={content}
					user_name={user_name}
					title={title}
					topic={topic}
					subtopic={subtopic}
					imgs={imgs}
					update_callback={update_callback}
					canEdit={canEdit}
					// autoSave={autoSave}
					isCoverPage={isCoverPage}
					layoutOptionNonCover={layoutOptionNonCover}
					layoutOptionCover={layoutOptionCover}
					themeElements={themeElements}
					layoutElements={layoutConfigElements}
					templateLogo={templateLogo}
					charts={charts}
					ischarts={ischarts}
					handleSlideEdit={handleSlideEdit}
					currentSlideIndex={currentSlideIndex}
					isShowingLogo={isShowingLogo}
					images_position={images_position}
				></ChosenLayoutCover>
			</div>
		</>
	);
};
