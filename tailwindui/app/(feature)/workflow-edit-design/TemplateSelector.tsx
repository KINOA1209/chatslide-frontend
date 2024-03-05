import { DropDown, SmallBlueButton } from '@/components/button/DrlambdaButton';
import dynamic from 'next/dynamic';

const SlideDesignPreview = dynamic(
	() => import('@/components/slides/SlideDesignPreview'),
	{
		ssr: false,
	},
);

const TemplateSelector: React.FC<{
	template: string;
	setTemplate: (template: string) => void;
}> = ({ template, setTemplate }) => {
	return (
		<div>
			<div
				className={`transition-opacity duration-300 ease-in-out gap-1 flex flex-col justify-start`}
			>
				<span className='text-md font-bold'>Select your template:</span>
				<DropDown
					width='20rem'
					onChange={(e) => setTemplate(e.target.value)}
					// onChange={(e) =>
					// 	changeTemplate(e.target.value as TemplateKeys)
					// }
					defaultValue={template}
					style='input'
				>
					<option value='Default'>Default</option>
					<option value='Fun_Education_001'>Education</option>
					<option value='Business_002'>Business</option>
					<option value='Clean_Lifestyle_003'>Clean Lifestyle</option>
					<option value='Fun_Education_004'>Fun</option>
					<option value='Fun_Vibrant_007'>Fun Vibrant</option>
					<option value='Stanford'>Stanford University</option>
					<option value='Berkeley'>UC Berkeley</option>
					<option value='Harvard'>Harvard University</option>
					<option value='MIT'>Massachusetts Institute of Technology</option>
					<option value='Princeton'>Princeton University</option>
					<option value='Caltech'>California Institute of Technology</option>
					<option value='Columbia'>Columbia University</option>
					<option value='JHU'>Johns Hopkins University</option>
					<option value='Yale'>Yale University</option>
					<option value='UPenn'>University of Pennsylvania</option>
				</DropDown>
			</div>
			<div className='w-full mt-4 flex flex-col'>
				<span className='text-md font-bold'>Template preview</span>
				<SlideDesignPreview selectedTemplate={template} />
			</div>
		</div>
	);
};

export default TemplateSelector;
