import { useEffect, useMemo, useState } from 'react';
// import { TemplatesLogos } from './templates_customizable_elements/Templates_logos';
import { Berkeley_school_template } from './school_templates/Berkeley_school_template';
import { Harvard_school_template } from './school_templates/Harvard_school_template';
import { Stanford_school_template } from './school_templates/Stanford_school_template';
import { MIT_school_template } from './school_templates/MIT_school_template';
import { Princeton_school_template } from './school_templates/Princeton_University_school_template';
import { Caltech_school_template } from './school_templates/Caltech_school_template';
import { Columbia_school_template } from './school_templates/Columbia_University_school_template';
import { JHU_school_template } from './school_templates/Johns_Hopkins_University_school_template';
import { University_of_Chicago_school_template } from './school_templates/University_of_Chicago_school_template';
import { Yale_school_template } from './school_templates/Yale_school_template';
import { UPenn_school_template } from './school_templates/University_of_Pennsylvania_school_template';
import { Fun_Education_004_template } from './new_templates/Fun_Education_004_template';
import { LayoutKeys } from './slideLayout';
import { layoutOptions } from './slideLayout';
import {
	loadCustomizableElements,
	loadLayoutConfigElements,
} from './SlidesHTML';
export interface MainSlideProps {
	user_name: JSX.Element;
	title: JSX.Element;
	topic: JSX.Element;
	subtopic: JSX.Element;
	content: JSX.Element | JSX.Element[];
	imgs: string[];
	//   imgs: JSX.Element
	update_callback: (imgs: string[]) => void;
	canEdit: boolean;
	isCoverPage: boolean;
	layoutOptionNonCover: LayoutKeys;
	layoutOptionCover: LayoutKeys;
	brandingColor?: string;
	templateLogo?: JSX.Element;
}

// deprecated
export const useLocalImgs = (
	imgs: string[],
	imgCount: number,
	update_callback: (imgs: string[]) => void,
) => {
	const initialImgs = useMemo(() => {
		let cleanedImgs = imgs.filter((url) => url !== '');
		if (cleanedImgs.length > imgCount) {
			cleanedImgs = cleanedImgs.slice(0, imgCount);
		} else if (cleanedImgs.length < imgCount) {
			cleanedImgs = [
				...cleanedImgs,
				...new Array(imgCount - cleanedImgs.length).fill(''),
			];
		}
		return cleanedImgs;
	}, [imgs, imgCount]);

	const [localImgs, setLocalImgs] = useState<string[]>(initialImgs);

	useEffect(() => {
		update_callback(localImgs);
	}, [localImgs]);

	const updateImgAtIndex = (index: number) => {
		const updateLocalImgs = (url: string) => {
			const newLocalImgs = [...localImgs];
			newLocalImgs[index] = url;
			setLocalImgs(newLocalImgs);
			console.log('updateLocalImgs', newLocalImgs);
		};
		return updateLocalImgs;
	};

	return { localImgs, updateImgAtIndex };
};

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
	brandingColor = 'bg-[#F0F0F2]',
	templateLogo,
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

	// useEffect(() => {
	// 	console.log('Default themeElements:', themeElements);
	// }, []);

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
						? 'rounded-md w-full h-full bg-cover flex flex-row gap-[2rem] justify-start items-start box-border border-none relative '
						: 'hidden'
				} ${themeElements.backgroundColorCover}`}
				style={{
					backgroundImage: `url('${themeElements.backgroundUrl}')`, // Corrected syntax
				}}
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
					isCoverPage={isCoverPage}
					layoutOptionNonCover={layoutOptionNonCover}
					layoutOptionCover={layoutOptionCover}
					brandingColor={brandingColor}
					themeElements={themeElements}
					layoutElements={layoutConfigElements}
					templateLogo={templateLogo}
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
						? 'rounded-md w-full h-full bg-cover box-border border-none relative p-[28px]'
						: 'hidden'
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
					isCoverPage={isCoverPage}
					layoutOptionNonCover={layoutOptionNonCover}
					layoutOptionCover={layoutOptionCover}
					brandingColor={brandingColor}
					themeElements={themeElements}
					layoutElements={layoutConfigElements}
					templateLogo={templateLogo}
				></ChosenLayoutNonCover>
			</div>
		</>
	);
};

export const availableTemplates = {
	Stanford: Stanford_school_template,
	Berkeley: Berkeley_school_template,
	Harvard: Harvard_school_template,
	MIT: MIT_school_template,
	Princeton: Princeton_school_template,
	Caltech: Caltech_school_template,
	Columbia: Columbia_school_template,
	JHU: JHU_school_template,
	UChicago: University_of_Chicago_school_template,
	Yale: Yale_school_template,
	UPenn: UPenn_school_template,
	Default: Default,
	Fun_Education_004: Fun_Education_004_template,
};

// Define a type for template keys
type AvailableTemplateKeys = keyof typeof availableTemplates;
// Define a type for additional template keys
type AdditionalTemplateKeys = 'Default_template';

// Combine both types using a union
export type TemplateKeys = AvailableTemplateKeys | AdditionalTemplateKeys;

// Define templateKeys with the type TemplateKeys
// export const TemplateKeys: TemplateKeys[] = Object.keys(
// 	availableTemplates,
// ) as TemplateKeys[];
