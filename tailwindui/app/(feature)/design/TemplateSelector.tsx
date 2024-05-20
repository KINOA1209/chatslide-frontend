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
import { Explanation, Instruction } from '@/components/ui/Text';
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
	'': '',
	Customize: '#FFFFFF',
	Original: '#FFFFFF',
	Blue: '#7E96F7',
	Red: '#FF0000',
	Yellow: '#FFFF00',
	'Dynamic Purple': '#A388F7',
	'Light Cyan': '#ECF4F9',
	'Royal Blue': '#5A55F4',
	Beeswax: '#FDF1C4',
	'Ecru White': '#F5F1E2',
	'Shark Black': '#272A2D',
	'Moon Mist': '#DDDFD2',
	'Regent St Blue': '#ACC9E0',
	Perfume: '#ACA1F7',
	Jonquil: '#E9FEA2',
	'Morning Glory': '#94DCD8',
	Azalea: '#F2BAD7',
	Saffron: '#F6C343',
	Feta: '#EFFDE9',
	'Catskill White': '#EEF5F7',
	Serenade: '#FFF2E6',
	Seashell: '#F1F1F1',
	'Cod Gray': '#FFFFFF',
};

const TemplateSelector: React.FC<{
	template: TemplateKeys;
	setTemplate: (template: TemplateKeys) => void;
	paletteOptions: PaletteKeys[];
	palette: PaletteKeys;
	setPalette: (palette: PaletteKeys) => void;
	showCustomColorPicker?: boolean;
	setCustomizedTemplateBgColorCallback: (color: string) => void;
	setCustomizedTemplateTitleFontFamilyCallback: (font: string) => void;
	setCustomizedTemplateSubtitleFontFamilyCallback: (font: string) => void;
	setCustomizedTemplateContentFontFamilyCallback: (font: string) => void;
	setCustomizedTemplateContentFontColorCallback: (font: string) => void;
	setCustomizedTemplateSubtitleFontColorCallback: (font: string) => void;
	setCustomizedTemplateTitleFontColorCallback: (font: string) => void;
}> = ({
	template,
	setTemplate,
	paletteOptions,
	setPalette,
	palette,
	showCustomColorPicker = false,
	setCustomizedTemplateBgColorCallback,
	setCustomizedTemplateContentFontFamilyCallback,
	setCustomizedTemplateSubtitleFontFamilyCallback,
	setCustomizedTemplateTitleFontFamilyCallback,
	setCustomizedTemplateContentFontColorCallback,
	setCustomizedTemplateSubtitleFontColorCallback,
	setCustomizedTemplateTitleFontColorCallback,
}) => {
	const {
		initialLoadedTemplateBgColor,
		setInitialLoadedTemplateBgColor,
		hasSelectedCustomTemplateBgColor,
		setHasSelectedCustomTemplateBgColor,
		customTemplateBgColor,
		setCustomTemplateBgColor,
		initialLoadedTitleFontFamily,
		setInitialLoadedTitleFontFamily,
		customizedTemplateTitleFontFamily,
		setCustomizedTemplateTitleFontFamily,
		HasSelectedCustomizedTemplateTitleFontFamily,
		setHasSelectedCustomizedTemplateTitleFontFamily,
		initialLoadedSubtitleFontFamily,
		setInitialLoadedSubtitleFontFamily,
		customizedTemplateSubtitleFontFamily,
		setCustomizedTemplateSubtitleFontFamily,
		HasSelectedCustomizedTemplateSubtitleFontFamily,
		setHasSelectedCustomizedTemplateSubtitleFontFamily,
		initialLoadedContentFontFamily,
		setInitialLoadedContentFontFamily,
		customizedTemplateContentFontFamily,
		setCustomizedTemplateContentFontFamily,
		HasSelectedCustomizedTemplateContentFontFamily,
		setHasSelectedCustomizedTemplateContentFontFamily,
		initialLoadedContentFontColor,
		setInitialLoadedContentFontColor,
		customizedTemplateContentFontColor,
		setCustomizedTemplateContentFontColor,
		hasSelectedCustomizedTemplateContentFontColor,
		setHasSelectedCustomizedTemplateContentFontColor,
		initialLoadedSubtitleFontColor,
		setInitialLoadedSubtitleFontColor,
		customizedTemplateSubtitleFontColor,
		setCustomizedTemplateSubtitleFontColor,
		hasSelectedCustomizedTemplateSubtitleFontColor,
		setHasSelectedCustomizedTemplateSubtitleFontColor,
		initialLoadedTitleFontColor,
		setInitialLoadedTitleFontColor,
		customizedTemplateTitleFontColor,
		setCustomizedTemplateTitleFontColor,
		hasSelectedCustomizedTemplateTitleFontColor,
		setHasSelectedCustomizedTemplateTitleFontColor,
	} = useSlides();

	type OptionType = { value: PaletteKeys; label: JSX.Element };

	const [finalPaletteOptions, setFinalPaletteOptions] =
		useState(paletteOptions);

	const [coverTitleFontFamily, setCoverTitleFontFamily] = useState<
		string | undefined
	>('');
	const [coverTitleFontColor, setCoverTitleFontColor] = useState<
		string | undefined
	>('');
	const [advancedMode, setAdvancedMode] = useState(false);

	useEffect(() => {
		setFinalPaletteOptions(paletteOptions);
	}, [paletteOptions]);

	//change template or palette, reset font color
	useEffect(() => {
		resetFontColorPicker();
	}, [template, palette]);

	useEffect(() => {
		const initialCurrentTemplateThemeConfig = loadCustomizableElements(
			template as TemplateKeys,
			palette as PaletteKeys,
		);

		setInitialLoadedTemplateBgColor(
			initialCurrentTemplateThemeConfig?.backgroundColor,
		);

		setInitialLoadedTitleFontFamily(
			initialCurrentTemplateThemeConfig?.titleFontCSS?.fontFamily,
		);
		setInitialLoadedSubtitleFontFamily(
			initialCurrentTemplateThemeConfig?.subtopicFontCSS?.fontFamily,
		);
		setInitialLoadedContentFontFamily(
			initialCurrentTemplateThemeConfig?.contentFontCSS?.fontFamily,
		);
		setInitialLoadedContentFontColor(
			initialCurrentTemplateThemeConfig?.contentFontCSS?.color,
		);
		setInitialLoadedSubtitleFontColor(
			initialCurrentTemplateThemeConfig?.subtopicFontCSS?.color,
		);
		setInitialLoadedTitleFontColor(
			initialCurrentTemplateThemeConfig?.titleFontCSS?.color,
		);
		setCoverTitleFontFamily(
			initialCurrentTemplateThemeConfig?.headFontCSS?.fontFamily,
		);
		setCoverTitleFontColor(
			initialCurrentTemplateThemeConfig?.headFontCSS?.color,
		);
	}, [template, palette]);

	const handleCustomTemplateBgColorChange = (color: string) => {
		setCustomTemplateBgColor(color);
		setCustomizedTemplateBgColorCallback(color);
		setHasSelectedCustomTemplateBgColor(true);
	};

	const handleCustomTemplateTitleFontColorChange = (fontColor: string) => {
		setCustomizedTemplateTitleFontColor(fontColor);
		setCustomizedTemplateTitleFontColorCallback(fontColor);
		setHasSelectedCustomizedTemplateTitleFontColor(true);
	};

	const handleCustomTemplateSubtitleFontColorChange = (fontColor: string) => {
		setCustomizedTemplateSubtitleFontColor(fontColor);
		setCustomizedTemplateSubtitleFontColorCallback(fontColor);
		setHasSelectedCustomizedTemplateSubtitleFontColor(true);
	};

	const handleCustomTemplateContentFontColorChange = (fontColor: string) => {
		setCustomizedTemplateContentFontColor(fontColor);
		setCustomizedTemplateContentFontColorCallback(fontColor);
		setHasSelectedCustomizedTemplateContentFontColor(true);
	};

	const handleCustomTemplateTitleFontFamilyChange = (fontFamily: string) => {
		setCustomizedTemplateTitleFontFamily(fontFamily);
		setCustomizedTemplateTitleFontFamilyCallback(fontFamily);
		setHasSelectedCustomizedTemplateTitleFontFamily(true);
	};

	const handleCustomTemplateSubtitleFontFamilyChange = (fontFamily: string) => {
		setCustomizedTemplateSubtitleFontFamily(fontFamily);
		setCustomizedTemplateSubtitleFontFamilyCallback(fontFamily);
		setHasSelectedCustomizedTemplateSubtitleFontFamily(true);
	};

	const handleCustomTemplateContentFontFamilyChange = (fontFamily: string) => {
		setCustomizedTemplateContentFontFamily(fontFamily);
		setCustomizedTemplateContentFontFamilyCallback(fontFamily);
		setHasSelectedCustomizedTemplateContentFontFamily(true);
	};

	useEffect(() => {
		if (paletteOptions.length === 1) {
			setPalette(paletteOptions[0]);
			setCustomizedTemplateBgColorCallback(
				colorPreviews[paletteOptions[0] as PaletteKeys],
			);
		} else if (!paletteOptions.includes(palette)) {
			setPalette(paletteOptions[0]);
			setCustomizedTemplateBgColorCallback(
				colorPreviews[paletteOptions[0] as PaletteKeys],
			);
		}
	}, [template, paletteOptions]);

	const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value as TemplateKeys;
		setTemplate(selectedValue);
	};

	const handlePaletteChange = (selectedOption: OptionType | null) => {
		if (selectedOption !== null) {
			setPalette(selectedOption.value);
			setCustomizedTemplateBgColorCallback(
				colorPreviews[selectedOption.value as PaletteKeys],
			);
		} else {
			setPalette(paletteOptions[0]);
			setCustomizedTemplateBgColorCallback(
				colorPreviews[paletteOptions[0] as PaletteKeys],
			);
		}
	};

	const resetTemplateBgColorPicker = () => {
		setCustomTemplateBgColor(
			initialLoadedTemplateBgColor || colorPreviews[palette as PaletteKeys],
		);
		setCustomizedTemplateBgColorCallback(
			initialLoadedTemplateBgColor || colorPreviews[palette as PaletteKeys],
		);
		setHasSelectedCustomTemplateBgColor(false);
	};

	const resetFontColorPicker = () => {
		setCustomizedTemplateTitleFontColor(initialLoadedTitleFontColor || '');
		setCustomizedTemplateSubtitleFontColor(
			initialLoadedSubtitleFontColor || '',
		);
		setCustomizedTemplateContentFontColor(initialLoadedContentFontColor || '');
		setCustomizedTemplateTitleFontColorCallback(
			initialLoadedTitleFontColor || '',
		);
		setCustomizedTemplateSubtitleFontColorCallback(
			initialLoadedSubtitleFontColor || '',
		);
		setCustomizedTemplateContentFontColorCallback(
			initialLoadedContentFontColor || '',
		);
		setHasSelectedCustomizedTemplateTitleFontColor(false);
		setHasSelectedCustomizedTemplateSubtitleFontColor(false);
		setHasSelectedCustomizedTemplateContentFontColor(false);
	};

	const resetFontFamilyAndFontColorPicker = () => {
		setCustomizedTemplateTitleFontFamily(initialLoadedTitleFontFamily || '');
		setCustomizedTemplateSubtitleFontFamily(
			initialLoadedSubtitleFontFamily || '',
		);
		setCustomizedTemplateContentFontFamily(
			initialLoadedContentFontFamily || '',
		);
		setCustomizedTemplateTitleFontFamilyCallback(
			initialLoadedTitleFontFamily || '',
		);
		setCustomizedTemplateSubtitleFontFamilyCallback(
			initialLoadedSubtitleFontFamily || '',
		);
		setCustomizedTemplateContentFontFamilyCallback(
			initialLoadedContentFontFamily || '',
		);
		setHasSelectedCustomizedTemplateTitleFontFamily(false);
		setHasSelectedCustomizedTemplateSubtitleFontFamily(false);
		setHasSelectedCustomizedTemplateContentFontFamily(false);

		setCustomizedTemplateTitleFontColor(initialLoadedTitleFontColor || '');
		setCustomizedTemplateSubtitleFontColor(
			initialLoadedSubtitleFontColor || '',
		);
		setCustomizedTemplateContentFontColor(initialLoadedContentFontColor || '');
		setCustomizedTemplateTitleFontColorCallback(
			initialLoadedTitleFontColor || '',
		);
		setCustomizedTemplateSubtitleFontColorCallback(
			initialLoadedSubtitleFontColor || '',
		);
		setCustomizedTemplateContentFontColorCallback(
			initialLoadedContentFontColor || '',
		);
		setHasSelectedCustomizedTemplateTitleFontColor(false);
		setHasSelectedCustomizedTemplateSubtitleFontColor(false);
		setHasSelectedCustomizedTemplateContentFontColor(false);
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

					indicatorSeparator: () => ({ display: 'none' }),
					menu: (provided) => ({ ...provided, zIndex: 999 }),
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
						border: 'none',
						outline: 'none',
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
				<div
					className={`templateAndPaletteChoice flex flex-col items-start gap-y-2`}
				>
					<div className={`templateChoice flex flex-col `}>
						<Instruction>Theme template</Instruction>
						<DropDown
							width='15rem'
							onChange={handleTemplateChange}
							value={template}
							style='input'
						>
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
					<div className='paletteChoice w-full gap-y-2'>
						{!hasSelectedCustomTemplateBgColor &&
							paletteOptions[0] !== 'Original' && (
								<div>
									<Instruction>Theme color</Instruction>
									<PaletteSelector />
								</div>
							)}
					</div>

					<Instruction>
						<div
							onClick={() => setAdvancedMode(!advancedMode)}
							className='cursor-pointer text-blue-600'
						>
							{advancedMode ? <span>Hide </span> : <span></span>} Advanced
							Options
						</div>
					</Instruction>

					{advancedMode && (
						<>
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
										}
										resetColorPicker={resetTemplateBgColorPicker}
									/>
								</div>
							)}
							<WrappableRow type='grid' cols={3}>
								<div className='flex flex-col gap-[4px]'>
									<div className='flex flex-row items-center gap-2'>
										<Instruction>Cover Heading</Instruction>
										<Explanation>
											Change this directly in the editor.
										</Explanation>
									</div>
									<FontFamilyPicker
										onCustomFontFamilyChange={
											handleCustomTemplateTitleFontFamilyChange
										}
										selectedFontFamily={coverTitleFontFamily}
										resetFontFamilyPicker={resetFontFamilyAndFontColorPicker}
										disableResetButton={true}
										disabled={true}
									/>
									<ColorPicker
										onCustomColorChange={
											handleCustomTemplateTitleFontColorChange
										}
										initialColor={
											// hasSelectedCustomizedTemplateTitleFontColor
											// 	? customizedTemplateTitleFontColor || '#000000'
											// 	: initialLoadedTitleFontColor || '#000000'
											'#FFFFFF'
										}
										resetColorPicker={resetFontFamilyAndFontColorPicker}
										disableResetButton={true}
										disabled={true}
									></ColorPicker>
								</div>

								<div className='flex flex-col gap-[4px]'>
									<Instruction>Non-cover Heading</Instruction>
									<FontFamilyPicker
										onCustomFontFamilyChange={
											handleCustomTemplateTitleFontFamilyChange
										}
										selectedFontFamily={
											HasSelectedCustomizedTemplateTitleFontFamily
												? customizedTemplateTitleFontFamily
												: initialLoadedTitleFontFamily
										}
										resetFontFamilyPicker={resetFontFamilyAndFontColorPicker}
										disableResetButton={true}
									/>
									<ColorPicker
										onCustomColorChange={
											handleCustomTemplateTitleFontColorChange
										}
										initialColor={
											hasSelectedCustomizedTemplateTitleFontColor
												? customizedTemplateTitleFontColor || '#000000'
												: initialLoadedTitleFontColor || '#000000'
										}
										resetColorPicker={resetFontFamilyAndFontColorPicker}
										disableResetButton={true}
									></ColorPicker>
								</div>

								<div className='flex flex-col gap-[4px]'>
									<Instruction>Non-cover Subheading</Instruction>
									<FontFamilyPicker
										onCustomFontFamilyChange={
											handleCustomTemplateSubtitleFontFamilyChange
										}
										selectedFontFamily={
											HasSelectedCustomizedTemplateSubtitleFontFamily
												? customizedTemplateSubtitleFontFamily
												: initialLoadedSubtitleFontFamily
										}
										resetFontFamilyPicker={resetFontFamilyAndFontColorPicker}
										disableResetButton={true}
									/>
									<ColorPicker
										onCustomColorChange={
											handleCustomTemplateSubtitleFontColorChange
										}
										initialColor={
											hasSelectedCustomizedTemplateSubtitleFontColor
												? customizedTemplateSubtitleFontColor || '#000000'
												: initialLoadedSubtitleFontColor || '#000000'
										}
										resetColorPicker={resetFontFamilyAndFontColorPicker}
										disableResetButton={true}
									></ColorPicker>
								</div>

								<div className='flex flex-col gap-[4px]'>
									<Instruction>Non-cover Content</Instruction>
									<FontFamilyPicker
										onCustomFontFamilyChange={
											handleCustomTemplateContentFontFamilyChange
										}
										selectedFontFamily={
											HasSelectedCustomizedTemplateContentFontFamily
												? customizedTemplateContentFontFamily
												: initialLoadedContentFontFamily
										}
										resetFontFamilyPicker={resetFontFamilyAndFontColorPicker}
										disableResetButton={true}
									/>
									<ColorPicker
										onCustomColorChange={
											handleCustomTemplateContentFontColorChange
										}
										initialColor={
											hasSelectedCustomizedTemplateContentFontColor
												? customizedTemplateContentFontColor || '#000000'
												: initialLoadedContentFontColor || '#000000'
										}
										resetColorPicker={resetFontFamilyAndFontColorPicker}
										disableResetButton={false}
									></ColorPicker>
								</div>
							</WrappableRow>
						</>
					)}
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
