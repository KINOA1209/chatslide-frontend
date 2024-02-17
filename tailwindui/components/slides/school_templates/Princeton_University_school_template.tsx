import Image, { StaticImageData } from 'next/image';
import { MainSlideProps, TemplateKeys } from '../slideTemplates';
import PrincetonLogo from '@/public/images/template/Princeton/Princeton_University_Logo.png';
import { LayoutKeys } from '@/components/slides/slideLayout';
import { layoutOptions } from '@/components/slides/slideLayout';
import { useEffect, useState } from 'react';
import {
	loadCustomizableElements,
	loadLayoutConfigElements,
} from '@/components/slides/SlidesHTML';
export const Princeton_school_template = ({
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
}: MainSlideProps) => {
	const ChosenLayoutNonCover =
		layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
	const ChosenLayoutCover =
		layoutOptions[layoutOptionCover as keyof typeof layoutOptions];
	//   console.log('choosing layout option', ChosenLayout)
	// Load customizable elements for the current template
	const themeElements = loadCustomizableElements('Princeton' as TemplateKeys);
	const layoutConfigElements = loadLayoutConfigElements(
		'Princeton' as TemplateKeys,
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
							alt='Background Image for cover'
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
							alt='Background Image for cover'
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
				></ChosenLayoutCover>
			</div>
		</>
	);
};
