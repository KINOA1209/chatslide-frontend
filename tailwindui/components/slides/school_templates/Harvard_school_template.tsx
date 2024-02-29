import React from 'react';
import { MainSlideProps, TemplateKeys } from '../slideTemplates';
import Image, { StaticImageData } from 'next/image';
import HarvardLogo from '@/public/images/template/Harvard/Harvard_logo.png';
import HarvardCoverVector from '@/public/images/template/Harvard/cover_vector_1.png';
import { LayoutKeys } from '@/components/slides/slideLayout';
import { layoutOptions } from '@/components/slides/slideLayout';
import { useEffect, useState } from 'react';
import {
	loadCustomizableElements,
	loadLayoutConfigElements,
} from '@/components/slides/SlidesHTML';
export const Harvard_school_template = ({
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
	templateLogo,
	uploadedLogoUrl,
	uploadedBackgroundImageUrl,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	isShowingLogo,
	images_position,
}: MainSlideProps) => {
	const ChosenLayoutNonCover =
		layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
	const ChosenLayoutCover =
		layoutOptions[layoutOptionCover as keyof typeof layoutOptions];
	//   console.log('choosing layout option', ChosenLayout)
	// Load customizable elements for the current template
	const themeElements = loadCustomizableElements('Harvard' as TemplateKeys);
	const layoutConfigElements = loadLayoutConfigElements(
		'Harvard' as TemplateKeys,
		layoutOptionCover as keyof typeof layoutOptions,
	);
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
					<div
						style={{
							zIndex: 0,
							width: '100%',
							height: '100%',
							position: 'absolute',
							// display: 'none',
							pointerEvents:
								'none' /* Make the layer transparent to pointer events */,
							top: '0%',
							// display: 'none',
						}}
					>
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
						? 'rounded-md w-full h-full bg-cover flex flex-row gap-[2rem] justify-start items-start box-border border-none relative '
						: 'hidden'
				} ${themeElements.backgroundColorCover} `}
			>
				{/* background picture when user uploaded this  */}
				{uploadedBackgroundImageUrl && (
					<div
						style={{
							zIndex: 0,
							width: '100%',
							height: '100%',
							position: 'absolute',
							// display: 'none',
							pointerEvents:
								'none' /* Make the layer transparent to pointer events */,
							top: '0%',
							// display: 'none',
						}}
					>
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

				<div className='absolute top-[41%] right-[0%] gap-7 inline-flex pl-[3rem] pointer-events-none z-[52]'>
					<Image
						src={HarvardCoverVector}
						alt='MaskedBackground'
						className='w-[20rem]'
					/>
				</div>
			</div>
		</>
	);
};
