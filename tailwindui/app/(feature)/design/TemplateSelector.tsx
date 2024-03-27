'use client';

import { DropDown } from '@/components/button/DrlambdaButton';
import {
	PaletteKeys,
	TemplateKeys,
	templateDisplayNames,
} from '@/components/slides/slideTemplates';
import availablePalettes from '@/components/slides/palette';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Instruction } from '@/components/ui/Text';
import Select from 'react-select';

const SlideDesignPreview = dynamic(
	() => import('@/components/slides/SlideDesignPreview'),
	{ ssr: false },
);

const colorPreviews: Record<PaletteKeys, string> = {
	// "Original" | "Blue" | "Red" | "Yellow" | "Dynamic Purple" | "Light Cyan" | "Royal Blue" | "Beeswax
	'': '',
	Original: '#FFFFFF',
	Blue: '#7E96F7',
	Red: '#FF0000',
	Yellow: '#FFFF00',
	'Dynamic Purple': '#A388F7',
	'Light Cyan': '#ECF4F9',
	'Royal Blue': '#5A55F4',
	Beeswax: '#FDF1C4',
	// Add more color previews for other palette keys if needed
};

const TemplateSelector: React.FC<{
	template: TemplateKeys;
	setTemplate: (template: TemplateKeys) => void;
	paletteOptions: PaletteKeys[];
	palette: PaletteKeys;
	setPalette: (palette: PaletteKeys) => void;
}> = ({ template, setTemplate, paletteOptions, setPalette, palette }) => {
	type OptionType = { value: PaletteKeys; label: JSX.Element };

	const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value as TemplateKeys;
		setTemplate(selectedValue);
	};

	// const handlePaletteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	const selectedValue = e.target.value;
	// 	setPalette(selectedValue);
	// };
	const handlePaletteChange = (selectedOption: OptionType | null) => {
		if (selectedOption !== null) {
			setPalette(selectedOption.value);
		} else {
			// Handle the case where no option is selected, for example, clear the palette
			setPalette(paletteOptions[0]);
		}
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
						<Instruction>Select your template:</Instruction>
						<DropDown
							width='15rem'
							onChange={handleTemplateChange}
							value={template}
							style='input'
						>
							{/* Map over the template options */}
							{Object.entries(templateDisplayNames).map(([key, value]) => (
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
							<Instruction>
								Select your palette color:
							</Instruction>
							{/* <DropDown
								width='15rem'
								onChange={handlePaletteChange}
								value={palette}
								style='input'
							>
								{paletteOptions.map((paletteOption, index) => (
									<option key={index} value={paletteOption}>
										<div
											style={{
												backgroundColor:
													colorPreviews[paletteOption as PaletteKeys],
											}}
										></div>
										{paletteOption}
									</option>
								))}
							</DropDown> */}
							<Select
								isSearchable={false}
								options={paletteOptions.map((paletteOption) => ({
									value: paletteOption,
									label: (
										<div className='flex items-center'>
											<div
												className='w-4 h-4 mr-2'
												style={{
													backgroundColor:
														colorPreviews[paletteOption as PaletteKeys],
												}}
											/>
											{paletteOption}
										</div>
									),
								}))}
								onChange={(selectedOption: OptionType | null) =>
									handlePaletteChange(selectedOption)
								}
								// defaultInputValue={paletteOptions[0]}
								value={{
									value: palette,
									label: (
										<div className='flex items-center'>
											<div
												className='w-4 h-4 mr-2'
												style={{
													backgroundColor:
														colorPreviews[palette as PaletteKeys],
												}}
											/>
											{palette}
										</div>
									),
								}}
								styles={{
									control: (provided) => ({
										...provided,
										width: '15rem',
									}),

									indicatorSeparator: () => ({ display: 'none' }), // Hides the indicator separator
									menu: (provided) => ({ ...provided, zIndex: 999 }), // Ensure the menu appears above other elements
									option: (provided, state) => ({
										...provided,
										backgroundColor: state.isSelected ? '#d1d5db' : '#ffffff',
										color: state.isSelected ? '#4b5563' : '#000000',
										':hover': {
											backgroundColor: '#d1d5db',
										},
									}),
									input: (provided) => ({
										...provided,
										blurInputOnSelect: true,
										border: 'none', // Remove the border
										outline: 'none', // Remove the outline when focused
										height: '100%',
										padding: '0',
									}),
								}}
							></Select>
						</div>
					)}
				</div>
			</div>
			<div className='w-full mt-4 flex flex-col'>
				<Instruction>Template preview</Instruction>
				<SlideDesignPreview
					selectedTemplate={template}
					selectedPalette={palette}
				/>
			</div>
		</div>
	);
};

export default TemplateSelector;
