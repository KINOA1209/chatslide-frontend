'use client';

import { DropDown, SmallBlueButton } from '@/components/button/DrlambdaButton';
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
import { ColorPicker } from './ColorPicker';
import { useSlides } from '@/hooks/use-slides';
import { WrappableRow } from '@/components/layout/WrappableRow';
import FontFamilyPicker from './FontFamilyPicker';
import { loadCustomizableElements } from '@/components/slides/SlidesHTML';

const SlideDesignPreview = dynamic(
	() => import('@/components/slides/SlideDesignPreview'),
	{ ssr: false },
);

export const colorPreviews: Record<PaletteKeys, string> = {
	// "Original" | "Blue" | "Red" | "Yellow" | "Dynamic Purple" | "Light Cyan" | "Royal Blue" | "Beeswax
	'': '',
	Customize: '#FFFFFF',
	Original: '#FFFFFF',
	Blue: '#7E96F7',
	Red: '#FF0000',
	Yellow: '#FFFF00',
	// general pitch
	'Dynamic Purple': '#A388F7',
	'Light Cyan': '#ECF4F9',
	'Royal Blue': '#5A55F4',
	Beeswax: '#FDF1C4',
	// new education
	'Ecru White': '#F5F1E2',
	'Shark Black': '#272A2D',
	'Moon Mist': '#DDDFD2',
	'Regent St Blue': '#ACC9E0',
	// event report
	Perfume: '#ACA1F7',
	Jonquil: '#E9FEA2',
	'Morning Glory': '#94DCD8',
	Azalea: '#F2BAD7',
	Saffron: '#F6C343',
	Feta: '#EFFDE9',
	'Catskill White': '#EEF5F7',
	Serenade: '#FFF2E6',
	Seashell: '#F1F1F1',
	// Add more color previews for other palette keys if needed
};

const TemplateSelector: React.FC<{
	template: TemplateKeys;
	setTemplate: (template: TemplateKeys) => void;
	paletteOptions: PaletteKeys[];
	palette: PaletteKeys;
	setPalette: (palette: PaletteKeys) => void;
	showCustomColorPicker?: boolean;
}> = ({
	template,
	setTemplate,
	paletteOptions,
	setPalette,
	palette,
	showCustomColorPicker = false,
}) => {
	// should not use slides because there could be no slides object yet
	const {
		slides,
		hasSelectedCustomTemplateBgColor,
		customTemplateBgColor,
		updateCustomBgColorForTemplate,
		updateCustomizedTitleFontFamilyForTemplate,
		updateCustomizedSubtitleFontFamilyForTemplate,
		updateCustomizedContentFontFamilyForTemplate,
		toggleHasSelectedCustomTemplateBgColor,
		initalLoadedTitleFontFamily,
		setInitalLoadedTitleFontFamily,
		customizedTemplateTitleFontFamily,
		setCustomizedTemplateTitleFontFamily,
		HasSelectedCustomizedTemplateTitleFontFamily,
		setHasSelectedCustomizedTemplateTitleFontFamily,
		initalLoadedSubtitleFontFamily,
		setInitalLoadedSubtitleFontFamily,
		customizedTemplateSubtitleFontFamily,
		setCustomizedTemplateSubtitleFontFamily,
		HasSelectedCustomizedTemplateSubtitleFontFamily,
		setHasSelectedCustomizedTemplateSubtitleFontFamily,
		initalLoadedContentFontFamily,
		setInitalLoadedContentFontFamily,
		customizedTemplateContentFontFamily,
		setCustomizedTemplateContentFontFamily,
		HasSelectedCustomizedTemplateContentFontFamily,
		setHasSelectedCustomizedTemplateContentFontFamily,
	} = useSlides();
	type OptionType = { value: PaletteKeys; label: JSX.Element };

	// const [selectedCustomTemplateBgColor, setSelectedCustomTemplateBgColor] =
	// 	useState<string>('');
	// const [currentSelectedPalette, setCurrentSelectedPalette] = useState(palette); // Initialize currentPalette with palette
	// const [resettingColor, setResettingColor] = useState(false);
	const handleCustomTemplateBgColorChange = (color: string) => {
		// setSelectedCustomTemplateBgColor(color);
		updateCustomBgColorForTemplate(color);
		toggleHasSelectedCustomTemplateBgColor(true);
		// console.log('SelectedCustomTemplateBgColor:', customTemplateBgColor);
	};
	const [finalPaletteOptions, setFinalPaletteOptions] =
		useState(paletteOptions); //

	// useEffect(() => {
	// 	setCurrentSelectedPalette(palette);
	// }, [palette]);

	useEffect(() => {
		setFinalPaletteOptions(paletteOptions); // Update finalPaletteOptions when paletteOptions changes
	}, [paletteOptions]);

	useEffect(() => {
		// use the consistent template and palette value to reload initial font family to stay consistent
		const initialCurrentTemplateTitleFontFamily = loadCustomizableElements(
			template as TemplateKeys,
			palette as PaletteKeys,
		);
		console.log(
			'initialCurrentTemplate font familt',
			template,
			palette,
			// currentSelectedPalette,
			initialCurrentTemplateTitleFontFamily,
			initalLoadedSubtitleFontFamily,
			initalLoadedContentFontFamily,
		);

		setInitalLoadedTitleFontFamily(
			initialCurrentTemplateTitleFontFamily?.titleFontCSS?.fontFamily,
		);
		setInitalLoadedSubtitleFontFamily(
			initialCurrentTemplateTitleFontFamily?.subtopicFontCSS?.fontFamily,
		);
		setInitalLoadedContentFontFamily(
			initialCurrentTemplateTitleFontFamily?.contentFontCSS?.fontFamily,
		);
	}, [template, palette]); // template + palette

	const handleCustomTemplateTitleFontFamilyChange = (fontFamily: string) => {
		// console.log(
		// 	'hasSelectedCustomTemplateFontFamily',
		// 	HasSelectedCustomizedTemplateTitleFontFamily,
		// );
		// setCustomizedTemplateTitleFontFamily(fontFamily);
		updateCustomizedTitleFontFamilyForTemplate(fontFamily);
		setHasSelectedCustomizedTemplateTitleFontFamily(true);
	};

	const handleCustomTemplateSubtitleFontFamilyChange = (fontFamily: string) => {
		// console.log(
		// 	'hasSelectedCustomTemplateFontFamily',
		// 	HasSelectedCustomizedTemplateTitleFontFamily,
		// );
		// setCustomizedTemplateTitleFontFamily(fontFamily);
		updateCustomizedSubtitleFontFamilyForTemplate(fontFamily);
		setHasSelectedCustomizedTemplateSubtitleFontFamily(true);
	};

	const handleCustomTemplateContentFontFamilyChange = (fontFamily: string) => {
		// console.log(
		// 	'hasSelectedCustomTemplateFontFamily',
		// 	HasSelectedCustomizedTemplateTitleFontFamily,
		// );
		// setCustomizedTemplateTitleFontFamily(fontFamily);
		updateCustomizedContentFontFamilyForTemplate(fontFamily);
		setHasSelectedCustomizedTemplateContentFontFamily(true);
	};

	useEffect(() => {
		// Whenever template changes, reset currentPalette to the first value of paletteOptions

		if (paletteOptions.length === 1) {
			// setCurrentSelectedPalette(paletteOptions[0]); // Update finalPaletteOptions when paletteOptions changes
			setPalette(paletteOptions[0]); // If only one option, set it as default
		} else if (!paletteOptions.includes(palette)) {
			// setCurrentSelectedPalette(paletteOptions[0]); // Update finalPaletteOptions when paletteOptions changes
			setPalette(paletteOptions[0]); // If current palette is not in options, set first option as default
		}
	}, [template, paletteOptions]);

	const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value as TemplateKeys;
		setTemplate(selectedValue);
	};
	// useEffect(() => {
	// 	// Add 'Customize' option to the beginning of paletteOptions
	// 	setFinalPaletteOptions([...paletteOptions, 'Customize']);
	// }, []);

	useEffect(() => {
		console.log('current selected custom color:', customTemplateBgColor);
	});
	// const handlePaletteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	const selectedValue = e.target.value;
	// 	setPalette(selectedValue);
	// };
	const handlePaletteChange = (selectedOption: OptionType | null) => {
		if (selectedOption !== null) {
			// setCurrentSelectedPalette(selectedOption.value);
			setPalette(selectedOption.value);
		} else {
			// Handle the case where no option is selected, for example, clear the palette
			// setCurrentSelectedPalette(paletteOptions[0]);

			setPalette(paletteOptions[0]);
		}
	};

	const resetColorPicker = () => {
		updateCustomBgColorForTemplate(colorPreviews[palette as PaletteKeys]);
		// Reset hasSelectedCustomTemplateBgColor to false
		toggleHasSelectedCustomTemplateBgColor(false);
	};

	const resetFontFamilyPicker = () => {
		// console.log('initalLoadedTitleFontFamily', initalLoadedTitleFontFamily);
		updateCustomizedTitleFontFamilyForTemplate(
			initalLoadedTitleFontFamily || '',
		);
		updateCustomizedSubtitleFontFamilyForTemplate(
			initalLoadedSubtitleFontFamily || '',
		);
		updateCustomizedContentFontFamilyForTemplate(
			initalLoadedContentFontFamily || '',
		);
		setHasSelectedCustomizedTemplateTitleFontFamily(false);
		setHasSelectedCustomizedTemplateSubtitleFontFamily(false);
		setHasSelectedCustomizedTemplateContentFontFamily(false);
	};

	const PaletteSelector = () => {
		return (
			<Select
				isSearchable={false}
				options={finalPaletteOptions.map((paletteOption) => ({
					value: paletteOption,
					label: (
						<div className='flex items-center'>
							<div
								className='w-4 h-4 mr-2'
								style={{
									backgroundColor: colorPreviews[paletteOption as PaletteKeys],
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
									backgroundColor: colorPreviews[palette as PaletteKeys],
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
						height: '36px',
						borderRadius: '8px',
						borderColor: '#e5e7eb',
						borderWidth: '2px',
						fontSize: '14px',
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
		);
	};

	return (
		<div>
			<div
				className={`transition-opacity duration-300 ease-in-out gap-1 flex flex-col justify-start`}
			>
				<div className={`templateAndPaletteChoice flex flex-col  items-start`}>
					<div className={`templateChoice flex flex-col `}>
						<Instruction>Theme template</Instruction>
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
											? '(palette ✅)'
											: ''
									}`}
								</option>
							))}
						</DropDown>
					</div>
					{/* Render color palette options only if there are more than one */}
					{
						<div className='paletteChoice w-full'>
							{!hasSelectedCustomTemplateBgColor &&
								paletteOptions.length > 1 && (
									<div>
										<Instruction>Theme color</Instruction>
										<PaletteSelector />
									</div>
								)}

							{showCustomColorPicker && (
								<div>
									<Instruction>Customize theme color</Instruction>
									<ColorPicker
										onCustomColorChange={handleCustomTemplateBgColorChange}
										initialColor={
											hasSelectedCustomTemplateBgColor
												? customTemplateBgColor ||
												  colorPreviews[palette as PaletteKeys]
												: colorPreviews[palette as PaletteKeys]
										} // Provide a default value if customTemplateBgColor is undefined
										resetColorPicker={resetColorPicker}
									/>
								</div>
							)}
							<div className='flex flex-col xl:flex-row gap-[1rem]'>
								{/* heading */}
								<div>
									<Instruction>Customize Heading</Instruction>
									<FontFamilyPicker
										onCustomFontFamilyChange={
											handleCustomTemplateTitleFontFamilyChange
										}
										selectedFontFamily={
											HasSelectedCustomizedTemplateTitleFontFamily
												? customizedTemplateTitleFontFamily
												: initalLoadedTitleFontFamily
										}
										resetFontFamilyPicker={resetFontFamilyPicker}
										disableResetButton={true}
									/>
								</div>
								{/* subheading */}
								<div>
									<Instruction>Customize Subheading</Instruction>
									<FontFamilyPicker
										onCustomFontFamilyChange={
											handleCustomTemplateSubtitleFontFamilyChange
										}
										selectedFontFamily={
											HasSelectedCustomizedTemplateSubtitleFontFamily
												? customizedTemplateSubtitleFontFamily
												: initalLoadedSubtitleFontFamily
										}
										resetFontFamilyPicker={resetFontFamilyPicker}
										disableResetButton={true}
									/>
								</div>
								{/* paragraph */}
								<div>
									<Instruction>Customize Paragraph</Instruction>
									<FontFamilyPicker
										onCustomFontFamilyChange={
											handleCustomTemplateContentFontFamilyChange
										}
										selectedFontFamily={
											HasSelectedCustomizedTemplateContentFontFamily
												? customizedTemplateContentFontFamily
												: initalLoadedContentFontFamily
										}
										resetFontFamilyPicker={resetFontFamilyPicker}
										disableResetButton={false}
									/>
								</div>
							</div>
						</div>
					}
				</div>
			</div>
			<div className='w-full mt-4 flex flex-col'>
				<Instruction>Preview</Instruction>
				<SlideDesignPreview
					selectedTemplate={template}
					selectedPalette={palette}
				/>
			</div>
		</div>
	);
};

export default TemplateSelector;
