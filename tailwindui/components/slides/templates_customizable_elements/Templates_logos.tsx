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

// Inside DefaultTemplateLogo component
export const DefaultTemplateLogo = ({
	isCoverPage,
}: {
	isCoverPage: boolean;
}) => {
	if (isCoverPage) {
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
	} else {
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
};

export const BerkeleyTemplateLogo = ({
	isCoverPage,
}: {
	isCoverPage: boolean;
}) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
			<Image
				src={isCoverPage ? BerkeleyLogoWhite : BerkeleyLogo}
				alt='Standford Logo'
				className='w-[5rem] h-auto'
			/>
		</div>
	);
};

export const StanfordTemplateLogo = ({
	isCoverPage,
}: {
	isCoverPage: boolean;
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
}: {
	isCoverPage: boolean;
}) => {
	return (
		<div
			className={`fixed inset-0 top-[85%] w-full h-14 justify-start items-center gap-7 inline-flex pb-[2rem] pl-[2rem]`}
		>
			<Image
				src={HarvardLogo}
				alt='Standford Logo'
				className='w-[10rem] h-auto'
			/>
		</div>
	);
};
export const MITTemplateLogo = ({ isCoverPage }: { isCoverPage: boolean }) => {
	return (
		<div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem]'>
			<Image
				src={MITLogo}
				alt='Standford Logo'
				className='w-[3.75rem] h-auto'
			/>
		</div>
	);
};
// Define the type for template logo information
type TemplateLogoInfo = {
	templateName: TemplateKeys;
	templateLogo: React.ComponentType<{ isCoverPage: boolean }>;
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
];

export const TemplatesLogos = Object.fromEntries(
	templatesInfo.map(({ templateName, templateLogo }) => [
		templateName,
		templateLogo,
	]),
) as Record<TemplateKeys, React.ComponentType<{ isCoverPage: boolean }>>;

/*
const TemplatesLogos = {
  Default: DefaultTemplateLogo, // Assuming DefaultTemplateLogo is a React component
  Berkeley: BerkeleyTemplateLogo, // Assuming BerkeleyTemplateLogo is a React component
  // ... other template entries
} as Record<TemplateKeys, React.ComponentType<{ isCoverPage: boolean }>>;

*/
