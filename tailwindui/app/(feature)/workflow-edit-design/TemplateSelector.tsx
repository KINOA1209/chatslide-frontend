import { DropDown } from '@/components/button/DrlambdaButton';
import {
	ColorThemeKeys,
	TemplateKeys,
	availableColorThemes,
} from '@/components/slides/slideTemplates';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SlideDesignPreview = dynamic(
	() => import('@/components/slides/SlideDesignPreview'),
	{ ssr: false },
);

const TemplateSelector: React.FC<{
	template: TemplateKeys | string;
	setTemplate: (template: string | TemplateKeys) => void;
	colorThemeOptions: string[];
	colorTheme: ColorThemeKeys | string;
	setColorTheme: (colorTheme: string | ColorThemeKeys) => void;
}> = ({
	template,
	setTemplate,
	colorThemeOptions,
	setColorTheme,
	colorTheme,
}) => {
	const [selectedTemplate, setSelectedTemplate] = useState<string>(template);
	// const [selectedColorTheme, setSelectedColorTheme] =
	// 	useState<string>(colorTheme);
	const [colorThemesOptionLenghth, setColorThemesOptionLenghth] = useState(0);
	useEffect(() => {
		// Update color theme dropdown options length when template changes
		setColorThemesOptionLenghth(
			availableColorThemes[template as TemplateKeys]?.length ?? 0,
		);
	}, [template]);
	const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setSelectedTemplate(selectedValue);
		setTemplate(selectedValue);
		console.log(
			'current template and color options',
			availableColorThemes[selectedValue as TemplateKeys]?.length,
		);
		// If the newly selected template has only one color theme option, set color theme to 'Original'
		if (availableColorThemes[selectedValue as TemplateKeys]?.length === 1) {
			setColorTheme('Original');
		}
	};

	const handleColorThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		// setSelectedColorTheme(selectedValue);
		setColorTheme(selectedValue);
	};
	useEffect(() => {
		console.log('Color theme changed:', template, colorTheme);
	}, [template, colorTheme]);
	return (
		<div>
			<div
				className={`transition-opacity duration-300 ease-in-out gap-1 flex flex-col justify-start`}
			>
				<div
					className={`templateAndColorThemeChoice flex flex-row justify-between items-center`}
				>
					<div className={`templateChoice flex flex-col `}>
						<span className='text-md font-bold'>Select your template:</span>
						<DropDown
							width='15rem'
							// onChange={(e) => setTemplate(e.target.value)}
							onChange={handleTemplateChange}
							// value={template}
							value={selectedTemplate}
							style='input'
						>
							{/* Map over the template options */}
							{Object.entries({
								Default: 'Default',
								Fun_Education_001: 'Education',
								Business_002: 'Business',
								Clean_Lifestyle_003: 'Clean Lifestyle',
								Fun_Education_004: 'Fun',
								Business_Dark_005: 'Business Dark',
								Business_Light_006: 'Business Light',
								Fun_Vibrant_007: 'Fun Vibrant',
								Simplistic_008: 'Simplistic',
								Stanford: 'Stanford University',
								Berkeley: 'UC Berkeley',
								Harvard: 'Harvard University',
								MIT: 'Massachusetts Institute of Technology',
								Princeton: 'Princeton University',
								Caltech: 'California Institute of Technology',
								Columbia: 'Columbia University',
								JHU: 'Johns Hopkins University',
								Yale: 'Yale University',
								UPenn: 'University of Pennsylvania',
							}).map(([key, value]) => (
								<option key={key} value={key}>
									{`${value} (${
										availableColorThemes[key as TemplateKeys]?.length ?? 0
									} color theme(s))`}
								</option>
							))}
						</DropDown>
					</div>
					{/* Render color theme options only if there are more than one */}
					{colorThemeOptions && (
						<div className={`colorThemeChoice flex flex-col `}>
							<span className='text-md font-bold'>
								Select your Color Theme:
							</span>
							<DropDown
								width='15rem'
								// onChange={(e) => setColorTheme(e.target.value)}
								onChange={handleColorThemeChange}
								// value={colorTheme}
								value={colorTheme}
								// value={
								// 	colorTheme === 'Original' ? 'Original' : colorThemeOptions[0]
								// }
								style='input'
							>
								{/* Map over colorThemeOptions to generate option elements */}
								{colorThemeOptions.map((colorThemeOption, index) => (
									<option key={index} value={colorThemeOption}>
										{colorThemeOption}
									</option>
								))}
							</DropDown>
						</div>
					)}
				</div>
			</div>
			<div className='w-full mt-4 flex flex-col'>
				<span className='text-md font-bold'>Template preview</span>
				<SlideDesignPreview
					selectedTemplate={template}
					selectedColorTheme={colorTheme}
				/>
			</div>
		</div>
	);
};

export default TemplateSelector;
