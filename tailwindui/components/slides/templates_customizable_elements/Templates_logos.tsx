import Image from 'next/image';
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

// Inside DefaultTemplateLogo component
export const DefaultTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	if (isCoverPage) {
		if (custom_logo === 'Default' || (Array.isArray(custom_logo) && custom_logo.length === 0)){
			return (
				<div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
					<Image
						src={drlambdaLogo}
						alt='drlambdaLogo'
						className='w-[8rem] h-auto'
					/>
					{/* logo cover */}
				</div>
			);
		}
		else {
			return (
				<div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
					<Image
						src={custom_logo[0]}
						alt='CustomLogo'
						width={70}
						height={70}
						className='h-auto'
					/>
				</div>
			);
		}

	} else {
		if (custom_logo === 'Default' || (Array.isArray(custom_logo) && custom_logo.length === 0)){
			return (
				<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
					<Image
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
		}
		else{
			return (
				<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
					<Image
						src={custom_logo[0]}
						alt='custom logo'
						width={44}
						height={41}
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
export const BerkeleyTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
			<Image
				src={isCoverPage ? BerkeleyLogoWhite : BerkeleyLogo}
				alt='Berkeley Logo'
				className='w-[5rem] h-auto'
			/>
		</div>
	);
};
export const StanfordTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
			<Image
				src={StanfordLogo}
				alt='Standford Logo'
				className='w-[3.75rem] h-auto'
			/>
			<div
				className={`grow basis-0 opacity-50 border ${
					isCoverPage ? 'border-white' : 'border-red-800'
				}  border-opacity-40`}
			></div>
		</div>
	);
};
export const HarvardTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	return (
		<div
			className={`absolute inset-0 top-[85%] w-full h-14 justify-start items-center gap-7 inline-flex pb-[2rem] pl-[2rem]`}
		>
			<Image
				src={HarvardLogo}
				alt='Harvard Logo'
				className='w-[10rem] h-auto'
			/>
		</div>
	);
};
export const MITTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem]'>
			<Image src={MITLogo} alt='MIT Logo' className='w-[3.75rem] h-auto' />
		</div>
	);
};
export const PrincetonTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
			<Image
				src={PrincetonLogo}
				alt='Princeton Logo'
				className='w-[10rem] h-auto'
			/>
		</div>
	);
};
export const CaltechTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem]'>
			<Image
				src={CaltechLogo}
				alt='Caltech Logo'
				className='w-[10rem] h-auto'
			/>
		</div>
	);
};
export const UPennTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	return (
		<div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
			<Image src={UPennLogo} alt='UPenn Logo' className='w-[10rem] h-auto' />
		</div>
	);
};
export const UChicagoTemplateLogo = ({
	isCoverPage,
	custom_logo,
}: {
	isCoverPage: boolean;
	custom_logo: string[] | string;
}) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
			<Image
				src={UChicagoLogo}
				alt='UChicago Logo'
				className='w-[10rem] h-auto'
			/>
		</div>
	);
};
export const YaleTemplateLogo = ({ isCoverPage }: { isCoverPage: boolean }) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
			<Image src={YaleLogo} alt='Yale Logo' className='w-[3.75rem] h-auto' />
		</div>
	);
};
export const JHUTemplateLogo = ({ isCoverPage }: { isCoverPage: boolean }) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
			<Image src={JHULogo} alt='JHU Logo' className='w-[10rem] h-auto' />
		</div>
	);
};
export const ColumbiaTemplateLogo = ({
	isCoverPage,
}: {
	isCoverPage: boolean;
}) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
			<Image
				src={ColumbiaLogo}
				alt='Columbia Logo'
				className='w-[10rem]  h-auto'
			/>
		</div>
	);
};

// Define the type for template logo information
type TemplateLogoInfo = {
	templateName: TemplateKeys;
	templateLogo: React.ComponentType<{ isCoverPage: boolean, custom_logo:string | string[]}>;
};

// Define the available templates and their logos
const templatesInfo: TemplateLogoInfo[] = [
	{
		templateName: 'Default' as TemplateKeys,
		templateLogo: DefaultTemplateLogo,
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
) as Record<TemplateKeys, React.ComponentType<{ isCoverPage: boolean, custom_logo:string | string[]}>>;

/*
const TemplatesLogos = {
  Default: DefaultTemplateLogo, // Assuming DefaultTemplateLogo is a React component
  Berkeley: BerkeleyTemplateLogo, // Assuming BerkeleyTemplateLogo is a React component
  // ... other template entries
} as Record<TemplateKeys, React.ComponentType<{ isCoverPage: boolean }>>;

*/
