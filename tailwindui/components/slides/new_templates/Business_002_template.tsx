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
export const Business_002_template = ({
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
}: MainSlideProps) => {
	const ChosenLayoutNonCover =
		layoutOptions[layoutOptionNonCover as keyof typeof layoutOptions];
	const ChosenLayoutCover =
		layoutOptions[layoutOptionCover as keyof typeof layoutOptions];
	//   console.log('choosing layout option', ChosenLayout)
	// Load customizable elements for the current template
	const themeElements = loadCustomizableElements(
		'Business_002' as TemplateKeys,
	);
	const layoutConfigElements = loadLayoutConfigElements(
		'Business_002' as TemplateKeys,
		layoutOptionCover as keyof typeof layoutOptions,
	);

	useEffect(() => {
		console.log('Business_002_template themeElements:', themeElements);
	}, []);
	useEffect(() => {
		console.log(
			'Business_002_template layoutConfigElements for current slide page:',
			layoutConfigElements,
		);
	}, []);
	useEffect(() => {
		console.log(
			'Business_002_template layoutConfigElements for cover img 0 bg color',
			layoutConfigElements.canvaCSS?.backgroundColor,
		);
	}, []);
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
					backgroundColor: layoutConfigElements.canvaCSS?.backgroundColor,
				}}
			>
				{/* <div
					style={{ fontSize: '40pt', fontFamily: 'Caveat', fontWeight: 700 }}
				>
					This is Caveat font
				</div> */}
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
				></ChosenLayoutCover>
			</div>
		</>
	);
};
