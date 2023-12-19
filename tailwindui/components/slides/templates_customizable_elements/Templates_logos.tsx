import Image from 'next/image';
import drlambdaLogo from '@/public/images/template/drlambdaLogo.png';
import drlambdaLogoSingle from '@/public/images/template/drlambdaLogoSingle.png';

// Inside DefaultTemplateLogo component
export const DefaultTemplateLogo = ({
	isCoverPage,
}: {
	isCoverPage: boolean;
}) => {
	if (isCoverPage) {
		return (
			<div className='fixed inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
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
			<div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
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

export const TemplatesLogos = {
	Default: DefaultTemplateLogo,
};
