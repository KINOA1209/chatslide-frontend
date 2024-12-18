import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { TemplateKeys } from '../slideTemplates';
import drlambdaLogo from '@/public/images/template/drlambdaLogo.png';
import drlambdaLogoSingle from '@/public/images/template/drlambdaLogoSingle.png';
import drlambdaLogoBadgeBlackBG from '@/public/images/template/square_version_logos/drlambdaSquareLogoBadgeBlackBG.svg';
import drlambdaLogoBadgeWhiteBG from '@/public/images/template/square_version_logos/drlambdaSquareLogoBadgeWhiteBG.svg';
import chatSlideLogoWithBackground from '@/public/images/template/square_version_logos/chatSlideSquareLogoWhiteTextWithBackground.svg';
// import chatslideLogo from '@/public/images/template/chatslide_color_notext.svg';
// import chatslideLogoBlackText from '@/public/images/template/chatslide_color.svg';
// import chatslideLogoWhiteText from '@/public/images/template/chatslide_color_white_text.svg';

import BerkeleyLogo from '@/public/images/template/Berkeley/Berkeley_logo.png';
import BerkeleyLogoWhite from '@/public/images/template/Berkeley/Berkeley_logo_white.png';
import StanfordLogo from '@/public/images/template/Stanford/StanfordLogo.png';
import StanfordLogoLetters from '@/public/images/template/Stanford/Stanford_logo_letters.png';
import HarvardLogo from '@/public/images/template/Harvard/Harvard_logo.png';
import MITLogo from '@/public/images/template/MIT/MIT_Logo.png';
import PrincetonLogo from '@/public/images/template/Princeton/Princeton_University_Logo.png';
import UPennLogo from '@/public/images/template/UPenn/University_of_Pennsylvania-Logo.png';
import CaltechLogo from '@/public/images/template/Caltech/CaltechLogo.png';
import UChicagoLogo from '@/public/images/template/UChicago/University_of_Chicago-Logo.png';
import YaleLogo from '@/public/images/template/Yale/Yale_logo.png';
import JHULogo from '@/public/images/template/JHU/Johns_Hopkins_University-Logo.png';
import ColumbiaLogo from '@/public/images/template/Columbia/ColumbiaLogo.png';
import { useEffect } from 'react';
import { isChatslide } from '@/utils/getHost';
import { useSlides } from '@/hooks/use-slides';
import { LogoPosition } from '@/models/Slide';

function openBrandingModal() {
	console.log('openBrandingModal');
	document.dispatchEvent(new CustomEvent('change_logo'));
}

const DrLambdaLogo: React.FC<TemplateLogoType> = ({
	isCoverPage,
	custom_logo,
	template_name,
}) => {
	// console.log('custom_logo:', custom_logo);
	// console.log('isCoverPage:', isCoverPage);
	if (isCoverPage) {
		if (custom_logo == 'No') {
			return <></>;
		} else if (custom_logo === 'Default') {
			return (
				<div
					onClick={openBrandingModal}
					className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[12px] pb-[12px] z-50'
				>
					<Image
						onClick={openBrandingModal}
						src={
							isChatslide() ? chatSlideLogoWithBackground : drlambdaLogoSingle
						}
						alt='Logo'
						className='w-[2rem] h-auto'
					/>
					{/* logo cover */}
				</div>
			);
		} else {
			return (
				<div
					onClick={openBrandingModal}
					className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[12px] pb-[12px] z-50'
				>
					<Image
						onClick={openBrandingModal}
						unoptimized={true}
						src={custom_logo}
						alt='CustomLogo'
						width={45}
						height={40}
						// className='h-auto'
					/>
				</div>
			);
		}
	} else {
		if (custom_logo === 'No') {
			return <></>;
		} else if (custom_logo === 'Default') {
			return (
				<div
					onClick={openBrandingModal}
					className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[12px] pb-[12px] z-50'
				>
					<Image
						onClick={openBrandingModal}
						unoptimized={true}
						src={isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo}
						alt='Logo'
						className='w-[6rem] mr-4'
					/>
					<div
						className={`grow basis-0 opacity-50 border border-black border-opacity-40`}
					></div>
					{/* logo non cover */}
				</div>
			);
		} else {
			return (
				<div
					onClick={openBrandingModal}
					className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[12px] pb-[12px] z-50'
				>
					<Image
						onClick={openBrandingModal}
						unoptimized={true}
						src={custom_logo}
						alt='custom logo'
						width={45}
						height={40}
						className='mr-4 opacity-50'
					/>
					<div
						className={`grow basis-0 opacity-50 border border-black border-opacity-40`}
					></div>
					{/* logo non cover */}
				</div>
			);
		}
	}
};

export type TemplateLogoType = {
	isCoverPage: boolean;
	isLightBackground: boolean;
	custom_logo: string;
	template_name: string | undefined;
	logoWidth?: number;
	logoHeight?: number;
	coverLogo?: StaticImageData;
	nonCoverLogo?: StaticImageData;
	lightBGLogo?: StaticImageData;
	darkBGLogo?: StaticImageData;
	// isLogoLeftSide?: boolean;
	logoPosition?: LogoPosition;
	logoShapeType?: 'rectangle' | 'square';
	logoPositionConfig?: React.CSSProperties;
};
// generate school template logo logic

export const generateTemplateLogo = ({
	isCoverPage,
	custom_logo,
	template_name,
	logoWidth,
	logoHeight = 2,
	isLightBackground,
	coverLogo,
	nonCoverLogo,
	lightBGLogo,
	darkBGLogo,
	// isLogoLeftSide,
	// isLogoLeftSide = true,
	logoPosition,
	logoShapeType = 'rectangle',
}: TemplateLogoType) => {
	// console.log('custom_logo:', custom_logo);
	// console.log('logo:', coverLogo);

	if (!custom_logo || custom_logo === 'No') {
		return <></>;
	}

	// const { slides, isTemplateLogoLeftSide, setIsTemplateLogoLeftSide } =
	// 	useSlides();

	return (
		<>
			{custom_logo === template_name || custom_logo === 'Default' ? (
				// use original template logo
				<div className='absolute'>
					<Image
						onClick={openBrandingModal}
						unoptimized={true}
						// src={isCoverPage ? coverLogo : nonCoverLogo}
						width={logoWidth}
						height={logoHeight}
						src={
							coverLogo && nonCoverLogo
								? isCoverPage
									? coverLogo.src // Assuming coverLogo is of type StaticImageData
									: nonCoverLogo.src // Assuming nonCoverLogo is of type StaticImageData
								: isLightBackground
									? lightBGLogo!.src // Assuming lightBGLogo is of type StaticImageData
									: darkBGLogo!.src // Assuming darkBGLogo is of type StaticImageData
						}
						alt='Template Logo'
						className={`w-[${logoWidth}rem] h-auto`}
					/>
				</div>
			) : (
				<div className='absolute'>
					<Image
						onClick={openBrandingModal}
						unoptimized={true}
						width={45} // Adjust the multiplier as needed
						height={40} // Adjust the multiplier as needed
						src={custom_logo}
						alt='Template Logo'
						className={!isCoverPage ? 'opacity-50' : ''}
					/>
				</div>
			)}
		</>
	);
};

export const BerkeleyTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: BerkeleyLogoWhite,
		nonCoverLogo: BerkeleyLogo,
		logoWidth: 6, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const StanfordTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: StanfordLogo,
		nonCoverLogo: StanfordLogo,
		logoWidth: 3, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const HarvardTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: HarvardLogo,
		nonCoverLogo: HarvardLogo,
		logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const MITTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: MITLogo,
		nonCoverLogo: MITLogo,
		logoWidth: 3, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const PrincetonTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: PrincetonLogo,
		nonCoverLogo: PrincetonLogo,
		logoWidth: 6, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const CaltechTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: CaltechLogo,
		nonCoverLogo: CaltechLogo,
		logoWidth: 6, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const UPennTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: UPennLogo,
		nonCoverLogo: UPennLogo,
		logoWidth: 6, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});
export const UChicagoTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: UChicagoLogo,
		nonCoverLogo: UChicagoLogo,
		logoWidth: 4, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});
export const YaleTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: YaleLogo,
		nonCoverLogo: YaleLogo,
		logoWidth: 3, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const JHUTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: JHULogo,
		nonCoverLogo: JHULogo,
		logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});
export const ColumbiaTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: ColumbiaLogo,
		nonCoverLogo: ColumbiaLogo,
		logoWidth: 10, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

// Inside DefaultTemplateLogo component
// export const DefaultTemplateLogo = DrLambdaLogo;
export const DefaultTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		// ...props,
		// coverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
	});

export const Fun_Education_004_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		// ...props,
		// coverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
	});

export const Business_Dark_005_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		// ...props,
		// coverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
	});

export const Business_002_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		// ...props,
		// coverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
	});

export const Clean_Lifestyle_003_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		// ...props,
		// coverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
	});

export const Fun_Education_001_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		// ...props,
		// coverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
	});

export const Fun_Vibrant_007_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		// ...props,
		// coverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
	});

export const Business_Light_006_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		// ...props,
		// coverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatSlideLogoWithBackground : drlambdaLogo,
		// logoWidth: 8, // Adjust the width as needed
		// isLogoLeftSide: isTemplateLogoLeftSide,
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
	});

// export const Simplistic_008_TemplateLogoDark: React.FC<TemplateLogoType> = (
// 	props: TemplateLogoType,
// ) =>
// 	generateTemplateLogo({
// 		...props,
// 		coverLogo: isChatslide() ? chatslideLogoText : drlambdaLogoBadgeBlackBG,
// 		nonCoverLogo: isChatslide() ? chatslideLogoText : drlambdaLogoBadgeBlackBG,
// 		logoWidth: 8, // Adjust the width as needed
// 	});

export const Simplistic_008_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		// coverLogo: isChatslide() ? chatslideLogoText : drlambdaLogo,
		// nonCoverLogo: isChatslide() ? chatslideLogoText : drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const New_Education_009_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const Event_Report_010_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const Creative_Brief_011_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

export const Business_Review_012_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		// coverLogo: drlambdaLogo,
		// nonCoverLogo: drlambdaLogo,
		lightBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeWhiteBG,
		darkBGLogo: isChatslide()
			? chatSlideLogoWithBackground
			: drlambdaLogoBadgeBlackBG,
		logoWidth: 4, // Adjust the width as needed
		logoHeight: 1.5,
		logoShapeType: 'square',
		// isLogoLeftSide: isTemplateLogoLeftSide,
	});

// Define the type for template logo information
type TemplateLogoInfo = {
	templateName: TemplateKeys;
	templateLogo: React.ComponentType<TemplateLogoType>;
};

// Define the available templates and their logos
const templatesInfo: TemplateLogoInfo[] = [
	{
		templateName: 'Default' as TemplateKeys,
		templateLogo: DefaultTemplateLogo,
	},
	// {
	// 	templateName: 'Simplistic_008_Light' as TemplateKeys,
	// 	templateLogo: Simplistic_008_TemplateLogoLight,
	// },
	// {
	// 	templateName: 'Simplistic_008_dark' as TemplateKeys,
	// 	templateLogo: Simplistic_008_TemplateLogoDark,
	// },
	{
		templateName: 'Business_Review_012' as TemplateKeys,
		templateLogo: Business_Review_012_TemplateLogo,
	},
	{
		templateName: 'Creative_Brief_011' as TemplateKeys,
		templateLogo: Creative_Brief_011_TemplateLogo,
	},

	{
		templateName: 'Event_Report_010' as TemplateKeys,
		templateLogo: Event_Report_010_TemplateLogo,
	},
	{
		templateName: 'New_Education_009' as TemplateKeys,
		templateLogo: New_Education_009_TemplateLogo,
	},
	{
		templateName: 'Simplistic_008' as TemplateKeys,
		templateLogo: Simplistic_008_TemplateLogo,
	},
	{
		templateName: 'Fun_Education_004' as TemplateKeys,
		templateLogo: Fun_Education_004_TemplateLogo,
	},
	{
		templateName: 'Fun_Vibrant_007' as TemplateKeys,
		templateLogo: Fun_Vibrant_007_TemplateLogo,
	},
	{
		templateName: 'Business_Dark_005' as TemplateKeys,
		templateLogo: Business_Dark_005_TemplateLogo,
	},
	{
		templateName: 'Business_Light_006' as TemplateKeys,
		templateLogo: Business_Light_006_TemplateLogo,
	},
	{
		templateName: 'Business_002' as TemplateKeys,
		templateLogo: Business_002_TemplateLogo,
	},
	{
		templateName: 'Clean_Lifestyle_003' as TemplateKeys,
		templateLogo: Clean_Lifestyle_003_TemplateLogo,
	},
	{
		templateName: 'Fun_Education_001' as TemplateKeys,
		templateLogo: Fun_Education_001_TemplateLogo,
	},
	{
		templateName: 'Berkeley' as TemplateKeys,
		templateLogo: BerkeleyTemplateLogo,
	},
	{
		templateName: 'Stanford' as TemplateKeys,
		templateLogo: StanfordTemplateLogo,
	},
	{
		templateName: 'Harvard' as TemplateKeys,
		templateLogo: HarvardTemplateLogo,
	},
	{
		templateName: 'MIT' as TemplateKeys,
		templateLogo: MITTemplateLogo,
	},
	{
		templateName: 'Princeton' as TemplateKeys,
		templateLogo: PrincetonTemplateLogo,
	},
	{
		templateName: 'UPenn' as TemplateKeys,
		templateLogo: UPennTemplateLogo,
	},
	{
		templateName: 'Caltech' as TemplateKeys,
		templateLogo: CaltechTemplateLogo,
	},
	{
		templateName: 'UChicago' as TemplateKeys,
		templateLogo: UChicagoTemplateLogo,
	},
	{
		templateName: 'Yale' as TemplateKeys,
		templateLogo: YaleTemplateLogo,
	},
	{
		templateName: 'JHU' as TemplateKeys,
		templateLogo: JHUTemplateLogo,
	},
	{
		templateName: 'Columbia' as TemplateKeys,
		templateLogo: ColumbiaTemplateLogo,
	},
];

export const TemplatesLogos = Object.fromEntries(
	templatesInfo.map(({ templateName, templateLogo }) => [
		templateName,
		templateLogo,
	]),
) as Record<
	TemplateKeys,
	// React.ComponentType<{
	// 	isCoverPage: boolean;
	// 	custom_logo: string;
	// 	template_name: string | undefined;
	// 	isLightBackground: boolean;
	// }>
	React.ComponentType<TemplateLogoType>
>;

/*
const TemplatesLogos = {
	Default: DefaultTemplateLogo, // Assuming DefaultTemplateLogo is a React component
	Berkeley: BerkeleyTemplateLogo, // Assuming BerkeleyTemplateLogo is a React component
	// ... other template entries
} as Record<TemplateKeys, React.ComponentType<{ isCoverPage: boolean }>>;

*/
