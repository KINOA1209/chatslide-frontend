import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { TemplateKeys } from '../slideTemplates';
import drlambdaLogo from '@/public/images/template/drlambdaLogo.png';
import drlambdaLogoSingle from '@/public/images/template/drlambdaLogoSingle.png';
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

const DrLambdaLogo: React.FC<TemplateLogoType> = ({
	isCoverPage,
	custom_logo,
	template_name,
}) => {
	//console.log('custom_logo:', custom_logo);
	if (isCoverPage) {
		if (custom_logo === 'Default') {
			return (
				<div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
					<Image
						src={drlambdaLogo}
						alt='drlambdaLogo'
						className='w-[8rem] h-auto'
					/>
					{/* logo cover */}
				</div>
			);
		} else {
			return (
				<div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
					<Image
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
		if (custom_logo === 'Default') {
			return (
				<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
					<Image
						unoptimized={true}
						src={drlambdaLogoSingle}
						alt='drlambda logo'
						className='w-[1.5rem] mr-4'
					/>
					<div
						className={`grow basis-0 opacity-50 border border-black border-opacity-40`}
					></div>
					{/* logo non cover */}
				</div>
			);
		} else {
			return (
				<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
					<Image
						unoptimized={true}
						src={custom_logo}
						alt='custom logo'
						width={45}
						height={40}
						className='mr-4'
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

// Inside DefaultTemplateLogo component
export const DefaultTemplateLogo = DrLambdaLogo;

// generate school template logo logic
const generateTemplateLogo = ({
	isCoverPage,
	custom_logo,
	template_name,
	logoWidth,
	coverLogo,
	nonCoverLogo,
}: TemplateLogoType) => {
	return (
		<div
			className={`absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50`}
		>
			{custom_logo === template_name ? (
				// use original template logo
				<Image
					unoptimized={true}
					src={isCoverPage ? coverLogo : nonCoverLogo}
					alt='Template Logo'
					className={`w-[${logoWidth}rem] h-auto`}
				/>
			) : (
				// 			<div
				// 				className={`grow basis-0 opacity-50 border ${
				// 					isCoverPage ? 'border-white' : 'border-red-800'
				// 				}  border-opacity-40`}
				// 			></div>
				// use user uploaded logo
				<Image
					unoptimized={true}
					width={45} // Adjust the multiplier as needed
					height={40} // Adjust the multiplier as needed
					src={custom_logo}
					alt='Template Logo'
				/>
			)}
		</div>
	);
};

export const BerkeleyTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: BerkeleyLogoWhite,
		nonCoverLogo: BerkeleyLogo,
		logoWidth: 3, // Adjust the width as needed
	});

export const StanfordTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: StanfordLogo,
		nonCoverLogo: StanfordLogo,
		logoWidth: 3, // Adjust the width as needed
	});

export const HarvardTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: HarvardLogo,
		nonCoverLogo: HarvardLogo,
		logoWidth: 8, // Adjust the width as needed
	});

export const MITTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: MITLogo,
		nonCoverLogo: MITLogo,
		logoWidth: 3, // Adjust the width as needed
	});

export const PrincetonTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: PrincetonLogo,
		nonCoverLogo: PrincetonLogo,
		logoWidth: 6, // Adjust the width as needed
	});

export const CaltechTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: CaltechLogo,
		nonCoverLogo: CaltechLogo,
		logoWidth: 6, // Adjust the width as needed
	});

export const UPennTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: UPennLogo,
		nonCoverLogo: UPennLogo,
		logoWidth: 6, // Adjust the width as needed
	});
export const UChicagoTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: UChicagoLogo,
		nonCoverLogo: UChicagoLogo,
		logoWidth: 4, // Adjust the width as needed
	});
export const YaleTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: YaleLogo,
		nonCoverLogo: YaleLogo,
		logoWidth: 3, // Adjust the width as needed
	});

export const JHUTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: JHULogo,
		nonCoverLogo: JHULogo,
		logoWidth: 8, // Adjust the width as needed
	});
export const ColumbiaTemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: ColumbiaLogo,
		nonCoverLogo: ColumbiaLogo,
		logoWidth: 8, // Adjust the width as needed
	});

export const Fun_Education_004_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: drlambdaLogo,
		nonCoverLogo: drlambdaLogo,
		logoWidth: 8, // Adjust the width as needed
	});

export const Business_Dark_005_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: drlambdaLogo,
		nonCoverLogo: drlambdaLogo,
		logoWidth: 8, // Adjust the width as needed
	});

export const Business_002_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: drlambdaLogo,
		nonCoverLogo: drlambdaLogo,
		logoWidth: 8, // Adjust the width as needed
	});

export const Clean_Lifestyle_003_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: drlambdaLogo,
		nonCoverLogo: drlambdaLogo,
		logoWidth: 8, // Adjust the width as needed
	});

export const Fun_Education_001_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: drlambdaLogo,
		nonCoverLogo: drlambdaLogo,
		logoWidth: 8, // Adjust the width as needed
	});

export const Fun_Vibrant_007_TemplateLogo: React.FC<TemplateLogoType> = (
	props: TemplateLogoType,
) =>
	generateTemplateLogo({
		...props,
		coverLogo: drlambdaLogo,
		nonCoverLogo: drlambdaLogo,
		logoWidth: 8, // Adjust the width as needed
	});

type TemplateLogoType = {
	isCoverPage: boolean;
	custom_logo: string;
	template_name: string | undefined;
	logoWidth: number;
	coverLogo: StaticImageData;
	nonCoverLogo: StaticImageData;
};

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
	React.ComponentType<{
		isCoverPage: boolean;
		custom_logo: string;
		template_name: string | undefined;
	}>
>;

/*
const TemplatesLogos = {
  Default: DefaultTemplateLogo, // Assuming DefaultTemplateLogo is a React component
  Berkeley: BerkeleyTemplateLogo, // Assuming BerkeleyTemplateLogo is a React component
  // ... other template entries
} as Record<TemplateKeys, React.ComponentType<{ isCoverPage: boolean }>>;

*/
