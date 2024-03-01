import React, { useEffect } from 'react';
import { MainSlideProps } from '../slideTemplates';
import Image, { StaticImageData } from 'next/image';
import { LayoutKeys } from '@/components/slides/slideLayout';
import { layoutOptions } from '@/components/slides/slideLayout';
import {
	loadCustomizableElements,
	loadLayoutConfigElements,
} from '@/components/slides/SlidesHTML';
import { TemplateKeys } from '../slideTemplates';

export const Default = ({
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
	// brandingColor = 'bg-[#F0F0F2]',
	templateLogo,
	uploadedLogoUrl,
	uploadedBackgroundImageUrl,
	charts,
	ischarts,
	handleSlideEdit,
	currentSlideIndex,
	isShowingLogo,
	images_position,
}: // templateLogo = TemplatesLogos.DefaultTemplateLogo,
MainSlideProps) => {
	const ChosenLayoutNonCover =
		layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
	const ChosenLayoutCover =
		layoutOptions[layoutOptionCover as keyof typeof layoutOptions];

	const themeElements = loadCustomizableElements('Default' as TemplateKeys);
	const layoutConfigElements = loadLayoutConfigElements(
		'Default' as TemplateKeys,
		layoutOptionCover as keyof typeof layoutOptions,
	);

	useEffect(() => {
		console.log('will show logo?', isShowingLogo);
	}, []);

	// useEffect(() => {
	// 	console.log(
	// 		'Default layoutConfigElements for current page',
	// 		layoutConfigElements,
	// 	);
	// }, []);
	return (
		<>
			{/* for cover page slide */}
			<div
				className={`${
					isCoverPage
						? 'rounded-md w-full h-full bg-cover flex flex-row justify-start items-start box-border border-none relative '
						: 'hidden'
				} ${themeElements.backgroundColorCover}`}
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
					// brandingColor={brandingColor}
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

				{/* Logo */}
				{/* <div className='fixed inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
					<Image
						src={drlambdaLogo}
						alt='drlambdaLogo'
						className='w-[8rem] h-auto'
					/>
		
				</div> */}
			</div>

			{/* for non-cover page slides */}
			<div
				className={`${
					!isCoverPage
						? 'rounded-md w-full h-full bg-cover box-border border-none relative'
						: 'hidden'
				} ${themeElements.backgroundColor}`}
				// style={{
				// 	backgroundImage: `url('https://picsum.photos/480/270')`,
				// 	backgroundSize: 'auto', // Options: 'auto', 'contain', 'cover', etc.
				// 	backgroundRepeat: 'no-repeat',
				// 	// backgroundPosition: 'center', // Options: 'left top', '50% 50%', etc.
				// }}
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
					// brandingColor={brandingColor}
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
		</>
	);
};
