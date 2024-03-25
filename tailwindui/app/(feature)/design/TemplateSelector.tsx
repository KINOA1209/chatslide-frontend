import { DropDown } from '@/components/button/DrlambdaButton';
import { PaletteKeys, TemplateKeys } from '@/components/slides/slideTemplates';
import availablePalettes from '@/components/slides/palette';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const SlideDesignPreview = dynamic(
	() => import('@/components/slides/SlideDesignPreview'),
	{ ssr: false },
);

// const colorPreviews: Record<PaletteKeys, string> = {
// 	// "Original" | "Blue" | "Red" | "Yellow" | "Dynamic Purple" | "Light Cyan" | "Royal Blue" | "Bees Wax
// 	'': '',
// 	Original: '#FFFFFF',
// 	Blue: '#7E96F7',
// 	Red: '#FF0000',
// 	Yellow: '#FFFF00',
// 	'Dynamic Purple': '#000000',
// 	'Light Cyan': '#FFFFFF',
// 	'Royal Blue': '#FFFFFF',
// 	'Bees Wax': '#FFFFFF',
// 	// Add more color previews for other palette keys if needed
// };

const TemplateSelector: React.FC<{
	template: TemplateKeys | string;
	setTemplate: (template: string | TemplateKeys) => void;
	paletteOptions: string[];
	palette: PaletteKeys | string;
	setPalette: (palette: string | PaletteKeys) => void;
}> = ({ template, setTemplate, paletteOptions, setPalette, palette }) => {
	const [selectedTemplate, setSelectedTemplate] = useState<string>(template);
	const [palettesOptionLength, setPalettesOptionLength] = useState(0);

	useEffect(() => {
		// Update color palette dropdown options length when template changes
		setPalettesOptionLength(
			availablePalettes[template as TemplateKeys]?.length ?? 0,
		);
	}, [template]);

	const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setSelectedTemplate(selectedValue);
		setTemplate(selectedValue);

		// If the newly selected template has only one color palette option, set palette to 'Original'
		if (availablePalettes[selectedValue as TemplateKeys]?.length === 1) {
			setPalette('Original');
		}
	};

	const handlePaletteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setPalette(selectedValue);
	};

	return (
		<div>
			<div
				className={`transition-opacity duration-300 ease-in-out gap-1 flex flex-col justify-start`}
			>
				<div
					className={`templateAndPaletteChoice flex flex-col sm:flex-row justify-between items-start sm:items-center`}
				>
					<div className={`templateChoice flex flex-col `}>
						<span className='text-md font-bold'>Select your template:</span>
						<DropDown
							width='15rem'
							onChange={handleTemplateChange}
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
								Simplistic_008: 'Sales Pitch',
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
									{`${value} ${
										(availablePalettes[key as TemplateKeys]?.length ?? 0) > 1
											? '(🎨 available)'
											: ''
									}`}
								</option>
							))}
						</DropDown>
					</div>
					{/* Render color palette options only if there are more than one */}
					{paletteOptions.length > 1 && (
						<div className={`paletteChoice flex flex-col `}>
							<span className='text-md font-bold'>
								Select your palette color:
							</span>
							<DropDown
								width='15rem'
								onChange={handlePaletteChange}
								value={palette}
								style='input'
							>
								{/* Map over paletteOptions to generate option elements */}

								{paletteOptions.map((paletteOption, index) => (
									<option
										key={index}
										value={paletteOption}
										// style={{
										// 	backgroundColor:
										// 		colorPreviews[paletteOption as PaletteKeys],
										// }}
									>
										<div>{paletteOption}</div>
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
					selectedPalette={palette}
				/>
			</div>
		</div>
	);
};

export default TemplateSelector;
