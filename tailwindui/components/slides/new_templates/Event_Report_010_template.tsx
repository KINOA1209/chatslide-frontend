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
import { useSlides } from '@/hooks/use-slides';
export const Event_Report_010_template = ({
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
	themeElements,
	layoutElements,
}: MainSlideProps) => {
	const { customTemplateBgColor } = useSlides();
	const ChosenLayoutNonCover =
		layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
	const ChosenLayoutCover =
		layoutOptions[layoutOptionCover as keyof typeof layoutOptions];

	// useEffect(() => {
	// 	console.log(
	// 		'selected theme element backgroundColor is ',
	// 		themeElements.backgroundColor,
	// 	);
	// }, [customTemplateBgColor]);

	return (
		<>
			{/* for not-cover page slides */}
			<div
				className={`${
					!isCoverPage
						? 'rounded-md w-full h-full bg-cover box-border border-none relative'
						: 'hidden '
				} `}
				style={{ backgroundColor: themeElements.backgroundColor }}
			>
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
					layoutElements={layoutElements}
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
				} `}
				style={{
					backgroundColor: themeElements.backgroundColorCover,
				}}
			>
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
					layoutElements={layoutElements}
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
