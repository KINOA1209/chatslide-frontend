import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fontWhiteList } from '@/components/slides/quillEditorSlide';
import { SmallBlueButton } from '@/components/button/DrlambdaButton';

interface FontFamilyPickerProps {
	selectedFontFamily: string | undefined;
	onCustomFontFamilyChange: (fontFamily: string) => void;
	resetFontFamilyPicker: () => void;
	disableResetButton: Boolean;
}

const FontFamilyPicker: React.FC<FontFamilyPickerProps> = ({
	selectedFontFamily,
	onCustomFontFamilyChange,
	resetFontFamilyPicker,
	disableResetButton = false,
}) => {
	useEffect(() => {
		console.log('selectedFontFamily', selectedFontFamily);
	}, [selectedFontFamily]);

	// Update the font familt state when the selectedFontFamily prop changes
	useEffect(() => {
		setFontFamily(selectedFontFamily || 'Arial');
	}, [selectedFontFamily]);

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			width: '10rem',
			height: '36px',
			borderRadius: '8px',
			borderColor: '#e5e7eb',
			borderWidth: '2px',
			fontSize: '14px',
			cursor: 'pointer',
		}),

		indicatorSeparator: () => ({ display: 'none' }), // Hides the indicator separator
		menu: (provided: any) => ({ ...provided, zIndex: 999 }), // Ensure the menu appears above other elements
		option: (provided: any, state: any) => ({
			...provided,
			backgroundColor: state.isSelected ? '#d1d5db' : '#ffffff',
			color: state.isSelected ? '#4b5563' : '#000000',
			':hover': {
				backgroundColor: '#d1d5db',
			},
		}),
		input: (provided: any) => ({
			...provided,
			blurInputOnSelect: true,
			border: 'none', // Remove the border
			outline: 'none', // Remove the outline when focused
			height: '100%',
			padding: '0',
		}),
	};

	const options = fontWhiteList.map((fontFamilyName) => ({
		value: fontFamilyName,
		label: (
			<div className='flex items-center'>
				<div className='mr-2' />
				<span style={{ fontFamily: fontFamilyName, fontSize: '14px' }}>
					{fontFamilyName}
				</span>
			</div>
		),
	}));

	const handleChange = (selectedOption: any) => {
		onCustomFontFamilyChange(selectedOption.value);
	};

	const [fontFamily, setFontFamily] = useState<string>(
		selectedFontFamily || 'Arial',
	); // Initialize color with initialColor
	return (
		<div>
			<div className='flex flex-row gap-2 items-center'>
				<Select
					isSearchable={false}
					value={{
						value: fontFamily,
						label: (
							<div className='flex items-center'>
								<div className='mr-2' />
								<span style={{ fontFamily: fontFamily, fontSize: '14px' }}>
									{fontFamily}
								</span>
							</div>
						),
					}}
					options={options}
					onChange={handleChange}
					styles={customStyles}
				/>
				{disableResetButton ? (
					<></>
				) : (
					<SmallBlueButton
						customizeStyle={{ width: '5rem' }}
						onClick={resetFontFamilyPicker}
					>
						Reset
					</SmallBlueButton>
				)}
			</div>
		</div>
	);
};

export default FontFamilyPicker;
