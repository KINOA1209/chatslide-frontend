import React from 'react';
import { MainSlideProps, TemplateKeys } from '../slideTemplates';
import Image, { StaticImageData } from 'next/image';
import HarvardLogo from '@/public/images/template/Harvard/Harvard_logo.png';
import HarvardCoverVector from '@/public/images/template/Harvard/cover_vector_1.png';
import { LayoutKeys } from '@/components/slides/slideLayout';
import { layoutOptions } from '@/components/slides/slideLayout';
import { loadCustomizableElements } from '@/components/slides/SlidesHTML';
export const Harvard_school_template = ({
	user_name,
	title,
	topic,
	subtopic,
	content,
	imgs,
	update_callback,
	canEdit,
	autoSave,
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
		'Harvard' as TemplateKeys,
	);
	return (
		<>
			{/* for not-cover page slides */}
			<div
				className={`${
					!isCoverPage
						? 'rounded-md overflow-hidden w-full h-full bg-cover box-border border-none relative p-[28px]'
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
					autoSave={autoSave}
					isCoverPage={isCoverPage}
					layoutOptionNonCover={layoutOptionNonCover}
					layoutOptionCover={layoutOptionCover}
					themeElements={themeElements}
					templateLogo={templateLogo}
				></ChosenLayoutNonCover>
			</div>
			{/* for cover page */}

			<div
				className={`${
					isCoverPage
						? 'rounded-md overflow-hidden w-full h-full bg-cover flex flex-row gap-[2rem] justify-start items-start box-border border-none relative '
						: 'hidden'
				} ${themeElements.backgroundColorCover} `}
			>
				<ChosenLayoutCover
					content={content}
					user_name={user_name}
					title={title}
					topic={topic}
					subtopic={subtopic}
					imgs={imgs}
					update_callback={update_callback}
					canEdit={canEdit}
					autoSave={autoSave}
					isCoverPage={isCoverPage}
					layoutOptionNonCover={layoutOptionNonCover}
					layoutOptionCover={layoutOptionCover}
					themeElements={themeElements}
					templateLogo={templateLogo}
				></ChosenLayoutCover>

				<div className='absolute top-[50%] right-[0%] gap-7 inline-flex pl-[3rem]'>
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
